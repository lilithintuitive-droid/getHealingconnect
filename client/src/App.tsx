import { useState, useEffect, useMemo } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import type { PractitionerWithSpecialties, Availability } from "@shared/schema";

// Frontend transformed practitioner type
type TransformedPractitioner = {
  id: string;
  name: string;
  title: string;
  imageUrl?: string;
  location: string;
  specialties: string[];
  bio: string | null;
  experience: string | null;
  education: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: "Available Today" | "Available This Week" | "Fully Booked";
  languages: string[];
};

// Components
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import SacredWelcomeSection from "@/components/SacredWelcomeSection";
import ThreeStepProcess from "@/components/ThreeStepProcess";
import TestimonialsSection from "@/components/TestimonialsSection";
import PractitionerCard from "@/components/PractitionerCard";
import FilterSidebar from "@/components/FilterSidebar";
import BookingModal from "@/components/BookingModal";
import PractitionerProfile from "@/components/PractitionerProfile";
import LandingPage from "./components/LandingPage";
import PractitionerDashboard from "./components/PractitionerDashboard";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";

// Transform availability data to a simple status
function getAvailabilityStatus(availability: Availability[]): TransformedPractitioner["availability"] {
  if (!availability.length) return "Fully Booked";
  
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // in minutes
  
  // Check for availability today
  const todayAvailability = availability.find(a => 
    a.dayOfWeek === currentDay && a.isActive
  );
  
  if (todayAvailability) {
    const [startHour, startMin] = todayAvailability.startTime.split(':').map(Number);
    const [endHour, endMin] = todayAvailability.endTime.split(':').map(Number);
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    if (currentTime >= startTime && currentTime <= endTime) {
      return "Available Today";
    }
  }
  
  // Check for availability this week
  const hasWeeklyAvailability = availability.some(a => a.isActive);
  return hasWeeklyAvailability ? "Available This Week" : "Fully Booked";
}

// Transform practitioner data for frontend consumption
function transformPractitioner(practitioner: PractitionerWithSpecialties, availability: Availability[] = []): TransformedPractitioner {
  return {
    id: practitioner.id,
    name: practitioner.name,
    title: practitioner.title,
    imageUrl: practitioner.imageUrl || undefined,
    location: practitioner.location,
    specialties: practitioner.specialties.map(s => s.name),
    bio: practitioner.bio,
    experience: practitioner.experience,
    education: practitioner.education || [],
    certifications: practitioner.certifications || [],
    rating: parseFloat(practitioner.rating as string) || 0,
    reviewCount: practitioner.reviewCount || 0,
    hourlyRate: practitioner.hourlyRate / 100, // Convert from cents to dollars
    availability: getAvailabilityStatus(availability),
    languages: practitioner.languages || [],
  };
}

function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [practitioners, setPractitioners] = useState<TransformedPractitioner[]>([]);
  const [filteredPractitioners, setFilteredPractitioners] = useState<TransformedPractitioner[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<TransformedPractitioner | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    specialties: [] as string[],
    location: "",
    priceRange: [0, 500] as number[],
    availability: "",
    rating: 0,
    distance: 50,
  });

  // Fetch all practitioners with their specialties and availability
  const { data: practitionersData, isLoading: practitionersLoading } = useQuery<PractitionerWithSpecialties[]>({
    queryKey: ['/api/practitioners'],
    staleTime: 30000,
  });

  // Fetch availability data for all practitioners
  const { data: availabilityData } = useQuery<Availability[]>({
    queryKey: ['/api/availability'],
    staleTime: 30000,
  });

  // Transform practitioners data when it changes
  useEffect(() => {
    if (practitionersData && availabilityData) {
      const transformed = practitionersData.map(practitioner => {
        const practitionerAvailability = availabilityData.filter(
          a => a.practitionerId === practitioner.id
        );
        return transformPractitioner(practitioner, practitionerAvailability);
      });
      setPractitioners(transformed);
      setFilteredPractitioners(transformed);
    }
  }, [practitionersData, availabilityData]);

  // Theme management
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newIsDark);
  };

  // Filter practitioners based on search and filters
  const filteredResults = useMemo(() => {
    return practitioners.filter(practitioner => {
      const matchesSearch = !searchTerm || 
        practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practitioner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practitioner.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSpecialties = filters.specialties.length === 0 ||
        filters.specialties.some(filter => 
          practitioner.specialties.some(specialty => 
            specialty.toLowerCase().includes(filter.toLowerCase())
          )
        );
      
      const matchesLocation = !filters.location || 
        practitioner.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesPrice = practitioner.hourlyRate >= filters.priceRange[0] && 
        practitioner.hourlyRate <= filters.priceRange[1];
      
      const matchesAvailability = !filters.availability || 
        practitioner.availability.toLowerCase().includes(filters.availability.toLowerCase());
      
      const matchesRating = practitioner.rating >= filters.rating;

      return matchesSearch && matchesSpecialties && matchesLocation && 
             matchesPrice && matchesAvailability && matchesRating;
    });
  }, [practitioners, searchTerm, filters]);

  const handleBookAppointment = (practitionerId: string) => {
    const practitioner = practitioners.find(p => p.id === practitionerId);
    if (practitioner) {
      setSelectedPractitioner(practitioner);
      setShowBookingModal(true);
    }
  };

  const handleViewProfile = (practitionerId: string) => {
    const practitioner = practitioners.find(p => p.id === practitionerId);
    if (practitioner) {
      setSelectedPractitioner(practitioner);
      setShowProfile(true);
    }
  };

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (practitionersLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header isDark={isDark} onThemeToggle={toggleTheme} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading practitioners...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isDark={isDark} onThemeToggle={toggleTheme} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Sacred Welcome */}
      <SacredWelcomeSection />
      
      {/* Service Categories */}
      <ServiceCategories />

      {/* Three Step Process */}
      <ThreeStepProcess />
      
      {/* Practitioner Directory with Search and Filter */}
      <section id="practitioners-section" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Find Your Healer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with experienced practitioners who understand your unique healing journey
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterSidebar 
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={() => setFilters({
                  specialties: [],
                  location: "",
                  priceRange: [0, 500],
                  availability: "",
                  rating: 0,
                  distance: 50,
                })}
              />
            </div>
            
            {/* Practitioners Grid */}
            <div className="flex-1">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredResults.length} of {practitioners.length} practitioners
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredResults.map((practitioner) => (
                  <PractitionerCard
                    key={practitioner.id}
                    {...practitioner}
                    onBookAppointment={handleBookAppointment}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
              
              {filteredResults.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No practitioners match your search criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Modals */}
      {selectedPractitioner && showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          practitioner={selectedPractitioner}
        />
      )}

      {selectedPractitioner && showProfile && (
        <PractitionerProfile
          practitioner={{
            ...selectedPractitioner,
            bio: selectedPractitioner.bio || '',
            experience: selectedPractitioner.experience || ''
          }}
          reviews={[]}
          onBookAppointment={() => {
            setShowProfile(false);
            setShowBookingModal(true);
          }}
        />
      )}
    </div>
  );
}

function Router() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* HealingConnect routes - Main application */}
      <Route path="/">
        {() => {
          // Show landing page if not authenticated or loading
          if (isLoading || !isAuthenticated) {
            return <LandingPage />;
          }

          // Handle logout
          const handleLogout = () => {
            window.location.href = "/api/logout";
          };

          // Show practitioner dashboard if user is a practitioner
          if (user?.role === "practitioner") {
            return <PractitionerDashboard user={user} onLogout={handleLogout} />;
          }

          // Show client interface for regular users
          return <HomePage />;
        }}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
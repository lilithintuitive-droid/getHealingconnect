import { useState, useEffect, useMemo } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [selectedPractitioner, setSelectedPractitioner] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfile, setShowProfile] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    specialties: [] as string[],
    priceRange: [0, 300],
    availability: "any",
    rating: 0,
    distance: 50,
    location: ""
  });

  // Dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Build API query parameters for filtering
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    
    if (filters.specialties.length > 0) {
      params.set('specialties', filters.specialties.join(','));
    }
    
    if (filters.priceRange[0] > 0) {
      params.set('minPrice', filters.priceRange[0].toString());
    }
    
    if (filters.priceRange[1] < 300) {
      params.set('maxPrice', filters.priceRange[1].toString());
    }
    
    if (filters.rating > 0) {
      params.set('rating', filters.rating.toString());
    }
    
    if (filters.location) {
      params.set('location', filters.location);
    }

    return params.toString();
  }, [filters]);

  // Fetch practitioners from API
  const { data: practitioners = [], isLoading } = useQuery({
    queryKey: ['/api/practitioners', queryParams],
    queryFn: async () => {
      const url = `/api/practitioners${queryParams ? `?${queryParams}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch practitioners');
      }
      const data = await response.json();
      
      // Transform API data to match frontend expectations
      return data.map((practitioner: PractitionerWithSpecialties) => ({
        id: practitioner.id,
        name: practitioner.name,
        title: practitioner.title,
        imageUrl: practitioner.imageUrl || undefined,
        location: practitioner.location,
        specialties: practitioner.specialties.map((s: any) => s.name),
        bio: practitioner.bio,
        experience: practitioner.experience,
        education: practitioner.education || [],
        certifications: practitioner.certifications || [],
        rating: parseFloat(practitioner.rating || "0"),
        reviewCount: practitioner.reviewCount || 0,
        hourlyRate: Math.floor(practitioner.hourlyRate / 100), // Convert cents to dollars
        availability: determineAvailability(practitioner.availability),
        languages: practitioner.languages || []
      }));
    },
  });

  // Helper function to determine availability status based on schedule
  const determineAvailability = (availability: Availability[]) => {
    if (!availability || availability.length === 0) {
      return "Fully Booked" as const;
    }
    
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
    
    // Check if available today
    const todayAvailability = availability.find(slot => slot.dayOfWeek === today && slot.isActive === 1);
    if (todayAvailability) {
      const [startHour, startMin] = todayAvailability.startTime.split(':').map(Number);
      const [endHour, endMin] = todayAvailability.endTime.split(':').map(Number);
      const startTime = startHour * 60 + startMin;
      const endTime = endHour * 60 + endMin;
      
      if (currentTime < endTime) {
        return "Available Today" as const;
      }
    }
    
    // Check if available this week
    const hasAvailabilityThisWeek = availability.some(slot => slot.isActive === 1);
    return hasAvailabilityThisWeek ? "Available This Week" as const : "Fully Booked" as const;
  };

  const mockReviews = [
    {
      id: "1",
      clientName: "Maria L.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Exceptional care and professionalism. Highly recommend!"
    }
  ];

  const handleClearFilters = () => {
    setFilters({
      specialties: [],
      priceRange: [0, 300],
      availability: "any",
      rating: 0,
      distance: 50,
      location: ""
    });
  };

  const handleBookAppointment = (practitionerId: string) => {
    setSelectedPractitioner(practitionerId);
    setShowBookingModal(true);
  };

  const handleViewProfile = (practitionerId: string) => {
    setShowProfile(practitionerId);
  };

  const selectedPractitionerData = practitioners.find((p: TransformedPractitioner) => p.id === selectedPractitioner);
  const profilePractitionerData = practitioners.find((p: TransformedPractitioner) => p.id === showProfile);

  if (showProfile && profilePractitionerData) {
    return (
      <div className="min-h-screen bg-background">
        <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setShowProfile(null)}
              className="text-primary hover:text-primary/80 text-sm"
              data-testid="button-back-to-search"
            >
              ← Back to search results
            </button>
          </div>
          <PractitionerProfile
            practitioner={profilePractitionerData}
            reviews={mockReviews}
            onBookAppointment={() => handleBookAppointment(profilePractitionerData.id)}
          />
        </main>
      </div>
    );
  }

  return (
        <div className="min-h-screen bg-background">
          <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
          
          <HeroSection />
          
          <ServiceCategories />
          
          <SacredWelcomeSection />
          
          <ThreeStepProcess />

          <main className="container mx-auto px-4 py-12">
            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <aside className="hidden lg:block">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                />
              </aside>

              {/* Results Section */}
              <section className="flex-1">
                <div className="mb-6">
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
                    Holistic Practitioners Near You
                  </h2>
                  <p className="text-muted-foreground">
                    {isLoading ? "Loading..." : `${practitioners.length} practitioners found`}
                  </p>
                </div>

                {isLoading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-card p-6 rounded-lg animate-pulse">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-muted rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-muted rounded mb-3 w-1/2"></div>
                            <div className="flex space-x-2 mb-3">
                              <div className="h-6 bg-muted rounded w-20"></div>
                              <div className="h-6 bg-muted rounded w-24"></div>
                            </div>
                            <div className="h-4 bg-muted rounded w-1/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {practitioners.map((practitioner: TransformedPractitioner) => (
                      <PractitionerCard
                        key={practitioner.id}
                        {...practitioner}
                        onBookAppointment={handleBookAppointment}
                        onViewProfile={handleViewProfile}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </main>

          <TestimonialsSection />

          {/* Booking Modal */}
          {showBookingModal && selectedPractitionerData && (
            <BookingModal
              isOpen={showBookingModal}
              onClose={() => setShowBookingModal(false)}
              practitioner={selectedPractitionerData}
            />
          )}
        </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={HomePage} />
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
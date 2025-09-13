import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PractitionerCard from "@/components/PractitionerCard";
import FilterSidebar from "@/components/FilterSidebar";
import BookingModal from "@/components/BookingModal";
import PractitionerProfile from "@/components/PractitionerProfile";

// Assets
import practitionerImage from "@assets/generated_images/Practitioner_profile_photo_a3d73050.png";

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
    distance: 50
  });

  // Dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // todo: remove mock functionality
  const mockPractitioners = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      title: "Licensed Acupuncturist & Herbalist",
      imageUrl: practitionerImage,
      location: "Berkeley, CA",
      specialties: ["Acupuncture", "Chinese Herbal Medicine", "Cupping", "Moxibustion"],
      bio: "Dr. Sarah Chen has been practicing Traditional Chinese Medicine for over 15 years, helping hundreds of clients achieve optimal health through natural healing methods.",
      experience: "15+ years experience",
      education: ["Doctor of Acupuncture and Oriental Medicine - Five Branches University"],
      certifications: ["Licensed Acupuncturist (California State Board)"],
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 120,
      availability: "Available Today" as const,
      languages: ["English", "Mandarin", "Cantonese"]
    },
    {
      id: "2",
      name: "Marcus Thompson",
      title: "Certified Massage Therapist",
      location: "San Francisco, CA",
      specialties: ["Deep Tissue Massage", "Sports Massage", "Trigger Point"],
      bio: "Specializing in therapeutic massage for athletes and active individuals.",
      experience: "8+ years experience",
      education: ["Certified Massage Therapy Program"],
      certifications: ["Licensed Massage Therapist"],
      rating: 4.7,
      reviewCount: 89,
      hourlyRate: 90,
      availability: "Available This Week" as const,
      languages: ["English"]
    },
    {
      id: "3",
      name: "Luna Martinez",
      title: "Reiki Master & Energy Healer",
      location: "Oakland, CA",
      specialties: ["Reiki", "Energy Healing", "Chakra Balancing"],
      bio: "Combining traditional Reiki with modern energy healing techniques.",
      experience: "12+ years experience",
      education: ["Reiki Master Certification"],
      certifications: ["Certified Energy Healer"],
      rating: 4.8,
      reviewCount: 156,
      hourlyRate: 85,
      availability: "Available Today" as const,
      languages: ["English", "Spanish"]
    }
  ];

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
      distance: 50
    });
  };

  const handleBookAppointment = (practitionerId: string) => {
    setSelectedPractitioner(practitionerId);
    setShowBookingModal(true);
  };

  const handleViewProfile = (practitionerId: string) => {
    setShowProfile(practitionerId);
  };

  const selectedPractitionerData = mockPractitioners.find(p => p.id === selectedPractitioner);
  const profilePractitionerData = mockPractitioners.find(p => p.id === showProfile);

  if (showProfile && profilePractitionerData) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
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
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
          
          <HeroSection />

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
                    {mockPractitioners.length} practitioners found
                  </p>
                </div>

                <div className="space-y-6">
                  {mockPractitioners.map((practitioner) => (
                    <PractitionerCard
                      key={practitioner.id}
                      {...practitioner}
                      onBookAppointment={handleBookAppointment}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              </section>
            </div>
          </main>

          {/* Booking Modal */}
          {showBookingModal && selectedPractitionerData && (
            <BookingModal
              isOpen={showBookingModal}
              onClose={() => setShowBookingModal(false)}
              practitioner={selectedPractitionerData}
            />
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
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
  return <Router />;
}
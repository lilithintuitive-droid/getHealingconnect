import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import heroImage from "@assets/generated_images/Wellness_hero_background_image_05ce9014.png";

interface HeroSectionProps {
  onSearch?: (query: string, location: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, location);
    } else {
      // Scroll to practitioners section if it exists
      const practitionersSection = document.getElementById('practitioners-section');
      if (practitionersSection) {
        practitionersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden" role="banner" aria-label="Find holistic practitioners">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img" 
        aria-label="Peaceful wellness scene with healing hands and natural elements"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <header className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
          Experience the Art of
          <span className="text-accent block mt-2 text-3xl sm:text-4xl md:text-6xl">Sacred Healing</span>
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Connect with certified holistic practitioners who honor the sacred nature of healing. 
          Discover transformative modalities that nurture mind, body, and spirit.
        </p>

        {/* Search Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto shadow-xl" role="search" aria-label="Find practitioners search form">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <label htmlFor="hero-search" className="sr-only">Search for healing services</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" aria-hidden="true" />
                <Input
                  id="hero-search"
                  name="healing-service"
                  placeholder="What type of healing are you seeking?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                  data-testid="input-hero-search"
                  aria-label="Enter healing service type"
                />
              </div>
              <div className="md:w-48">
                <label htmlFor="hero-location" className="sr-only">Select location</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12" data-testid="select-hero-location" aria-label="Select location">
                    <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                    <SelectItem value="oakland">Oakland, CA</SelectItem>
                    <SelectItem value="berkeley">Berkeley, CA</SelectItem>
                    <SelectItem value="san-jose">San Jose, CA</SelectItem>
                    <SelectItem value="palo-alto">Palo Alto, CA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="h-12 px-8" data-testid="button-hero-search" aria-label="Search for practitioners">
                Find Practitioners
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </div>
          </form>
        </div>

        {/* Popular Searches */}
        <nav className="mt-8" aria-label="Popular search terms">
          <p className="text-white/80 text-sm mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Acupuncture", "Massage Therapy", "Reiki", "Aromatherapy", "Meditation"].map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={() => setSearchQuery(term)}
                data-testid={`button-popular-${term.toLowerCase().replace(' ', '-')}`}
                aria-label={`Search for ${term} practitioners`}
              >
                {term}
              </Button>
            ))}
          </div>
        </nav>
      </header>
    </section>
  );
}
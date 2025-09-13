import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import heroImage from "@assets/generated_images/Wellness_hero_background_image_05ce9014.png";

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Hero search triggered:", searchQuery, location);
  };

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
          Find Your Path to
          <span className="text-accent block mt-2">Natural Healing</span>
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Connect with trusted holistic practitioners in your area. From acupuncture to reiki, 
          discover the healing modality that's right for you.
        </p>

        {/* Search Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="What type of healing are you seeking?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
                data-testid="input-hero-search"
              />
            </div>
            <div className="md:w-48">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-12" data-testid="select-hero-location">
                  <MapPin className="w-5 h-5 mr-2" />
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
            <Button onClick={handleSearch} size="lg" className="h-12 px-8" data-testid="button-hero-search">
              Find Practitioners
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-8">
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
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
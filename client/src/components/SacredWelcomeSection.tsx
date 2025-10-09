import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

export default function SacredWelcomeSection() {
  const handleLearnMore = () => {
    // Scroll to practitioners section to learn more
    const practitionersSection = document.getElementById('practitioners-section');
    if (practitionersSection) {
      practitionersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Sacred Symbol */}
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-10 h-10 text-primary" />
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
            Welcome to Holistic Healing.
          </h2>

          {/* Sub-headings inspired by intuitivetantra.com */}
          <div className="space-y-6 mb-12">
            <h3 className="text-xl md:text-2xl font-serif text-muted-foreground">
              We invite you to explore the world of holistic wellness,
            </h3>
            <h3 className="text-xl md:text-2xl font-serif text-muted-foreground">
              natural healing, and meet our wonderful practitioners.
            </h3>
            <h3 className="text-xl md:text-2xl font-serif text-muted-foreground">
              We will guide you on your healing journey every step of the way.
            </h3>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-primary">
              We look forward to working with you!
            </h3>
          </div>

          {/* Call to Action */}
          <Button 
            size="lg" 
            onClick={handleLearnMore}
            className="px-8 py-6 text-lg"
            data-testid="button-learn-more-about-us"
          >
            LEARN MORE ABOUT WHO WE ARE
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
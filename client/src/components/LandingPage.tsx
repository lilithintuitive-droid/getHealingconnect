import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Monitor, Sparkles, Shield, Star, Calendar, MapPin } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import SacredWelcomeSection from "@/components/SacredWelcomeSection";
import ThreeStepProcess from "@/components/ThreeStepProcess";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  // Dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
      
      <div className="pt-16">
        <HeroSection />
        
        <ServiceCategories />
        
        <SacredWelcomeSection />
        
        <ThreeStepProcess />

        {/* Call-to-Action Section for Authentication */}
        <section className="py-16 bg-primary/5" aria-labelledby="cta-heading">
          <div className="container mx-auto px-4 text-center">
            <header className="mb-8">
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Ready to Begin Your Healing Journey?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands who have found their path to wellness. Connect with certified practitioners or share your healing gifts with others.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
              <Card className="hover-elevate cursor-pointer" onClick={handleLogin}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                    I'm Seeking Healing
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Discover certified practitioners, book sessions, and begin your wellness journey with trusted healers.
                  </p>
                  <Button onClick={handleLogin} className="w-full" data-testid="button-client-login">
                    Find Practitioners
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-elevate cursor-pointer" onClick={handleLogin}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                    I'm a Practitioner
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Share your healing gifts, manage your practice, set your schedule, and connect with clients who need your care.
                  </p>
                  <Button onClick={handleLogin} variant="outline" className="w-full" data-testid="button-practitioner-login">
                    Join as Practitioner
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleLogin} 
                size="lg" 
                className="px-8"
                data-testid="button-main-login"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Get Started Today
              </Button>
              <p className="text-sm text-muted-foreground">
                Sign in with Google, GitHub, or email to access your personalized dashboard
              </p>
            </div>
          </div>
        </section>

        <TestimonialsSection />
      </div>
    </div>
  );
}
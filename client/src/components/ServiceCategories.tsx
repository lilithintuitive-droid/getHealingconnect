import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Monitor, Sparkles, GraduationCap, Shield } from "lucide-react";

interface ServiceCategory {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  link: string;
}

export default function ServiceCategories() {
  const services: ServiceCategory[] = [
    {
      icon: Heart,
      title: "INDIVIDUAL SESSIONS",
      description: "Personalized healing sessions tailored to your unique needs and wellness goals",
      link: "/sessions"
    },
    {
      icon: Monitor,
      title: "REMOTE HEALING",
      description: "Personalized online healing sessions no matter where you are in the world",
      link: "/remote-healing"
    },
    {
      icon: Users,
      title: "COUPLES SESSIONS",
      description: "Experience spiritually guided healing energy together with your partner",
      link: "/couples"
    },
    {
      icon: Sparkles,
      title: "ENERGY HEALING",
      description: "Unfold blocked energies throughout the body and awaken your natural healing",
      link: "/energy-healing"
    },
    {
      icon: GraduationCap,
      title: "TRAINING",
      description: "Professional certification training to become a holistic healing practitioner",
      link: "/training"
    },
    {
      icon: Shield,
      title: "WELLNESS COACHING",
      description: "Holistic approach that addresses underlying patterns, not just symptoms",
      link: "/wellness-coaching"
    }
  ];

  const handleServiceClick = (link: string) => {
    console.log("Service clicked:", link);
  };

  return (
    <section className="py-16 bg-muted/30" aria-labelledby="healing-modalities-heading">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 id="healing-modalities-heading" className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Healing Modalities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the healing approach that resonates with your journey
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Healing service categories">
          {services.map((service, index) => (
            <article 
              key={index}
              role="listitem"
              className="hover-elevate cursor-pointer group transition-all duration-300"
              onClick={() => handleServiceClick(service.link)}
              data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <header>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </header>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="group-hover:border-primary group-hover:text-primary transition-colors"
                    data-testid={`button-learn-more-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    aria-label={`Learn more about ${service.title.toLowerCase()}`}
                  >
                    LEARN MORE
                  </Button>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
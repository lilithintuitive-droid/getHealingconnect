import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Calendar, CheckCircle, ArrowRight } from "lucide-react";

export default function ThreeStepProcess() {
  const steps = [
    {
      number: "1",
      icon: Search,
      title: "Find a practitioner near you",
      subtitle: "across the U.S.!",
      description: "Browse through our network of certified holistic practitioners in your area",
      action: "Find Practitioners",
      actionLink: "/find-practitioner"
    },
    {
      number: "2", 
      icon: Calendar,
      title: "Book your session",
      subtitle: "",
      description: "Choose your preferred time slot and healing modality that suits your needs",
      action: "Book Session",
      actionLink: "/book"
    },
    {
      number: "3",
      icon: CheckCircle,
      title: "Receive confirmation and enjoy your session!",
      subtitle: "",
      description: "Get ready for your transformative healing experience with our practitioners",
      action: "Start Healing",
      actionLink: "/sessions"
    }
  ];

  const handleStepAction = (link: string) => {
    // Scroll to practitioners section for all actions
    const practitionersSection = document.getElementById('practitioners-section');
    if (practitionersSection) {
      practitionersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            It's an easy 3-step process to get started!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Begin your journey to wellness and healing in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover-elevate transition-all duration-300">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary-foreground">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    {step.subtitle && (
                      <h4 className="text-lg font-medium text-primary mb-4">
                        {step.subtitle}
                      </h4>
                    )}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleStepAction(step.actionLink)}
                    className="w-full"
                    data-testid={`button-step-${step.number}`}
                  >
                    {step.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Connector Arrow (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
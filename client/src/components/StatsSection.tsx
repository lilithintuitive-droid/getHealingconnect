import { Users, Award, Calendar, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StatItem {
  icon: typeof Users;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  const stats: StatItem[] = [
    {
      icon: Users,
      value: "10,000+",
      numericValue: 10000,
      suffix: "+",
      label: "Happy Clients",
      description: "Finding healing nationwide"
    },
    {
      icon: Award,
      value: "500+",
      numericValue: 500,
      suffix: "+",
      label: "Verified Practitioners",
      description: "Certified professionals"
    },
    {
      icon: Calendar,
      value: "50,000+",
      numericValue: 50000,
      suffix: "+",
      label: "Sessions Booked",
      description: "Transformative experiences"
    },
    {
      icon: Heart,
      value: "4.9/5",
      numericValue: 4.9,
      suffix: "/5",
      label: "Average Rating",
      description: "From satisfied clients"
    }
  ];

  // Intersection Observer for triggering animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Count-up animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts(stats.map(stat => {
        // Use precise interpolation for decimal values like ratings
        const newValue = stat.numericValue * progress;
        return newValue;
      }));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(stats.map(stat => stat.numericValue));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Trusted by Thousands Across the Nation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a growing community of people discovering holistic healing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-card border border-border hover-elevate transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2 font-serif">
                {isVisible ? (
                  <>
                    {stat.suffix === "/5" 
                      ? counts[index].toFixed(1) 
                      : Math.round(counts[index]).toLocaleString()}
                    {stat.suffix}
                  </>
                ) : (
                  "0"
                )}
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  specialty: string;
  rating: number;
  testimonial: string;
  imageUrl?: string;
}

export default function TestimonialsSection() {
  // todo: remove mock functionality - adapted from intuitivetantra.com testimonials
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah M.",
      location: "Berkeley, CA",
      specialty: "Acupuncture",
      rating: 5,
      testimonial: "The energy healing session with Dr. Chen completely transformed my approach to wellness. I felt my body release tension I didn't even know I was carrying. My stress levels have dramatically decreased, and I feel more centered than ever before.",
      imageUrl: undefined
    },
    {
      id: "2", 
      name: "Michael R.",
      location: "San Francisco, CA",
      specialty: "Massage Therapy",
      rating: 5,
      testimonial: "I've been struggling with chronic pain for years. After just three sessions of therapeutic massage, I experienced more relief than I had with conventional treatments. The practitioner's intuitive approach addressed not just symptoms but underlying patterns.",
      imageUrl: undefined
    },
    {
      id: "3",
      name: "Luna P.",
      location: "Oakland, CA", 
      specialty: "Reiki",
      rating: 5,
      testimonial: "The Reiki session opened emotional and energetic pathways that had been blocked for years. I left feeling lighter, more connected to myself, and with a renewed sense of purpose. This is truly sacred healing work.",
      imageUrl: undefined
    },
    {
      id: "4",
      name: "David K.",
      location: "Palo Alto, CA",
      specialty: "Holistic Counseling",
      rating: 5,
      testimonial: "What I thought would be just stress relief became a profound journey of self-discovery. The practitioner's gentle guidance helped me understand the mind-body connection in ways I never imagined possible.",
      imageUrl: undefined
    },
    {
      id: "5",
      name: "Maria L.",
      location: "San Jose, CA",
      specialty: "Energy Healing",
      rating: 5,
      testimonial: "I approached holistic healing with skepticism, but the results speak for themselves. My anxiety has significantly reduced, I sleep better, and I feel more aligned with my authentic self. This work truly heals on all levels.",
      imageUrl: undefined
    },
    {
      id: "6",
      name: "James T.",
      location: "Marin County, CA",
      specialty: "Meditation Coaching",
      rating: 5,
      testimonial: "The meditation and breathwork sessions have given me tools I use daily. I'm more present, less reactive, and feel deeply connected to my inner wisdom. Every session brings new insights and healing.",
      imageUrl: undefined
    }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Healing Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people who have found their path to wellness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover-elevate h-full">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
                    <AvatarFallback className="text-sm font-serif">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-primary font-medium">{testimonial.specialty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
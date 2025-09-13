import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Star, Clock, Calendar } from "lucide-react";

interface PractitionerCardProps {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: "Available Today" | "Available This Week" | "Fully Booked";
  imageUrl?: string;
  onBookAppointment: (id: string) => void;
  onViewProfile: (id: string) => void;
}

export default function PractitionerCard({
  id,
  name,
  title,
  specialties,
  location,
  rating,
  reviewCount,
  hourlyRate,
  availability,
  imageUrl,
  onBookAppointment,
  onViewProfile
}: PractitionerCardProps) {
  const getAvailabilityColor = () => {
    switch (availability) {
      case "Available Today": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Available This Week": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Fully Booked": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <article className="hover-elevate cursor-pointer group" data-testid={`card-practitioner-${id}`}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={imageUrl} alt={`Professional headshot of ${name}, certified ${title}`} />
              <AvatarFallback className="text-lg font-serif" aria-label={`${name} initials`}>
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <header>
                <h3 className="text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <p className="text-muted-foreground text-sm mb-2" role="text" aria-label="Professional title">{title}</p>
              </header>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center" aria-label={`Location: ${location}`}>
                  <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars, ${reviewCount} reviews`}>
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="font-medium">{rating}</span>
                  <span className="ml-1">({reviewCount} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3" role="list" aria-label="Specialties">
                {specialties.slice(0, 3).map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs" role="listitem">
                    {specialty}
                  </Badge>
                ))}
                {specialties.length > 3 && (
                  <Badge variant="outline" className="text-xs" role="listitem">
                    +{specialties.length - 3} more
                  </Badge>
                )}
              </div>

              <footer className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-foreground" aria-label={`Starting price: $${hourlyRate} per session`}>
                    ${hourlyRate}/session
                  </span>
                  <Badge className={getAvailabilityColor()} aria-label={`Availability status: ${availability}`}>
                    <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                    {availability}
                  </Badge>
                </div>
              </footer>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex space-x-2 w-full" role="group" aria-label="Practitioner actions">
            <Button 
              variant="outline" 
              onClick={() => onViewProfile(id)}
              className="flex-1"
              data-testid={`button-view-profile-${id}`}
              aria-label={`View ${name}'s profile`}
            >
              View Profile
            </Button>
            <Button 
              onClick={() => onBookAppointment(id)}
              className="flex-1"
              disabled={availability === "Fully Booked"}
              data-testid={`button-book-${id}`}
              aria-label={availability === "Fully Booked" ? `${name} is fully booked` : `Book appointment with ${name}`}
            >
              <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
              Book Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
}
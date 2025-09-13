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
    <Card className="hover-elevate cursor-pointer group" data-testid={`card-practitioner-${id}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback className="text-lg font-serif">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm mb-2">{title}</p>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span className="ml-1">({reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{specialties.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-foreground">
                  ${hourlyRate}/session
                </span>
                <Badge className={getAvailabilityColor()}>
                  <Clock className="w-3 h-3 mr-1" />
                  {availability}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0">
        <div className="flex space-x-2 w-full">
          <Button 
            variant="outline" 
            onClick={() => onViewProfile(id)}
            className="flex-1"
            data-testid={`button-view-profile-${id}`}
          >
            View Profile
          </Button>
          <Button 
            onClick={() => onBookAppointment(id)}
            className="flex-1"
            disabled={availability === "Fully Booked"}
            data-testid={`button-book-${id}`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
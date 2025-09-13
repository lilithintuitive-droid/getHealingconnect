import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Calendar, Clock, Award, Heart, MessageCircle } from "lucide-react";

interface Review {
  id: string;
  clientName: string;
  rating: number;
  date: string;
  comment: string;
}

interface PractitionerProfileProps {
  practitioner: {
    id: string;
    name: string;
    title: string;
    imageUrl?: string;
    location: string;
    specialties: string[];
    bio: string;
    experience: string;
    education: string[];
    certifications: string[];
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    languages: string[];
  };
  reviews: Review[];
  onBookAppointment: () => void;
}

export default function PractitionerProfile({ practitioner, reviews, onBookAppointment }: PractitionerProfileProps) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            <Avatar className="w-32 h-32 mx-auto lg:mx-0">
              <AvatarImage src={practitioner.imageUrl} alt={practitioner.name} />
              <AvatarFallback className="text-2xl font-serif">
                {practitioner.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
                {practitioner.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">{practitioner.title}</p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {practitioner.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{practitioner.rating}</span>
                  <span className="ml-1">({practitioner.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {practitioner.experience}
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                {practitioner.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-2xl font-bold text-foreground">
                    ${practitioner.hourlyRate}/session
                  </div>
                  <div className="text-sm text-muted-foreground">Starting rate</div>
                </div>
                <Button size="lg" onClick={onBookAppointment} data-testid="button-book-appointment">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about" data-testid="tab-about">About</TabsTrigger>
          <TabsTrigger value="reviews" data-testid="tab-reviews">
            Reviews ({practitioner.reviewCount})
          </TabsTrigger>
          <TabsTrigger value="credentials" data-testid="tab-credentials">Credentials</TabsTrigger>
          <TabsTrigger value="availability" data-testid="tab-availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {practitioner.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {practitioner.bio}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Experience
                  </h4>
                  <p className="text-muted-foreground">{practitioner.experience}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {practitioner.languages.map(lang => (
                      <Badge key={lang} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{review.clientName}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="credentials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {practitioner.education.map((edu, index) => (
                    <li key={index} className="flex items-start">
                      <Award className="w-4 h-4 mr-2 mt-1 text-primary" />
                      <span className="text-muted-foreground">{edu}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {practitioner.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <Heart className="w-4 h-4 mr-2 mt-1 text-primary" />
                      <span className="text-muted-foreground">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Availability & Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Ready to Schedule?</h3>
                <p className="text-muted-foreground mb-6">
                  Click below to see available times and book your appointment.
                </p>
                <Button size="lg" onClick={onBookAppointment} data-testid="button-book-from-availability">
                  View Available Times
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
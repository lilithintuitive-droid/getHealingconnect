import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, DollarSign, User, Settings, Plus, Edit, Trash2, MapPin, Star } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User as UserType, Practitioner, Service, Booking, Availability } from "@shared/schema";

interface PractitionerDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function PractitionerDashboard({ user, onLogout }: PractitionerDashboardProps) {
  const [isDark, setIsDark] = useState(false);
  const { toast } = useToast();

  // Dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Fetch practitioner profile
  const { data: practitioner, isLoading: practitionerLoading } = useQuery<Practitioner>({
    queryKey: ["/api/practitioners/profile"],
    retry: false,
  });

  // Fetch practitioner services
  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/practitioners/services"],
    retry: false,
  });

  // Fetch practitioner bookings
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/practitioners/bookings"],
    retry: false,
  });

  // Fetch availability
  const { data: availability = [], isLoading: availabilityLoading } = useQuery<Availability[]>({
    queryKey: ["/api/practitioners/availability"],
    retry: false,
  });

  const stats = {
    totalBookings: bookings.length,
    upcomingBookings: bookings.filter(b => new Date(b.appointmentDate) > new Date()).length,
    totalRevenue: bookings.reduce((sum, b) => sum + (b.totalPrice / 100), 0),
    averageRating: practitioner?.rating ? parseFloat(practitioner.rating) : 0,
  };

  const getAvailabilityString = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const activeSlots = availability.filter(slot => slot.isActive === 1);
    
    if (activeSlots.length === 0) return "No availability set";
    
    const dayGroups = activeSlots.reduce((acc, slot) => {
      const day = daysOfWeek[slot.dayOfWeek];
      if (!acc[day]) acc[day] = [];
      acc[day].push(`${slot.startTime}-${slot.endTime}`);
      return acc;
    }, {} as Record<string, string[]>);

    return Object.entries(dayGroups)
      .map(([day, times]) => `${day}: ${times.join(', ')}`)
      .join(' | ');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{backgroundColor: 'hsl(355, 70%, 35%)'}}>
                <span className="font-bold text-sm font-serif" style={{color: 'hsl(355, 20%, 95%)'}}>H</span>
              </div>
              <span className="text-xl font-serif font-semibold text-foreground">HealingConnect</span>
              <Badge variant="secondary" className="ml-2">Practitioner</Badge>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.profileImageUrl || undefined} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <span>Welcome, {user.firstName}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                data-testid="button-theme-toggle"
              >
                {isDark ? "🌞" : "🌙"}
              </Button>
              <Button
                variant="outline"
                onClick={onLogout}
                data-testid="button-logout"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Practitioner Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your practice, schedule, and connect with clients
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-foreground">{stats.upcomingBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toFixed(0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold text-foreground">{stats.averageRating.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Recent Bookings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bookingsLoading ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 bg-muted rounded animate-pulse" />
                      ))}
                    </div>
                  ) : bookings.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No bookings yet</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 5).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{booking.clientName}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.appointmentDate).toLocaleDateString()} at {booking.appointmentTime}
                            </p>
                          </div>
                          <Badge 
                            variant={booking.status === 'confirmed' ? 'default' : 
                                   booking.status === 'completed' ? 'secondary' : 'destructive'}
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Practice Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Complete</span>
                    <Badge variant={practitioner ? "default" : "secondary"}>
                      {practitioner ? "Complete" : "Needs Setup"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Services Available</span>
                    <Badge variant={services.length > 0 ? "default" : "secondary"}>
                      {services.length} services
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Availability Set</span>
                    <Badge variant={availability.length > 0 ? "default" : "secondary"}>
                      {availability.length > 0 ? "Active" : "Not Set"}
                    </Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Current Availability:</p>
                    <p className="text-xs text-muted-foreground">
                      {getAvailabilityString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Update your professional information to attract more clients and showcase your expertise.
                </p>
                
                {practitionerLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-10 bg-muted rounded animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={practitioner?.name || ""} />
                      </div>
                      <div>
                        <Label htmlFor="title">Professional Title</Label>
                        <Input id="title" defaultValue={practitioner?.title || ""} />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={practitioner?.location || ""} />
                      </div>
                      <div>
                        <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                        <Input 
                          id="hourlyRate" 
                          type="number" 
                          defaultValue={practitioner ? practitioner.hourlyRate / 100 : 0} 
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          rows={4} 
                          defaultValue={practitioner?.bio || ""} 
                          placeholder="Tell clients about your approach and experience..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Experience</Label>
                        <Input id="experience" defaultValue={practitioner?.experience || ""} />
                      </div>
                    </div>
                  </div>
                )}
                
                <Button data-testid="button-save-profile">
                  Save Profile Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Availability & Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Set your weekly availability to let clients know when they can book sessions.
                </p>
                
                {availabilityLoading ? (
                  <div className="space-y-4">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                      const daySlot = availability.find(slot => slot.dayOfWeek === (index + 1) % 7);
                      return (
                        <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-20">
                              <Label>{day}</Label>
                            </div>
                            <Switch 
                              checked={daySlot?.isActive === 1}
                              data-testid={`switch-${day.toLowerCase()}`}
                            />
                          </div>
                          {daySlot?.isActive === 1 && (
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="time" 
                                defaultValue={daySlot.startTime} 
                                className="w-32"
                                data-testid={`time-start-${day.toLowerCase()}`}
                              />
                              <span className="text-muted-foreground">to</span>
                              <Input 
                                type="time" 
                                defaultValue={daySlot.endTime} 
                                className="w-32"
                                data-testid={`time-end-${day.toLowerCase()}`}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <Button className="mt-6" data-testid="button-save-availability">
                  Save Availability
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Your Services</h3>
                <p className="text-muted-foreground">Manage the services you offer to clients</p>
              </div>
              <Button data-testid="button-add-service">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            {servicesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : services.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No services created yet</p>
                  <Button data-testid="button-create-first-service">
                    Create Your First Service
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="icon" variant="ghost" data-testid={`button-edit-service-${service.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" data-testid={`button-delete-service-${service.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{service.duration} minutes</span>
                        <span className="font-semibold">${(service.price / 100).toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Client Bookings</h3>
              <p className="text-muted-foreground">View and manage your appointment bookings</p>
            </div>

            {bookingsLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No bookings yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Bookings will appear here when clients schedule sessions with you
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {booking.clientName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{booking.clientName}</h4>
                            <p className="text-sm text-muted-foreground">{booking.clientEmail}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-muted-foreground">
                                📅 {new Date(booking.appointmentDate).toLocaleDateString()}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                🕐 {booking.appointmentTime}
                              </span>
                              <span className="text-sm font-medium">
                                ${(booking.totalPrice / 100).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={booking.status === 'confirmed' ? 'default' : 
                                   booking.status === 'completed' ? 'secondary' : 'destructive'}
                          >
                            {booking.status}
                          </Badge>
                          <Button size="sm" variant="outline" data-testid={`button-view-booking-${booking.id}`}>
                            View Details
                          </Button>
                        </div>
                      </div>
                      {booking.notes && (
                        <div className="mt-4 p-3 bg-muted rounded-md">
                          <p className="text-sm text-muted-foreground">
                            <strong>Client Notes:</strong> {booking.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
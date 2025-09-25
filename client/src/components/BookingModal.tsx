import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, CreditCard, Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Service } from "@shared/schema";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  practitioner: {
    id: string;
    name: string;
    title: string;
    imageUrl?: string;
    location: string;
    hourlyRate: number;
    specialties: string[];
  };
}

export default function BookingModal({ isOpen, onClose, practitioner }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"datetime" | "service" | "contact" | "confirmation">("datetime");
  const { toast } = useToast();

  // Fetch services for this practitioner
  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: [`/api/practitioners/${practitioner.id}/services`],
    enabled: isOpen,
  });

  // Generate available time slots based on selected date and practitioner availability
  const generateAvailableSlots = (date: Date) => {
    if (!date) return [];
    
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // For demo purposes, generate hourly slots from 9 AM to 5 PM
    // In a real app, this would use the practitioner's availability data
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const timeString = hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
      const displayTime = hour === 12 ? "12:00 PM" : timeString;
      
      // Skip past times if it's today
      if (isToday && (hour < currentHour || (hour === currentHour && currentMinutes > 0))) {
        continue;
      }
      
      slots.push(displayTime);
    }
    
    return slots;
  };

  const availableTimes = selectedDate ? generateAvailableSlots(selectedDate) : [];

  // Booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      return apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been successfully scheduled.",
        variant: "default",
      });
      setStep("confirmation");
      // Reset form after a delay
      setTimeout(() => {
        onClose();
        resetForm();
      }, 3000);
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setSelectedDate(new Date());
    setSelectedTime("");
    setSelectedService(null);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setNotes("");
    setStep("datetime");
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService || !clientName || !clientEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      practitionerId: practitioner.id,
      serviceId: selectedService.id,
      clientName,
      clientEmail,
      clientPhone: clientPhone || null,
      appointmentDate: selectedDate.toISOString(),
      appointmentTime: selectedTime,
      notes: notes || null,
      totalPrice: selectedService.price,
      status: "confirmed",
      paymentStatus: "pending",
    };

    createBookingMutation.mutate(bookingData);
  };

  const canProceed = () => {
    switch (step) {
      case "datetime": return selectedDate && selectedTime;
      case "service": return selectedService;
      case "contact": return clientName && clientEmail;
      case "confirmation": return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (step === "datetime") setStep("service");
    else if (step === "service") setStep("contact");
    else if (step === "contact") handleBooking();
  };

  const prevStep = () => {
    if (step === "service") setStep("datetime");
    else if (step === "contact") setStep("service");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-booking">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={practitioner.imageUrl} alt={practitioner.name} />
              <AvatarFallback>{practitioner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-serif">Book with {practitioner.name}</h3>
          </DialogTitle>
          <DialogDescription>
            Schedule an appointment with {practitioner.name}, {practitioner.title}. Select your preferred date, time, and service to book your session.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Booking Form */}
          <div className="space-y-6">
            {step === "datetime" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Select Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                    data-testid="calendar-booking"
                  />
                  
                  {selectedDate && (
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Available Times</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            data-testid={`button-time-${time.replace(/[:\s]/g, '-').toLowerCase()}`}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === "service" && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {servicesLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-4 border rounded-lg animate-pulse">
                          <div className="h-4 bg-muted rounded mb-2 w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    services.map((service: Service) => (
                      <div
                        key={service.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedService?.id === service.id 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedService(service)}
                        data-testid={`button-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{service.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="w-4 h-4 mr-1" />
                              {service.duration} min
                            </div>
                            {service.description && (
                              <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                            )}
                          </div>
                          <span className="font-semibold">${(service.price / 100).toFixed(2)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {step === "contact" && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Full Name *</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter your full name"
                      data-testid="input-client-name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Email Address *</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="Enter your email address"
                      data-testid="input-client-email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Phone Number (Optional)</Label>
                    <Input
                      id="clientPhone"
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      data-testid="input-client-phone"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific concerns or requests..."
                      rows={3}
                      data-testid="textarea-notes"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "confirmation" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Booking Confirmed!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <p className="text-lg">Your appointment has been successfully scheduled.</p>
                    <p className="text-muted-foreground">
                      A confirmation email will be sent to {clientEmail}
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>Next Steps:</strong> You will receive a confirmation email with appointment details and any preparation instructions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{practitioner.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {practitioner.specialties.slice(0, 3).map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {selectedDate && selectedTime && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Appointment Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{selectedDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span>{selectedTime}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedService && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Service</h4>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">{selectedService.name}</div>
                      <div className="text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {selectedService.duration} minutes
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-semibold text-lg">
                        ${(selectedService.price / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {step === "contact" && clientName && clientEmail && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="text-sm space-y-1">
                      <div>{clientName}</div>
                      <div className="text-muted-foreground">{clientEmail}</div>
                      {clientPhone && <div className="text-muted-foreground">{clientPhone}</div>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between border-t pt-6">
          <Button 
            variant="outline" 
            onClick={onClose} 
            data-testid="button-cancel-booking"
            disabled={createBookingMutation.isPending}
          >
            {step === "confirmation" ? "Close" : "Cancel"}
          </Button>
          
          {step !== "confirmation" && (
            <div className="space-x-2">
              {step !== "datetime" && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  data-testid="button-back"
                  disabled={createBookingMutation.isPending}
                >
                  Back
                </Button>
              )}
              <Button
                onClick={nextStep}
                disabled={!canProceed() || createBookingMutation.isPending}
                data-testid="button-next"
              >
                {createBookingMutation.isPending 
                  ? "Booking..." 
                  : step === "contact" 
                    ? "Confirm Booking" 
                    : "Next"
                }
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
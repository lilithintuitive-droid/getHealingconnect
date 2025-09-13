import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, CreditCard, Calendar as CalendarIcon } from "lucide-react";

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
  const [selectedService, setSelectedService] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"datetime" | "service" | "payment">("datetime");

  // todo: remove mock functionality
  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const services = [
    { name: "Initial Consultation", duration: "90 min", price: practitioner.hourlyRate + 30 },
    { name: "Follow-up Session", duration: "60 min", price: practitioner.hourlyRate },
    { name: "Wellness Package (3 sessions)", duration: "60 min each", price: practitioner.hourlyRate * 3 * 0.9 }
  ];

  const handleBooking = () => {
    console.log("Booking confirmed:", {
      practitioner: practitioner.id,
      date: selectedDate,
      time: selectedTime,
      service: selectedService,
      notes
    });
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case "datetime": return selectedDate && selectedTime;
      case "service": return selectedService;
      case "payment": return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (step === "datetime") setStep("service");
    else if (step === "service") setStep("payment");
    else handleBooking();
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
            <div>
              <h3 className="text-lg font-serif">Book with {practitioner.name}</h3>
              <p className="text-sm text-muted-foreground">{practitioner.title}</p>
            </div>
          </DialogTitle>
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
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedService === service.name 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedService(service.name)}
                      data-testid={`button-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration}
                          </div>
                        </div>
                        <span className="font-semibold">${service.price}</span>
                      </div>
                    </div>
                  ))}
                  
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

            {step === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Payment processing would be integrated here</p>
                    <Button variant="outline" disabled>
                      Stripe Payment Integration
                    </Button>
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
                    <div className="text-sm">
                      {services.find(s => s.name === selectedService)?.name}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-semibold text-lg">
                        ${services.find(s => s.name === selectedService)?.price}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={onClose} data-testid="button-cancel-booking">
            Cancel
          </Button>
          <div className="space-x-2">
            {step !== "datetime" && (
              <Button
                variant="outline"
                onClick={() => {
                  if (step === "service") setStep("datetime");
                  else if (step === "payment") setStep("service");
                }}
                data-testid="button-back"
              >
                Back
              </Button>
            )}
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              data-testid="button-next"
            >
              {step === "payment" ? "Confirm Booking" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BookingModal from '../BookingModal';
import practitionerImage from "@assets/generated_images/Practitioner_profile_photo_a3d73050.png";

export default function BookingModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  // todo: remove mock functionality
  const mockPractitioner = {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Licensed Acupuncturist & Herbalist",
    imageUrl: practitionerImage,
    location: "Berkeley, CA",
    hourlyRate: 120,
    specialties: ["Acupuncture", "Chinese Herbal Medicine", "Cupping"]
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Booking Modal
      </Button>
      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        practitioner={mockPractitioner}
      />
    </div>
  );
}
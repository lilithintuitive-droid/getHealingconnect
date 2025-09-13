import PractitionerCard from '../PractitionerCard';
import practitionerImage from "@assets/generated_images/Practitioner_profile_photo_a3d73050.png";

export default function PractitionerCardExample() {
  // todo: remove mock functionality
  const mockPractitioner = {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Licensed Acupuncturist & Herbalist",
    specialties: ["Acupuncture", "Chinese Herbal Medicine", "Cupping", "Moxibustion"],
    location: "Berkeley, CA",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 120,
    availability: "Available Today" as const,
    imageUrl: practitionerImage
  };

  return (
    <div className="max-w-md">
      <PractitionerCard
        {...mockPractitioner}
        onBookAppointment={(id) => console.log("Booking appointment with", id)}
        onViewProfile={(id) => console.log("Viewing profile for", id)}
      />
    </div>
  );
}
import PractitionerProfile from '../PractitionerProfile';
import practitionerImage from "@assets/generated_images/Practitioner_profile_photo_a3d73050.png";

export default function PractitionerProfileExample() {
  // todo: remove mock functionality
  const mockPractitioner = {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Licensed Acupuncturist & Herbalist",
    imageUrl: practitionerImage,
    location: "Berkeley, CA",
    specialties: ["Acupuncture", "Chinese Herbal Medicine", "Cupping", "Moxibustion"],
    bio: "Dr. Sarah Chen has been practicing Traditional Chinese Medicine for over 15 years, helping hundreds of clients achieve optimal health through natural healing methods. She specializes in pain management, stress reduction, and digestive health, combining ancient wisdom with modern understanding to provide comprehensive care.",
    experience: "15+ years experience",
    education: [
      "Doctor of Acupuncture and Oriental Medicine - Five Branches University",
      "Bachelor of Science in Biology - UC Berkeley",
      "Traditional Chinese Medicine Certification - Beijing University"
    ],
    certifications: [
      "Licensed Acupuncturist (California State Board)",
      "Certified Herbalist - American Herbalists Guild",
      "Clean Needle Technique Certified",
      "Continuing Education in Pediatric Acupuncture"
    ],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 120,
    languages: ["English", "Mandarin", "Cantonese"]
  };

  const mockReviews = [
    {
      id: "1",
      clientName: "Maria L.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Dr. Chen helped me tremendously with my chronic back pain. After just a few sessions, I felt significant improvement. Her gentle approach and deep knowledge make her an exceptional practitioner."
    },
    {
      id: "2", 
      clientName: "James K.",
      rating: 5,
      date: "1 month ago",
      comment: "Outstanding experience! Dr. Chen took the time to understand my concerns and created a personalized treatment plan. The herbal remedies she prescribed have been incredibly effective."
    },
    {
      id: "3",
      clientName: "Anna R.",
      rating: 4,
      date: "2 months ago",
      comment: "Very knowledgeable and professional. The clinic is peaceful and welcoming. I've been seeing Dr. Chen for stress management and feel much more balanced."
    }
  ];

  return (
    <PractitionerProfile
      practitioner={mockPractitioner}
      reviews={mockReviews}
      onBookAppointment={() => console.log("Book appointment clicked")}
    />
  );
}
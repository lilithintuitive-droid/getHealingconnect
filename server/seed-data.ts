import { storage } from "./storage";
import type { Specialty } from "@shared/schema";

export async function initializeSeedData() {
  console.log("Initializing seed data...");

  // Create specialties first
  const specialties = [
    // Traditional Medicine
    { name: "Acupuncture", description: "Traditional Chinese acupuncture for pain relief and wellness", category: "Traditional Medicine" },
    { name: "Chinese Herbal Medicine", description: "Custom herbal formulations based on TCM principles", category: "Traditional Medicine" },
    { name: "Cupping", description: "Therapeutic cupping for muscle tension and circulation", category: "Traditional Medicine" },
    { name: "Moxibustion", description: "Warming therapy using mugwort herb", category: "Traditional Medicine" },
    { name: "Ayurvedic Medicine", description: "Ancient Indian healing system focused on balance", category: "Traditional Medicine" },
    
    // Massage & Bodywork
    { name: "Deep Tissue Massage", description: "Therapeutic massage for chronic tension and pain", category: "Massage & Bodywork" },
    { name: "Sports Massage", description: "Specialized massage for athletes and active individuals", category: "Massage & Bodywork" },
    { name: "Trigger Point Therapy", description: "Focused pressure on trigger points to relieve pain", category: "Massage & Bodywork" },
    { name: "Swedish Massage", description: "Classic relaxation massage technique", category: "Massage & Bodywork" },
    { name: "Hot Stone Massage", description: "Massage using heated stones for deep relaxation", category: "Massage & Bodywork" },
    
    // Energy Healing
    { name: "Reiki", description: "Japanese energy healing technique for stress reduction", category: "Energy Healing" },
    { name: "Energy Healing", description: "Holistic energy work to restore balance", category: "Energy Healing" },
    { name: "Chakra Balancing", description: "Balancing the body's energy centers", category: "Energy Healing" },
    { name: "Crystal Healing", description: "Using crystals to support healing and balance", category: "Energy Healing" },
    { name: "Pranic Healing", description: "Energy healing system using life force energy", category: "Energy Healing" },
    
    // Mind-Body Practices
    { name: "Meditation Instruction", description: "Teaching mindfulness and meditation techniques", category: "Mind-Body" },
    { name: "Breathwork", description: "Therapeutic breathing techniques for healing", category: "Mind-Body" },
    { name: "Yoga Therapy", description: "Therapeutic yoga for specific health conditions", category: "Mind-Body" },
    { name: "Sound Healing", description: "Using sound vibrations for therapeutic purposes", category: "Mind-Body" },
    
    // Alternative Therapies
    { name: "Reflexology", description: "Pressure point therapy on feet and hands", category: "Alternative Therapy" },
    { name: "Aromatherapy", description: "Therapeutic use of essential oils", category: "Alternative Therapy" },
    { name: "Homeopathy", description: "Natural remedies based on homeopathic principles", category: "Alternative Therapy" },
    { name: "Naturopathy", description: "Natural healing approaches to wellness", category: "Alternative Therapy" }
  ];

  console.log("Creating specialties...");
  const createdSpecialties: Specialty[] = [];
  for (const specialty of specialties) {
    const created = await storage.createSpecialty(specialty);
    createdSpecialties.push(created);
  }

  // Helper function to get specialty by name
  const getSpecialtyByName = (name: string): Specialty | undefined => createdSpecialties.find(s => s.name === name);

  // Create practitioners with realistic data
  const practitioners = [
    {
      name: "Dr. Sarah Chen",
      title: "Licensed Acupuncturist & Chinese Medicine Practitioner",
      bio: "Dr. Sarah Chen has been practicing Traditional Chinese Medicine for over 15 years, helping hundreds of clients achieve optimal health through natural healing methods. She combines ancient wisdom with modern understanding to provide comprehensive care for both acute and chronic conditions. Her gentle approach and deep knowledge make her highly sought after in the Bay Area wellness community.",
      experience: "15+ years experience",
      location: "Berkeley, CA",
      hourlyRate: 12000, // $120 in cents
      imageUrl: "/attached_assets/generated_images/Practitioner_profile_photo_a3d73050.png",
      languages: ["English", "Mandarin", "Cantonese"],
      education: [
        "Doctor of Acupuncture and Oriental Medicine - Five Branches University",
        "Bachelor of Science in Biology - UC Berkeley"
      ],
      certifications: [
        "Licensed Acupuncturist (California State Board)",
        "Certified Chinese Herbalist (NCCAOM)",
        "Clean Needle Technique Certified"
      ],
      rating: "4.9",
      reviewCount: 127,
      isActive: 1,
      specialtyNames: ["Acupuncture", "Chinese Herbal Medicine", "Cupping", "Moxibustion"]
    },
    {
      name: "Marcus Thompson",
      title: "Licensed Massage Therapist & Sports Medicine Specialist",
      bio: "Marcus brings 8 years of experience specializing in therapeutic massage for athletes and active individuals. He has worked with professional sports teams and understands the unique needs of the active body. Marcus combines various massage techniques to provide effective pain relief and performance enhancement for his clients.",
      experience: "8+ years experience", 
      location: "San Francisco, CA",
      hourlyRate: 9000, // $90 in cents
      languages: ["English"],
      education: [
        "Certified Massage Therapy Program - California Institute of Massage & Spa Services",
        "Sports Medicine Certification - National Academy of Sports Medicine"
      ],
      certifications: [
        "Licensed Massage Therapist (CAMTC)",
        "Certified Sports Massage Therapist",
        "Trigger Point Therapy Certified"
      ],
      rating: "4.7",
      reviewCount: 89,
      isActive: 1,
      specialtyNames: ["Deep Tissue Massage", "Sports Massage", "Trigger Point Therapy", "Swedish Massage"]
    },
    {
      name: "Luna Martinez",
      title: "Reiki Master & Holistic Energy Healer",
      bio: "Luna Martinez is a gifted healer with 12+ years of experience in energy work and holistic healing. She combines traditional Reiki with modern energy healing techniques, creating a unique and powerful healing experience. Her intuitive approach and compassionate presence help clients find deep healing and transformation on all levels - physical, emotional, and spiritual.",
      experience: "12+ years experience",
      location: "Oakland, CA", 
      hourlyRate: 8500, // $85 in cents
      languages: ["English", "Spanish"],
      education: [
        "Reiki Master Teacher Certification - International Center for Reiki Training",
        "Energy Medicine Certification - Four Winds Society"
      ],
      certifications: [
        "Reiki Master Teacher",
        "Certified Energy Healer (International Association of Reiki Professionals)",
        "Crystal Healing Practitioner"
      ],
      rating: "4.8",
      reviewCount: 156,
      isActive: 1,
      specialtyNames: ["Reiki", "Energy Healing", "Chakra Balancing", "Crystal Healing"]
    },
    {
      name: "Dr. Priya Patel", 
      title: "Ayurvedic Practitioner & Holistic Health Consultant",
      bio: "Dr. Priya Patel is a renowned Ayurvedic practitioner with 20+ years of experience in traditional Indian medicine. She offers personalized healing programs based on ancient Ayurvedic principles, helping clients achieve optimal health through diet, lifestyle, and herbal medicine. Her holistic approach addresses the root causes of imbalance rather than just symptoms.",
      experience: "20+ years experience",
      location: "Palo Alto, CA",
      hourlyRate: 14000, // $140 in cents  
      languages: ["English", "Hindi", "Gujarati"],
      education: [
        "Doctor of Ayurvedic Medicine - California College of Ayurveda",
        "Master of Science in Nutrition - Bastyr University"
      ],
      certifications: [
        "Certified Ayurvedic Practitioner (National Ayurvedic Medical Association)",
        "Panchakarma Specialist",
        "Ayurvedic Nutrition Consultant"
      ],
      rating: "4.9",
      reviewCount: 203,
      isActive: 1,
      specialtyNames: ["Ayurvedic Medicine", "Naturopathy", "Meditation Instruction", "Aromatherapy"]
    },
    {
      name: "David Kim",
      title: "Sound Healing Therapist & Meditation Teacher",
      bio: "David Kim is a certified sound healing therapist and meditation instructor with 10+ years of experience. He uses various instruments including singing bowls, gongs, and chimes to create healing sound frequencies. David also teaches mindfulness meditation and breathwork, helping clients find inner peace and stress relief in our busy modern world.",
      experience: "10+ years experience",
      location: "San Jose, CA",
      hourlyRate: 9500, // $95 in cents
      languages: ["English", "Korean"],
      education: [
        "Sound Healing Certification - California Institute of Integral Studies",
        "Mindfulness Meditation Teacher Training - Mindfulness-Based Stress Reduction"
      ],
      certifications: [
        "Certified Sound Healing Practitioner",
        "Qualified Mindfulness Teacher (MBSR)",
        "Breathwork Facilitator Certification"
      ],
      rating: "4.6",
      reviewCount: 74,
      isActive: 1,
      specialtyNames: ["Sound Healing", "Meditation Instruction", "Breathwork", "Yoga Therapy"]
    },
    {
      name: "Isabella Rodriguez",
      title: "Holistic Massage Therapist & Aromatherapy Specialist", 
      bio: "Isabella brings 12+ years of experience in holistic massage therapy and aromatherapy. She creates custom essential oil blends for each client and integrates aromatherapy into her massage sessions for enhanced therapeutic benefits. Isabella's nurturing touch and extensive knowledge of plant medicine make her sessions deeply healing and rejuvenating.",
      experience: "12+ years experience",
      location: "Santa Cruz, CA",
      hourlyRate: 10500, // $105 in cents
      languages: ["English", "Spanish", "Portuguese"],
      education: [
        "Licensed Massage Therapy Program - Pacific College of Health Sciences",
        "Clinical Aromatherapy Certification - Pacific Institute of Aromatherapy"
      ],
      certifications: [
        "Licensed Massage Therapist (CAMTC)",
        "Certified Clinical Aromatherapist",
        "Reflexology Practitioner"
      ],
      rating: "4.8",
      reviewCount: 112,
      isActive: 1,
      specialtyNames: ["Swedish Massage", "Hot Stone Massage", "Aromatherapy", "Reflexology"]
    }
  ];

  console.log("Creating practitioners...");
  const createdPractitioners = [];
  for (const practitionerData of practitioners) {
    const { specialtyNames, ...practitionerInfo } = practitionerData;
    const practitioner = await storage.createPractitioner(practitionerInfo);
    createdPractitioners.push({ ...practitioner, specialtyNames });
  }

  // Create practitioner-specialty relationships
  console.log("Creating practitioner-specialty relationships...");
  for (const practitioner of createdPractitioners) {
    for (const specialtyName of practitioner.specialtyNames || []) {
      const specialty = getSpecialtyByName(specialtyName);
      if (specialty) {
        await storage.addPractitionerSpecialty({
          practitionerId: practitioner.id,
          specialtyId: specialty.id
        });
      }
    }
  }

  // Create availability schedules for practitioners
  console.log("Creating availability schedules...");
  
  // Standard availability templates
  const fullTimeSchedule = [
    { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }, // Monday
    { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" }, // Tuesday
    { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" }, // Wednesday
    { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" }, // Thursday
    { dayOfWeek: 5, startTime: "09:00", endTime: "15:00" }, // Friday
  ];

  const partTimeSchedule = [
    { dayOfWeek: 1, startTime: "10:00", endTime: "16:00" }, // Monday
    { dayOfWeek: 3, startTime: "10:00", endTime: "16:00" }, // Wednesday
    { dayOfWeek: 5, startTime: "09:00", endTime: "14:00" }, // Friday
    { dayOfWeek: 6, startTime: "10:00", endTime: "15:00" }, // Saturday
  ];

  const eveningSchedule = [
    { dayOfWeek: 2, startTime: "17:00", endTime: "21:00" }, // Tuesday
    { dayOfWeek: 3, startTime: "17:00", endTime: "21:00" }, // Wednesday
    { dayOfWeek: 4, startTime: "17:00", endTime: "21:00" }, // Thursday
    { dayOfWeek: 6, startTime: "09:00", endTime: "17:00" }, // Saturday
    { dayOfWeek: 0, startTime: "10:00", endTime: "16:00" }, // Sunday
  ];

  // Assign different schedules to different practitioners
  const schedules = [fullTimeSchedule, fullTimeSchedule, partTimeSchedule, fullTimeSchedule, eveningSchedule, partTimeSchedule];
  
  for (let i = 0; i < createdPractitioners.length; i++) {
    const practitioner = createdPractitioners[i];
    const schedule = schedules[i % schedules.length];
    
    for (const slot of schedule) {
      await storage.setAvailability({
        practitionerId: practitioner.id,
        ...slot,
        isActive: 1
      });
    }
  }

  console.log("Seed data initialization complete!");
  console.log(`Created ${createdSpecialties.length} specialties`);
  console.log(`Created ${createdPractitioners.length} practitioners`);
}
import {
  type User,
  type InsertUser,
  type UpsertUser,
  type Practitioner,
  type InsertPractitioner,
  type Specialty,
  type InsertSpecialty,
  type PractitionerSpecialty,
  type InsertPractitionerSpecialty,
  type Availability,
  type InsertAvailability,
  type Service,
  type InsertService,
  type Booking,
  type InsertBooking,
  type PractitionerWithSpecialties,
  // Dancing Butterfly business website types
  type Lead,
  type InsertLead,
  type Testimonial,
  type InsertTestimonial,
  type CaseStudy,
  type InsertCaseStudy,
  type ServicePackage,
  type InsertServicePackage,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  // Legacy methods for existing data
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Practitioner methods
  getAllPractitioners(): Promise<PractitionerWithSpecialties[]>;
  getPractitioner(id: string): Promise<PractitionerWithSpecialties | undefined>;
  createPractitioner(practitioner: InsertPractitioner): Promise<Practitioner>;
  updatePractitioner(id: string, practitioner: Partial<InsertPractitioner>): Promise<Practitioner | undefined>;
  deletePractitioner(id: string): Promise<boolean>;
  searchPractitioners(filters?: {
    specialties?: string[];
    location?: string;
    priceRange?: [number, number];
    availability?: string;
    rating?: number;
    email?: string;
  }): Promise<PractitionerWithSpecialties[]>;

  // Specialty methods
  getAllSpecialties(): Promise<Specialty[]>;
  getSpecialty(id: string): Promise<Specialty | undefined>;
  createSpecialty(specialty: InsertSpecialty): Promise<Specialty>;

  // Practitioner-Specialty junction methods
  addPractitionerSpecialty(practitionerSpecialty: InsertPractitionerSpecialty): Promise<PractitionerSpecialty>;
  removePractitionerSpecialty(practitionerId: string, specialtyId: string): Promise<boolean>;
  getPractitionerSpecialties(practitionerId: string): Promise<Specialty[]>;

  // Availability methods
  getAvailability(practitionerId: string): Promise<Availability[]>;
  setAvailability(availability: InsertAvailability): Promise<Availability>;
  removeAvailability(id: string): Promise<boolean>;

  // Service methods
  getServices(practitionerId: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  removeService(id: string): Promise<boolean>;

  // Booking methods
  getBookings(practitionerId?: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  cancelBooking(id: string): Promise<boolean>;

  // Dancing Butterfly business website methods
  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;

  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  getVisibleTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Case Study methods
  getAllCaseStudies(): Promise<CaseStudy[]>;
  getVisibleCaseStudies(): Promise<CaseStudy[]>;
  getFeaturedCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(id: string): Promise<CaseStudy | undefined>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;

  // Service Package methods
  getAllServicePackages(): Promise<ServicePackage[]>;
  getActiveServicePackages(): Promise<ServicePackage[]>;
  getServicePackage(id: string): Promise<ServicePackage | undefined>;
  createServicePackage(servicePackage: InsertServicePackage): Promise<ServicePackage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private practitioners: Map<string, Practitioner>;
  private specialties: Map<string, Specialty>;
  private practitionerSpecialties: Map<string, PractitionerSpecialty>;
  private availability: Map<string, Availability>;
  private services: Map<string, Service>;
  private bookings: Map<string, Booking>;
  // Dancing Butterfly business website maps
  private leads: Map<string, Lead>;
  private testimonials: Map<string, Testimonial>;
  private caseStudies: Map<string, CaseStudy>;
  private servicePackages: Map<string, ServicePackage>;

  constructor() {
    this.users = new Map();
    this.practitioners = new Map();
    this.specialties = new Map();
    this.practitionerSpecialties = new Map();
    this.availability = new Map();
    this.services = new Map();
    this.bookings = new Map();
    // Dancing Butterfly business website maps
    this.leads = new Map();
    this.testimonials = new Map();
    this.caseStudies = new Map();
    this.servicePackages = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Legacy method - may not work with Replit Auth users
    return Array.from(this.users.values()).find(
      (user) => (user as any).username === username,
    );
  }

  // Required for Replit Auth
  async upsertUser(userData: UpsertUser): Promise<User> {
    // Ensure we have a valid ID
    if (!userData.id) {
      throw new Error("User ID is required for upsert operation");
    }
    
    const existingUser = this.users.get(userData.id);
    
    if (existingUser) {
      // Update existing user
      const updatedUser: User = {
        ...existingUser,
        id: userData.id,
        email: userData.email ?? existingUser.email,
        firstName: userData.firstName ?? existingUser.firstName,
        lastName: userData.lastName ?? existingUser.lastName,
        profileImageUrl: userData.profileImageUrl ?? existingUser.profileImageUrl,
        updatedAt: new Date(),
      };
      this.users.set(userData.id, updatedUser);
      return updatedUser;
    } else {
      // Create new user
      const newUser: User = {
        id: userData.id,
        email: userData.email ?? null,
        firstName: userData.firstName ?? null,
        lastName: userData.lastName ?? null,
        profileImageUrl: userData.profileImageUrl ?? null,
        role: "client", // Default role for new OAuth users
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.set(userData.id, newUser);
      return newUser;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role ?? "client",
      email: insertUser.email ?? null,
      firstName: insertUser.firstName ?? null,
      lastName: insertUser.lastName ?? null,
      profileImageUrl: (insertUser as any).profileImageUrl ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Practitioner methods
  async getAllPractitioners(): Promise<PractitionerWithSpecialties[]> {
    const practitioners = Array.from(this.practitioners.values()).filter(p => p.isActive === 1);
    return Promise.all(
      practitioners.map(async (practitioner) => {
        const specialties = await this.getPractitionerSpecialties(practitioner.id);
        const availability = await this.getAvailability(practitioner.id);
        return {
          ...practitioner,
          specialties,
          availability,
        };
      })
    );
  }

  async getPractitioner(id: string): Promise<PractitionerWithSpecialties | undefined> {
    const practitioner = this.practitioners.get(id);
    if (!practitioner || practitioner.isActive !== 1) {
      return undefined;
    }

    const specialties = await this.getPractitionerSpecialties(id);
    const availability = await this.getAvailability(id);
    
    return {
      ...practitioner,
      specialties,
      availability,
    };
  }

  async createPractitioner(insertPractitioner: InsertPractitioner): Promise<Practitioner> {
    const id = randomUUID();
    const practitioner: Practitioner = {
      ...insertPractitioner,
      id,
      userId: insertPractitioner.userId ?? null,
      bio: insertPractitioner.bio ?? null,
      experience: insertPractitioner.experience ?? null,
      imageUrl: insertPractitioner.imageUrl ?? null,
      languages: insertPractitioner.languages ?? [],
      education: insertPractitioner.education ?? [],
      certifications: insertPractitioner.certifications ?? [],
      rating: insertPractitioner.rating ?? "0.00",
      reviewCount: insertPractitioner.reviewCount ?? 0,
      isActive: insertPractitioner.isActive ?? 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.practitioners.set(id, practitioner);
    return practitioner;
  }

  async updatePractitioner(id: string, updates: Partial<InsertPractitioner>): Promise<Practitioner | undefined> {
    const practitioner = this.practitioners.get(id);
    if (!practitioner) {
      return undefined;
    }

    const updatedPractitioner: Practitioner = {
      ...practitioner,
      ...updates,
      updatedAt: new Date(),
    };
    this.practitioners.set(id, updatedPractitioner);
    return updatedPractitioner;
  }

  async deletePractitioner(id: string): Promise<boolean> {
    const practitioner = this.practitioners.get(id);
    if (!practitioner) {
      return false;
    }

    // Soft delete by setting isActive to 0
    practitioner.isActive = 0;
    practitioner.updatedAt = new Date();
    this.practitioners.set(id, practitioner);
    return true;
  }

  async searchPractitioners(filters?: {
    specialties?: string[];
    location?: string;
    priceRange?: [number, number];
    availability?: string;
    rating?: number;
    email?: string;
  }): Promise<PractitionerWithSpecialties[]> {
    let practitioners = await this.getAllPractitioners();

    if (!filters) {
      return practitioners;
    }

    // Filter by specialties
    if (filters.specialties && filters.specialties.length > 0) {
      practitioners = practitioners.filter(practitioner =>
        practitioner.specialties.some(specialty =>
          filters.specialties!.includes(specialty.name)
        )
      );
    }

    // Filter by location (case-insensitive partial match)
    if (filters.location) {
      practitioners = practitioners.filter(practitioner =>
        practitioner.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Filter by email (exact match)
    if (filters.email) {
      practitioners = practitioners.filter(practitioner =>
        practitioner.email === filters.email
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      practitioners = practitioners.filter(practitioner =>
        practitioner.hourlyRate >= minPrice && practitioner.hourlyRate <= maxPrice
      );
    }

    // Filter by rating
    if (filters.rating && filters.rating > 0) {
      practitioners = practitioners.filter(practitioner =>
        parseFloat(practitioner.rating || "0") >= filters.rating!
      );
    }

    // Filter by availability
    if (filters.availability && filters.availability !== "any") {
      const now = new Date();
      const today = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentTime = now.getHours() * 60 + now.getMinutes();

      practitioners = practitioners.filter(practitioner => {
        if (!practitioner.availability || practitioner.availability.length === 0) {
          return false;
        }

        if (filters.availability === "today") {
          // Check if available today and time hasn't passed
          return practitioner.availability.some(slot => {
            if (slot.dayOfWeek !== today || slot.isActive !== 1) {
              return false;
            }
            const [endHour, endMin] = slot.endTime.split(':').map(Number);
            const endTime = endHour * 60 + endMin;
            return currentTime < endTime;
          });
        }

        if (filters.availability === "this-week") {
          // Check if available any day this week
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);

          return practitioner.availability.some(slot => slot.isActive === 1);
        }

        if (filters.availability === "next-week") {
          // Check if available any day next week
          return practitioner.availability.some(slot => slot.isActive === 1);
        }

        return true;
      });
    }

    return practitioners;
  }

  // Specialty methods
  async getAllSpecialties(): Promise<Specialty[]> {
    return Array.from(this.specialties.values());
  }

  async getSpecialty(id: string): Promise<Specialty | undefined> {
    return this.specialties.get(id);
  }

  async createSpecialty(insertSpecialty: InsertSpecialty): Promise<Specialty> {
    const id = randomUUID();
    const specialty: Specialty = { 
      ...insertSpecialty, 
      id,
      description: insertSpecialty.description ?? null,
      category: insertSpecialty.category ?? null
    };
    this.specialties.set(id, specialty);
    return specialty;
  }

  // Practitioner-Specialty junction methods
  async addPractitionerSpecialty(insertPractitionerSpecialty: InsertPractitionerSpecialty): Promise<PractitionerSpecialty> {
    const id = randomUUID();
    const practitionerSpecialty: PractitionerSpecialty = {
      ...insertPractitionerSpecialty,
      id,
    };
    this.practitionerSpecialties.set(id, practitionerSpecialty);
    return practitionerSpecialty;
  }

  async removePractitionerSpecialty(practitionerId: string, specialtyId: string): Promise<boolean> {
    const entry = Array.from(this.practitionerSpecialties.values()).find(
      ps => ps.practitionerId === practitionerId && ps.specialtyId === specialtyId
    );
    
    if (entry) {
      this.practitionerSpecialties.delete(entry.id);
      return true;
    }
    return false;
  }

  async getPractitionerSpecialties(practitionerId: string): Promise<Specialty[]> {
    const practitionerSpecialtyLinks = Array.from(this.practitionerSpecialties.values())
      .filter(ps => ps.practitionerId === practitionerId);
    
    const specialties: Specialty[] = [];
    for (const link of practitionerSpecialtyLinks) {
      const specialty = this.specialties.get(link.specialtyId);
      if (specialty) {
        specialties.push(specialty);
      }
    }
    return specialties;
  }

  // Availability methods
  async getAvailability(practitionerId: string): Promise<Availability[]> {
    return Array.from(this.availability.values()).filter(
      avail => avail.practitionerId === practitionerId && avail.isActive === 1
    );
  }

  async setAvailability(insertAvailability: InsertAvailability): Promise<Availability> {
    const id = randomUUID();
    const availability: Availability = { 
      ...insertAvailability, 
      id,
      isActive: insertAvailability.isActive ?? 1
    };
    this.availability.set(id, availability);
    return availability;
  }

  async removeAvailability(id: string): Promise<boolean> {
    const availability = this.availability.get(id);
    if (!availability) {
      return false;
    }

    // Soft delete by setting isActive to 0
    availability.isActive = 0;
    this.availability.set(id, availability);
    return true;
  }

  // Service methods
  async getServices(practitionerId: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      service => service.practitionerId === practitionerId && service.isActive === 1
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = {
      ...insertService,
      id,
      description: insertService.description ?? null,
      isActive: insertService.isActive ?? 1,
      createdAt: new Date(),
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: string, updates: Partial<InsertService>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) {
      return undefined;
    }

    const updatedService: Service = {
      ...service,
      ...updates,
    };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async removeService(id: string): Promise<boolean> {
    const service = this.services.get(id);
    if (!service) {
      return false;
    }

    // Soft delete by setting isActive to 0
    service.isActive = 0;
    this.services.set(id, service);
    return true;
  }

  // Booking methods
  async getBookings(practitionerId?: string): Promise<Booking[]> {
    const bookings = Array.from(this.bookings.values());
    
    if (practitionerId) {
      return bookings.filter(booking => booking.practitionerId === practitionerId);
    }
    
    return bookings;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      clientPhone: insertBooking.clientPhone ?? null,
      notes: insertBooking.notes ?? null,
      status: insertBooking.status ?? "confirmed",
      paymentStatus: insertBooking.paymentStatus ?? "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) {
      return undefined;
    }

    const updatedBooking: Booking = {
      ...booking,
      ...updates,
      updatedAt: new Date(),
    };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async cancelBooking(id: string): Promise<boolean> {
    const booking = this.bookings.get(id);
    if (!booking) {
      return false;
    }

    booking.status = "cancelled";
    booking.updatedAt = new Date();
    this.bookings.set(id, booking);
    return true;
  }

  // Dancing Butterfly business website methods
  
  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = {
      ...insertLead,
      id,
      company: insertLead.company ?? null,
      budgetRange: insertLead.budgetRange ?? null,
      timeline: insertLead.timeline ?? null,
      status: insertLead.status ?? "new",
      source: insertLead.source ?? "website",
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getLead(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (!lead) {
      return undefined;
    }

    const updatedLead: Lead = {
      ...lead,
      status,
    };
    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getVisibleTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(testimonial => testimonial.isVisible === 1)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      role: insertTestimonial.role ?? null,
      company: insertTestimonial.company ?? null,
      rating: insertTestimonial.rating ?? 5,
      avatarUrl: insertTestimonial.avatarUrl ?? null,
      projectType: insertTestimonial.projectType ?? null,
      isVisible: insertTestimonial.isVisible ?? 1,
      createdAt: new Date(),
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Case Study methods
  async getAllCaseStudies(): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getVisibleCaseStudies(): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values())
      .filter(caseStudy => caseStudy.isVisible === 1)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getFeaturedCaseStudies(): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values())
      .filter(caseStudy => caseStudy.isVisible === 1 && caseStudy.isFeatured === 1)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getCaseStudy(id: string): Promise<CaseStudy | undefined> {
    return this.caseStudies.get(id);
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
    return Array.from(this.caseStudies.values()).find(
      caseStudy => caseStudy.slug === slug && caseStudy.isVisible === 1
    );
  }

  async createCaseStudy(insertCaseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const id = randomUUID();
    const caseStudy: CaseStudy = {
      ...insertCaseStudy,
      id,
      results: insertCaseStudy.results ?? [],
      techStack: insertCaseStudy.techStack ?? [],
      images: insertCaseStudy.images ?? [],
      clientName: insertCaseStudy.clientName ?? null,
      projectDuration: insertCaseStudy.projectDuration ?? null,
      budgetRange: insertCaseStudy.budgetRange ?? null,
      liveUrl: insertCaseStudy.liveUrl ?? null,
      githubUrl: insertCaseStudy.githubUrl ?? null,
      isFeatured: insertCaseStudy.isFeatured ?? 0,
      isVisible: insertCaseStudy.isVisible ?? 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.caseStudies.set(id, caseStudy);
    return caseStudy;
  }

  // Service Package methods
  async getAllServicePackages(): Promise<ServicePackage[]> {
    return Array.from(this.servicePackages.values()).sort(
      (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    );
  }

  async getActiveServicePackages(): Promise<ServicePackage[]> {
    return Array.from(this.servicePackages.values())
      .filter(servicePackage => servicePackage.isActive === 1)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }

  async getServicePackage(id: string): Promise<ServicePackage | undefined> {
    return this.servicePackages.get(id);
  }

  async createServicePackage(insertServicePackage: InsertServicePackage): Promise<ServicePackage> {
    const id = randomUUID();
    const servicePackage: ServicePackage = {
      ...insertServicePackage,
      id,
      description: insertServicePackage.description ?? null,
      deliverables: insertServicePackage.deliverables ?? [],
      timeline: insertServicePackage.timeline ?? null,
      idealFor: insertServicePackage.idealFor ?? null,
      isPopular: insertServicePackage.isPopular ?? 0,
      displayOrder: insertServicePackage.displayOrder ?? 0,
      isActive: insertServicePackage.isActive ?? 1,
      createdAt: new Date(),
    };
    this.servicePackages.set(id, servicePackage);
    return servicePackage;
  }
}

export const storage = new MemStorage();

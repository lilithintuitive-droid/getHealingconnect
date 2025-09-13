import {
  type User,
  type InsertUser,
  type Practitioner,
  type InsertPractitioner,
  type Specialty,
  type InsertSpecialty,
  type PractitionerSpecialty,
  type InsertPractitionerSpecialty,
  type Availability,
  type InsertAvailability,
  type PractitionerWithSpecialties,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private practitioners: Map<string, Practitioner>;
  private specialties: Map<string, Specialty>;
  private practitionerSpecialties: Map<string, PractitionerSpecialty>;
  private availability: Map<string, Availability>;

  constructor() {
    this.users = new Map();
    this.practitioners = new Map();
    this.specialties = new Map();
    this.practitionerSpecialties = new Map();
    this.availability = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
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
      createdAt: new Date()
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
}

export const storage = new MemStorage();

import {
  type Lead,
  type InsertLead,
  type Testimonial,
  type InsertTestimonial,
  type CaseStudy,
  type InsertCaseStudy,
  type ServicePackage,
  type InsertServicePackage,
} from "@shared/schema";

export interface IStorage {
  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;

  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  getVisibleTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Case Study methods
  getAllCaseStudies(): Promise<CaseStudy[]>;
  getVisibleCaseStudies(): Promise<CaseStudy[]>;
  getFeaturedCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;

  // Service Package methods
  getAllServicePackages(): Promise<ServicePackage[]>;
  getActiveServicePackages(): Promise<ServicePackage[]>;
  createServicePackage(servicePackage: InsertServicePackage): Promise<ServicePackage>;
}

// In-memory storage implementation
class MemStorage implements IStorage {
  private leads: Lead[] = [];
  private testimonials: Testimonial[] = [];
  private caseStudies: CaseStudy[] = [];
  private servicePackages: ServicePackage[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Add some sample testimonials
    this.testimonials = [
      {
        id: "1",
        name: "Sarah Chen",
        role: "CEO",
        company: "TechStart Solutions",
        rating: 5,
        testimonial: "Exceptional work on our e-commerce platform. Delivered on time and exceeded expectations.",
        avatarUrl: null,
        projectType: "E-commerce",
        isVisible: 1,
        createdAt: new Date(),
      },
      {
        id: "2", 
        name: "Mike Rodriguez",
        role: "Founder",
        company: "GrowthCorp",
        rating: 5,
        testimonial: "Professional, reliable, and incredibly skilled. Our web app performance improved by 40%.",
        avatarUrl: null,
        projectType: "SaaS",
        isVisible: 1,
        createdAt: new Date(),
      }
    ];

    // Add sample service packages
    this.servicePackages = [
      {
        id: "1",
        name: "Quick Fix",
        description: "Small bug fixes and minor updates",
        deliverables: ["Bug fixes", "Minor feature updates", "Performance optimization"],
        priceRange: "$25-150",
        timeline: "24-48 hours",
        idealFor: "Small businesses",
        isPopular: 0,
        displayOrder: 1,
        isActive: 1,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Custom Web Application",
        description: "Full-stack web application development",
        deliverables: ["Custom frontend", "Backend API", "Database design", "Deployment"],
        priceRange: "$800-2500",
        timeline: "2-6 weeks",
        idealFor: "Growing businesses",
        isPopular: 1,
        displayOrder: 2,
        isActive: 1,
        createdAt: new Date(),
      }
    ];
  }

  // Lead methods
  async createLead(lead: InsertLead): Promise<Lead> {
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      ...lead,
      createdAt: new Date(),
    };
    this.leads.push(newLead);
    return newLead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return [...this.leads];
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead | undefined> {
    const lead = this.leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
    }
    return lead;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return [...this.testimonials];
  }

  async getVisibleTestimonials(): Promise<Testimonial[]> {
    return this.testimonials.filter(t => t.isVisible === 1);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      id: Math.random().toString(36).substr(2, 9),
      ...testimonial,
      createdAt: new Date(),
    };
    this.testimonials.push(newTestimonial);
    return newTestimonial;
  }

  // Case Study methods
  async getAllCaseStudies(): Promise<CaseStudy[]> {
    return [...this.caseStudies];
  }

  async getVisibleCaseStudies(): Promise<CaseStudy[]> {
    return this.caseStudies.filter(c => c.isVisible === 1);
  }

  async getFeaturedCaseStudies(): Promise<CaseStudy[]> {
    return this.caseStudies.filter(c => c.isFeatured === 1 && c.isVisible === 1);
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
    return this.caseStudies.find(c => c.slug === slug);
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const newCaseStudy: CaseStudy = {
      id: Math.random().toString(36).substr(2, 9),
      ...caseStudy,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.caseStudies.push(newCaseStudy);
    return newCaseStudy;
  }

  // Service Package methods
  async getAllServicePackages(): Promise<ServicePackage[]> {
    return [...this.servicePackages].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async getActiveServicePackages(): Promise<ServicePackage[]> {
    return this.servicePackages
      .filter(p => p.isActive === 1)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async createServicePackage(servicePackage: InsertServicePackage): Promise<ServicePackage> {
    const newServicePackage: ServicePackage = {
      id: Math.random().toString(36).substr(2, 9),
      ...servicePackage,
      createdAt: new Date(),
    };
    this.servicePackages.push(newServicePackage);
    return newServicePackage;
  }
}

export const storage = new MemStorage();
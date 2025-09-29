import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: text("role").notNull().default("client"), // client or practitioner
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const specialties = pgTable("specialties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description"),
  category: text("category"), // e.g., "Traditional Medicine", "Massage Therapy", "Energy Healing"
});

export const practitioners = pgTable("practitioners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio"),
  experience: text("experience"), // e.g., "15+ years experience"
  location: text("location").notNull(), // city, state format
  hourlyRate: integer("hourly_rate").notNull(), // in cents to avoid decimal issues
  imageUrl: text("image_url"),
  languages: text("languages").array(), // array of languages spoken
  education: text("education").array(), // array of education credentials
  certifications: text("certifications").array(), // array of certifications
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  reviewCount: integer("review_count").default(0),
  isActive: integer("is_active").default(1), // 1 for active, 0 for inactive
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const practitionerSpecialties = pgTable("practitioner_specialties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  practitionerId: varchar("practitioner_id").notNull().references(() => practitioners.id),
  specialtyId: varchar("specialty_id").notNull().references(() => specialties.id),
});

export const availability = pgTable("availability", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  practitionerId: varchar("practitioner_id").notNull().references(() => practitioners.id),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6, Sunday = 0
  startTime: text("start_time").notNull(), // HH:MM format
  endTime: text("end_time").notNull(), // HH:MM format
  isActive: integer("is_active").default(1),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  practitionerId: varchar("practitioner_id").notNull().references(() => practitioners.id),
  name: text("name").notNull(), // e.g., "Initial Consultation", "Follow-up Session"
  description: text("description"),
  duration: integer("duration").notNull(), // duration in minutes
  price: integer("price").notNull(), // price in cents
  isActive: integer("is_active").default(1),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => users.id),
  practitionerId: varchar("practitioner_id").notNull().references(() => practitioners.id),
  serviceId: varchar("service_id").notNull().references(() => services.id),
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").notNull(), // duration in minutes
  totalPrice: integer("total_price").notNull(), // total price in cents
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled
  notes: text("notes"), // client notes or special requests
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Dancing Butterfly business website tables (for when we create separate Repl)
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  budgetRange: text("budget_range"), // e.g., "$1500-2000", "$2000-3500"
  timeline: text("timeline"), // e.g., "1-2 weeks", "1 month", "flexible"
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // new, contacted, qualified, converted
  source: text("source").default("website"), // website, fiverr, upwork
  createdAt: timestamp("created_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role"), // e.g., "CEO", "Founder", "Marketing Director"
  company: text("company"),
  rating: integer("rating").notNull().default(5), // 1-5 stars
  testimonial: text("testimonial").notNull(),
  avatarUrl: text("avatar_url"),
  projectType: text("project_type"), // e.g., "E-commerce", "SaaS", "Marketing Site"
  isVisible: integer("is_visible").notNull().default(1), // 0 = hidden, 1 = visible
  createdAt: timestamp("created_at").defaultNow(),
});

export const caseStudies = pgTable("case_studies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(), // URL-friendly version
  description: text("description").notNull(),
  problem: text("problem").notNull(), // What problem did we solve?
  solution: text("solution").notNull(), // How did we solve it?
  results: text("results").array().notNull().default([]), // Key outcomes/metrics
  techStack: text("tech_stack").array().notNull().default([]), // Technologies used
  images: text("images").array().notNull().default([]), // Project screenshots
  clientName: text("client_name"),
  projectDuration: text("project_duration"), // e.g., "4 weeks", "2 months"
  budgetRange: text("budget_range"), // e.g., "$1500-2000"
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  isFeatured: integer("is_featured").notNull().default(0), // 0 = no, 1 = featured
  isVisible: integer("is_visible").notNull().default(1), // 0 = hidden, 1 = visible
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const servicePackages = pgTable("service_packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  deliverables: text("deliverables").array().notNull().default([]),
  priceRange: text("price_range").notNull(), // e.g., "$25-150", "$800-2000"
  timeline: text("timeline"), // e.g., "24-48 hours", "2-4 weeks"
  idealFor: text("ideal_for"), // e.g., "Small businesses", "Startups"
  isPopular: integer("is_popular").notNull().default(0), // 0 = no, 1 = popular badge
  displayOrder: integer("display_order").default(0), // For sorting packages
  isActive: integer("is_active").notNull().default(1), // 0 = hidden, 1 = active
  createdAt: timestamp("created_at").defaultNow(),
});

// HealingConnect insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const upsertUserSchema = insertUserSchema.extend({
  id: z.string(),
});

export const insertPractitionerSchema = createInsertSchema(practitioners).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSpecialtySchema = createInsertSchema(specialties).omit({
  id: true,
});

export const insertPractitionerSpecialtySchema = createInsertSchema(practitionerSpecialties).omit({
  id: true,
});

export const insertAvailabilitySchema = createInsertSchema(availability).omit({
  id: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Dancing Butterfly insert schemas  
export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Message is required"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
}).extend({
  rating: z.number().min(1).max(5),
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
});

export const insertServicePackageSchema = createInsertSchema(servicePackages).omit({
  id: true,
  createdAt: true,
});

// HealingConnect types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPractitioner = z.infer<typeof insertPractitionerSchema>;
export type Practitioner = typeof practitioners.$inferSelect;

export type InsertSpecialty = z.infer<typeof insertSpecialtySchema>;
export type Specialty = typeof specialties.$inferSelect;

export type InsertPractitionerSpecialty = z.infer<typeof insertPractitionerSpecialtySchema>;
export type PractitionerSpecialty = typeof practitionerSpecialties.$inferSelect;

export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
export type Availability = typeof availability.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Extended practitioner type with specialties
export type PractitionerWithSpecialties = Practitioner & {
  specialties: Specialty[];
};

// Dancing Butterfly types
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;

export type InsertServicePackage = z.infer<typeof insertServicePackageSchema>;
export type ServicePackage = typeof servicePackages.$inferSelect;
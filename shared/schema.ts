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
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  practitionerId: varchar("practitioner_id").notNull().references(() => practitioners.id),
  serviceId: varchar("service_id").notNull().references(() => services.id),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  appointmentDate: timestamp("appointment_date").notNull(),
  appointmentTime: text("appointment_time").notNull(), // HH:MM format
  notes: text("notes"),
  status: text("status").notNull().default("confirmed"), // confirmed, cancelled, completed
  totalPrice: integer("total_price").notNull(), // price in cents
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, paid, refunded
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Upsert schema for Replit Auth (used by auth system)
export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertSpecialtySchema = createInsertSchema(specialties).omit({
  id: true,
});

export const insertPractitionerSchema = createInsertSchema(practitioners).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPractitionerSpecialtySchema = createInsertSchema(practitionerSpecialties).omit({
  id: true,
});

export const insertAvailabilitySchema = createInsertSchema(availability).omit({
  id: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSpecialty = z.infer<typeof insertSpecialtySchema>;
export type Specialty = typeof specialties.$inferSelect;

export type InsertPractitioner = z.infer<typeof insertPractitionerSchema>;
export type Practitioner = typeof practitioners.$inferSelect;

export type InsertPractitionerSpecialty = z.infer<typeof insertPractitionerSpecialtySchema>;
export type PractitionerSpecialty = typeof practitionerSpecialties.$inferSelect;

export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
export type Availability = typeof availability.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Dancing Butterfly business website types
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;

export type InsertServicePackage = z.infer<typeof insertServicePackageSchema>;
export type ServicePackage = typeof servicePackages.$inferSelect;

// Extended types for API responses
export type PractitionerWithSpecialties = Practitioner & {
  specialties: Specialty[];
  availability: Availability[];
};

// Dancing Butterfly business website tables
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
  content: text("content").notNull(),
  rating: integer("rating").default(5), // 1-5 star rating
  avatarUrl: text("avatar_url"),
  projectType: text("project_type"), // e.g., "MVP Development", "E-commerce Site"
  isVisible: integer("is_visible").default(1), // 1 for visible, 0 for hidden
  createdAt: timestamp("created_at").defaultNow(),
});

export const caseStudies = pgTable("case_studies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(), // URL slug like "healing-connect"
  title: text("title").notNull(),
  summary: text("summary").notNull(), // short description for cards/previews
  problem: text("problem").notNull(), // problem statement
  solution: text("solution").notNull(), // how it was solved
  results: text("results").array(), // array of key results/outcomes
  techStack: text("tech_stack").array(), // array of technologies used
  images: text("images").array(), // array of image URLs
  clientName: text("client_name"),
  projectDuration: text("project_duration"), // e.g., "3 months", "6 weeks"
  budgetRange: text("budget_range"), // e.g., "$2500", "$1500-2000"
  liveUrl: text("live_url"), // URL to live project
  githubUrl: text("github_url"), // URL to GitHub repo if public
  isFeatured: integer("is_featured").default(0), // 1 for featured case studies
  isVisible: integer("is_visible").default(1), // 1 for visible, 0 for hidden
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const servicePackages = pgTable("service_packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // e.g., "Quick Fix", "Complete Package", "Premium MVP"
  summary: text("summary").notNull(), // brief description
  description: text("description"), // detailed description
  priceRange: text("price_range").notNull(), // e.g., "$25-150", "$800-2000"
  deliverables: text("deliverables").array(), // array of what's included
  timeline: text("timeline"), // typical delivery time
  idealFor: text("ideal_for"), // who this package is for
  isPopular: integer("is_popular").default(0), // 1 for popular badge
  displayOrder: integer("display_order").default(0), // for ordering packages
  isActive: integer("is_active").default(1), // 1 for active, 0 for hidden
  createdAt: timestamp("created_at").defaultNow(),
});

// Dancing Butterfly business website schemas (after table definitions)
export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
}).extend({
  rating: z.number().int().min(1).max(5).optional(),
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServicePackageSchema = createInsertSchema(servicePackages).omit({
  id: true,
  createdAt: true,
});

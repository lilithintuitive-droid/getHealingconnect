import { pgTable, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Dancing Butterfly business website tables

// Leads table - for contact form submissions and potential clients
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

// Testimonials table - client reviews and feedback
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

// Case Studies table - detailed project showcases
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

// Service Packages table - pricing tiers and offerings
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

// Insert schemas with enhanced validation
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

// Types
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;

export type InsertServicePackage = z.infer<typeof insertServicePackageSchema>;
export type ServicePackage = typeof servicePackages.$inferSelect;
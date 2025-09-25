import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("client"), // client or practitioner
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow(),
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
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
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

// Extended types for API responses
export type PractitionerWithSpecialties = Practitioner & {
  specialties: Specialty[];
  availability: Availability[];
};

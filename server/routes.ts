import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertPractitionerSchema,
  insertSpecialtySchema,
  insertAvailabilitySchema,
  insertPractitionerSpecialtySchema,
  insertServiceSchema,
  insertBookingSchema
} from "@shared/schema";
import { z } from "zod";

// Validation schemas for query parameters
const practitionerSearchSchema = z.object({
  specialties: z.string().optional().transform(val => val ? val.split(',') : undefined),
  location: z.string().optional(),
  minPrice: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  maxPrice: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  rating: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  availability: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Practitioners endpoints
  
  // GET /api/practitioners - Get all practitioners with optional filtering
  app.get("/api/practitioners", async (req, res) => {
    try {
      const queryParams = practitionerSearchSchema.parse(req.query);
      
      const filters = {
        specialties: queryParams.specialties,
        location: queryParams.location,
        priceRange: queryParams.minPrice && queryParams.maxPrice 
          ? [queryParams.minPrice * 100, queryParams.maxPrice * 100] as [number, number] // Convert dollars to cents
          : undefined,
        rating: queryParams.rating,
        availability: queryParams.availability,
      };

      const practitioners = await storage.searchPractitioners(filters);
      res.json(practitioners);
    } catch (error) {
      console.error("Error fetching practitioners:", error);
      res.status(500).json({ error: "Failed to fetch practitioners" });
    }
  });

  // GET /api/practitioners/:id - Get single practitioner by ID
  app.get("/api/practitioners/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const practitioner = await storage.getPractitioner(id);
      
      if (!practitioner) {
        return res.status(404).json({ error: "Practitioner not found" });
      }

      res.json(practitioner);
    } catch (error) {
      console.error("Error fetching practitioner:", error);
      res.status(500).json({ error: "Failed to fetch practitioner" });
    }
  });

  // POST /api/practitioners - Create new practitioner
  app.post("/api/practitioners", async (req, res) => {
    try {
      const validatedData = insertPractitionerSchema.parse(req.body);
      const practitioner = await storage.createPractitioner(validatedData);
      res.status(201).json(practitioner);
    } catch (error) {
      console.error("Error creating practitioner:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create practitioner" });
    }
  });

  // PUT /api/practitioners/:id - Update practitioner
  app.put("/api/practitioners/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertPractitionerSchema.partial().parse(req.body);
      
      const updatedPractitioner = await storage.updatePractitioner(id, updates);
      
      if (!updatedPractitioner) {
        return res.status(404).json({ error: "Practitioner not found" });
      }

      res.json(updatedPractitioner);
    } catch (error) {
      console.error("Error updating practitioner:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to update practitioner" });
    }
  });

  // DELETE /api/practitioners/:id - Soft delete practitioner
  app.delete("/api/practitioners/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deletePractitioner(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Practitioner not found" });
      }

      res.json({ message: "Practitioner deleted successfully" });
    } catch (error) {
      console.error("Error deleting practitioner:", error);
      res.status(500).json({ error: "Failed to delete practitioner" });
    }
  });

  // Specialties endpoints
  
  // GET /api/specialties - Get all specialties
  app.get("/api/specialties", async (req, res) => {
    try {
      const specialties = await storage.getAllSpecialties();
      res.json(specialties);
    } catch (error) {
      console.error("Error fetching specialties:", error);
      res.status(500).json({ error: "Failed to fetch specialties" });
    }
  });

  // POST /api/specialties - Create new specialty
  app.post("/api/specialties", async (req, res) => {
    try {
      const validatedData = insertSpecialtySchema.parse(req.body);
      const specialty = await storage.createSpecialty(validatedData);
      res.status(201).json(specialty);
    } catch (error) {
      console.error("Error creating specialty:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create specialty" });
    }
  });

  // Practitioner-Specialty relationship endpoints

  // POST /api/practitioners/:id/specialties - Add specialty to practitioner
  app.post("/api/practitioners/:practitionerId/specialties", async (req, res) => {
    try {
      const { practitionerId } = req.params;
      const { specialtyId } = req.body;

      if (!specialtyId) {
        return res.status(400).json({ error: "specialtyId is required" });
      }

      const practitionerSpecialty = await storage.addPractitionerSpecialty({
        practitionerId,
        specialtyId,
      });

      res.status(201).json(practitionerSpecialty);
    } catch (error) {
      console.error("Error adding specialty to practitioner:", error);
      res.status(500).json({ error: "Failed to add specialty to practitioner" });
    }
  });

  // DELETE /api/practitioners/:practitionerId/specialties/:specialtyId - Remove specialty from practitioner
  app.delete("/api/practitioners/:practitionerId/specialties/:specialtyId", async (req, res) => {
    try {
      const { practitionerId, specialtyId } = req.params;
      const removed = await storage.removePractitionerSpecialty(practitionerId, specialtyId);
      
      if (!removed) {
        return res.status(404).json({ error: "Practitioner-specialty relationship not found" });
      }

      res.json({ message: "Specialty removed from practitioner successfully" });
    } catch (error) {
      console.error("Error removing specialty from practitioner:", error);
      res.status(500).json({ error: "Failed to remove specialty from practitioner" });
    }
  });

  // Availability endpoints

  // GET /api/practitioners/:id/availability - Get practitioner availability
  app.get("/api/practitioners/:practitionerId/availability", async (req, res) => {
    try {
      const { practitionerId } = req.params;
      const availability = await storage.getAvailability(practitionerId);
      res.json(availability);
    } catch (error) {
      console.error("Error fetching availability:", error);
      res.status(500).json({ error: "Failed to fetch availability" });
    }
  });

  // POST /api/practitioners/:id/availability - Set practitioner availability
  app.post("/api/practitioners/:practitionerId/availability", async (req, res) => {
    try {
      const { practitionerId } = req.params;
      const validatedData = insertAvailabilitySchema.parse({
        ...req.body,
        practitionerId,
      });

      const availability = await storage.setAvailability(validatedData);
      res.status(201).json(availability);
    } catch (error) {
      console.error("Error setting availability:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to set availability" });
    }
  });

  // DELETE /api/availability/:id - Remove availability slot
  app.delete("/api/availability/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const removed = await storage.removeAvailability(id);
      
      if (!removed) {
        return res.status(404).json({ error: "Availability slot not found" });
      }

      res.json({ message: "Availability slot removed successfully" });
    } catch (error) {
      console.error("Error removing availability:", error);
      res.status(500).json({ error: "Failed to remove availability" });
    }
  });

  // Service endpoints

  // GET /api/practitioners/:practitionerId/services - Get services for a practitioner
  app.get("/api/practitioners/:practitionerId/services", async (req, res) => {
    try {
      const { practitionerId } = req.params;
      const services = await storage.getServices(practitionerId);
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // POST /api/services - Create new service
  app.post("/api/services", async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      console.error("Error creating service:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create service" });
    }
  });

  // Booking endpoints

  // GET /api/bookings - Get all bookings (optionally filter by practitioner)
  app.get("/api/bookings", async (req, res) => {
    try {
      const { practitionerId } = req.query;
      const bookings = await storage.getBookings(practitionerId as string);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // GET /api/bookings/:id - Get specific booking
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await storage.getBooking(id);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  // POST /api/bookings - Create new booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // PUT /api/bookings/:id - Update booking
  app.put("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertBookingSchema.partial().parse(req.body);
      
      const updatedBooking = await storage.updateBooking(id, updates);
      
      if (!updatedBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json(updatedBooking);
    } catch (error) {
      console.error("Error updating booking:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // DELETE /api/bookings/:id - Cancel booking
  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const cancelled = await storage.cancelBooking(id);
      
      if (!cancelled) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      res.status(500).json({ error: "Failed to cancel booking" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

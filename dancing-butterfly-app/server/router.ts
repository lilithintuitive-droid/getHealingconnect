import { Router } from "express";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import sgMail from "@sendgrid/mail";

const router = Router();

// SendGrid setup
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Lead capture endpoint
router.post("/api/leads", async (req, res) => {
  try {
    const validatedData = insertLeadSchema.parse(req.body);
    const lead = await storage.createLead(validatedData);

    // Send email notification
    if (process.env.SENDGRID_API_KEY) {
      const msg = {
        to: "hello@dancingbutterfly.dev",
        from: "noreply@dancingbutterfly.dev",
        subject: `New Project Inquiry from ${lead.name}`,
        text: `
New project inquiry received:

Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company || 'Not specified'}
Budget: ${lead.budgetRange || 'Not specified'}
Timeline: ${lead.timeline || 'Not specified'}

Message:
${lead.message}
        `,
        html: `
<h3>New Project Inquiry</h3>
<p><strong>Name:</strong> ${lead.name}</p>
<p><strong>Email:</strong> ${lead.email}</p>
<p><strong>Company:</strong> ${lead.company || 'Not specified'}</p>
<p><strong>Budget:</strong> ${lead.budgetRange || 'Not specified'}</p>
<p><strong>Timeline:</strong> ${lead.timeline || 'Not specified'}</p>
<h4>Message:</h4>
<p>${lead.message}</p>
        `,
      };

      try {
        await sgMail.send(msg);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    res.status(201).json(lead);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get testimonials
router.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await storage.getVisibleTestimonials();
    res.json(testimonials);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get service packages
router.get("/api/services", async (req, res) => {
  try {
    const services = await storage.getActiveServicePackages();
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get case studies
router.get("/api/case-studies", async (req, res) => {
  try {
    const caseStudies = await storage.getVisibleCaseStudies();
    res.json(caseStudies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
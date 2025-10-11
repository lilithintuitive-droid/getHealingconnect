import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background">
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using HealingConnect, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">2. Platform Services</h2>
            <p className="text-muted-foreground mb-4">
              HealingConnect provides:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>A marketplace connecting clients with holistic practitioners</li>
              <li>Booking and scheduling tools</li>
              <li>Secure payment processing</li>
              <li>Communication facilities between clients and practitioners</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">
              Users agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of account credentials</li>
              <li>Use the platform in compliance with all applicable laws</li>
              <li>Respect the professional boundaries of practitioners</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">4. Practitioner Verification</h2>
            <p className="text-muted-foreground">
              All practitioners on our platform are verified for credentials and certifications. However, 
              HealingConnect does not provide medical advice and is not responsible for the outcomes of sessions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">5. Booking and Cancellation</h2>
            <p className="text-muted-foreground mb-4">
              Cancellation policies:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Cancel up to 24 hours before appointment for full refund</li>
              <li>Cancellations within 24 hours may incur a fee</li>
              <li>Practitioners have the right to cancel appointments with notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">6. Payment Terms</h2>
            <p className="text-muted-foreground">
              All payments are processed securely through Stripe. Service fees and practitioner rates 
              are clearly displayed before booking. Refunds are subject to our cancellation policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              HealingConnect is a platform facilitating connections. We are not liable for the quality, 
              safety, or outcomes of practitioner services. Users assume all risks associated with their choices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground">
              For questions about these terms, contact us at{" "}
              <a href="mailto:legal@gethealingconnect.com" className="text-primary hover:underline">
                legal@gethealingconnect.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

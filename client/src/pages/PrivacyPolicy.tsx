import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Health information necessary for practitioner bookings</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Communication preferences and session history</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              Your information is used to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Facilitate practitioner bookings and appointments</li>
              <li>Process payments securely</li>
              <li>Send appointment confirmations and reminders</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">3. HIPAA Compliance</h2>
            <p className="text-muted-foreground mb-4">
              HealingConnect maintains HIPAA-compliant practices to protect your health information:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>All data is encrypted in transit and at rest</li>
              <li>Access controls limit who can view sensitive information</li>
              <li>Regular security audits and compliance reviews</li>
              <li>Business Associate Agreements with all third-party processors</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures including SSL encryption, secure data storage, 
              and regular security audits to protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              For privacy-related questions or to exercise your rights, contact us at{" "}
              <a href="mailto:privacy@gethealingconnect.com" className="text-primary hover:underline">
                privacy@gethealingconnect.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

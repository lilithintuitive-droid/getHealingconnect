import { Heart, Shield, Award, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const trustSignals = [
    { icon: Shield, text: "HIPAA Compliant" },
    { icon: Award, text: "Verified Practitioners" },
    { icon: Clock, text: "24/7 Support" },
    { icon: Heart, text: "10,000+ Happy Clients" }
  ];

  return (
    <footer className="bg-muted border-t border-border">
      {/* Trust Signals Bar */}
      <div className="bg-background/50 py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map((signal, index) => (
              <div key={index} className="flex items-center justify-center gap-3">
                <signal.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{signal.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{backgroundColor: 'hsl(355, 70%, 35%)'}}>
                <span className="font-bold text-sm font-serif" style={{color: 'hsl(355, 20%, 95%)'}}>H</span>
              </div>
              <span className="text-lg font-serif font-semibold text-foreground">HealingConnect</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting you with certified holistic practitioners for transformative healing experiences.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>SSL Secured Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/#practitioners-section" className="text-muted-foreground hover:text-primary transition-colors">Find Practitioners</a></li>
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* For Practitioners */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Practitioners</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:join@gethealingconnect.com?subject=Practitioner Application" className="text-muted-foreground hover:text-primary transition-colors">Become a Practitioner</a></li>
              <li><a href="mailto:practitioners@gethealingconnect.com" className="text-muted-foreground hover:text-primary transition-colors">Practitioner Support</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal & Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><a href="mailto:support@gethealingconnect.com" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="mailto:contact@gethealingconnect.com" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} HealingConnect. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for holistic wellness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

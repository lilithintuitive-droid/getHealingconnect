# Design Guidelines: Holistic Practitioner Appointment Scheduling Platform

## Design Approach
**Reference-Based Approach** - Drawing inspiration from **Airbnb** and **Booking.com** for location-based service discovery, combined with **Calendly** for appointment scheduling patterns. This approach suits the experience-focused nature of finding and booking holistic practitioners where trust and visual appeal drive engagement.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light mode: 25 45% 45% (warm amber - sacred, grounding)
- Dark mode: 25 35% 35% (deeper amber)

**Accent Colors:**
- Soft terracotta: 15 35% 90% (used for cards and backgrounds)
- Warm earth tones: 35 25% 85% (secondary elements)
- Neutral warm grays: 30 15% 88% (light), 30 10% 12% (dark)

**Background Treatments:**
- Subtle warm earth-tone gradients from amber to soft cream
- Gentle overlay patterns suggesting natural textures and sacred geometry

### B. Typography
- **Primary**: Inter (Google Fonts) - clean, professional
- **Accent**: Crimson Text (Google Fonts) - for practitioner names and testimonials
- Hierarchy: 32px/24px/18px/16px/14px with consistent 1.5 line height

### C. Layout System
**Tailwind Spacing**: Consistent use of units 2, 4, 6, 8, 12, 16
- p-4, m-6, gap-8 for standard spacing
- py-12, px-16 for section padding
- Generous whitespace reflecting wellness/calm aesthetic

### D. Component Library

**Navigation**
- Clean header with location selector prominence
- Sticky navigation on scroll
- Mobile hamburger with slide-out menu

**Search & Discovery**
- Location-based search with city/neighborhood dropdowns
- Filter sidebar: specialty, availability, distance
- Card-based practitioner grid with photos and key details
- Map toggle view showing general location markers

**Practitioner Profiles**
- Hero section with practitioner photo and credentials
- Service specialties with visual icons
- General location display (city/neighborhood only)
- Availability calendar with time slot selection
- Client testimonials section

**Booking Flow**
- Step-by-step booking wizard
- Service selection with duration and pricing
- Calendar with available slots highlighted
- Client information form
- Payment integration
- Confirmation page with general location details

**Dashboard Components**
- Clean appointment cards with status indicators
- Calendar view for practitioners and clients
- Profile management forms
- Notification center

### E. Mobile Optimization
- Touch-friendly 44px minimum tap targets
- Swipeable practitioner cards
- Location detection for easier searching
- Simplified navigation for mobile booking flow

## Images
**Hero Section**: Large wellness-focused hero image showing hands in healing gesture or peaceful natural setting, spanning full viewport width with subtle overlay gradient

**Practitioner Cards**: Professional headshots (square format, 200x200px minimum)

**Category Icons**: Simple line icons for specialties (acupuncture, massage, reiki, etc.) using Heroicons library

**Background Elements**: Subtle nature-inspired textures or gradients, never competing with content

The design emphasizes trust, calm, and natural wellness while maintaining the practical functionality needed for location-based appointment scheduling.
# Overview

HealingConnect is a holistic practitioner appointment scheduling platform that connects clients with certified wellness professionals. The platform combines location-based service discovery with appointment booking functionality, drawing design inspiration from Airbnb/Booking.com for practitioner discovery and Calendly for scheduling workflows. The application serves both clients seeking holistic healing services and practitioners offering various wellness modalities including acupuncture, massage therapy, reiki, aromatherapy, and energy healing.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based UI development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations and schema management
- **API Design**: RESTful endpoints for practitioners, specialties, and availability management with search and filtering capabilities

## Data Layer
- **ORM**: Drizzle for database schema definition and query building
- **Database Schema**: Relational design with tables for users, practitioners, specialties, practitioner-specialty relationships, and availability schedules
- **Data Validation**: Zod schemas for request/response validation and type inference

## Design System
- **Styling**: Tailwind CSS with custom design tokens for warm earth-tone color palette
- **Typography**: Inter (primary) and Crimson Text (accent) fonts from Google Fonts
- **Theme**: Light/dark mode support with CSS variables for consistent theming
- **Component Variants**: Class Variance Authority (CVA) for component styling variants

## SEO and Performance
- **Meta Management**: Dynamic meta tag generation for practitioner profiles and location pages
- **Structured Data**: JSON-LD structured data for local business and practitioner information
- **URL Structure**: SEO-friendly URLs with slugs for practitioners, specialties, and locations
- **Image Optimization**: Static asset management with proper loading strategies

## Search and Discovery
- **Filtering System**: Multi-faceted search by specialties, location, price range, availability, and ratings
- **Location Services**: City/neighborhood-based practitioner discovery with geographical data
- **Specialty Categories**: Organized service categories (Traditional Medicine, Massage & Bodywork, Energy Healing, Mind-Body Practices)

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Database Connection**: @neondatabase/serverless for WebSocket-based database connections

## Payment Processing
- **Stripe**: Payment infrastructure with @stripe/stripe-js and @stripe/react-stripe-js for client-side integration

## Email Services
- **SendGrid**: Email delivery service using @sendgrid/mail for appointment confirmations and notifications

## UI and Component Libraries
- **Radix UI**: Headless UI primitives for accessible component foundations
- **Shadcn/ui**: Pre-built component library with consistent design patterns
- **Lucide React**: Icon library for consistent iconography throughout the application

## Development Tools
- **TypeScript**: Static type checking across the entire application stack
- **ESBuild**: Fast bundling for production server builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Frontend State Management
- **TanStack Query**: Server state synchronization, caching, and background updates
- **React Hook Form**: Form state management with @hookform/resolvers for validation integration

## Session Management
- **Express Session**: Session handling with connect-pg-simple for PostgreSQL session storage
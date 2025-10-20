# HealingConnect

A professional holistic practitioner booking marketplace connecting clients with certified wellness professionals.

## 🌟 Features

- **Practitioner Discovery**: Browse certified holistic practitioners by specialty, location, and availability
- **Location-Based Search**: Find practitioners in your area with filtering options
- **Specialty Categories**: Traditional Medicine, Massage & Bodywork, Energy Healing, Mind-Body Practices
- **Appointment Booking**: Schedule sessions with practitioners (Stripe integration)
- **Practitioner Dashboard**: Manage availability, services, and bookings
- **Responsive Design**: Beautiful UI with light/dark mode support
- **SEO Optimized**: Proper meta tags, Open Graph, and structured data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- PostgreSQL database (local, Neon, or Supabase)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lilithintuitive-droid/getHealingconnect.git
   cd getHealingconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration (see [Environment Variables](#environment-variables))

4. **Initialize database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Visit **http://localhost:5000**

## 📋 Environment Variables

Create a `.env` file based on `.env.example`:

### Required

```env
# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/healingconnect

# Session secret (generate with: openssl rand -base64 32)
SESSION_SECRET=your-random-secret-here
```

### Optional

```env
# Stripe (for payments)
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Server configuration
PORT=5000
NODE_ENV=development
```

### Replit-Specific (Not Needed Locally)

These are automatically handled when running on Replit:

```env
REPLIT_DOMAINS=your-domain.repl.co
REPL_ID=your-repl-id
```

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL, then create database
createdb healingconnect

# Update .env
DATABASE_URL=postgresql://postgres:password@localhost:5432/healingconnect
```

### Option 2: Neon (Recommended)

1. Create free account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string to `.env`

### Option 3: Supabase

1. Create free account at [supabase.com](https://supabase.com)
2. Create new project
3. Use connection string from Settings → Database

## 🛠️ Development

```bash
# Start dev server (frontend + backend)
npm run dev

# Database commands
npm run db:push           # Apply schema changes
npm run db:push -- --force # Force push (drops data!)
npm run db:studio         # Open database GUI

# Build for production
npm run build
npm start
```

## 📁 Project Structure

```
healingconnect/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and helpers
│   └── index.html
├── server/                # Express backend
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Data access layer
│   ├── db.ts             # Database config
│   ├── replitAuth.ts     # Replit OIDC (optional)
│   └── seed-data.ts      # Database seeding
├── shared/                # Shared types & schemas
│   └── schema.ts         # Drizzle database schema
├── .env.example          # Environment template
└── LOCAL_SETUP.md        # Detailed local setup guide
```

## 🔐 Authentication

### Replit (Default)

The app uses Replit's OIDC authentication when running on Replit. This is automatically disabled in local development.

### Local Development

For local development, you have two options:

1. **Skip authentication** - The app works without auth for testing
2. **Implement your own** - Add Passport.js local strategy, Auth0, Clerk, etc.

See `server/replitAuth.ts` for details and `LOCAL_SETUP.md` for implementation guides.

## 💳 Stripe Integration (Optional)

To enable payment features:

1. Create [Stripe account](https://stripe.com)
2. Get test API keys from [Dashboard → API Keys](https://dashboard.stripe.com/test/apikeys)
3. Add to `.env`:
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

## 🎨 Tech Stack

### Frontend
- **React** with TypeScript
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Shadcn/ui** component library
- **Tailwind CSS** for styling
- **Vite** for build tooling

### Backend
- **Express.js** server
- **PostgreSQL** database
- **Drizzle ORM** for type-safe queries
- **Passport.js** for authentication
- **Stripe** for payments

## 📚 Documentation

- [Local Setup Guide](LOCAL_SETUP.md) - Detailed setup for VS Code/local development
- [Environment Variables](.env.example) - Complete environment configuration
- [Database Schema](shared/schema.ts) - Database structure and types

## 🔧 Troubleshooting

### Database Connection Error

**Error:** `DATABASE_URL must be set`

**Fix:** Create `.env` file with valid `DATABASE_URL`

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Fix:** Change port in `.env`:
```env
PORT=3000
```

### Authentication Not Working Locally

**Expected Behavior:** Authentication is disabled in local development by default.

**To enable:** See `LOCAL_SETUP.md` for authentication options.

## 📝 Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run db:push          # Apply database migrations
npm run db:studio        # Open Drizzle Studio (DB GUI)
```

## 🚢 Deployment

The app is deployed on Replit but can also be deployed to:

- **Vercel** (frontend) + **Railway** (backend)
- **Heroku**
- **DigitalOcean App Platform**
- **AWS Elastic Beanstalk**

## 🤝 Contributing

This is a portfolio project for demonstration purposes.

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues or questions:

- Check [LOCAL_SETUP.md](LOCAL_SETUP.md) for detailed setup help
- Review `.env.example` for environment configuration
- Contact: developers@gethealingconnect.com

## 🌐 Live Demo

- **Production:** https://gethealingconnect.com (pending DNS propagation)
- **Replit:** Available in Replit workspace

---

**Built with ❤️ as a portfolio piece showcasing modern full-stack development**

# Local Development Setup Guide

This guide explains how to run HealingConnect on your local machine (VS Code, terminal, etc.) outside of Replit.

## Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** database - Choose one:
  - [Local PostgreSQL](https://www.postgresql.org/download/)
  - [Neon](https://neon.tech) (serverless PostgreSQL - free tier available)
  - [Supabase](https://supabase.com) (includes PostgreSQL)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure your values:

```env
# Required - Database
DATABASE_URL=postgresql://username:password@localhost:5432/healingconnect

# Required - Session Secret
SESSION_SECRET=your-random-secret-key-here

# Optional - Stripe (for payment features)
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

**Generate a session secret:**
```bash
openssl rand -base64 32
```

### 3. Set Up Database

#### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
   ```sql
   CREATE DATABASE healingconnect;
   ```
3. Update your `.env`:
   ```env
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/healingconnect
   ```

#### Option B: Neon (Recommended - Free Tier)

1. Sign up at [https://neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update your `.env`:
   ```env
   DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb
   ```

### 4. Initialize Database Schema

Run database migrations:

```bash
npm run db:push
```

This creates all necessary tables using Drizzle ORM.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5000**

## Important Notes for Local Development

### Authentication is Disabled by Default

The Replit authentication system is **commented out** in this local version. The application will work without authentication for testing purposes.

**To enable authentication locally:**

You have two options:

1. **Implement your own auth** (e.g., email/password with Passport.js, Auth0, Clerk)
2. **Skip auth for development** - The app functions without it for testing

### Replit-Specific Code

The following features are Replit-specific and won't work locally:

- **Replit Auth (OIDC)** - Located in `server/replitAuth.ts` (already disabled)
- **Repl ID detection** - Used for Vite plugins (safely ignored locally)

These are automatically detected and skipped when `REPL_ID` is not present.

## Project Structure

```
healingconnect/
├── client/               # Frontend React app
│   └── src/
│       ├── components/   # React components
│       ├── pages/        # Page components
│       └── hooks/        # Custom hooks
├── server/               # Backend Express server
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # Data access layer
│   └── db.ts            # Database configuration
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schema (Drizzle)
└── .env                 # Your local environment variables
```

## Available Scripts

```bash
# Start development server (frontend + backend)
npm run dev

# Push database schema changes
npm run db:push

# Force push database schema (drops data!)
npm run db:push --force

# Generate TypeScript types from database
npm run db:generate

# Open Drizzle Studio (database GUI)
npm run db:studio

# Build for production
npm run build

# Start production server
npm start
```

## Stripe Setup (Optional)

To test payment features:

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your test API keys from [Dashboard → Developers → API Keys](https://dashboard.stripe.com/test/apikeys)
3. Add to `.env`:
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

## Troubleshooting

### Database Connection Errors

**Error:** `DATABASE_URL must be set`

**Solution:** Make sure your `.env` file exists and contains a valid `DATABASE_URL`

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:** Change the port in `.env`:
```env
PORT=3000
```

### Node Version Issues

**Error:** Various module errors

**Solution:** Use Node.js v18 or higher:
```bash
node --version  # Should be v18.x.x or higher
```

## Database Management

### View/Edit Database

Open Drizzle Studio for a GUI:

```bash
npm run db:studio
```

Opens at **http://localhost:4983**

### Reset Database

To start fresh:

```bash
npm run db:push -- --force
```

⚠️ **Warning:** This will delete all data!

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a production-grade database
3. Set secure session secrets
4. Enable HTTPS
5. Use production Stripe keys

## Need Help?

- **Database Issues:** Check your connection string format
- **Missing Dependencies:** Run `npm install` again
- **Port Conflicts:** Change PORT in `.env`

## Differences from Replit Version

- ✅ **No Replit Auth** - Authentication is disabled
- ✅ **Standard PostgreSQL** - Works with any PostgreSQL provider
- ✅ **Local Development** - No internet required (except database)
- ✅ **VS Code Compatible** - Works in any IDE

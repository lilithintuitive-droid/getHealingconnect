// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================
// This uses Neon's serverless PostgreSQL driver.
// 
// FOR LOCAL DEVELOPMENT:
// - Works with any PostgreSQL database (local, Neon, Supabase, etc.)
// - Just set DATABASE_URL in your .env file
// - Example: postgresql://user:password@localhost:5432/healingconnect
// 
// The @neondatabase/serverless driver works with:
// ✅ Neon serverless databases
// ✅ Regular PostgreSQL databases
// ✅ Local PostgreSQL instances
// ============================================================================

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket for Neon (works with standard PostgreSQL too)
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set in your .env file.\n" +
    "Example: DATABASE_URL=postgresql://user:password@localhost:5432/healingconnect"
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

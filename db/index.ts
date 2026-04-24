import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Construct connection string from env vars
// Supports Railway (DATABASE_URL), Vercel (POSTGRES_URL), or individual variables
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL ||
    (process.env.PGHOST ? `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}` : "");

if (!connectionString) {
    console.warn("No database connection string provided (DATABASE_URL, POSTGRES_URL or PG* vars missing)");
}

// Disable prefetch for better compatibility with serverless and poolers
export const client = postgres(connectionString, {
    prepare: false,
    ssl: process.env.PGSSLMODE === 'require' ? 'require' : false
});

export const db = drizzle(client, { schema });

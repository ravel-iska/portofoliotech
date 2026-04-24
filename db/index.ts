import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Construct connection string from env vars
// Supports both a single POSTGRES_URL or individual AWS RDS variables
const connectionString = process.env.POSTGRES_URL ||
    (process.env.PGHOST ? `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}` : "");

if (!connectionString) {
    console.warn("No database connection string provided (POSTGRES_URL or PG* vars missing)");
}

// Disable prefetch as some providers like Prisma/Supabase/RDS pooling don't support it well
export const client = postgres(connectionString, {
    prepare: false,
    ssl: process.env.PGSSLMODE === 'require' ? 'require' : false
});

export const db = drizzle(client, { schema });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.POSTGRES_URL || "";

// Disable prefetch as some providers like Prisma/Supabase pooling don't support it well
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

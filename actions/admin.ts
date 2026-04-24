"use server";

import { db } from "@/db";
import { adminLogs } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function logAdminAction(action: string, details?: string, ip?: string) {
    try {
        if (!process.env.POSTGRES_URL) return;

        await db.insert(adminLogs).values({
            action,
            details,
            ip,
        });
    } catch (error) {
        console.error("Error logging admin action:", error);
    }
}

export async function fetchAdminLogs() {
    try {
        if (!process.env.POSTGRES_URL) return [];
        return await db.select().from(adminLogs).orderBy(desc(adminLogs.createdAt)).limit(50);
    } catch (error) {
        console.error("Error fetching logs:", error);
        return [];
    }
}

export async function clearAllLogs() {
    try {
        if (!process.env.POSTGRES_URL) return { success: false };
        await db.delete(adminLogs);
        return { success: true };
    } catch (error) {
        console.error("Error clearing logs:", error);
        return { success: false };
    }
}

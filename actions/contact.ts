"use server";

import { db } from "@/db";
import { messages } from "@/db/schema";

export async function submitContactMessage(data: { name: string; email: string; content: string }) {
    try {
        if (!process.env.POSTGRES_URL) {
            console.warn("POSTGRES_URL is not set. Saving skipped.");
            return { success: false, message: "Database connection not configured." };
        }

        await db.insert(messages).values({
            name: data.name,
            email: data.email,
            content: data.content,
        });

        return { success: true, message: "Pesan berhasil dikirim. Terima kasih!" };
    } catch (error: any) {
        console.error("Error submitting contact message:", error);
        return { success: false, message: "Gagal mengirim pesan ke database." };
    }
}

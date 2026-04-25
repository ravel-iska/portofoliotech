"use server";

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitContactMessage(data: { name: string; email: string; content: string }) {
    try {
        // Save to database if available (lazy import to avoid crash when no DB URL)
        if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
            try {
                const { db } = await import("@/db");
                const { messages } = await import("@/db/schema");
                await db.insert(messages).values({
                    name: data.name,
                    email: data.email,
                    content: data.content,
                });
            } catch (dbError) {
                console.error("Database save failed:", dbError);
                // Continue — email can still be sent
            }
        }

        // Send email notification via Resend
        if (resend) {
            try {
                await resend.emails.send({
                    from: "Portfolio Contact <onboarding@resend.dev>",
                    to: process.env.CONTACT_EMAIL || "bagusnetagain@gmail.com",
                    replyTo: data.email,
                    subject: `💬 Pesan Baru dari ${data.name}`,
                    html: `
                        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 16px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #3b82f6, #6366f1); padding: 24px 32px;">
                                <h1 style="color: white; margin: 0; font-size: 20px;">📨 New Contact Message</h1>
                                <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">From your Vibe Studio portfolio</p>
                            </div>
                            <div style="padding: 32px;">
                                <div style="margin-bottom: 20px;">
                                    <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Sender</p>
                                    <p style="color: white; font-size: 16px; font-weight: bold; margin: 0;">${data.name}</p>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Email</p>
                                    <p style="color: #3b82f6; font-size: 14px; margin: 0;">${data.email}</p>
                                </div>
                                <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 20px;">
                                    <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px;">Message</p>
                                    <p style="color: #ddd; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${data.content}</p>
                                </div>
                            </div>
                            <div style="padding: 16px 32px; border-top: 1px solid #1a1a1a; text-align: center;">
                                <p style="color: #555; font-size: 11px; margin: 0;">Sent via Vibe Studio Portfolio — ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}</p>
                            </div>
                        </div>
                    `,
                });
                return { success: true, message: "Pesan berhasil dikirim via email. Terima kasih! 🚀" };
            } catch (emailError) {
                console.error("Email sending failed:", emailError);
                return { success: false, message: "Gagal mengirim email. Pastikan RESEND_API_KEY sudah diset." };
            }
        }

        // No DB and no Resend configured
        if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL && !resend) {
            return { success: false, message: "Layanan pesan belum dikonfigurasi. Hubungi langsung via email: bagusnetagain@gmail.com" };
        }

        return { success: true, message: "Pesan berhasil disimpan. Terima kasih! 🚀" };
    } catch (error: any) {
        console.error("Error submitting contact message:", error);
        return { success: false, message: "Gagal mengirim pesan. Silakan coba lagi." };
    }
}

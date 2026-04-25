import { Resend } from "resend";
import { ContactEmailTemplate } from "@/components/email-template";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "bagusnetagain@gmail.com";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, content } = body;

        if (!name || !email || !content) {
            return Response.json(
                { error: "Name, email, and content are required." },
                { status: 400 }
            );
        }

        // Check if API key is configured
        if (!process.env.RESEND_API_KEY) {
            return Response.json(
                { error: "RESEND_API_KEY not configured" },
                { status: 500 }
            );
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: "Vibe Studio <onboarding@resend.dev>",
            to: [CONTACT_EMAIL],
            replyTo: email,
            subject: `💬 Pesan Baru dari ${name}`,
            react: ContactEmailTemplate({
                senderName: name,
                senderEmail: email,
                message: content,
            }),
        });

        if (error) {
            console.error("Resend error:", error);
            return Response.json({ error: error.message }, { status: 500 });
        }

        return Response.json({ success: true, data });
    } catch (error: any) {
        console.error("Send email error:", error);
        return Response.json(
            { error: error?.message || "Internal server error" },
            { status: 500 }
        );
    }
}


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
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return Response.json(
                { error: "RESEND_API_KEY belum dikonfigurasi di environment variables." },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        // Try with React template first, fall back to HTML
        let sendResult;
        try {
            sendResult = await resend.emails.send({
                from: "BGUS.DEV <onboarding@resend.dev>",
                to: [CONTACT_EMAIL],
                replyTo: email,
                subject: `💬 Pesan Baru dari ${name}`,
                react: ContactEmailTemplate({
                    senderName: name,
                    senderEmail: email,
                    message: content,
                }),
            });
        } catch (reactError) {
            // Fallback to plain HTML if React template fails
            console.error("React template failed, using HTML fallback:", reactError);
            sendResult = await resend.emails.send({
                from: "BGUS.DEV <onboarding@resend.dev>",
                to: [CONTACT_EMAIL],
                replyTo: email,
                subject: `💬 Pesan Baru dari ${name}`,
                html: `
                    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;overflow:hidden">
                        <div style="background:linear-gradient(135deg,#3b82f6,#6366f1);padding:24px 32px">
                            <h1 style="color:white;margin:0;font-size:20px">📨 New Contact Message</h1>
                        </div>
                        <div style="padding:32px">
                            <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px">Sender</p>
                            <p style="color:white;font-size:16px;font-weight:bold">${name}</p>
                            <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px">Email</p>
                            <p style="color:#3b82f6;font-size:14px">${email}</p>
                            <div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px">
                                <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px">Message</p>
                                <p style="color:#ddd;font-size:14px;line-height:1.7;white-space:pre-wrap">${content}</p>
                            </div>
                        </div>
                    </div>
                `,
            });
        }

        const { data, error } = sendResult;

        if (error) {
            console.error("Resend API error:", JSON.stringify(error));
            return Response.json({ error: error.message || JSON.stringify(error) }, { status: 500 });
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


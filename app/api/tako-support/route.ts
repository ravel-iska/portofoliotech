import { NextResponse } from 'next/server';

const TAKO_API_KEY = "mo1sfkmqzlmahhoyrj3p2gxz";
const TAKO_ENDPOINT = "https://tako.id/api/gift/Bagusluminetix";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate incoming payload
        const { name, email, amount, currency, paymentMethod, message } = body;
        if (!name || !email || !amount || !paymentMethod) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        // Forward to Tako API securely (hiding Authorization token from client)
        const response = await fetch(TAKO_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TAKO_API_KEY}`
            },
            body: JSON.stringify({
                name,
                email,
                amount: Number(amount),
                paymentMethod,
                message: message || "Support from portfolio"
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: data.message || "Failed to process via Tako API" },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Tako API Proxy Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

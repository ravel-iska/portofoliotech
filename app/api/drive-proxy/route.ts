import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get('id');

    if (!fileId) {
        return NextResponse.json({ error: "File ID missing" }, { status: 400 });
    }

    try {
        const response = await drive.files.get(
            { fileId, alt: 'media' },
            { responseType: 'stream' }
        );

        // Pipe the stream to the response
        return new NextResponse(response.data as any, {
            headers: {
                'Content-Type': response.headers['content-type'] || 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error("PROXY_ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
    }
}

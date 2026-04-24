import { google } from 'googleapis';

/**
 * Google Drive API Utility
 * Requires environment variables:
 * GOOGLE_SERVICE_ACCOUNT_EMAIL
 * GOOGLE_PRIVATE_KEY
 * GOOGLE_DRIVE_FOLDER_ID
 */

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

export async function fetchMemoriesFromDrive() {
    try {
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
        if (!folderId) throw new Error("Folder ID missing");

        const response = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(id, name, webViewLink, thumbnailLink, createdTime, properties)',
            pageSize: 50,
        });

        return response.data.files?.map(file => ({
            id: file.id,
            title: file.name?.split('.')[0] || "Untitled",
            date: file.createdTime?.slice(0, 10) || "",
            image: `/api/drive-proxy?id=${file.id}`, // Custom proxy to bypass CORS/Auth
            category: (file.properties?.category as any) || "personal",
            isFavorite: file.properties?.favorite === 'true',
        })) || [];
    } catch (error) {
        console.error("DRIVE_FETCH_ERROR:", error);
        return [];
    }
}

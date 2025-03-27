import { NextResponse } from 'next/server';
import { uploadImages } from './cloudinary';


const uploadAllFiles = async ({
    files,
    filesPath
}: {
    files: File[],
    filesPath: string[]
}) => {
    const uploadedPaths = await uploadImages(files)
    filesPath.push(...uploadedPaths);
}


export async function uploadMiddleware(files: File[]): Promise<NextResponse> {
    try {

        if (!files.length) {
            return NextResponse.json(
                { error: "No files uploaded, You must choose at least one file" },
                { status: 400 }
            );
        }

        const filesPath: string[] = [];

        await uploadAllFiles({
            files: files,
            filesPath
        });

        return NextResponse.json({
            message: "Files uploaded successfully",
            filepath: filesPath
        });

    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "File upload failed" },
            { status: 500 }
        );
    }
}

// Disable Next.js default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};
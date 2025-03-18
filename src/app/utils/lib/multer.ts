import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const uploadAllFiles = async ({
    files,
    filesPath
}: {
    files: File[],
    filesPath: string[]
}) => {
    console.log("files.length", files)
    const promises = files.map(async (file) => {
        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadDir = path.join(process.cwd(), "public/uploads");

            // Check if directory exists and create if needed
            if (!await fs.promises.access(uploadDir).then(() => true).catch(() => false)) {
                await fs.promises.mkdir(uploadDir, { recursive: true });
            }

            const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${file.name}`;
            const filepath = path.join(uploadDir, filename);
            await fs.promises.writeFile(filepath, new Uint8Array(buffer));

            return `/uploads/${filename}`;
        } catch (err) {
            throw new Error(`Error uploading file: ${err}`);
        }
    });

    const uploadedPaths = await Promise.all(promises);
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

        // Use Promise.all to properly handle async operations
        // await Promise.all(
        //     fileArray.map(async (file: File) => {
        //          // Use filename instead of full filepath
        //     })
        // );

        await uploadAllFiles({
            files: files,
            filesPath
        });

        console.log(filesPath, 'fulePaths')

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
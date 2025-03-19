import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { uploadImages } from './cloudinary';


const uploadAllFiles = async ({
    files,
    filesPath
}: {
    files: File[],
    filesPath: string[]
}) => {
    // const promises = files.map(async (file) => {
    //     try {
    //         // const bytes = await file.arrayBuffer();
    //         // const formData = new FormData();
    //         // formData.append('file', new Blob([bytes]));
    //         // formData.append('upload_preset', 'ecomerce-bikaldai'); // Replace with your Cloudinary upload preset
            
    //         // const response = await fetch(
    //         //     `https://api.cloudinary.com/v1_1/djhsz1acw/image/upload`, // Replace with your cloud name
    //         //     {
    //         //         method: 'POST',
    //         //         body: formData
    //         //     }
    //         // );

    //         const result = await uploadImages([file])

    //         if (!response.ok) {
    //             throw new Error('Failed to upload to Cloudinary');
    //         }

    //         const data = await response.json();
    //         return data.secure_url; // Returns the CDN URL of the uploaded image

    //     } catch (err) {
    //         throw new Error(`Error uploading file to Cloudinary: ${err}`);
    //     }
    // });

    // const uploadedPaths = await Promise.all(promises);
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
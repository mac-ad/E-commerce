import brandModel from "@/app/models/brandModel";
import { deleteImages } from "@/app/utils/lib/deleteImage";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import { uploadMiddleware } from "@/app/utils/lib/multer";
import { NextRequest, NextResponse } from "next/server";

const model = brandModel;

export async function DELETE(
    req: NextRequest,
    { params }: {
        params: {
            id: string
        }
    }
) {
    try {
        await connectToDb();
        const id = params.id;
        const brandId = id;

        if (!brandId) {
            return NextResponse.json(
                { error: "Brand ID is required" },
                { status: 400 }
            );
        }

        const deletedBrand = await model.findOneAndDelete({ _id: brandId });

      

        if (!deletedBrand) {
            return NextResponse.json(
                { error: "Brand not found" },
                { status: 404 }
            );
        }

        // delete image from cloudinary dont want to delete all images
        deleteImages([deletedBrand?.logo])

        return NextResponse.json({
            message: "Brand deleted successfully",
            brand: deletedBrand
        });
    } catch (error) {
        console.error("Error during brand deletion:", error);
        return NextResponse.json(
            { error: "Failed to delete brand" },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest, { params }: {
    params: {
        id: string
    }
}) {
    try {
        await connectToDb();
        const body = await req.formData();  
        const brandId = params.id;
        const name = body.get('name') as string;
        const logo = body.get('logo') as File;
        const existingImage = body.get('existingImage') as string;

        if (!logo && !existingImage) return NextResponse.json({
            message: "Image is required",
        }, { status: 400 })

        if(existingImage && logo) {
            return NextResponse.json({
                message: "Invalid image input. expected one recieved many",
            }, { status: 400 })
        }

        if(existingImage) {
            deleteImages([existingImage])
        }

        let images:string[] = [];

        let uploadResponse: NextResponse<unknown> | null = null;

        if (logo) {
            uploadResponse = await uploadMiddleware([logo]);
        }

        if (uploadResponse?.status === 400 || uploadResponse?.status === 500) {
            return uploadResponse;
        }

        const uploadData = await uploadResponse?.json();

        if (existingImage) {
            images.push(existingImage);
        }

        if(uploadData?.filepath) {
            images.push(uploadData?.filepath[0]);
        }

        const response = await brandModel.findOneAndUpdate({
            _id: brandId
        }, { name, logo: images[0] }, {
            new: true
        });

        return NextResponse.json({
            message: "Brand updated",
            brand: response
        });
    } catch (error) {
        console.error("Error during brand update", error);
        return NextResponse.json(
            { error: "Failed to update brand" },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest, { params }: {
    params: {
        id: string
    }
}) {
    try {
        await connectToDb();
        const brandId = params.id;

        const brand = await model.findById(brandId).select("-__v -updatedAt");

        if (!brand) {
            return NextResponse.json(
                { error: "Brand not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Brand fetched successfully",
            data: brand
        });
    } catch (error) {
        console.error("Error fetching brand", error);
        return NextResponse.json(
            { error: "Failed to fetch brand" },
            { status: 500 }
        );
    }
}

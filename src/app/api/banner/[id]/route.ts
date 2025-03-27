import bannerModel from "@/lib/models/bannerModel";
import { deleteImages } from "@/lib/deleteImage";
import { connectToDb } from "@/lib/mongodb/mongodb";
import { uploadMiddleware } from "@/lib/multer";
import { NextRequest, NextResponse } from "next/server";

const model = bannerModel;

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
        const bannerId = id;

        if (!bannerId) {
            return NextResponse.json(
                { error: "Banner ID is required" },
                { status: 400 }
            );
        }

        const deletedBanner = await model.findOneAndDelete({ _id: bannerId });

        if (!deletedBanner) {
            return NextResponse.json(
                { error: "Banner not found" },
                { status: 404 }
            );
        }

        deleteImages([deletedBanner?.image])

        return NextResponse.json({
            message: "Banner deleted successfully",
            banner: deletedBanner
        });
    } catch (error) {
        console.error("Error during banner deletion:", error);
        return NextResponse.json(
            { error: "Failed to delete banner" },
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
        const bannerId = params.id;
        const link = body.get('link') as string;
        const image = body.get('image') as File;

        if (!image) return NextResponse.json({
            message: "Image is required",
        }, { status: 400 })

        const existingBanner = await model.findById(bannerId);

        if(!existingBanner) {
            return NextResponse.json({
                message: "Banner not found",
            }, { status: 404 })
        }

        deleteImages([existingBanner?.image])

        let images:string[] = [];

        let uploadResponse: NextResponse<unknown> | null = null;

        if (image) {
            uploadResponse = await uploadMiddleware([image]);
        }

        if (uploadResponse?.status === 400 || uploadResponse?.status === 500) {
            return uploadResponse;
        }

        const uploadData = await uploadResponse?.json();

        if (uploadData?.filepath) {
            images.push(uploadData?.filepath[0]);
        }

        const response = await bannerModel.findOneAndUpdate({
            _id: bannerId
        }, { link, image: images[0] }, {
            new: true
        });

        return NextResponse.json({
            message: "Banner updated",
            banner: response
        });
    } catch (error) {
        console.error("Error during banner update", error);
        return NextResponse.json(
            { error: "Failed to update banner" },
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
        const bannerId = params.id;

        const banner = await model.findById(bannerId).select("-__v -updatedAt");

        if (!banner) {
            return NextResponse.json(
                { error: "Banner not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Banner fetched successfully",
            data: banner
        });
    } catch (error) {
        console.error("Error fetching banner", error);
        return NextResponse.json(
            { error: "Failed to fetch banner" },
            { status: 500 }
        );
    }
}

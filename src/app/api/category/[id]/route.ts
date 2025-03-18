import categoryModel from "@/app/models/categoryModel";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import { uploadMiddleware } from "@/app/utils/lib/multer";
import { NextRequest, NextResponse } from "next/server";

const model = categoryModel;

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
        const categoryId = params.id;

        if (!categoryId) {
            return NextResponse.json(
                { error: "Category ID is required" },
                { status: 400 }
            );
        }

        const deletedCategory = await model.findOneAndDelete({ _id: categoryId });

        if (!deletedCategory) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Category deleted successfully",
            category: deletedCategory
        });
    } catch (error) {
        console.error("Error during category deletion:", error);
        return NextResponse.json(
            { error: "Failed to delete category" },
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
        const categoryId = params.id;
        const name = body.get('name') as string;
        const bannerImage = body.get('bannerImage') as File;
        const existingImage = body.get('existingImage') as string;

        if (!bannerImage && !existingImage) return NextResponse.json({
            message: "Image is required",
        }, { status: 400 })

        if(existingImage && bannerImage) {
            return NextResponse.json({
                message: "Invalid image input. expected one recieved many",
            }, { status: 400 })
        }

        let images:string[] = [];

        let uploadResponse: NextResponse<unknown> | null = null;

        if (bannerImage) {
            uploadResponse = await uploadMiddleware([bannerImage]);
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

        const response = await categoryModel.findOneAndUpdate({
            _id: categoryId
        }, { name, bannerImage: images[0] }, {
            new: true
        });

        return NextResponse.json({
            message: "Category updated",
            category: response
        });
    } catch (error) {
        console.error("Error during category update", error);
        return NextResponse.json(
            { error: "Failed to update category" },
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
        const categoryId = params.id;

        const category = await model.findById(categoryId).select("-__v -createdAt -updatedAt");

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Category fetched successfully",
            data: category
        });

    } catch (error) {
        console.error("Error fetching category:", error);
        return NextResponse.json(
            { error: "Failed to fetch category" },
            { status: 500 }
        );
    }
}

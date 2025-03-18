import categoryModel from "@/app/models/categoryModel";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import { uploadMiddleware } from "@/app/utils/lib/multer";
import { NextRequest, NextResponse } from "next/server";


const model = categoryModel;

async function createCategory(data: {
    name: string;
    bannerImage: string;
    description?: string;
}) {
    try {
        await connectToDb();
        const category = await model.create(data);
        return category;
    } catch (error) {
        console.error("Error creating category");
        throw new Error("Failed to create category");
    }
}

async function fetchCategories() {
    try {
        await connectToDb();
        const categories = await model.find().sort({ createdAt: -1 }).select(' -updatedAt -__v');
        return categories;
    } catch (error) {
        console.error("Error fetching categories");
        throw new Error("Failed to fetch categories");
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("bannerImage") as File[];
        const name = formData.get("name") as string;

        if (!files?.length) return NextResponse.json({
            message: "Image is required",
        }, { status: 400 })

        const uploadResponse = await uploadMiddleware(files);

        if (uploadResponse?.status === 400 || uploadResponse?.status === 500) {
            return uploadResponse;
        }
        const uploadData = await uploadResponse?.json();

        const response = await createCategory({ name, bannerImage: uploadData?.filepath[0] });

        return NextResponse.json({
            message: "Category created", category: response
        }, { status: 201 });
    } catch (error) {
        console.error("Error during category creation", error);
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const categories = await fetchCategories();
        const dataToSend = {
            data: categories,
            total: await model.countDocuments()
        }
        return NextResponse.json(dataToSend, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}



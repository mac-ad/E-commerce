import bannerModel from "@/app/models/bannerModel";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import { uploadMiddleware } from "@/app/utils/lib/multer";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const model = bannerModel;

const bannerSchema = z.object({
    image: z.string().min(1, 'Image is required'),
    link: z.string().optional(),
    isActive: z.boolean().default(true)
});

type Banner = z.infer<typeof bannerSchema>

const fetchBanners = async () => {
    try {
        await connectToDb();
        const banners = await model.find({ isActive: true }).sort({ createdAt: -1 }).select("-isActive -__v -createdAt -updatedAt");
        return banners;
    } catch (error) {
        throw new Error("Failed to fetch banners");
    }
}


const createBanner = async (data: Banner) => {
    try {
        await connectToDb();
        const newBanner = await model.create(data);

        return newBanner
    } catch (error) {
        throw new Error("create banner error")
    }
}

export async function GET() {
    try {
        const banners = await fetchBanners();
        const dataToSend = {
            data: banners,
            total: await model.countDocuments()
        }
        
        return NextResponse.json(dataToSend, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to fetch banners" + error.toString() },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("image") as File[];
        // const parsedData = bannerSchema.parse()

        console.log("files", files, files.length)

        if (!files?.length) return NextResponse.json({
            message: "Image is required",
        }, { status: 400 })

        const uploadResponse = await uploadMiddleware(files);

        if (uploadResponse?.status === 400 || uploadResponse?.status === 500) {
            return uploadResponse;
        }
        const uploadData = await uploadResponse?.json();

        const imageLink = uploadData && uploadData?.filepath ? uploadData.filepath[0] : null;

        const linkFromRequest = formData.get("link");
        const { link } = bannerSchema.pick({ link: true }).parse({ link: linkFromRequest });

        const data = {
            image: imageLink,
            link
        }

        const parsedData = bannerSchema.parse(data);
        console.log(parsedData)
        const newBanner = await createBanner(parsedData)

        return NextResponse.json(newBanner, { status: 201 });
    } catch (error) {

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid request data", errors: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create banner" + error },
            { status: 500 }
        );
    }
}




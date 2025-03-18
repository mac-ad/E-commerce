import brandModel from "@/app/models/brandModel";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { uploadMiddleware } from "@/app/utils/lib/multer";
import { UserType } from "@/app/utils/types/api/common";
import mongoose from "mongoose";

const model = brandModel;

async function createBrand(data: {
    name: string;
    description?: string;
    logo?: string;
}) {
    try {
        await connectToDb();
        const brand = await model.create(data);
        return brand;
    } catch (error) {
        console.error("Error creating brand");
        throw new Error("Failed to create brand");
    }
}

async function fetchBrands({queryParams,user = "user"}:{queryParams?:URLSearchParams;user?:UserType}) {
    try {
        await connectToDb();
        const query:any = {};
        if(queryParams && Object.keys(Object.fromEntries(queryParams)).length > 0){
            queryParams.forEach((value,key) => {
                if(key === "category") return query.category = { $in: [new mongoose.Types.ObjectId(value)] };
                else if(key === "pageIndex" || key === "pageSize" || key === "skip" || key === "search" || value === "") return;
                else query[key] = value;
            }); 
        }
        const page = Number(queryParams?.get('pageIndex')) || 0;
        const limit = Number(queryParams?.get('pageSize')) || 10;
        const skip = (page) * limit;
        const search = queryParams?.get('search') || "";
        if(search){
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
            ];
        }

        const [brands, totalItems] = await Promise.all([
            model.find(query, { updatedAt: 0, __v: 0 })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            model.countDocuments(query)
        ]); 

        return {brands,totalItems};
    } catch (error) {
        console.error("Error fetching brands");
        throw new Error("Failed to fetch brands");
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        // Handle file upload first
        const files = formData.getAll("logo") as File[];

        const uploadResponse = await uploadMiddleware(files);
        const uploadData = await uploadResponse?.json();

        if (uploadResponse?.status === 400 || uploadResponse?.status === 500) {
            return uploadResponse;
        }

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        const data = {
            name,
            description,
            logo: uploadData.filepath[0], // Use the uploaded file path
        };

        const response = await createBrand(data);

        return NextResponse.json({
            message: "Brand created", brand: response
        });
    } catch (error) {
        console.error("Error during brand creation", error);
        return NextResponse.json(
            { error: "Failed to create brand" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const queryParams = req.nextUrl.searchParams;
        const {brands,totalItems} = await fetchBrands({queryParams} );

        const dataToSend = {
            data:brands,
            total:totalItems
        }

        return NextResponse.json(dataToSend,{status:200});
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch brands" },
            { status: 500 }
        );
    }
}


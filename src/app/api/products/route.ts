import productModel from "@/app/models/productModel";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { uploadMiddleware } from "@/app/utils/lib/multer";
import { z } from "zod";
import { ItemType, UserType } from "@/app/utils/types/api/common";
import { decodeToken } from "@/app/utils/lib/jwt";
import brandModel from "@/app/models/brandModel";
import categoryModel from "@/app/models/categoryModel";

const model = productModel;

export interface Product {
    name: string;
    brand: string;
    price: number;
    quantity?: number;
    description: string;
    images: string[];
    category: string;
    discount?: number;
    isActive?: boolean;
}


const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    brand: z.string().min(1, 'Brand is required'),
    price: z.number().min(0, 'Price must be greater than or equal to 0'),
    quantity: z.number().optional(),
    description: z.string().optional(),
    images: z.array(z.string()).min(0, 'At least one image is required'),
    category: z.string().min(1, 'Category is required'),
    discount: z.number().optional()
});

async function createProduct(data: Product) {
    try {
        await connectToDb();
        console.log("inside dataa creatoin", data)
        const product = await model.create(data);
        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function fetchProducts({queryParams,user = "user"}:{queryParams?:URLSearchParams;user?:UserType}) {
    try {
        await connectToDb();
        const query:any = {};
        if(queryParams && Object.keys(Object.fromEntries(queryParams)).length > 0){
            queryParams.forEach((value,key) => {
                if(key === "discounted"){
                    query.discount = { $ne: 0 };
                    return;
                }
                if(key === "brand"){
                    const brands = value.split(",").filter((brand:string) => brand !== "");
                    if(brands.length > 0){
                        query.brand = { $in: brands };
                    }
                    return;
                }
                if(key === "price"){
                    const price = value.split(",").filter((price:string) => price !== "");
                    if(price.length > 0){
                        query.price = { $gte: Number(price[0]), $lte: Number(price[1]) };
                    }
                    return;
                }
                if(key === "pageIndex" || key === "pageSize" || key === "skip" || key === "search" || value === "" || key === "sort") return;
                if(key === "type" && user === "user") return query.isActive = true;
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
                // { 'brand.name': { $regex: search, $options: 'i' } },
                // { 'category.name': { $regex: search, $options: 'i' } }
            ];
        }

        const sort = queryParams?.get('sort') || "-createdAt";

        const [products, totalItems] = await Promise.all([
            model.find(query, { createdAt: 0, updatedAt: 0, __v: 0 })
                .sort(sort)
                .populate('brand category')
                .select('-description')
                .skip(skip)
                .limit(limit)
                .lean(),
            model.countDocuments(query)
        ]);
        
        return { products, totalItems, hasNext: skip + limit < totalItems };
    } catch (error) {
        console.error("Error fetching products",error);
        throw new Error("Failed to fetch products");
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const data: Product = {
            name: formData.get('name') as string,
            brand: formData.get('brand') as string,
            price: Number(formData.get('price')),
            description: formData.get('description') as string,
            category: formData.get('category') as string,
            discount: Number(formData.get("discount")),
            quantity: Number(formData.get('quantity')),
            images: [],
            isActive: formData.get('status') === "true",
        };

        const parsedData = productSchema.parse(data);

        const files = formData.getAll("images") as File[];

        const uploadResponse = await uploadMiddleware(files);

        if (uploadResponse?.status === 400 || uploadResponse?.status === 500) {
            return uploadResponse;
        }

        const uploadData = await uploadResponse?.json();

        if (uploadData && uploadData?.filepath) data.images = uploadData.filepath

        const { images } = productSchema.pick({ images: true }).parse({ images: data.images });
        data.images = images;

        const response = await createProduct(data);

        // add this category to brand category array
        await brandModel.findByIdAndUpdate(data.brand, { $push: { category: data.category } });

        return NextResponse.json({
            message: "Product created",
            product: response
        });
    } catch (error) {
        // console.error("Error during product creation", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid request data", errors: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create product" + error?.toString() },
            { status: 500 }
        );
    }
}

export async function GET(req:NextRequest) {
    try {
        // const categoryId = req.nextUrl.searchParams.get('category') || undefined;
        // const type:ItemType = req.nextUrl.searchParams.get('type') as ItemType || "all";

        const token = req.cookies.get("token")?.value?.split(",")[0] || req.headers.get("Authorization")?.split(" ")[1];
        const decodedToken = token ? decodeToken(token) : null;
        const userType:UserType = decodedToken?.role as UserType || "user";

        const {products,totalItems,hasNext} = await fetchProducts({queryParams:req.nextUrl.searchParams,user : userType});
        const dataToSend = {
            data:products,
            totalItems,
            total:products?.length,
            hasNext
        }
        return NextResponse.json(dataToSend,{status:200});
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

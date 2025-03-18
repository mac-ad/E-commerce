import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import productModel from "@/app/models/productModel";
import CategoryModel from "@/app/models/categoryModel";
import { fetchProducts } from "../products/route";

export async function GET(req: NextRequest) {
    try {
        await connectToDb();

        // Get recently added products
        const products = await productModel.find({ isActive: true })
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .limit(12); // Limit to 12 products

        if (!products || products.length === 0) {
            return NextResponse.json({
                message: "No products found",
                data: []
            }, { status: 404 });
        }

        // // Get products with first category id
        // const products = await productModel.find({ 
        //     category: firstCategory._id,
        //     isActive: true 
        // }).limit(12);

        return NextResponse.json({
            message: "Products fetched successfully",
            data: products,
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            message: "Error fetching products",
            error: error.message
        }, { status: 500 });
    }
}

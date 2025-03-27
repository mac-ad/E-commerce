import productModel from "@/lib/models/productModel";
import { withErrorHandler } from "@/utils/routesMiddleware";
import { NextRequest, NextResponse } from "next/server";

const model = productModel;

export const GET = withErrorHandler(async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {

    const categoryId = params.id;

    const products = await model.find({ category: categoryId });

    return NextResponse.json(products);
})

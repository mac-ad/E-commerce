import productModel from "@/app/models/productModel";
import { withErrorHandler } from "@/app/utils/routesMiddleware";
import { NextRequest, NextResponse } from "next/server";

const model = productModel;

export const GET = withErrorHandler(async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {

    const categoryId = params.id;
    console.log({ categoryId })

    const products = await model.find({ category: categoryId });

    return NextResponse.json(products);
})

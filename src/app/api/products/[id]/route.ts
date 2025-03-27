import productModel from "@/lib/models/productModel";
import { connectToDb } from "@/lib/mongodb/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "../route";
import { decodeToken } from "@/lib/jwt";
import { UserType } from "@/utils/types/api/common";
import brandModel from "@/lib/models/brandModel";
import { uploadMiddleware } from "@/lib/multer";
import { deleteImages } from "@/lib/deleteImage";

const model = productModel;

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = request.cookies.get("token")?.value?.split(",")[0] || request.headers.get("Authorization")?.split(" ")[1];
        const decodedToken = token ? decodeToken(token) : null;
        const userType:UserType = decodedToken?.role as UserType || "user";

        await connectToDb();
        const query:any = {_id : params.id}
        if(userType === "user"){
            query.isActive = true;
        }
        const product = await model.find(query)
            .select('-createdAt -updatedAt -__v')
            .populate([
                { path: 'brand', select: '_id name' },
                { path: 'category', select: '_id name' }
            ])
        
        if (product.length === 0) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ data: product[0] }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await request.formData();
        await connectToDb();

        const product = await model.findById(params.id);

        if(!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
        
         // Check if formData only contains isActive field
         const formDataKeys = Array.from(formData.keys());
         if (formDataKeys.length === 1 && formDataKeys[0] === 'isActive') {
             const isActive = formData.get('isActive') === 'true';
             return NextResponse.json({ 
                 data: await model.findByIdAndUpdate(
                     params.id,
                     { isActive },
                     { new: true }
                 )
             }, { status: 200 });
         }

        // images and existingImages handling
        const images = formData.getAll('images') as File[];
        const existingImages = formData.getAll('existingImages') as string[];

        //  check the deleted images from the existingImages array
        const deletedImages = product?.images.filter((image:string) => !existingImages.includes(image));

        if(deletedImages.length > 0){
            deleteImages(deletedImages);
        }
       
        if(!images.length && !existingImages.length) return NextResponse.json({
            message: "Image is required",
        }, { status: 400 })

        let imagesToPut:string[] = [];

        let uploadResponse: NextResponse<unknown> | null = null;

        if(images && images.length > 0){
            uploadResponse = await uploadMiddleware(images);
        }

        if(uploadResponse?.status === 400 || uploadResponse?.status === 500) {
            return uploadResponse;
        }

        const uploadData = await uploadResponse?.json();

        if(existingImages && existingImages.length > 0){
            imagesToPut.push(...existingImages);
        }

        if(uploadData?.filepath && uploadData?.filepath.length > 0){
            imagesToPut.push(...uploadData.filepath);
        }

        if(imagesToPut.length === 0) return NextResponse.json({
            message: "Image is required",
        }, { status: 400 })
        
        // rest field handling
        const data: Partial<Product> = {};

        // Only include fields that are present in the form data
        const name = formData.get('name');
        if (name) data.name = name as string;

        const brand = formData.get('brand');
        if (brand) data.brand = brand as string;

        const price = formData.get('price');
        if (price) data.price = Number(price);

        const description = formData.get('description');
        if (description) data.description = description as string;

        const category = formData.get('category');
        if (category) data.category = category as string;

        const discount = formData.get('discount');
        if (discount) data.discount = Number(discount);

        const quantity = formData.get('quantity');
        if (quantity) data.quantity = Number(quantity);

        const isActive  = formData.get('isActive');
        if (isActive !== null) data.isActive = isActive === 'true';

        data.images = imagesToPut;



        const updatedProduct = await model.findByIdAndUpdate(
            params.id,
            { $set: data },
            { new: true }
        ).select('-createdAt -updatedAt -__v');

        // add this category to brand category array
        await brandModel.findByIdAndUpdate(product?.brand, { $addToSet: { category: data.category } });

        return NextResponse.json({ data: updatedProduct }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDb();
        const product = await model.findByIdAndDelete(params.id);

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        // delete the images of product from server
        deleteImages(product.images);

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

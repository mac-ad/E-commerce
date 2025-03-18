import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import Cart from "@/app/models/cartModel";
import { withAuthAndErrorHandler } from "@/app/utils/routesMiddleware";
import { CartItem } from "@/features/api/cartApiSlice";
import productModel from "@/app/models/productModel";

export const GET = withAuthAndErrorHandler(async (req: NextRequest) => {

    const userId = req.userId;

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    await connectToDb();

    const cart = await Cart.findOne({ userId: userId })
        .populate('items.productId');

    if (!cart) {
        return NextResponse.json(
            { message: "Cart not found", data: null },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { message: "Cart fetched successfully", data: cart },
        { status: 200 }
    );
});

export const POST = withAuthAndErrorHandler(async (req: NextRequest) => {
    const userId = req.userId;

    const { productId, qty } = await req.json();

    if (!productId || !qty) {
        return NextResponse.json(
            { message: "Product ID and quantity are required" },
            { status: 400 }
        );
    }

    await connectToDb();

    let cart = await Cart.findOne({ userId: userId });

    const product = await productModel.findById(productId);

    if (!product) {
        return NextResponse.json(
            { message: "Product not found" },
            { status: 404 }
        );
    }

    

    if (!cart) {
        if(product?.quantity < qty){
            return NextResponse.json(
                { message: "Item not available in stock" },
                { status: 400 }
            );
        }
        cart = await Cart.create({
            userId: userId,
            items: [{ productId: productId, qty: qty}],
            totalQuantity: qty,
            totalAmount: qty * product.price
        });
    } else {
        const existingItem = cart.items.find(
            (item: CartItem) => item.productId.toString() === productId
        );

        if (existingItem) {
            if(product?.quantity < existingItem.qty + qty){
                return NextResponse.json(
                    { message: "Item not available in stock" },
                    { status: 400 }
                );
            }
            if (qty === 1 ) {
                existingItem.qty += qty;
                cart.totalQuantity += qty;
                cart.totalAmount += qty * product.price;
            }
        } else {
            if(product?.quantity < qty){
                return NextResponse.json(
                    { message: "Item not available in stock" },
                    { status: 400 }
                );
            }
            cart.items.push({ productId: productId, qty: qty});
            cart.totalQuantity += qty;
            cart.totalAmount += qty * product.price; // Price is 0 for new items initially
        }
        await cart.save();
    }

    const populatedCart = await cart.populate('items.productId');

    return NextResponse.json(
        { message: "Cart updated successfully", data: populatedCart },
        { status: 200 }
    );
});

export const PUT = withAuthAndErrorHandler(async (req: NextRequest) => {
    const userId = req.userId;
    const { productId, qty } = await req.json();

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    await connectToDb();

    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
        return NextResponse.json(
            { message: "Cart not found" },
            { status: 404 }
        );
    }

    const product = await productModel.findById(productId);

    if (!product) {
        return NextResponse.json(
            { message: "Product not found" },
            { status: 404 }
        );
    }

    const existingItem = cart.items.find(
        (item: CartItem) => item.productId.toString() === productId
    );

    if (!existingItem) {
        return NextResponse.json(
            { message: "Item not found in cart" },
            { status: 404 }
        );
    }

    if (qty === 1) {
        if(product?.quantity < existingItem.qty + qty){
            return NextResponse.json(
                { message: "Item not available in stock" },
                { status: 400 }
            );
        }
        existingItem.qty += 1;
        cart.totalQuantity += 1;
        cart.totalAmount += product.price;
    } else if (qty === -1) {
        if (existingItem.qty === 1) {
            cart.items = cart.items.filter(
                (item: CartItem) => item.productId.toString() !== productId
            );
        } else {
            existingItem.qty -= 1;
        }
        cart.totalQuantity -= 1;
        cart.totalAmount -= product.price;
    }

    await cart.save();

    const populatedCart = await cart.populate('items.productId');

    return NextResponse.json(
        { message: "Cart updated successfully", data: populatedCart },
        { status: 200 }
    );
});



export const DELETE = withAuthAndErrorHandler(async (req: NextRequest) => {
    const userId = req.userId;

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    await connectToDb();

    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
        return NextResponse.json(
            { message: "Cart not found" },
            { status: 404 }
        );  
    }

    await Cart.deleteOne({ userId: userId });

    return NextResponse.json(
        { message: "Cart deleted successfully" },   
        { status: 200 }
    );
});
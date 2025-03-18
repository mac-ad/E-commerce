import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { OrderModel } from "@/app/models/orderModel";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import { withAuthAndErrorHandler, withErrorHandler } from "@/app/utils/routesMiddleware";
import { UserModel } from "@/app/models/userModel";
import mongoose, { Mongoose } from "mongoose";
import { IOrderToCreate, orderSchema } from "@/app/utils/types/api/order";
import productModel from "@/app/models/productModel";
import { sendOrderConfirmationEmail } from "@/app/utils/sendMail/sendMail";
import { UserType } from "@/app/utils/types/api/common";
import { decodeToken } from "@/app/utils/lib/jwt";


const model = OrderModel;

export async function fetchOrders({queryParams,user}:{queryParams?:URLSearchParams;user:UserType}) {
    try {
        await connectToDb();
        const query:any = {};
        if(queryParams && Object.keys(Object.fromEntries(queryParams)).length > 0){
            queryParams.forEach((value,key) => {
                if(key === "pageIndex" || key === "pageSize" || key === "skip" || key === "search" || value === "") return;
                if(key === "type" && user === "user") return query.isActive = true;
                else query[key] = value;
            });
        }

        const page = Number(queryParams?.get('pageIndex')) || 0;
        const limit = Number(queryParams?.get('pageSize')) || 10;
        const skip = (page) * limit;
        const search = queryParams?.get('search') || "";

        // it wont work for now, to be fixed later
        // if(search){
        //     query.$or = [
        //         { 'userId.fullName': { $regex: search, $options: 'i' } },
        //         { 'userId.email': { $regex: search, $options: 'i' } },
        //     ];
        // }


        const [orders, totalItems] = await Promise.all([
            model.find(query, { createdAt: 0, updatedAt: 0, __v: 0 })
                .sort({ createdAt: -1 })
                .populate('user','fullName email')
                .populate('items.productId', 'name')
                .skip(skip)
                .limit(limit)
                .lean(),
            model.countDocuments(query)
        ]);
        
        return {  orders, totalItems };
    } catch (error) {
        console.error("Error fetching products",error);
        throw new Error("Failed to fetch products");
    }
}


const createOrder = async (data: IOrderToCreate) => {
    try {
        await connectToDb();
        const order = await (await model.create(data)).populate('items.productId', 'name');

        // update product quantity
        await Promise.all(data.items.map(async (item) => {
            const product = await productModel.findById(item.productId);
            if(product){
                product.quantity -= item.quantity;
                await product.save();
            }
        }));
        return order;
    } catch (error: any) {
        throw new Error("Failed to create order" + error);
    }
}

export const POST = withAuthAndErrorHandler(async (req: NextRequest) => {
    const userId = req.userId;
    const body = await req.json();
    const user = await UserModel.findById(userId);

    if (!user) return NextResponse.json({
        message: "Invalid request : User is invalid"
    }, { status: 400 })

    body.user = userId;
    const parsedData = orderSchema.parse(body);

    // items with prices
    const itemsWithPrices = await Promise.all(parsedData.items.map(async (item) => {
        const productId = item?.productId;
        const product = await productModel.findById(productId);

        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }

        const discountedPrice = Number(product.price - (product.price * product.discount / 100));
        const total = Number(discountedPrice * item.quantity);
        const quantity = item.quantity;
        const price = Number(discountedPrice);

        return {
            ...item,
            productId: new mongoose.Types.ObjectId(productId),
            total: total,
            quantity: quantity,
            price: price
        }
    }))

    const totalAmount = (await Promise.all(itemsWithPrices)).reduce((acc, item) => acc + item.total, 0);
    const totalQuantity = (await Promise.all(itemsWithPrices)).reduce((acc, item) => acc + item.quantity, 0);

    const orderData = {
        user: new mongoose.Types.ObjectId(parsedData.user),
        items: itemsWithPrices,
        shippingAddress: {...parsedData.shippingAddress,country: "Nepal"},
        totalAmount,
        phone : parsedData.phone
    }

    const order = await createOrder(orderData);

    // send order confirmation mail
    sendOrderConfirmationEmail({
        to: user.email,
        username: user.fullName,
        order
    });

    return NextResponse.json({
        message: "Order created successfully",
        order
    }, { status: 200 });
})

export const GET = withErrorHandler(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const token = req.cookies.get("token")?.value?.split(",")[0] || req.headers.get("Authorization")?.split(" ")[1];
    const decodedToken = token ? decodeToken(token) : null;
    const userType:UserType = decodedToken?.role as UserType || "user";

    const {orders,totalItems} = await fetchOrders({queryParams:searchParams,user : userType});

    // const orders = await model.find(query)
    //     .populate('userId', 'fullName email')
    //     .populate('items.productId', 'name');

    const dataToSend = {
        data: orders,
        total: await OrderModel.countDocuments(),
        totalItems,
    }

    return NextResponse.json(
        dataToSend
        , { status: 200 });

})
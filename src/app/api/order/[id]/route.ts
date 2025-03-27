
import { connectToDb } from "@/lib/mongodb/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/features/api/orderApiSlice";
import { OrderModel } from "@/lib/models/orderModel";
import { OrderStatusEnum } from "@/utils/types/api/common";
import { sendOrderStatusEmail } from "@/utils/sendMail/sendMail";

const model = OrderModel;

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDb();
        const order = await model.findById(params.id)
            .select('-createdAt -updatedAt -__v')
            .populate('user', '_id fullName email')
            .populate('items.productId', '_id name price');
        
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ data: order }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await request.formData();
        await connectToDb();

        const data: Partial<Order> = {};

        // Only include fields that are present in the form data
        const status = formData.get('status');
        if (status) data.status = status as Order['status'];

           
           
        const paymentStatus = formData.get('paymentStatus');
        if (paymentStatus) data.paymentStatus = paymentStatus as Order['paymentStatus'];

        const shippingAddress = formData.get('shippingAddress');
        if (shippingAddress) data.shippingAddress = JSON.parse(shippingAddress as string);

        const paymentMethod = formData.get('paymentMethod');
        if (paymentMethod) data.paymentMethod = paymentMethod as string;

        const order = await model.findByIdAndUpdate(
            params.id,
            { $set: data },
            { new: true }
        ).select('-createdAt -updatedAt -__v').populate('user', '_id fullName email').populate('items.productId', '_id name price');

        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }


        sendOrderStatusEmail({
            to: order.user.email,
            username: order.user.fullName,
            order: order
        });

        return NextResponse.json({ data: order }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDb();
        const order = await model.findByIdAndDelete(params.id);

        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

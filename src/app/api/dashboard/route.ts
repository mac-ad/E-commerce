import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/mongodb/mongodb";
import { withAuthAndErrorHandler } from "@/utils/routesMiddleware";
import { OrderModel } from "@/lib/models/orderModel";
import { UserModel } from "@/lib/models/userModel";
import productModel from "@/lib/models/productModel";
import { UserRoleEnum } from "@/utils/types/api/common";

const Order = OrderModel;
const User = UserModel;
const Product = productModel;

export const GET = withAuthAndErrorHandler(async (req: NextRequest) => {
    const userId = req.userId;
    const role = req.role;

    if(role !== UserRoleEnum.ADMIN) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    await connectToDb();

    // Get total orders count
    const totalOrders = await Order.countDocuments();
    
    // Get orders by status
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const processingOrders = await Order.countDocuments({ status: 'processing' });
    const shippedOrders = await Order.countDocuments({ status: 'shipped' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });

    // Get total products and users
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // Get recent orders
    const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name fullName email')
        .select('orderNumber totalAmount status createdAt');

    // Calculate total revenue
    const revenue = await Order.aggregate([
        {
            $match: {
                status: { $in: ['delivered', 'completed'] }
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$totalAmount" }
            }
        }
    ]);

    const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;

    return NextResponse.json(
        {
            message: "Dashboard data fetched successfully",
            data: {
                totalOrders,
                ordersByStatus: {
                    pending: pendingOrders,
                    processing: processingOrders,
                    shipped: shippedOrders,
                    delivered: deliveredOrders,
                    cancelled: cancelledOrders
                },
                totalProducts,
                totalUsers,
                totalRevenue,
                recentOrders
            }
        },
        { status: 200 }
    );
});


export const dynamic = 'force-dynamic'

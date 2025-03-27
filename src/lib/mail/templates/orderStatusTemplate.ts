import { IOrder, IOrderWithProduct } from "@/lib/models/orderModel";
import { IOrderToCreate } from "@/utils/types/api/order";

export const getOrderStatusEmailTemplate = ({
    username,
    order,
    todayDate
}: {
    username: string;
    order: IOrderWithProduct;
    todayDate: string;
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Status Update</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            color: white;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 30px;
        }
        .order-status {
            text-align: center;
            padding: 20px;
            margin: 20px 0;
            background-color: #f3f4f6;
            border-radius: 8px;
        }
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            background-color: #4f46e5;
            color: white;
            border-radius: 20px;
            font-weight: 600;
        }
        .order-details {
            margin: 20px 0;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
        }
        .detail-header {
            background-color: #f3f4f6;
            padding: 10px 20px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
        }
        .detail-row {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .shipping-info {
            margin-top: 20px;
            padding: 20px;
            background-color: #f3f4f6;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MyTechHomeVerse</h1>
        </div>
        
        <div class="content">
            <h2>Hello ${username},</h2>
            <p>There has been an update to your order!</p>
            
            <div class="order-status">
                <h3>Current Order Status</h3>
                <div class="status-badge">${order.status}</div>
            </div>

            <div class="order-details">
                <div class="detail-header">
                    <span>Product</span>
                    <span>Amount</span>
                </div>
                ${order.items.map(item => `
                    <div class="detail-row">
                        <span>${item.quantity}x ${item.productId.name}</span>
                        <span>Rs. ${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                `).join('')}
                <div class="detail-row" style="font-weight: bold;">
                    <span>Total</span>
                    <span>Rs. ${order.totalAmount}</span>
                </div>
            </div>

            <div class="shipping-info">
                <h3>Shipping Address</h3>
                <p>${order.shippingAddress.city}, ${order.shippingAddress.state}</p>
                <p>${order.shippingAddress.pincode}, ${order.shippingAddress.country}</p>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for shopping with MyTechHomeVerse!</p>
            <p>If you have any questions, please contact our support team.</p>
            <div style="margin-top: 20px;">
                <a href="#" style="color: #4f46e5; margin: 0 10px;">Track Order</a>
                <a href="#" style="color: #4f46e5; margin: 0 10px;">Support</a>
                <a href="#" style="color: #4f46e5; margin: 0 10px;">Website</a>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} MyTechHomeVerse. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`
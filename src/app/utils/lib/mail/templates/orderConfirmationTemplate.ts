import { IOrder, IOrderWithProduct } from "@/app/models/orderModel";
import { IOrderToCreate } from "@/app/utils/types/api/order";
import { getCurrency } from "@/app/utils/utilityFunctions";

export const getOrderConfirmationEmailTemplate = ({
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
    <title>Order Confirmation</title>
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
        .order-items {
            margin: 20px 0;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
        }
        .item-header {
            background-color: #f3f4f6;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            font-weight: bold;
        }
        .item {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #e5e7eb;
        }
        .total {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            background-color: #f3f4f6;
            font-weight: bold;
        }
        .shipping-address {
            margin: 20px 0;
            padding: 20px;
            background-color: #f3f4f6;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
        </div>
        
        <div class="content">
            <h2>Hello ${username},</h2>
            <p>Your order has been received and is being processed. Here are your order details:</p>
            
            <div class="order-status">
                <h3>Order Status: ${order.status}</h3>
                <p>Order Date: ${todayDate}</p>
            </div>

            <div class="order-items">
                <div class="item-header">
                    <span>Product</span>
                    <span>Price</span>
                </div>
                ${order.items.map(item => `
                    <div class="item">
                        <span>${item.quantity} x ${item.productId.name}</span>
                        <span>${getCurrency(Number(item.quantity * item.price))}</span>
                    </div>
                `).join('')}
                <div class="total">
                    <span>Total Amount</span>
                    <span>${getCurrency(Number(order.totalAmount))}</span>
                </div>
            </div>

            <div class="shipping-address">
                <h3>Shipping Address:</h3>
                <p>${order.shippingAddress.city}, ${order.shippingAddress.state}</p>
                <p>${order.shippingAddress.pincode}, ${order.shippingAddress.country}</p>
            </div>

            <p>We'll send you another email when your order ships. If you have any questions, please contact our support team.</p>
        </div>

        <div class="footer">
            <p>This is an automated message from MyTechHomeVerse</p>
            <p>&copy; ${new Date().getFullYear()} MyTechHomeVerse. All rights reserved.</p>
            <p>
                <a href="#" style="color: #6b7280; margin: 0 10px;">Support</a> |
                <a href="#" style="color: #6b7280; margin: 0 10px;">Return Policy</a> |
                <a href="#" style="color: #6b7280; margin: 0 10px;">About Us</a>
            </p>
        </div>
    </div>
</body>
</html>
`
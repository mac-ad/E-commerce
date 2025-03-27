import { NextResponse } from "next/server";
import { sendOrderConfirmationEmail, sendOrderStatusEmail, sendOtpEmail, sendWelcomeMail } from "@/utils/sendMail/sendMail";
import { OrderModel } from "@/lib/models/orderModel";

export async function POST(req: Request) {
    try {
        const { emailType, data } = await req.json();

        // Generate appropriate template based on email type
        switch (emailType) {
            case "welcome":
                sendWelcomeMail({
                    username: data.username,
                    to: data.email
                })
                break;

            case "otp":
                sendOtpEmail({
                    username: data.username,
                    otp: data.otp,
                    to: data.email
                })
                break;

            case "orderStatus":
                const order = await OrderModel.findOne().sort({ createdAt: -1 })
                sendOrderStatusEmail({
                    username: data.username,
                    order: order,
                    to: data.email
                })
                break;

            case "orderConfirmation":
                const orderConfirmation = await OrderModel.findOne().sort({ createdAt: -1 })
                sendOrderConfirmationEmail({
                    username: data.username,
                    order: orderConfirmation,
                    to: data.email
                })
                break;

            default:
                return NextResponse.json(
                    { error: "Invalid email type" },
                    { status: 400 }
                );
        }

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}

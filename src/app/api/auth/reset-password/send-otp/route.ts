import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/app/models/userModel";
import { sendOtpEmail } from "@/app/utils/sendMail/sendMail";

// Send OTP endpoint
export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({
                success: false,
                message: "Email is required"
            }, { status: 400 });
        }

        // Find user
        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Store OTP
        user.resetToken = otp
        user.resetTokenExpiry = otpExpiry
        await user.save()

        // TODO: Send OTP via email service
        // console.log("OTP:", otp); // For development
        sendOtpEmail({
            username: user.fullName,
            otp: otp,
            to: user.email
        })

        return NextResponse.json({
            message: "OTP sent successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Send OTP error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to send OTP"
        }, { status: 500 });
    }
}
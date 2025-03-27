import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/lib/models/userModel";

// Verify OTP endpoint
export async function PUT(req: NextRequest) {
    try {
        const { email, otp } = await req.json();
        console.log("verify-otp",email,otp)


        if (!email || !otp) {
            return NextResponse.json({
                success: false,
                message: "Email and OTP are required"
            }, { status: 400 });
        }

        const user = await UserModel.findOne({ email });
        console.log("user",user)
        if (!user || !user.resetToken || !user.resetTokenExpiry) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired OTP"
            }, { status: 400 });
        }

        

        if (user.resetToken !== otp || new Date() > user.resetTokenExpiry) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired OTP"
            }, { status: 400 });
        }

        return NextResponse.json({
            message: "OTP verified successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Verify OTP error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to verify OTP"
        }, { status: 500 });
    }
}

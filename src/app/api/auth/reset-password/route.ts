import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserModel } from "@/app/models/userModel";

// Reset password endpoint
export async function PATCH(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "Email and password are required"
            }, { status: 400 });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password and clear reset token
        user.password = hashedPassword
        user.resetToken = null
        user.resetTokenExpiry = null
        await user.save()
           
        return NextResponse.json({
            message: "Password reset successful"
        }, { status: 200 });

    } catch (error) {
        console.error("Password reset error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to reset password"
        }, { status: 500 });
    }
}



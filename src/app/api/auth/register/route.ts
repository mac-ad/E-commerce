import { NextResponse } from "next/server";
import { z } from "zod";
import { UserModel } from "@/lib/models/userModel";
import { connectToDb } from "@/lib/mongodb/mongodb";
import { hashPassword } from "@/lib/hash";
import { sendWelcomeMail } from "@/utils/sendMail/sendMail";

const userSchema = z.object({
  fullName: z.string().min(1, 'FullName is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters')
});

const modle = UserModel;

export async function POST(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    const { email, fullName, password, confirmPassword } = userSchema.parse(body);

    // Check if email already exists
    const existingUserByEmail = await modle.findOne({ email });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword
    });

    const userObject = user.toObject();
    const { password: _, __v, ...userWithoutSensitiveInfo } = userObject;

    // send welcome mail

    sendWelcomeMail({ to: email, username: fullName })

    return NextResponse.json({
      message: "User created successfully",
      user: userWithoutSensitiveInfo
    });

  } catch (error) {
    console.log('eror', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

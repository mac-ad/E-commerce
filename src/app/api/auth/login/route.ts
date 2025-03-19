import { NextResponse } from "next/server";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";
import { UserModel } from "@/app/models/userModel";
import { hashPassword } from "@/app/utils/lib/hash";
import { generateToken } from "@/app/utils/lib/jwt";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const model = UserModel;

export async function POST(request: Request) {
  try {
    await connectToDb();
    const body = await request.json();
    const { email, password } = body;

    // Find user by email
    const user = await model.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }


    // Compare passwords
    if (!(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const userForToken = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.fullName
    };

    const token = generateToken(userForToken);

    // Remove sensitive info from user object
    const userObject = user.toObject();
    const { password: _, __v,createdAt,updatedAt, ...userWithoutSensitiveInfo } = userObject;

    const dataToSend = {
      user: userWithoutSensitiveInfo,
      token
    }

    cookies().set("token", token, {
      httpOnly: process.env.NODE_ENV === 'production', // Only set httpOnly in production
      secure: process.env.NODE_ENV === 'production', // Only set secure in production
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Stricter in production
      path: "/",
      maxAge: 5 * 24 * 60 * 60, // 5 days in seconds to match JWT expiry
      // sameSite : "lax"
      // maxAge: 10 // 5 days in seconds to match JWT expiry

    });

    return NextResponse.json({
      message: "Login successful",
      data: dataToSend,
    }
  );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

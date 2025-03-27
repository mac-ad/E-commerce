import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserModel } from "@/lib/models/userModel";
import { connectToDb } from "@/lib/mongodb/mongodb";
import { decodeToken } from "@/lib/jwt";
import { cookies } from "next/headers";

const model = UserModel;

async function getCookieData() {
  const cookieData = cookies().getAll()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}
 

export async function GET(req: Request) {
  try {
    const cookieData = await getCookieData() as {name: string, value: string}[]
    const token = cookieData.find((cookie) => cookie.name === "token")?.value?.split(",")[0] || cookieData.find((cookie) => cookie.name === "Authorization")?.value?.split(" ")[1];
    // const token = req.cookies.get("token")?.value?.split(",")[0] || req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "No authorization token provided" },
        { status: 401 }
      );
    }
    const decodedToken = token ? decodeToken(token) : null;
    const userId = decodedToken?._id;
    await connectToDb();

    if (decodedToken?.exp && decodedToken.exp * 1000 < Date.now()) {
      
      const cookieStore = cookies();
      cookieStore.delete("token");
      
      return NextResponse.json(
        { error: "Token has expired" },
        { status: 401 }
      );
    }


    const user = await model.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const dataToSend = {
        data:user,
        message:"Profile fetched successfully"
    }

    return NextResponse.json(dataToSend,{status:200});

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { UserModel } from "@/app/models/userModel";
import { connectToDb } from "@/app/utils/lib/mongodb/mongodb";

const model = UserModel

export async function GET(request: Request) {
  try {
    await connectToDb();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("pageIndex") || "0");
    const limit = parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search") || "";

    const query: any = {};
    
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = page * limit;

    const [users, total] = await Promise.all([
      model.find(query)
        .skip(skip)
        .limit(limit)
        .select("-password")
        .lean(),
      model.countDocuments(query)
    ]);

    return NextResponse.json({
      data: users,
      totalItems: total,
      total:limit
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server";
import { UserModel } from "@/lib/models/userModel";
import { connectToDb } from "@/lib/mongodb/mongodb";
import { withAuthAndErrorHandler } from "@/utils/routesMiddleware";

const model = UserModel;

export const PUT = withAuthAndErrorHandler(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
        await connectToDb();

        const body = await request.json();
        const { id } = params;

        const user = await model.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true }
        ).select("-password");

        if (!user) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
        );
        }

        return NextResponse.json({
        data: user,
        message: "User updated successfully"
        });
});

export const GET = withAuthAndErrorHandler(async (
  request: Request,
  { params }: { params: { id: string | undefined } }
) => {
  await connectToDb();

  const { id } = params;
  const userId = request.userId;

  if(!id && !userId){
    return NextResponse.json({
      error: "User id is required"
    }, { status: 404 });
  }


  const user = await model.findById(id || userId).select("-password");

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: user,
    message: "User fetched successfully"
  });
});

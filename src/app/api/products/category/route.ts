import client from "@/app/utils/lib/appwrite_client";
import { Databases, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchProductsByCategory(category: string) {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66d01f9e002a731bec13",
      [Query.equal("category", category)] // This line ensures the filter by type
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error("Failed to fetch products by category");
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  try {
    const products = await fetchProductsByCategory(category);
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products by category" }, { status: 500 });
  }
}

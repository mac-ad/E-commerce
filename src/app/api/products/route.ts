import client from "@/app/utils/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function createProduct(data: {
  name: string;
  brand: string;
  type: string;
  discount: number;
  price: number;
  quantity: number;
  description: string;
  product_image: string;
  emiprice: number;
  category:string;
  size: number;
}) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66d01f9e002a731bec13",
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating product");
    throw new Error("Failed to create product");
  }
}

async function fetchProduct() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "66d01f9e002a731bec13", // Replace with your correct collection ID
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching products");
    throw new Error("Failed to fetch products");
  }
}

// API route to handle POST requests for creating a product
export async function POST(req: Request) {
  try {
    const {
      name,
      brand,
      type,
      discount,
      price,
      quantity,
      description,
      product_image,
      emiprice,
      category,
      size,
    } = await req.json();

    // Validate and create task
    const data = {
      name,
      brand,
      type,
      discount,
      price,
      quantity,
      description,
      product_image,
      emiprice,
      category,
      size,
    };
    const response = await createProduct(data);

    return NextResponse.json({ message: "Product created", product: response });
  } catch (error) {
    console.error("Error during Product creation", error);
    return NextResponse.json(
      { error: "Failed to create Product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await fetchProduct();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

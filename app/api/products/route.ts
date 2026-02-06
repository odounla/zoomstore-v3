import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utils/supabase";
import { imageSchema, productSchema, validateWithZodSchema } from "@/utils/schemas";
import { auth } from "@clerk/nextjs/server";
import { isAdminUserId } from "@/utils/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  try {
    const products = await db.product.findMany({
      where: {
        OR: [{ name: { contains: search } }, { company: { contains: search } }],
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!isAdminUserId(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });

    let categoryId = formData.get("categoryId") as string;
    if (!categoryId) {
      let category = await db.category.findFirst();
      if (!category) {
        category = await db.category.create({
          data: { name: "Uncategorized" },
        });
      }
      categoryId = category.id;
    }

    const fullPath = await uploadImage(validatedFile.image);

    const product = await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        categoryId,
        clerkId: userId as string,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

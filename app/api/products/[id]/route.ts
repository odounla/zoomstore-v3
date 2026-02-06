import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdminUserId } from "@/utils/auth";
import { productUpdateSchema, validateWithZodSchema } from "@/utils/schemas";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const product = await db.product.findUnique({
            where: {
                id: params.id,
            },
            include: {
                category: true,
            },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!isAdminUserId(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = validateWithZodSchema(productUpdateSchema, body);
    const product = await db.product.update({
      where: {
        id: params.id,
      },
      data: validated,
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!isAdminUserId(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.product.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdminUserId } from "@/utils/auth";

export async function GET(req: NextRequest) {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
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
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const category = await db.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

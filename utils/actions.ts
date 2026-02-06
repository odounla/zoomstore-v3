// import db from "../utils/db";
// import { redirect } from "next/navigation";

// export const fetchFeaturedProducts = async () => {
//   const products = await db.product.findMany({
//     where: {
//       featured: true,
//     },
//   });
//   return products;
// };

// export const fetchAllProducts = ({ search = "" }: { search: string }) => {
//   return db.product.findMany({
//     where: {
//       OR: [
//         { name: { contains: search, mode: "insensitive" } },
//         { company: { contains: search, mode: "insensitive" } },
//       ],
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// };

// export const fetchSingleProduct = async (productId: string) => {
//   const product = await db.product.findUnique({
//     where: {
//       id: productId,
//     },
//   });
//   if (!product) redirect("/products");
//   return product;
// };

// Fetch Featured Products
// export const fetchFeaturedProducts = async () => {
//   const products = await db.product.findMany({
//     where: {
//       featured: true,
//     },
//   });
//   return products;
// };

// Example of fetchFeaturedProducts
// import db from "@/utils/db";
"use server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { uploadImage } from "./supabase";
import { requireAdminUser } from "./auth";

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "an error occured",
  };
};

export const fetchFeaturedProducts = async () => {
  try {
    const products = await db.product.findMany({
      where: {
        featured: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw new Error("Failed to fetch featured products");
  }
};

// Corrected: Fetch All Products
export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const fetchLatestProducts = async () => {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return products;
};

// Fetch Single Product
export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    redirect("/products"); // Redirect if product not found
  }

  return product;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const userId = await requireAdminUser();
  try {
    const rawData = Object.fromEntries(formData);
    // const validatedFields = productSchema.parse(rawData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    let category = await db.category.findFirst();
    if (!category) {
      category = await db.category.create({
        data: {
          name: 'Uncategorized',
        },
      });
    }

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: userId,
        categoryId: category.id,
      },
    });


  } catch (error) {
    return renderError(error);
  }

  redirect("/admin/products");
};

export const createProductActionDashboard = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const userId = await requireAdminUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    let category = await db.category.findFirst();
    if (!category) {
      category = await db.category.create({
        data: {
          name: 'Uncategorized',
        },
      });
    }

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: userId,
        categoryId: category.id,
      },
    });

    // transform string to path for revalidation
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/dashboard");
    return { message: "Product created successfully" };
  } catch (error) {
    return renderError(error);
  }
};

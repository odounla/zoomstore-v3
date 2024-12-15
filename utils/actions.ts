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

import db from "../utils/db";
import { redirect } from "next/navigation";

// Fetch Featured Products
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
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

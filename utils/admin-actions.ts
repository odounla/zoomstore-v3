"use server";

import db from "@/utils/db";
import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/utils/auth";
import { z } from "zod";
import { validateWithZodSchema } from "@/utils/schemas";

const categorySchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters."),
});

const orderStatusSchema = z.object({
  orderId: z.string(),
  orderStatus: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"]),
  paymentStatus: z.enum(["UNPAID", "PAID", "REFUNDED"]),
});

export const fetchAdminProducts = async () => {
  await requireAdminUser();
  return db.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await requireAdminUser();
  const productId = formData.get("productId") as string;
  if (!productId) return { message: "Product ID is required" };
  await db.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
  return { message: "Product deleted" };
};

export const fetchAdminCategories = async () => {
  await requireAdminUser();
  return db.category.findMany({ orderBy: { name: "asc" } });
};

export const createCategoryAction = async (
  prevState: any,
  formData: FormData
) => {
  await requireAdminUser();
  const raw = Object.fromEntries(formData);
  const validated = validateWithZodSchema(categorySchema, raw);
  await db.category.create({ data: { name: validated.name } });
  revalidatePath("/admin/categories");
  return { message: "Category created" };
};

export const deleteCategoryAction = async (
  prevState: any,
  formData: FormData
) => {
  await requireAdminUser();
  const categoryId = formData.get("categoryId") as string;
  if (!categoryId) return { message: "Category ID is required" };
  await db.category.delete({ where: { id: categoryId } });
  revalidatePath("/admin/categories");
  return { message: "Category deleted" };
};

export const fetchAdminOrders = async () => {
  await requireAdminUser();
  return db.order.findMany({
    include: {
      orderItems: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateOrderStatusAction = async (formData: FormData) => {
  await requireAdminUser();
  const raw = Object.fromEntries(formData);
  const validated = validateWithZodSchema(orderStatusSchema, raw);
  await db.order.update({
    where: { id: validated.orderId },
    data: {
      orderStatus: validated.orderStatus,
      paymentStatus: validated.paymentStatus,
    },
  });
  revalidatePath("/admin/orders");
  return;
};

export const fetchAdminMetrics = async () => {
  await requireAdminUser();

  const [orderAgg, paidAgg, refundAgg] = await Promise.all([
    db.order.aggregate({
      _count: { id: true },
      _sum: { orderTotal: true },
    }),
    db.order.aggregate({
      _count: { id: true },
      _sum: { orderTotal: true },
      where: { paymentStatus: "PAID" },
    }),
    db.order.aggregate({
      _count: { id: true },
      _sum: { orderTotal: true },
      where: { paymentStatus: "REFUNDED" },
    }),
  ]);

  const topItems = await db.orderItem.groupBy({
    by: ["productId"],
    _sum: { amount: true, price: true },
    orderBy: { _sum: { amount: "desc" } },
    take: 5,
  });

  const productIds = topItems.map((i) => i.productId);
  const products = await db.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true },
  });

  const productMap = new Map(products.map((p) => [p.id, p.name]));
  const topProducts = topItems.map((item) => ({
    productId: item.productId,
    name: productMap.get(item.productId) || "Unknown",
    units: item._sum.amount || 0,
    revenue: item._sum.price || 0,
  }));

  return {
    totalOrders: orderAgg._count.id,
    totalRevenue: orderAgg._sum.orderTotal || 0,
    paidOrders: paidAgg._count.id,
    paidRevenue: paidAgg._sum.orderTotal || 0,
    refundedOrders: refundAgg._count.id,
    refundedRevenue: refundAgg._sum.orderTotal || 0,
    topProducts,
  };
};

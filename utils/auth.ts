import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const parseAdminIds = () =>
  (process.env.ADMIN_USER_ID || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

export const isAdminUserId = (userId?: string | null) => {
  if (!userId) return false;
  const adminIds = parseAdminIds();
  return adminIds.includes(userId);
};

export const requireUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return user;
};

export const requireAdminUser = async () => {
  const { userId } = auth();
  if (!isAdminUserId(userId)) redirect("/");
  return userId as string;
};

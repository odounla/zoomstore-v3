import { describe, expect, it } from "vitest";
import { isAdminUserId } from "@/utils/auth";

describe("isAdminUserId", () => {
  it("returns true for listed admin ids", () => {
    process.env.ADMIN_USER_ID = "user_a,user_b";
    expect(isAdminUserId("user_a")).toBe(true);
    expect(isAdminUserId("user_b")).toBe(true);
    expect(isAdminUserId("user_c")).toBe(false);
  });

  it("handles empty or missing admin list", () => {
    process.env.ADMIN_USER_ID = "";
    expect(isAdminUserId("user_a")).toBe(false);
  });
});

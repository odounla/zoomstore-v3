import { describe, expect, it, vi } from "vitest";

vi.mock("@/utils/auth", () => ({
  isAdminUserId: vi.fn().mockReturnValue(false),
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: () => ({ userId: null }),
}));

vi.mock("@/utils/db", () => ({
  default: {},
}));

import { PATCH, DELETE } from "@/app/api/products/[id]/route";

describe("products API auth", () => {
  it("PATCH returns 401 for non-admin", async () => {
    const req = new Request("http://localhost/api/products/1", {
      method: "PATCH",
      body: JSON.stringify({ name: "New" }),
    });
    const res = await PATCH(req as any, { params: { id: "1" } });
    expect(res.status).toBe(401);
  });

  it("DELETE returns 401 for non-admin", async () => {
    const req = new Request("http://localhost/api/products/1", {
      method: "DELETE",
    });
    const res = await DELETE(req as any, { params: { id: "1" } });
    expect(res.status).toBe(401);
  });
});

import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  return {
    aggregateMock: vi.fn(),
    groupByMock: vi.fn(),
    findManyProductsMock: vi.fn(),
  };
});

vi.mock("@/utils/auth", () => ({
  requireAdminUser: vi.fn().mockResolvedValue("admin_user"),
}));

vi.mock("@/utils/db", () => {
  return {
    default: {
      order: {
        aggregate: mocks.aggregateMock,
      },
      orderItem: {
        groupBy: mocks.groupByMock,
      },
      product: {
        findMany: mocks.findManyProductsMock,
      },
    },
  };
});

import { fetchAdminMetrics } from "@/utils/admin-actions";

describe("fetchAdminMetrics", () => {
  it("returns aggregated metrics and top products", async () => {
    mocks.aggregateMock
      .mockResolvedValueOnce({ _count: { id: 10 }, _sum: { orderTotal: 25000 } })
      .mockResolvedValueOnce({ _count: { id: 8 }, _sum: { orderTotal: 22000 } })
      .mockResolvedValueOnce({ _count: { id: 1 }, _sum: { orderTotal: 3000 } });

    mocks.groupByMock.mockResolvedValue([
      { productId: "p1", _sum: { amount: 5, price: 5000 } },
      { productId: "p2", _sum: { amount: 3, price: 3000 } },
    ]);

    mocks.findManyProductsMock.mockResolvedValue([
      { id: "p1", name: "Chair" },
      { id: "p2", name: "Desk" },
    ]);

    const result = await fetchAdminMetrics();

    expect(result.totalOrders).toBe(10);
    expect(result.totalRevenue).toBe(25000);
    expect(result.paidOrders).toBe(8);
    expect(result.refundedOrders).toBe(1);
    expect(result.topProducts).toEqual([
      { productId: "p1", name: "Chair", units: 5, revenue: 5000 },
      { productId: "p2", name: "Desk", units: 3, revenue: 3000 },
    ]);
  });
});

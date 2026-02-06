import { fetchAdminMetrics } from "@/utils/admin-actions";
import { formatCurrency } from "@/utils/format";

export default async function SalesPage() {
  const metrics = await fetchAdminMetrics();

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">Metrics</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-semibold">{metrics.totalOrders}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-semibold">
            {formatCurrency(metrics.totalRevenue)}
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Paid Revenue</p>
          <p className="text-2xl font-semibold">
            {formatCurrency(metrics.paidRevenue)}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Paid Orders</p>
          <p className="text-2xl font-semibold">{metrics.paidOrders}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Refunded Orders</p>
          <p className="text-2xl font-semibold">{metrics.refundedOrders}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Refunded Revenue</p>
          <p className="text-2xl font-semibold">
            {formatCurrency(metrics.refundedRevenue)}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Top Products</h2>
        <div className="border rounded-lg">
          {metrics.topProducts.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              No sales data yet.
            </p>
          ) : (
            <ul className="divide-y">
              {metrics.topProducts.map((product) => (
                <li key={product.productId} className="p-4 flex justify-between">
                  <span>{product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {product.units} units · {formatCurrency(product.revenue)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

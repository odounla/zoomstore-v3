import { fetchAdminOrders, updateOrderStatusAction } from "@/utils/admin-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/utils/format";
import { SubmitButton } from "@/components/form/Button";

const orderStatusOptions = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELED",
];
const paymentStatusOptions = ["UNPAID", "PAID", "REFUNDED"];

export default async function OrdersPage() {
  const orders = await fetchAdminOrders();

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.email}</TableCell>
              <TableCell>{formatCurrency(order.orderTotal)}</TableCell>
              <TableCell>{order.orderItems.length}</TableCell>
              <TableCell>
                <select
                  name="orderStatus"
                  form={`order-${order.id}`}
                  defaultValue={order.orderStatus}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {orderStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>
                <select
                  name="paymentStatus"
                  form={`order-${order.id}`}
                  defaultValue={order.paymentStatus}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {paymentStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell className="text-right">
                <form id={`order-${order.id}`} action={updateOrderStatusAction}>
                  <input type="hidden" name="orderId" value={order.id} />
                  <SubmitButton size="sm" text="Update" />
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

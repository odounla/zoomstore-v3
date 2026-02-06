import { fetchAdminProducts, deleteProductAction } from "@/utils/admin-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Button";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";

export default async function ProductsPage() {
  const products = await fetchAdminProducts();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link href="/admin/products/create" className="text-sm underline">
          Create product
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.company}</TableCell>
              <TableCell>{product.category?.name || "Uncategorized"}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.featured ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right">
                <FormContainer action={deleteProductAction}>
                  <input type="hidden" name="productId" value={product.id} />
                  <SubmitButton size="sm" text="Delete" />
                </FormContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

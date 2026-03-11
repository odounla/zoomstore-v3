import { fetchAdminProducts, deleteProductAction, toggleProductVisibilityAction } from "@/utils/admin-actions";
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
            <TableHead>Visibility</TableHead>
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
              <TableCell>
                <FormContainer action={toggleProductVisibilityAction}>
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="featured" value={product.featured.toString()} />
                  <button type="submit" className={`text-xs px-2 py-1 rounded border transition-colors ${product.featured ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                    {product.featured ? 'Online' : 'Offline'}
                  </button>
                </FormContainer>
              </TableCell>
              <TableCell className="text-right flex items-center justify-end gap-2">
                <Link href={`/admin/products/${product.id}/edit`} className="text-sm border px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50 font-medium">
                  Edit
                </Link>
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

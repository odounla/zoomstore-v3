import {
  fetchAdminCategories,
  createCategoryAction,
  deleteCategoryAction,
} from "@/utils/admin-actions";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function CategoriesPage() {
  const categories = await fetchAdminCategories();

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">Categories</h1>

      <div className="max-w-md mb-8">
        <FormContainer action={createCategoryAction}>
          <div className="flex gap-2">
            <Input name="name" placeholder="New category name" />
            <SubmitButton size="sm" text="Add" />
          </div>
        </FormContainer>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell className="text-right">
                <FormContainer action={deleteCategoryAction}>
                  <input type="hidden" name="categoryId" value={category.id} />
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

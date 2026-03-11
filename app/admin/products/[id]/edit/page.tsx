import React from "react";
import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { updateProductAction } from "@/utils/admin-actions";
import { fetchSingleProduct } from "@/utils/actions";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckboxInput from "@/components/form/CheckboxInput";
import { SubmitButton } from "@/components/form/Button";
import Image from "next/image";

async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct(params.id);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Edit Product</h1>
      <div className="border p-8 rounded-md bg-white">
        <FormContainer action={updateProductAction}>
          <input type="hidden" name="id" value={product.id} />

          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={product.name}
            />
            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={product.company}
            />
            <PriceInput defaultValue={product.price} />
            <div className="mb-2">
              <label className="capitalize text-sm font-medium mb-2 block text-gray-700">Current Image</label>
              <div className="relative w-32 h-32 mb-4 bg-gray-50 border rounded-md overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
              </div>
              <ImageInput required={false} />
              <p className="text-xs text-gray-500 mt-1">Leave blank to keep the current image.</p>
            </div>
          </div>

          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={product.description}
          />

          <div className="mt-6 border-t pt-4">
            <CheckboxInput
              name="featured"
              label="Online (Featured on homepage)"
              defaultChecked={product.featured}
            />
          </div>

          <SubmitButton text="Save Changes" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditProductPage;

// "use client";

// import React, { Suspense } from "react";
// import ProductsContainer from "@/components/products/ProductsContainer";
// import { fetchAllProducts } from "@/utils/actions";

// async function ProductsPage({
//   searchParams,
// }: {
//   searchParams: { layout?: string; search?: string };
// }) {
//   const layout = searchParams.layout || "grid";
//   const search = searchParams.search || "";

//   // Fetch products here
//   const products = await fetchAllProducts({ search });

//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       <ProductsContainer layout={layout} search={search} products={products} />
//     </Suspense>
//   );
// }

// export default ProductsPage;

// "use client";

// import React, { Suspense } from "react";
// import ProductsContainer from "@/components/products/ProductsContainer";
// import { fetchAllProducts } from "@/utils/actions";

// async function ProductsPage({
//   searchParams,
// }: {
//   searchParams?: { layout?: string; search?: string };
// }) {
//   // Handle search and layout params safely
//   const layout = searchParams?.layout || "grid";
//   const search = searchParams?.search || "";

//   // Fetch products using async/await
//   const products = await fetchAllProducts({ search });

//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       <ProductsContainer layout={layout} search={search} products={products} />
//     </Suspense>
//   );
// }

// export default ProductsPage;

import React from "react";
import ProductsContainer from "@/components/products/ProductsContainer";
import { fetchAllProducts } from "@/utils/actions";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { layout?: string; search?: string };
}) {
  // Handle search and layout params safely
  const layout = searchParams?.layout || "grid";
  const search = searchParams?.search || "";

  // Fetch products on the server side
  const products = await fetchAllProducts({ search });

  return (
    <ProductsContainer layout={layout} search={search} products={products} />
  );
}

import { fetchFeaturedProducts } from "@/utils/actions";
import React from "react";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();

  if (products.length === 0) return <EmptyList />;
  return (
    <section className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid products={products} />
    </section>
  );
}

export default FeaturedProducts;

// export default async function FeaturedProducts() {
//   try {
//     const products = await fetchFeaturedProducts();
//     if (!products.length) return <div>No featured products available</div>;

//     return (
//       <div>
//         <h2>Featured Products</h2>
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>{product.name}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   } catch (error) {
//     console.error(error);
//     return <div>Failed to load featured products</div>;
//   }
// }

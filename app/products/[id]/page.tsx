// import React from "react";
// import BreadCrumbs from "@/components/single-product/BreadCrumbs";
// import { fetchSingleProduct } from "@/utils/actions";
// import Image from "next/image";
// import { formatCurrency } from "@/utils/format";
// import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
// import AddToCart from "@/components/single-product/AddToCart";
// import ProductRating from "@/components/single-product/ProductRating";

// async function SingleProductPage({ params }: { params: { id: string } }) {
//   const product = await fetchSingleProduct(params.id);
//   const { name, image, company, description, price } = product;
//   const dollarsAmount = formatCurrency(price);

//   return (
//     <section>
//       <BreadCrumbs name={product.name} />
//       <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
//         {/* IMAGE FIRST COL */}
//         <div className="relative h-full">
//           <Image
//             src={image}
//             alt={name}
//             fill
//             sizes="(max-width:768px) 100vw, (max-width:1200) 50vw, 33vw"
//             priority
//             className="w-full rounded object-cover"
//           />
//         </div>
//         {/* PRODUCt INFO SECOND COL */}
//         <div>
//           <div className="flex gap-x-8 items-center">
//             <h1 className="capitalize text-3xl font-bold">{name}</h1>
//             <FavoriteToggleButton productId={params.id} />
//           </div>
//           <ProductRating productId={params.id} />
//           <h4 className="text-xl mt-2">{company}</h4>
//           <p className="mt-3 text-md bg-muted inline-block p-2 rounded">
//             {dollarsAmount}
//           </p>
//           <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
//           <AddToCart productId={params.id} />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SingleProductPage;

// import React from "react";
// import BreadCrumbs from "@/components/single-product/BreadCrumbs";
// import { fetchSingleProduct } from "@/utils/actions";
// import Image from "next/image";
// import { formatCurrency } from "@/utils/format";
// import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
// import AddToCart from "@/components/single-product/AddToCart";
// import ProductRating from "@/components/single-product/ProductRating";

// async function SingleProductPage({ params }: { params: { id: string } }) {
//   // Fetch the product data
//   const product = await fetchSingleProduct(params.id);

//   // Handle missing product gracefully
//   if (!product) {
//     return (
//       <section>
//         <h1 className="text-2xl font-bold">Product Not Found</h1>
//         <p>Please check the product ID and try again.</p>
//       </section>
//     );
//   }

//   const { name, image, company, description, price } = product;
//   const dollarsAmount = formatCurrency(price);

//   return (
//     <section>
//       <BreadCrumbs name={name} />
//       <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
//         {/* IMAGE FIRST COL */}
//         <div className="relative h-full">
//           <Image
//             src={image}
//             alt={name}
//             fill
//             sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
//             priority
//             className="w-full rounded object-cover"
//           />
//         </div>

//         {/* PRODUCT INFO SECOND COL */}
//         <div>
//           <div className="flex gap-x-8 items-center">
//             <h1 className="capitalize text-3xl font-bold">{name}</h1>
//             <FavoriteToggleButton productId={params.id} />
//           </div>
//           <ProductRating productId={params.id} />
//           <h4 className="text-xl mt-2">{company}</h4>

//           <p className="mt-3 text-md bg-muted inline-block p-2 rounded">
//             {dollarsAmount}
//           </p>

//           <p className="mt-6 leading-8 text-muted-foreground">{description}</p>

//           <AddToCart productId={params.id} />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SingleProductPage;

// Correct TypeScript Type Definition

// type ProductPageProps = {
//   params: { id: string };
// };

// // Correct Implementation
// import React from "react";
// import BreadCrumbs from "@/components/single-product/BreadCrumbs";
// import { fetchSingleProduct } from "@/utils/actions";
// import Image from "next/image";
// import { formatCurrency } from "@/utils/format";
// import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
// import AddToCart from "@/components/single-product/AddToCart";
// import ProductRating from "@/components/single-product/ProductRating";

// async function SingleProductPage({ params }: ProductPageProps) {
//   const product = await fetchSingleProduct(params.id);

//   if (!product) {
//     return (
//       <section>
//         <h1 className="text-2xl font-bold">Product Not Found</h1>
//         <p>Please check the product ID and try again.</p>
//       </section>
//     );
//   }

//   const { name, image, company, description, price } = product;
//   const dollarsAmount = formatCurrency(price);

//   return (
//     <section>
//       <BreadCrumbs name={name} />
//       <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
//         {/* IMAGE FIRST COL */}
//         <div className="relative h-full">
//           <Image
//             src={image}
//             alt={name}
//             fill
//             sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
//             priority
//             className="w-full rounded object-cover"
//           />
//         </div>

//         {/* PRODUCT INFO SECOND COL */}
//         <div>
//           <div className="flex gap-x-8 items-center">
//             <h1 className="capitalize text-3xl font-bold">{name}</h1>
//             <FavoriteToggleButton productId={params.id} />
//           </div>
//           <ProductRating productId={params.id} />
//           <h4 className="text-xl mt-2">{company}</h4>

//           <p className="mt-3 text-md bg-muted inline-block p-2 rounded">
//             {dollarsAmount}
//           </p>

//           <p className="mt-6 leading-8 text-muted-foreground">{description}</p>

//           <AddToCart productId={params.id} />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SingleProductPage;

// Correct TypeScript Type Definition
type ProductPageProps = {
  params: Promise<{ id: string }>;
};

// Correct Implementation
import React from "react";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import { fetchSingleProduct } from "@/utils/actions";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";

async function SingleProductPage({ params }: ProductPageProps) {
  // Await params to match the expected type
  const { id } = await params;

  const product = await fetchSingleProduct(id);

  if (!product) {
    return (
      <section>
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p>Please check the product ID and try again.</p>
      </section>
    );
  }

  const { name, image, company, description, price } = product;
  const dollarsAmount = formatCurrency(price);

  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority
            className="w-full rounded object-cover"
          />
        </div>

        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <FavoriteToggleButton productId={id} />
          </div>
          <ProductRating productId={id} />
          <h4 className="text-xl mt-2">{company}</h4>

          <p className="mt-3 text-md bg-muted inline-block p-2 rounded">
            {dollarsAmount}
          </p>

          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>

          <AddToCart productId={id} />
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;

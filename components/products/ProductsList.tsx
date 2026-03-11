import React from "react";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@prisma/client";
import Image from "next/image";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid gray-y-8">
      {products.map((product) => {
        const { name, price, image, company } = product;
        const dollarsAmount = formatCurrency(price);
        const productId = product.id;
        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow=xl transition-shadow duration-500">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48 rounded-lg bg-[#f8f8f8] dark:bg-zinc-800 p-4 flex items-center justify-center overflow-hidden mb-4 md:mb-0 group-hover:bg-gray-100 transition-colors">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
                      priority
                      className="object-contain p-4 mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold capitalized">
                      {name}
                    </h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto">
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsList;

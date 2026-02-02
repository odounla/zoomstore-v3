
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Product } from '@prisma/client';
import { formatCurrency } from '@/utils/format';

async function HorizontalProductList({ products, title }: { products: Product[], title: string }) {
    if (products.length === 0) return null;

    return (
        <section className="pt-12 pb-24 max-w-[1500px] mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <Link href="/products" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700">See more</Link>
            </div>

            <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
                    {products.map((product) => (
                        <Card key={product.id} className="min-w-[200px] sm:min-w-[240px] border-none shadow-sm hover:shadow-md transition-shadow snap-start">
                            <CardContent className="p-4">
                                <Link href={`/products/${product.id}`}>
                                    <div className="relative aspect-square mb-4 bg-gray-50 rounded-md overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-contain hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="font-medium text-sm line-clamp-2 min-h-[40px] mb-1">{product.name}</h3>
                                    <p className="font-bold text-lg text-orange-600">{formatCurrency(product.price)}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{product.company}</p>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HorizontalProductList;

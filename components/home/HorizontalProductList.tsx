import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { formatCurrency } from '@/utils/format';

async function HorizontalProductList({ products, title }: { products: Product[], title: string }) {
    if (products.length === 0) return null;

    return (
        <div className="bg-[#e3e6e6] dark:bg-black w-full pb-6 px-5">
            <section className="bg-white dark:bg-zinc-900 pt-5 pb-6 max-w-[1500px] mx-auto px-5 shadow-sm">
                <div className="flex items-end gap-4 mb-4">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
                    <Link href="/products" className="text-sm font-medium text-[#007185] dark:text-[#5bc0de] hover:text-[#c45500] hover:underline mb-0.5">See more</Link>
                </div>

                <div className="relative group">
                    {/* Add carousel arrows for amazon look */}
                    <div className="hidden group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-300 shadow-sm rounded-r-md px-2 py-6 cursor-pointer opacity-70 hover:opacity-100">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </div>

                    <div className="hidden group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-300 shadow-sm rounded-l-md px-2 py-6 cursor-pointer opacity-70 hover:opacity-100">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar items-start">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="min-w-[160px] max-w-[160px] sm:min-w-[200px] sm:max-w-[200px] flex flex-col group/item"
                            >
                                <div className="relative aspect-square mb-2 rounded-lg bg-[#f8f8f8] dark:bg-zinc-800 p-4 flex items-center justify-center overflow-hidden group-hover/item:bg-gray-100 transition-colors">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 160px, 200px"
                                        className="object-contain p-4 mix-blend-multiply dark:mix-blend-normal transform group-hover/item:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="font-medium text-[13px] leading-tight text-[#007185] dark:text-[#5bc0de] hover:text-[#c45500] hover:underline line-clamp-2 mt-1 mb-1">
                                    {product.name}
                                </h3>
                                <p className="font-bold text-sm text-[#B12704] dark:text-[#ff9900]">{formatCurrency(product.price)}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HorizontalProductList;

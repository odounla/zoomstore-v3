"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { formatCurrency } from '@/utils/format';

type HorizontalScrollableListProps = {
    products: Product[];
    title: string;
};

export default function HorizontalScrollableList({ products, title }: HorizontalScrollableListProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 600; // Scroll roughly 3 products at a time
            const targetScrollPosition =
                scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: targetScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    if (!products || products.length === 0) return null;

    return (
        <div className="bg-[#e3e6e6] dark:bg-black w-full pb-6 px-5 pt-3">
            <section className="bg-white dark:bg-zinc-900 pt-5 pb-6 max-w-[1500px] mx-auto px-5 shadow-sm relative group">
                <div className="flex items-end gap-5 mb-4 px-2">
                    <h2 className="text-[21px] font-bold tracking-tight text-gray-900 dark:text-white leading-none pt-1">{title}</h2>
                    <Link href="/products" className="text-sm font-medium text-[#007185] dark:text-[#5bc0de] hover:text-[#c45500] hover:underline mb-0">See more</Link>
                </div>

                <div className="relative">
                    {/* Left Scroll Arrow */}
                    <button
                        onClick={(e) => { e.preventDefault(); scroll('left'); }}
                        className="hidden group-hover:flex absolute left-0 top-[40%] -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-[0_2px_5px_rgba(0,0,0,0.15)] rounded-r-md px-2 py-6 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#007185]"
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right Scroll Arrow */}
                    <button
                        onClick={(e) => { e.preventDefault(); scroll('right'); }}
                        className="hidden group-hover:flex absolute right-0 top-[40%] -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-[0_2px_5px_rgba(0,0,0,0.15)] rounded-l-md px-2 py-6 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#007185]"
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-none snap-x snap-mandatory flex-nowrap"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="min-w-[170px] max-w-[170px] sm:min-w-[210px] sm:max-w-[210px] flex flex-col group/item snap-start shrink-0"
                            >
                                <div className="relative aspect-square mb-2 bg-[#f8f8f8] dark:bg-zinc-800 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 170px, 210px"
                                        className="object-contain p-2 mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="px-1 mt-1">
                                    <h3 className="font-medium text-[13px] leading-[1.3] text-[#007185] dark:text-[#5bc0de] hover:text-[#c45500] hover:underline line-clamp-2 min-h-[34px]">
                                        {product.name}
                                    </h3>
                                    <p className="font-bold text-lg text-[#B12704] dark:text-[#ff9900] mt-1">{formatCurrency(product.price)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

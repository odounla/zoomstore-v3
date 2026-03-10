import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type GridItem = {
    name: string;
    image: string;
    link: string;
};

interface AmazonGridCardProps {
    title: string;
    items: GridItem[];
    linkText: string;
    linkHref: string;
}

export default function AmazonGridCard({ title, items, linkText, linkHref }: AmazonGridCardProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 flex flex-col p-5 h-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>

            <div className="grid grid-cols-2 gap-4 mb-4 flex-grow">
                {items.slice(0, 4).map((item, index) => (
                    <Link key={index} href={item.link} className="flex flex-col group cursor-pointer">
                        <div className="relative aspect-square w-full mb-2 bg-gray-50 dark:bg-zinc-800 rounded overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-2 mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300 line-clamp-1">{item.name}</span>
                    </Link>
                ))}
            </div>

            <Link href={linkHref} className="text-[#007185] dark:text-[#5bc0de] hover:text-[#c45500] hover:underline text-sm font-medium mt-auto inline-block">
                {linkText}
            </Link>
        </div>
    );
}

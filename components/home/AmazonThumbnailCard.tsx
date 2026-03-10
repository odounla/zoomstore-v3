import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AmazonThumbnailCardProps {
    title: string;
    mainImage: string;
    mainImageAlt: string;
    thumbnails: string[];
    linkText: string;
    linkHref: string;
}

export default function AmazonThumbnailCard({
    title,
    mainImage,
    mainImageAlt,
    thumbnails,
    linkText,
    linkHref
}: AmazonThumbnailCardProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 flex flex-col p-5 h-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>

            <Link href={linkHref} className="flex-grow flex flex-col group cursor-pointer mb-4">
                {/* Main large image */}
                <div className="relative w-full aspect-[4/3] mb-3 bg-gray-50 dark:bg-zinc-800 rounded overflow-hidden">
                    <Image
                        src={mainImage}
                        alt={mainImageAlt}
                        fill
                        className="object-cover group-hover:opacity-90 transition-opacity"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>

                {/* Row of 4 small thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                    {thumbnails.slice(0, 4).map((thumb, index) => (
                        <div key={index} className="relative aspect-square w-full bg-gray-50 dark:bg-zinc-800 rounded overflow-hidden">
                            <Image
                                src={thumb}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover hover:opacity-90 transition-opacity"
                                sizes="(max-width: 768px) 25vw, 10vw"
                            />
                        </div>
                    ))}
                </div>
            </Link>

            <div className="mt-auto">
                <Link href={linkHref} className="text-[#007185] dark:text-[#5bc0de] hover:text-[#c45500] hover:underline text-sm font-medium inline-block">
                    {linkText}
                </Link>
            </div>
        </div>
    );
}

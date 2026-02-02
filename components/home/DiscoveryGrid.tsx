import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function DiscoveryGrid() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 -mt-16 sm:-mt-32 relative z-20 max-w-[1500px] mx-auto min-h-[400px]">
            {/* Card 1: Deals & Promotions */}
            <div className="bg-white dark:bg-zinc-800 p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold text-xl mb-4 self-start">Deals & Promotions</h3>
                <div className="relative w-full flex-1 min-h-[200px] mb-4">
                    <Image
                        src="https://images.pexels.com/photos/3394657/pexels-photo-3394657.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Deals"
                        fill
                        className="object-contain"
                    />
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        50% OFF
                    </span>
                </div>
                <Link href="/products" className="text-blue-600 hover:text-orange-600 hover:underline mt-auto self-start text-sm font-medium">See all deals</Link>
            </div>

            {/* Card 2: Shop by Category */}
            <div className="bg-white dark:bg-zinc-800 p-6 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold text-xl mb-4">Shop by Category</h3>
                <div className="grid grid-cols-2 gap-4 flex-1">
                    <Link href="/products?category=Furniture" className="flex flex-col gap-1 group">
                        <div className="w-full aspect-square relative overflow-hidden">
                            <Image src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Furniture" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300">Furniture</span>
                    </Link>
                    <Link href="/products?category=Streetwear" className="flex flex-col gap-1 group">
                        <div className="w-full aspect-square relative overflow-hidden">
                            <Image src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Clothes" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300">Clothes</span>
                    </Link>
                    <Link href="/products?category=Watches" className="flex flex-col gap-1 group">
                        <div className="w-full aspect-square relative overflow-hidden">
                            <Image src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Watches" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300">Watches</span>
                    </Link>
                    <Link href="/products?category=Kitchen" className="flex flex-col gap-1 group">
                        <div className="w-full aspect-square relative overflow-hidden">
                            <Image src="https://images.pexels.com/photos/66636/pexels-photo-66636.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Home" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300">Kitchen</span>
                    </Link>
                </div>
                <Link href="/products" className="text-blue-600 hover:text-orange-600 hover:underline mt-4 text-sm font-medium">See all categories</Link>
            </div>

            {/* Card 3: New Arrivals */}
            <div className="bg-white dark:bg-zinc-800 p-6 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold text-xl mb-4">New Arrivals</h3>
                <div className="relative w-full aspect-square mb-4 overflow-hidden bg-white">
                    <Image
                        src="https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="New Arrival"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <Link href="/products?sort=newest" className="text-blue-600 hover:text-orange-600 hover:underline mt-auto text-sm font-medium">Shop latest trends</Link>
            </div>

            {/* Card 4: Sign In / Welcome (Upsell) */}
            <div className="bg-white dark:bg-zinc-800 p-8 flex flex-col justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold text-2xl mb-6">Sign In for the best experience</h3>
                <Button asChild className="w-full mb-4 bg-orange-400 hover:bg-orange-500 text-black border-none font-medium text-sm rounded-md shadow-sm">
                    <Link href="/sign-in">Sign in securely</Link>
                </Button>
                <div className="flex justify-center">
                    <Button asChild variant="link" className="text-blue-600 hover:text-orange-600 p-0 h-auto">
                        <Link href="/sign-up">Create an account</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default DiscoveryGrid;

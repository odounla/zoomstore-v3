import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import AmazonGridCard, { GridItem } from "./AmazonGridCard";
import AmazonThumbnailCard from "./AmazonThumbnailCard";

function DiscoveryGrid() {
    const dealsItems: GridItem[] = [
        { name: "Furniture", image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products?category=Furniture" },
        { name: "Clothes", image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products?category=Streetwear" },
        { name: "Watches", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products?category=Watches" },
        { name: "Kitchen", image: "https://images.pexels.com/photos/66636/pexels-photo-66636.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products?category=Kitchen" },
    ];

    const styleItems: GridItem[] = [
        { name: "Summer Dresses", image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Accessories", image: "https://images.pexels.com/photos/1113690/pexels-photo-1113690.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Footwear", image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Handbags", image: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
    ];

    return (
        <div className="bg-[#e3e6e6] dark:bg-black w-full pb-4 pt-1 sm:pt-4">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 -mt-20 sm:-mt-64 relative z-20 max-w-[1500px] mx-auto auto-rows-[420px]">

                {/* Card 1: Shop by Category (2x2 Grid) */}
                <AmazonGridCard
                    title="Shop Today's Deals"
                    items={dealsItems}
                    linkText="See all deals"
                    linkHref="/products"
                />

                {/* Card 2: Thumbnail Card */}
                <AmazonThumbnailCard
                    title="Popular essentials for your home"
                    mainImage="https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800"
                    mainImageAlt="Home Essentials"
                    thumbnails={[
                        "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800",
                        "https://images.pexels.com/photos/833052/pexels-photo-833052.jpeg?auto=compress&cs=tinysrgb&w=800",
                        "https://images.pexels.com/photos/4034873/pexels-photo-4034873.jpeg?auto=compress&cs=tinysrgb&w=800",
                        "https://images.pexels.com/photos/4034874/pexels-photo-4034874.jpeg?auto=compress&cs=tinysrgb&w=800"
                    ]}
                    linkText="See more"
                    linkHref="/products"
                />

                {/* Card 3: Trending Styles (2x2 Grid) */}
                <AmazonGridCard
                    title="Trending spring bags"
                    items={styleItems}
                    linkText="Shop luxury pre-loved styles"
                    linkHref="/products"
                />

                {/* Card 4: Sign in / Welcome Box */}
                <div className="bg-white dark:bg-zinc-900 p-5 flex flex-col shadow-sm h-full">
                    <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Sign In for the best experience</h3>
                    <Button asChild className="w-full mb-3 bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#fcd200] rounded-lg shadow-sm font-normal py-2 h-auto text-sm transition-colors">
                        <Link href="/sign-in">Sign in securely</Link>
                    </Button>
                    <div className="flex justify-start">
                        <Button asChild variant="link" className="text-[#007185] hover:text-[#c45500] p-0 h-auto text-sm font-medium">
                            <Link href="/sign-up">Create an account</Link>
                        </Button>
                    </div>

                    <div className="relative w-full flex-grow mt-6 bg-gray-50 dark:bg-zinc-800 rounded">
                        <img
                            src="https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
                            alt="Advertisement"
                            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                        />
                        <span className="absolute bottom-1 right-1 text-[10px] text-gray-500 bg-white/80 px-1">Sponsored</span>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default DiscoveryGrid;

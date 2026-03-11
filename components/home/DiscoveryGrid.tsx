import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import AmazonGridCard, { GridItem } from "./AmazonGridCard";
import AmazonThumbnailCard from "./AmazonThumbnailCard";

function DiscoveryGrid() {
    const dealsItems: GridItem[] = [
        { name: "Electronics", image: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Furniture", image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Appliances", image: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Decor", image: "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
    ];

    const jewelryItems: GridItem[] = [
        { name: "Necklaces", image: "https://images.pexels.com/photos/266621/pexels-photo-266621.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Bracelets", image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Rings", image: "https://images.pexels.com/photos/1739516/pexels-photo-1739516.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Earrings", image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
    ];

    const bagItems: GridItem[] = [
        { name: "Totes", image: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Clutches", image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Crossbody", image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Satchels", image: "https://images.pexels.com/photos/1039518/pexels-photo-1039518.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
    ];

    return (
        <div className="bg-[#e3e6e6] dark:bg-black w-full pb-4 pt-1 sm:pt-4">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 -mt-20 sm:-mt-64 relative z-20 max-w-[1500px] mx-auto auto-rows-[420px]">

                {/* Card 1: Continue shopping deals (2x2 Grid) */}
                <AmazonGridCard
                    title="Continue shopping deals"
                    items={dealsItems}
                    linkText="See more deals"
                    linkHref="/products"
                />

                {/* Card 2: Deals related to items you've saved (Thumbnail Card) */}
                <AmazonThumbnailCard
                    title="Deals related to items you've saved"
                    mainImage="https://images.pexels.com/photos/833052/pexels-photo-833052.jpeg?auto=compress&cs=tinysrgb&w=800"
                    mainImageAlt="Saved deals"
                    thumbnails={[
                        "https://images.pexels.com/photos/833052/pexels-photo-833052.jpeg?auto=compress&cs=tinysrgb&w=800",
                        "https://images.pexels.com/photos/4034873/pexels-photo-4034873.jpeg?auto=compress&cs=tinysrgb&w=800",
                        "https://images.pexels.com/photos/4034874/pexels-photo-4034874.jpeg?auto=compress&cs=tinysrgb&w=800",
                        "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800"
                    ]}
                    linkText="See more deals"
                    linkHref="/products"
                />

                {/* Card 3: Elevate your everyday jewelry (2x2 Grid) */}
                <AmazonGridCard
                    title="Elevate your everyday jewelry"
                    items={jewelryItems}
                    linkText="Shop pre-loved jewelry"
                    linkHref="/products"
                />

                {/* Card 4: Trending spring bags (2x2 Grid) */}
                <AmazonGridCard
                    title="Trending spring bags"
                    items={bagItems}
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

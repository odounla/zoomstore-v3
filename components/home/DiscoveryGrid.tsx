import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import AmazonGridCard, { GridItem } from "./AmazonGridCard";
import AmazonThumbnailCard from "./AmazonThumbnailCard";

function DiscoveryGrid() {
    const basketballItems: GridItem[] = [
        { name: "Indoor Game Balls", image: "/images/sports/sport_basketball_leather_1773193851255.png", link: "/products" },
        { name: "Composite Leather", image: "/images/sports/sport_basketball_two_tone_1773193861500.png", link: "/products" },
        { name: "Outdoor Rubber", image: "/images/sports/sport_basketball_camo_1773193873098.png", link: "/products" },
        { name: "Hoops & Nets", image: "/images/sports/sport_basketball_hoop.png", link: "/products" },
    ];

    const volleyballItems: GridItem[] = [
        { name: "Volleyballs", image: "/images/sports/sport_volleyball_1773192635433.png", link: "/products" },
        { name: "Knee Pads", image: "/images/sports/sport_kneepads_1773192648510.png", link: "/products" },
        { name: "Team Jerseys", image: "/images/sports/sport_jersey_1773192663046.png", link: "/products" },
        { name: "Training Gear", image: "/images/sports/sport_cones_1773192767300.png", link: "/products" },
    ];

    const coachingItems: GridItem[] = [
        { name: "Coach Wear", image: "/images/sports/sport_polo_1773192716361.png", link: "/products" },
        { name: "Whistles", image: "/images/sports/sport_whistle_1773192726671.png", link: "/products" },
        { name: "Referee", image: "/images/sports/sport_referee_1773192741992.png", link: "/products" },
        { name: "Awards", image: "/images/sports/sport_trophy_1773192755404.png", link: "/products" },
    ];

    const dealsItems: GridItem[] = [
        { name: "Electronics", image: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Furniture", image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Appliances", image: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Decor", image: "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
    ];

    const apparelItems: GridItem[] = [
        { name: "Men's Apparel", image: "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Women's Apparel", image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Footwear", image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
        { name: "Accessories", image: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/products" },
    ];

    return (
        <div className="bg-[#e3e6e6] dark:bg-black w-full pb-4 pt-1 sm:pt-4">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 -mt-20 sm:-mt-64 relative z-20 max-w-[1500px] mx-auto auto-rows-[420px]">

                {/* Card 1: Continue shopping deals (2x2 Grid) */}
                <AmazonGridCard
                    title="Continue shopping for volleyball gear"
                    items={volleyballItems}
                    linkText="See more equipment"
                    linkHref="/products"
                />

                {/* Card 2: Deals related to items you've saved (Thumbnail Card) */}
                <AmazonThumbnailCard
                    title="Deals related to soccer items you've saved"
                    mainImage="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=800"
                    mainImageAlt="Saved deals"
                    thumbnails={[
                        "/images/sports/sport_soccerball_1773192675083.png",
                        "/images/sports/sport_cleats_1773192686506.png",
                        "/images/sports/sport_goal_1773192783639.png",
                        "/images/sports/sport_referee_1773192741992.png"
                    ]}
                    linkText="See more deals"
                    linkHref="/products"
                />

                {/* Card 3: Elevate your everyday jewelry (2x2 Grid) */}
                <AmazonGridCard
                    title="Elevate your coaching game"
                    items={coachingItems}
                    linkText="Shop coach wear & equipment"
                    linkHref="/products"
                />

                {/* Card 4: Trending spring bags (2x2 Grid) */}
                <AmazonGridCard
                    title="Featured Basketball Equipment"
                    items={basketballItems}
                    linkText="Shop all basketball"
                    linkHref="/products"
                />

                {/* Card 5: Sign in / Welcome Box */}
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

                {/* Card 6: Electronics & Home Deals (2x2 Grid) */}
                <AmazonGridCard
                    title="Continue shopping deals"
                    items={dealsItems}
                    linkText="See more deals"
                    linkHref="/products"
                />

                {/* Card 7: Shop apparel (2x2 Grid) */}
                <AmazonGridCard
                    title="Shop everyday apparel"
                    items={apparelItems}
                    linkText="See more"
                    linkHref="/products"
                />

                {/* Card 8: Home Arrivals (Thumbnail Card) */}
                <AmazonThumbnailCard
                    title="New arrivals in Home"
                    mainImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                    mainImageAlt="Home new arrivals"
                    thumbnails={[
                        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
                        "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
                        "https://images.pexels.com/photos/3935316/pexels-photo-3935316.jpeg?auto=compress&cs=tinysrgb&w=800",
                        "https://images.pexels.com/photos/6489083/pexels-photo-6489083.jpeg?auto=compress&cs=tinysrgb&w=800"
                    ]}
                    linkText="Shop the latest from Home"
                    linkHref="/products"
                />

            </section>
        </div>
    );
}

export default DiscoveryGrid;

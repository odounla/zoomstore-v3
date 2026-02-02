import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are redefining the way you shop.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Welcome to Zoomstore – where innovation meets convenience. Discover a
          shopping experience tailored to your lifestyle, offering quality,
          variety, and unbeatable ease. Shop smarter, live better! We are
          revolutionizing the way you shop. Dive into a world of endless
          possibilities, where quality meets affordability, and every purchase
          feels effortless. Shop smarter, live better, and join the movement
          that’s redefining convenience and style!
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;

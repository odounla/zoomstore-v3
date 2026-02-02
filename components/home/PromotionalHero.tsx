import Link from "next/link";
import { Button } from "../ui/button";

function PromotionalHero() {
    return (
        <section className="relative w-full h-[500px] flex items-center justify-start rounded-b-lg overflow-hidden group">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // Shopping bags/lifestyle image
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-16 max-w-2xl text-white animate-in slide-in-from-left-10 duration-700 fade-in">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                    Redefining the <br />
                    <span className="text-primary-foreground">way you shop.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg mb-8">
                    Discover a world where quality meets convenience.
                    The latest trends in basketball jerseys and streetwear are just a click away.
                </p>
                <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                    <Link href="/products">Shop Now</Link>
                </Button>
            </div>
        </section>
    );
}

export default PromotionalHero;

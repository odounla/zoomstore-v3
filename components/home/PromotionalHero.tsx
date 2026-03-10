import Link from "next/link";
import { Button } from "../ui/button";

function PromotionalHero() {
    return (
        <section className="relative w-full min-h-[500px] md:h-[600px] flex items-center justify-start rounded-b-lg overflow-hidden group bg-black">
            {/* Background Image Collage */}
            <div className="absolute inset-0 z-0 flex transition-transform duration-700 group-hover:scale-105">
                <div
                    className="w-1/3 h-full bg-cover bg-center border-r-4 border-black transition-opacity duration-300 hover:opacity-100 opacity-80"
                    style={{ backgroundImage: "url('/hero/model_basketball.png')", backgroundPosition: "top center" }}
                />
                <div
                    className="w-1/3 h-full bg-cover bg-center border-r-4 border-black transition-opacity duration-300 hover:opacity-100 opacity-80"
                    style={{ backgroundImage: "url('/hero/model_softball.png')", backgroundPosition: "center center" }}
                />
                <div
                    className="w-1/3 h-full bg-cover bg-center transition-opacity duration-300 hover:opacity-100 opacity-80"
                    style={{ backgroundImage: "url('/hero/model_volleyball.png')", backgroundPosition: "top center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-16 max-w-2xl text-white animate-in slide-in-from-left-10 duration-700 fade-in">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight drop-shadow-lg">
                    Redefining the <br />
                    <span className="text-primary-foreground drop-shadow-md">way you shop.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg drop-shadow">
                    Discover a world where quality meets convenience.
                    The latest trends in athletic gear and streetwear are just a click away.
                </p>
                <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full font-semibold shadow-[0_0_20px_rgba(255,152,0,0.5)] hover:shadow-[0_0_30px_rgba(255,152,0,0.8)] transition-all bg-orange-500 hover:bg-orange-600 border-none text-white">
                    <Link href="/products">Shop Now</Link>
                </Button>
            </div>
        </section>
    );
}

export default PromotionalHero;

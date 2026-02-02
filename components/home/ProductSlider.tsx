import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type ProductSliderProps = {
    title: string;
    products: Product[];
    hideViewAll?: boolean;
};

function ProductSlider({ title, products, hideViewAll = false }: ProductSliderProps) {
    return (
        <section className="max-w-[1500px] mx-auto px-4 mb-16">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                {!hideViewAll && (
                    <Button asChild variant="link" className="text-cyan-600 font-semibold">
                        <Link href="/products">View All</Link>
                    </Button>
                )}
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {products.map((product) => {
                        const { name, price, image, id } = product;
                        const dollarsAmount = formatCurrency(price);
                        return (
                            <CarouselItem key={id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                <Link href={`/products/${id}`} className="group">
                                    <Card className="border-none shadow-none h-full">
                                        <CardContent className="p-0">
                                            <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-3">
                                                <Image
                                                    src={image}
                                                    alt={name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{name}</h3>
                                            <div className="flex items-center mt-1 space-x-2">
                                                <p className="font-bold text-lg">{dollarsAmount}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">Get it by Tomorrow</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="left-0 md:-left-4" />
                <CarouselNext className="right-0 md:-right-4" />
            </Carousel>
        </section>
    );
}

export default ProductSlider;

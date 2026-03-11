const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const epicSportsProducts = [
    {
        name: "Augusta Ladies Tricot Mesh Reversible Jersey",
        company: "Augusta",
        description: "Augusta Ladies Tricot Mesh Reversible Jersey. Colors: Royal/Gold (Reversible). Designed for performance and comfort on the court.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233583/500/augusta-ladies-tricot-mesh-reversible-2-0-jersey-163.jpg",
        price: 1799,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Augusta Men Youth Hook Shot Reversible Jersey",
        company: "Augusta",
        description: "Augusta Men Youth Hook Shot Reversible Jersey. Colors: Black/Digi, Navy/Digi. Excellent breathability for active gameplay.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233499/500/augusta-men-youth-hook-shot-reversible-basketball-jersey.jpg",
        price: 1799,
        clerkId: "seed_epic_sports",
    },
    {
        name: "High Five Womens Reversible Competition Jersey",
        company: "High Five",
        description: "High Five Womens Reversible Competition Jersey. Colors: Purple/White (Reversible). Professional grade competition wear.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233744/500/high-five-womens-reversible-competition-basketball-jersey.jpg",
        price: 1799,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Augusta Hook Shot Reversible Shorts",
        company: "Augusta",
        description: "Augusta Hook Shot Reversible Shorts. Colors: Purple/Digi, Navy/Digi. Lightweight and durable basketball shorts.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233500/500/augusta-hook-shot-reversible-shorts.jpg",
        price: 1699,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Reversible Basketball Shorts (Adult 9\" / Youth 6\")",
        company: "Basketzoom",
        description: "Reversible Basketball Shorts (Adult 9\" / Youth 6\"). Colors: Purple/White (Reversible). Classic fit for ultimate mobility.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233102/500/reversible-basketball-shorts.jpg",
        price: 1699,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Epic Orange Rubber Recreational Basketballs",
        company: "Epic",
        description: "Epic Orange Rubber Recreational Basketballs. Size: #5 - 27.5\" (Junior). Perfect for indoor and outdoor practice.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/134388/500/epic-orange-rubber-recreational-basketballs.jpg",
        price: 1749,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Adult Youth Relaxed Fit T-Shirt",
        company: "Basketzoom",
        description: "Adult Youth Relaxed Fit T-Shirt. Colors: Graphite, Navy. Everyday comfort and athletic reliability.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/130171/500/adult-youth-relaxed-fit-t-shirt.jpg",
        price: 1549,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Adult Youth Wicking Heather T-Shirt",
        company: "Basketzoom",
        description: "Adult Youth Wicking Heather T-Shirt. Color: Power Yellow/Graphite Heather. Moisture wicking technology to keep you dry.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233688/500/adult-youth-wicking-heather-t-shirt.jpg",
        price: 1549,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Adult Color Block Digi Camo Athletic Jersey",
        company: "Basketzoom",
        description: "Adult Color Block Digi Camo Athletic Jersey. Colors: Royal/Silver, Navy/Silver. Stand out on the field with modern camo design.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233629/500/adult-color-block-digi-camo-athletic-jerseys.jpg",
        price: 1649,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Adult 3-Button Contrasting Color Polo",
        company: "Basketzoom",
        description: "Adult 3-Button Contrasting Color Polo. Color: Brown/White. Professional look for coaches and staff.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233335/500/adult-3-button-polo-shirt.jpg",
        price: 1699,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Adult Snag Resistant Sharkbite Polo",
        company: "Basketzoom",
        description: "Adult Snag Resistant Sharkbite Polo. Color: Forest/White. Highly durable fabric that resists snags and tears.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/96941/500/adult-snag-resistant-polo.jpg",
        price: 1699,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Augusta Sportswear 3-Button Scout Polo",
        company: "Augusta",
        description: "Augusta Sportswear 3-Button Scout Polo. Color: Dark Green/Slate. Premium quality coaching wear.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/107192/500/augusta-sportswear-scout-polo.jpg",
        price: 1699,
        clerkId: "seed_epic_sports",
    },
    {
        name: "Adult Youth 2-Button Semi-Fitted Shirt",
        company: "Basketzoom",
        description: "Adult Youth 2-Button Semi-Fitted Shirt. Colors: Cardinal, Dark Maroon. Semi-fitted for a tailored, athletic profile.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233257/500/adult-youth-2-button-shirt.jpg",
        price: 1699,
        clerkId: "seed_epic_sports",
    }
];

async function main() {
    const category = await prisma.category.upsert({
        where: { name: 'Sports' },
        update: {},
        create: { name: 'Sports' },
    });

    console.log('Cleaning up previous epic sports seed data...');
    await prisma.product.deleteMany({
        where: { clerkId: 'seed_epic_sports' }
    });

    console.log('Seeding Epic Sports merchandising products...');
    for (const product of epicSportsProducts) {
        const p = await prisma.product.create({
            data: {
                ...product,
                categoryId: category.id,
            },
        });
        console.log(`Created: ${p.name} at ${p.price}`);
    }
}

main()
    .then(async () => {
        console.log("Seeding complete!");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

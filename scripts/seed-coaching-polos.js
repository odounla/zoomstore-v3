const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const coachingPolos = [
    {
        name: "Adult 3-Button Heathered Polo Shirt",
        company: "Basketzoom",
        description: "Adult 3-Button Heathered Polo Shirt. Colors: White / Cardinal Heather. Best For: Head Coaches, Formal Events. Features: 3-button, Heathered texture, Moisture wicking.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233314/500/adult-3-button-heathered-polo-shirt.jpg",
        price: 1799,
        clerkId: "seed_coaching_polos",
    },
    {
        name: "Adult 2-Color Polo Sport Shirt",
        company: "Basketzoom",
        description: "Adult 2-Color Polo Sport Shirt. Colors: Royal/Gold, Royal/Orange, Navy/White. Best For: Assistant Coaches, Athletic Staff.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233769/500/adult-2-color-polo-sport-shirt.jpg",
        price: 1699,
        clerkId: "seed_coaching_polos",
    },
    {
        name: "Adult 2-Color Accented Polo Shirt",
        company: "Basketzoom",
        description: "Adult 2-Color Accented Polo Shirt. Colors: Navy/Red/White, Royal/Black/White, Navy/Graphite. Best For: Staff, Volunteers, Team Unity.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/149652/500/adult-2-color-accented-polo-shirt.jpg",
        price: 1599,
        clerkId: "seed_coaching_polos",
    }
];

async function main() {
    const category = await prisma.category.upsert({
        where: { name: 'Sports' },
        update: {},
        create: { name: 'Sports' },
    });

    console.log('Cleaning up previous coaching polos seed data...');
    await prisma.product.deleteMany({
        where: { clerkId: 'seed_coaching_polos' }
    });

    console.log('Seeding Coaching Collection polos...');
    for (const polo of coachingPolos) {
        const p = await prisma.product.create({
            data: {
                ...polo,
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

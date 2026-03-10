const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sportsProducts = [
    {
        name: "Russell Youth Reversible Basketball Tank",
        company: "Russell",
        description: "This Russell Youth Reversible 1-Ply Basketball Tank features Dri-Power® technology. It comes in a vibrant True Red and White colorway, perfect for energetic sports action. The tank is designed for optimal comfort and durability on the basketball court, making it an excellent choice for young athletes.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/131554/500/russell-youth-reversible-basketball-tank.jpg",
        price: 18,
        clerkId: "seed_admin",
    },
    {
        name: "Womens Sleeveless Reversible Basketball Jersey",
        company: "Basketzoom",
        description: "Womens Sleeveless Reversible Basketball Jersey in a bold Burnt Orange and White. It is a vital part of the intense Power Collection, providing confidence and comfort for women athletes during intense basketball games. Designed for both form and function.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233105/500/womens-sleeveless-reversible-basketball-jersey.jpg",
        price: 19,
        clerkId: "seed_admin",
    },
    {
        name: "Womens 7 Inch Reversible Basketball Shorts",
        company: "Basketzoom",
        description: "Womens 7-inch Reversible Basketball Shorts from the energetic Citrus Collection. The gold and white design offers fresh summer vibes that ensure tournament visibility while keeping players dry and highly competitive on the court.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233103/500/womens-reversible-basketball-shorts.jpg",
        price: 17,
        clerkId: "seed_admin",
    },
    {
        name: "Augusta Womens Closer Button-Up Softball Jersey",
        company: "Augusta",
        description: "Augusta Womens Closer Button-Up Softball Jersey in stunning Lime and White or Power Pink. Perfect for women's sports empowerment, offering a classic fit, breathable fabric, and unmatched durability for those long innings on the diamond.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233587/500/augusta-womens-closer-softball-jersey.jpg",
        price: 18,
        clerkId: "seed_admin",
    },
    {
        name: "Womens 2-Button 2-Color Softball Jerseys",
        company: "Basketzoom",
        description: "Womens 2-Button, 2-Color Softball Jerseys available in vibrant Orange, Gold, and Lime. These jerseys belong to the Citrus Collection, bringing fresh and energetic summer vibes that are perfect for maintaining high visibility on the field.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233551/500/womens-2-button-softball-jerseys.jpg",
        price: 17,
        clerkId: "seed_admin",
    },
    {
        name: "Augusta Adult 2-Button Baseball Blast Jersey",
        company: "Augusta",
        description: "Augusta Adult 2-Button Baseball Blast Jersey in a traditional Purple and Gold styling. Part of our Classic Collection, this elegant championship-color jersey provides the ultimate traditional look without sacrificing modern moisture-wicking technology.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/233550/500/augusta-baseball-blast-jersey.jpg",
        price: 17,
        clerkId: "seed_admin",
    },
    {
        name: "Ladies Long Sleeve Court Volleyball V-Neck Jersey",
        company: "Basketzoom",
        description: "Ladies Long Sleeve Court Volleyball V-Neck Jersey in striking Lime and White. Features a comfortable V-neck design and long sleeves for diving protection on the court. Tailored for athletes seeking the perfect blend of form, function, and style.",
        featured: true,
        image: "https://epicsports.cachefly.net/images/107868/500/ladies-long-sleeve-volleyball-jersey.jpg",
        price: 18,
        clerkId: "seed_admin",
    },
    {
        name: "Motion Stripes Crew Socks",
        company: "Basketzoom",
        description: "Motion Stripes - Crew Socks featuring a black body with classic white stripes. Provides cushioned support to keep your feet comfortable through game point. An essential accessory for athletes requiring top-tier performance from their gear.",
        featured: false,
        image: "https://epicsports.cachefly.net/images/146980/500/motion-stripes-crew-socks.jpg",
        price: 15,
        clerkId: "seed_admin",
    }
];

async function main() {
    const category = await prisma.category.upsert({
        where: { name: 'Sports' },
        update: {},
        create: { name: 'Sports' },
    });

    console.log('Cleaning up previous seed data...');
    await prisma.product.deleteMany({
        where: { clerkId: 'seed_admin' }
    });

    console.log('Seeding Sports products with correct prices...');
    for (const product of sportsProducts) {
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

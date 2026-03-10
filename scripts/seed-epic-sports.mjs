import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Fetching first user to act as admin...')
    let userClerkId = 'admin_user'; // Fallback
    // Just querying for a user or product with a clerkId if it exists to keep consistency
    const existingProduct = await prisma.product.findFirst();
    if (existingProduct) {
        userClerkId = existingProduct.clerkId;
    }

    console.log('Ensuring Category exists...')
    let categoryStr = 'Apparel'
    let category = await prisma.category.findUnique({
        where: { name: categoryStr }
    })

    if (!category) {
        category = await prisma.category.create({
            data: { name: categoryStr }
        })
    }

    const productsData = [
        {
            name: "Russell Youth Reversible 1-Ply Basketball Tank",
            company: "Epic Sports",
            description: "Color: True Red/White | Size: AXL | SKU: E131554 - Dri-Power®, Reversible",
            featured: true,
            image: "https://epicsports.cachefly.net/images/131554/500/russell-youth-reversible-basketball-tank.jpg",
            price: 18,
        },
        {
            name: "Womens Sleeveless Reversible Basketball Jersey",
            company: "Epic Sports",
            description: "Color: Burnt Orange/White | Sizes: WM, WL, WXL | SKU: E233105",
            featured: true,
            image: "https://epicsports.cachefly.net/images/233105/500/womens-sleeveless-reversible-basketball-jersey.jpg",
            price: 19,
        },
        {
            name: 'Womens 7" Reversible Basketball Shorts',
            company: "Epic Sports",
            description: "Color: Gold/White | Sizes: WM, WL, WXL, W2XL | SKU: E233103",
            featured: true,
            image: "https://epicsports.cachefly.net/images/233103/500/womens-reversible-basketball-shorts.jpg",
            price: 17,
        },
        {
            name: "Augusta Womens Closer Button-Up Softball Jersey",
            company: "Augusta",
            description: "Colors: Lime/White, Power Pink/White | Sizes: WS, WM, WL, WXL | SKU: E233587",
            featured: true,
            image: "https://epicsports.cachefly.net/images/233587/500/augusta-womens-closer-softball-jersey.jpg",
            price: 18,
        },
        {
            name: "Womens 2-Button, 2-Color Softball Jerseys",
            company: "Epic Sports",
            description: "Colors: Orange, Gold, Lime, Royal/Red | Sizes: WM, WXL, W2XL | SKU: E233551",
            featured: true,
            image: "https://epicsports.cachefly.net/images/233551/500/womens-2-button-softball-jerseys.jpg",
            price: 17,
        },
        {
            name: "Augusta Adult 2-Button Baseball Blast Jersey",
            company: "Augusta",
            description: "Color: Purple/Gold/White | Size: A3XL | SKU: E233550",
            featured: true,
            image: "https://epicsports.cachefly.net/images/233550/500/augusta-baseball-blast-jersey.jpg",
            price: 17,
        },
        {
            name: "Ladies Long Sleeve Court Volleyball V-Neck Jersey",
            company: "Epic Sports",
            description: "Color: Lime/White | Size: WXL | SKU: E107868 | Features: Long sleeve, V-neck",
            featured: true,
            image: "https://epicsports.cachefly.net/images/107868/500/ladies-long-sleeve-volleyball-jersey.jpg",
            price: 18,
        },
        {
            name: "Motion Stripes - Crew Socks (1-Pair)",
            company: "Epic Sports",
            description: "Color: Black Body/White Stripes | Sizes: Medium, Large | SKU: E146980",
            featured: true,
            image: "https://epicsports.cachefly.net/images/146980/500/motion-stripes-crew-socks.jpg",
            price: 15,
        }
    ]

    console.log('Inserting products...')
    for (const prod of productsData) {
        await prisma.product.create({
            data: {
                ...prod,
                clerkId: userClerkId,
                categoryId: category.id,
            }
        })
        console.log(`✅ Created product: ${prod.name}`)
    }

    console.log('Done!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

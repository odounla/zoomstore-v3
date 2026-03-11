const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log('Fetching all products...');
    const products = await prisma.product.findMany();

    console.log(`Found ${products.length} products. Starting price update...`);

    let updatedCount = 0;

    for (const product of products) {
        // Generate random price between 1500 and 3500 cents ($15.00 - $35.00)
        const randomPriceCents = Math.floor(Math.random() * (3500 - 1500 + 1)) + 1500;

        await prisma.product.update({
            where: { id: product.id },
            data: { price: randomPriceCents }
        });

        updatedCount++;
    }

    console.log(`Successfully updated ${updatedCount} products with random prices between $15 and $35.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("Error updating prices:", e);
        await prisma.$disconnect();
        process.exit(1);
    });

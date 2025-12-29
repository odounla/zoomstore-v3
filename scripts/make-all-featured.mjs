import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        const update = await prisma.product.updateMany({
            data: {
                featured: true,
            },
        });
        console.log(`Updated ${update.count} products to be Featured.`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Looking for old test products to unpublish...");

        // Find the products inserted during testing that have short names ('2', '3', etc)
        const update = await prisma.product.updateMany({
            where: {
                OR: [
                    { name: '2' },
                    { name: '3' },
                    { name: '4' },
                    { name: '5' },
                    { name: '6' },
                    { name: '7' },
                ]
            },
            data: {
                featured: false,
            },
        });
        console.log(`Successfully unpublished ${update.count} test products.`);
    } catch (e) {
        console.error("Error updating products:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

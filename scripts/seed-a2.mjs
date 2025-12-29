import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'A 2');

    try {
        const files = await fs.readdir(imagesDir);
        const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

        console.log(`Found ${imageFiles.length} images in A 2 folder.`);

        // specific category for these
        const category = await prisma.category.upsert({
            where: { name: 'Showcase' },
            update: {},
            create: { name: 'Showcase' },
        });

        for (const file of imageFiles) {
            const name = file.replace(/\.[^/.]+$/, "").replace(/-|_/g, " "); // remove ext, replace - with space
            const imagePath = `/images/A 2/${file}`;

            // Check if exists to avoid duplicates
            const exists = await prisma.product.findFirst({
                where: { image: imagePath }
            });

            if (!exists) {
                await prisma.product.create({
                    data: {
                        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize
                        company: "ZoomStore Collection",
                        description: "Exclusive item from the A2 collection.",
                        featured: true,
                        image: imagePath,
                        price: Math.floor(Math.random() * 200) + 50, // Random price 50-250
                        categoryId: category.id,
                        clerkId: 'system-seed',
                    }
                });
                console.log(`Created product: ${name}`);
            } else {
                console.log(`Skipped existing: ${name}`);
            }
        }

    } catch (error) {
        console.error("Error reading directory:", error);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

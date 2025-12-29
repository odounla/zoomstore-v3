const { PrismaClient } = require("@prisma/client");
const products = require("./products.json");
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.upsert({
    where: { name: 'Furniture' },
    update: {},
    create: { name: 'Furniture' },
  });

  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        categoryId: category.id,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

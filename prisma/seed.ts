/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      name: "Technology",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Health",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: "Lifestyle",
    },
  });

  // Create Snippets
  await prisma.snippet.createMany({
    data: [
      {
        text: "This is a tech snippet.",
        categoryId: category1.id,
      },
      {
        text: "Health is wealth.",
        categoryId: category2.id,
      },
      {
        text: "Living life to the fullest.",
        categoryId: category3.id,
      },
      {
        text: "JavaScript and Node.js are awesome!",
        categoryId: category1.id,
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

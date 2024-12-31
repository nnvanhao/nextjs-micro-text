import { prisma } from "./prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Unable to fetch category data");
  }
}

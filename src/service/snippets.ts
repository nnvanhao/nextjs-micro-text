import { prisma } from "./prisma";

export async function getSnippets(search?: string) {
  try {
    const snippets = await prisma.snippet.findMany({
      where: search
        ? {
            text: {
              contains: search,
              mode: "insensitive",
            },
          }
        : undefined,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return snippets;
  } catch (error) {
    console.error("Error fetching snippets:", error);
    throw new Error("Unable to fetch snippet data");
  }
}

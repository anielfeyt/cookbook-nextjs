import { prisma } from "@/services/prisma";

export function getAllCategories() {
  try {
    return prisma.category.findMany();
  } catch (error) {
    console.error(error);
    throw new Response("Failed to get the categories", { status: 500 });
  }
}

export function getCategoryById(id: number) {
  try {
    return prisma.category.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    throw new Response("Failed to get the category", { status: 500 });
  }
}

export function createCategory(data: { name: string }) {
  try {
    return prisma.category.create({ data });
  } catch (error) {
    console.error(error);
    throw new Response("Failed to create the category", { status: 500 });
  }
}

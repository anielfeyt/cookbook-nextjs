"use server";
import { prisma } from "@/services/prisma";
import { kebabCase } from "@/utils/fn";
import { Recipe } from "@prisma/client";

export async function addRecipe(data: Omit<Recipe, "id">) {
  try {
    const response = await prisma.recipe.create({
      data: {
        title: data.title,
        description: data.description,
        timeToMake: data.timeToMake,
        ingredients: data.ingredients,
        instructions: data.instructions,
        image: data.image,
        categoryName: data.categoryName,
        userId: data.userId,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Response("Failed to create the recipe", { status: 500 });
  }
}

export async function getAllRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        title: "asc",
      },
    });

    // Add the AWS S3 bucket URL to the image
    return recipes.map((recipe) => {
      // Build the image link
      const imageURL = recipe.image
        ? `${process.env.AWS_BUCKET_READ_URL}/${recipe.image}`
        : null;

      // Create a string URL from the title
      const slug = kebabCase(recipe.title);
      return { ...recipe, imageSrc: imageURL, slug };
    });
  } catch (error) {
    console.error(error);
    throw new Response("Failed to get all recipes", { status: 500 });
  }
}

export async function getRecipesByUserId(userId: string) {
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        userId,
      },
      orderBy: {
        title: "asc",
      },
    });

    // Add the AWS S3 bucket URL to the image
    return recipes.map((recipe) => {
      const imageURL = recipe.image
        ? `${process.env.AWS_BUCKET_READ_URL}/${recipe.image}`
        : null;

      // Create a string URL from the title
      const slug = kebabCase(recipe.title);

      return { ...recipe, imageSrc: imageURL, slug };
    });
  } catch (error) {
    console.error(error);
    throw new Response(
      `Failed to get the recipes for user with ID: ${userId}`,
      { status: 500 }
    );
  }
}

export async function getRecipeById(recipeId: string) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(recipeId),
      },
    });

    if (!recipe) {
      return null;
    }

    // Add the AWS S3 bucket URL to the image
    const imageURL = recipe?.image
      ? `${process.env.AWS_BUCKET_READ_URL}/${recipe?.image}`
      : null;

    // Create a string URL from the title
    const slug = kebabCase(recipe.title);

    return { ...recipe, imageSrc: imageURL, slug } as Recipe & {
      slug: string;
      imageSrc: string;
    };
  } catch (error) {
    console.error(error);
    throw new Response(`Failed to get the recipe with ID: ${recipeId}`, {
      status: 500,
    });
  }
}

export async function updateRecipe(
  data: Omit<Recipe, "createdAt">,
  userId: string
) {
  try {
    const response = await prisma.recipe.update({
      where: {
        id: Number(data.id),
      },
      data: {
        ...data,
        userId: userId,
      },
    });
    console.log("Recipe updated", response);
    return { message: "Recipe updated", status: 200 };
  } catch (error) {
    console.error(error);
    throw new Response("Failed to update the recipe", { status: 500 });
  }
}

export async function updateRecipeImage(recipeId: string, imageUrl: string) {
  try {
    return await prisma.recipe.update({
      where: {
        id: Number(recipeId),
      },
      data: {
        image: imageUrl,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Response("Failed to update the recipe image", { status: 500 });
  }
}

export async function deleteRecipe(recipeId: string) {
  try {
    return prisma.recipe.delete({
      where: {
        id: Number(recipeId),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Response(`Failed to delete the recipe with ID: ${recipeId}`, {
      status: 500,
    });
  }
}

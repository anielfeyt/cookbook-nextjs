import { getAllCategories } from "@/queries/category";
import { getRecipeById } from "@/queries/recipe";
import { createClient } from "@/services/supabase/server";
import UpdateForm from "@/ui/recipe/update-form";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ id: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params;
  const recipe = await getRecipeById(id);

  return {
    title: recipe?.title,
    alternates: {
      canonical: `/recipe/${id}/${slug}`,
    },
  };
}

export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  const supabase = await createClient();

  const response = await getAllCategories();

  const categories = response.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isUserRecipe = recipe?.userId === user?.id;

  if (!isUserRecipe || !recipe) {
    return <div>Not authorized</div>;
  }

  return (
    <div className="container mx-auto px-4 max-w-screen-lg">
      <h1 className="text-5xl font-bold mb-5">Update Recipe</h1>
      <UpdateForm recipe={recipe} categories={categories} />
    </div>
  );
}

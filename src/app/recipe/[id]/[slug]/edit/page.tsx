import { getAllCategories } from "@/queries/category";
import { getRecipeById } from "@/queries/recipe";
import { createClient } from "@/services/supabase/server";
import UpdateForm from "@/ui/recipe/update-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ id: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const isUserRecipe = recipe?.userId === data.user?.id;

  const response = await getAllCategories();

  const categories = response.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  if (error || !isUserRecipe || !recipe) {
    redirect("/login");
  }

  return (
    <>
      <h1 className="text-5xl font-bold mb-5">Update Recipe</h1>
      <UpdateForm recipe={recipe} categories={categories} />
    </>
  );
}

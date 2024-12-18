import { getAllCategories } from "@/queries/category";
import { createClient } from "@/services/supabase/server";
import CreateForm from "@/ui/recipe/create-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Create a Recipe",
    description: "Create a new recipe to share with the world.",
  };
}

export default async function CreateRecipePage() {
  const response = await getAllCategories();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/login");
  }

  const categories = response.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  return (
    <div className="container mx-auto px-4 max-w-screen-lg">
      <h1 className="text-5xl font-bold mb-5">Create a Recipe</h1>

      <CreateForm categories={categories} />
    </div>
  );
}

import { getRecipesByUserId } from "@/queries/recipe";
import { createClient } from "@/services/supabase/server";
import RecipeGrid from "@/ui/recipes/recipe-grid";
import { redirect } from "next/navigation";

export default async function UserRecipesPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  const recipes = await getRecipesByUserId(data.user.id);

  return <RecipeGrid recipes={recipes} />;
}

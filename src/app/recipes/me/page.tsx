import RecipeCard from "@/components/RecipeCard";
import { getRecipesByUserId } from "@/queries/recipe";
import { createClient } from "@/services/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserRecipesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const recipes = await getRecipesByUserId(user.id);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1 className="text-5xl font-bold mb-5">My Recipes</h1>
      </div>
      {(!recipes || recipes.length === 0) && <p>No recipes found</p>}
      <div className="mb-4">
        <Link className="btn btn-primary" href="/recipe/create">
          Create Recipe
        </Link>
      </div>
      {recipes && (
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <Link href={`/recipe/${recipe.id}/${recipe.slug}`} key={recipe.id}>
              <RecipeCard
                imgSrc={recipe?.image || ""}
                title={recipe.title}
                time={recipe.timeToMake}
                ingredientCount={recipe.ingredients.length}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

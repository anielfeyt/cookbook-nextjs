import RecipeCardSkeleton from "@/components/RecipeCard/RecipeCardSkeleton";
import { getAllRecipes } from "@/queries/recipe";
import RecipeGrid from "@/ui/recipes/recipe-grid";
import { Suspense } from "react";

export default async function HomePage() {
  const recipes = await getAllRecipes();

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1>All Recipes</h1>
      </div>

      <Suspense
        fallback={
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((item) => (
              <RecipeCardSkeleton key={item} />
            ))}
          </div>
        }
      >
        <RecipeGrid recipes={recipes} />
      </Suspense>
    </div>
  );
}

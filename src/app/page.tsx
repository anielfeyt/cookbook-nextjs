import { getAllRecipes } from "@/queries/recipe";
import RecipeGrid from "@/ui/recipes/recipe-grid";

export default async function HomePage() {
  const recipes = await getAllRecipes();

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1>All Recipes</h1>
      </div>

      <RecipeGrid recipes={recipes} />
    </div>
  );
}

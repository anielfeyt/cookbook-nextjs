import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes } from "@/queries/recipe";
import Link from "next/link";

export default async function Home() {
  const recipes = await getAllRecipes();

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1 className="text-5xl font-bold mb-5">All Recipes</h1>
      </div>

      {(!recipes || recipes.length === 0) && <p>No recipes found</p>}

      {recipes && (
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <Link href={`/recipe/${recipe.id}/${recipe.slug}`} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

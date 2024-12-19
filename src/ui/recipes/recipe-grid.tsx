import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import React from "react";

type RecipeWithSlug = Recipe & { slug: string };

type RecipeGridProps = {
  recipes: RecipeWithSlug[];
};

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <article>
      {(!recipes || recipes.length === 0) && <p>No recipes found.</p>}

      {recipes && (
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <Link href={`/recipe/${recipe.id}/${recipe.slug}`} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

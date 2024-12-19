"use client";
import RecipeCardSkeleton from "@/components/RecipeCard/RecipeCardSkeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
      {Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((item) => (
        <RecipeCardSkeleton key={item} />
      ))}
    </div>
  );
}

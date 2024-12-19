function RecipeCardSkeleton() {
  return (
    <article className="recipe-card inline-block  sm:p-4 p-2 rounded-lg hover:bg-base-200 cursor-pointer  transition border border-base-200">
      <div className="skeleton rounded-lg h-auto w-full aspect-square mb-4"></div>

      <div className="skeleton h-6 w-24 mb-2"></div>
      <div className="flex gap-2 flex-wrap">
        <div className="skeleton h-5 w-20"></div>
        <div className="skeleton h-5 w-8"></div>
        <div className="skeleton h-5 w-10"></div>
      </div>
    </article>
  );
}

export default RecipeCardSkeleton;

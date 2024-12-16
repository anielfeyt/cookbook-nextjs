import Image from "next/image";

type RecipeCardProps = {
  imgSrc?: string;
  title: string;
  time: string;
  ingredientCount: number;
};

function RecipeCard({ imgSrc, title, time, ingredientCount }: RecipeCardProps) {
  return (
    <article className="recipe-card inline-block  sm:p-4 p-2 rounded-lg hover:bg-base-200 cursor-pointer  transition border border-accent">
      <div className="overflow-hidden rounded-lg mb-4 ">
        <Image
          width={300}
          height={300}
          src={imgSrc || "/images/placeholder-recipe.jpg"}
          alt={title}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
        />
      </div>

      <h2 className="text-base sm:text-xl font-medium mb-1 line-clamp-1">
        {title}
      </h2>
      <div className="flex gap-2">
        <div className="badge badge-secondary">
          {ingredientCount} Ingredient{ingredientCount > 1 ? "s" : ""}
        </div>
        <div className="badge badge-primary flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          {time}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;

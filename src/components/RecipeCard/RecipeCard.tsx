import { Recipe } from "@prisma/client";
import Image from "next/image";

type RecipeCardProps = {
  recipe: Recipe & { imageSrc?: string };
};

function RecipeCard({ recipe }: RecipeCardProps) {
  const { imageSrc, title, ingredients, timeToMake, servingSize } = recipe;

  return (
    <article className="recipe-card inline-block  sm:p-4 p-2 rounded-lg hover:bg-base-200 cursor-pointer  transition border border-accent">
      <div className="overflow-hidden rounded-lg mb-4 ">
        <Image
          width={300}
          height={300}
          src={imageSrc || "/images/placeholder-recipe.jpg"}
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
      <div className="flex gap-2 flex-wrap">
        <div className="badge badge-secondary flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          {ingredients.length}
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
          {timeToMake}
        </div>
        {servingSize && (
          <div className="badge badge-accent flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>

            {servingSize}
          </div>
        )}
      </div>
    </article>
  );
}

export default RecipeCard;

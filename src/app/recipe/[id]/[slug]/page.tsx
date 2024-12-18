import type { Metadata } from "next";
import { getRecipeById } from "@/queries/recipe";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/services/supabase/server";
import ActionBar from "@/ui/recipe/actionbar";

type Props = {
  params: Promise<{ id: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params;
  const recipe = await getRecipeById(id);

  return {
    title: recipe?.title,
    alternates: {
      canonical: `/recipe/${id}/${slug}`,
    },
  };
}

export default async function RecipePage({ params }: Props) {
  // TODO: ensure you cannot type any string in the [slug] part of the URL
  const { id, slug } = await params;
  const recipe = await getRecipeById(id);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isUserRecipe = recipe?.userId === user?.id;

  return (
    <div className="container mx-auto px-4 max-w-screen-lg">
      <article>
        <div className="flex mb-8 justify-between">
          <Link className="btn btn-sm" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="flex gap-3">
            <ActionBar id={id} slug={slug} isUserRecipe={isUserRecipe} />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 mb-8">
          <div>
            <Image
              width={500}
              height={500}
              src={recipe?.image || "/images/placeholder-recipe.jpg"}
              alt={recipe?.title || "Recipe Image"}
              className="rounded-lg mb-4 "
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                aspectRatio: "1/1",
              }}
            />
          </div>
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-medium mb-4">{recipe?.title}</h1>
            <div className="border-2 p-4 rounded-md border-accent">
              <div className="text-accent font-medium flex flex-row gap-4  items-center">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {recipe?.timeToMake}
                </span>
                <span className="font-medium ">
                  Category: {recipe?.categoryName}
                </span>
                {recipe?.servingSize && (
                  <span className="font-medium ">
                    Servings: {recipe?.servingSize}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="divider divider-accent"></div>
        <div>
          <h2 className="text-xl font-medium mt-8 mb-4">Description</h2>
          <p className="mt-4 whitespace-pre-wrap">{recipe?.description}</p>

          <div>
            <h2 className="text-xl font-medium mt-8 mb-4">Ingredients</h2>
            <ul>
              {recipe?.ingredients?.map((ingredient) => (
                <li key={ingredient}>
                  <div className="flex gap-2 items-center">
                    <span className="text-accent">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        className="size-6"
                        fill="none"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="12" r="6" />
                      </svg>
                    </span>
                    <span>{ingredient}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <h2 className="text-xl font-medium mt-8 mb-4">Instructions</h2>
          <div className="whitespace-pre-wrap">{recipe?.instructions}</div>
        </div>
      </article>
    </div>
  );
}

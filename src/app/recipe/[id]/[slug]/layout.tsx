import type { Metadata } from "next";
import { getAllRecipes, getRecipeById } from "@/queries/recipe";

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

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
export async function generateStaticParams() {
  const recipes = await getAllRecipes();

  return recipes.map((recipe) => ({
    id: recipe.id.toString(),
    slug: recipe.slug,
  }));
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto px-4 max-w-screen-lg">{children}</div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "My Recipes - Cookbook",
  description: "My recipes page",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1>My Recipes</h1>
      </div>
      <div className="mb-4">
        <Link className="btn btn-primary" href="/recipe/create">
          Create Recipe
        </Link>
      </div>
      <Suspense fallback={<Loading />} name="My Recipes">
        {children}
      </Suspense>
    </div>
  );
}

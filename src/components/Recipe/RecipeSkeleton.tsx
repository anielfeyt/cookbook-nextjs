import React from "react";

export default function RecipeSkeleton() {
  return (
    <article>
      <div className="flex mb-8 justify-between">
        <div className="skeleton h-8 w-20"></div>
        <div className="skeleton h-8 w-48"></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        <div>
          <div className="skeleton rounded-lg h-auto w-full aspect-square"></div>
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          <div className="skeleton h-8 w-40 mb-8"></div>
          <div className="skeleton h-[60px] w-full"></div>
        </div>
      </div>
      <div className="divider divider-base-200"></div>
      <div>
        <div className="skeleton h-8 w-40 mt-8 mb-4"></div>
        <div className="skeleton h-6 w-full mb-1"></div>
        <div className="skeleton h-6 w-1/2 mb-1"></div>

        <div>
          <div className="skeleton h-8 w-48 mt-8 mb-4"></div>
          <div className="skeleton h-6 w-40 mb-1"></div>
          <div className="skeleton h-6 w-40 mb-1"></div>
          <div className="skeleton h-6 w-40 mb-1"></div>
          <div className="skeleton h-6 w-40 mb-1"></div>
        </div>

        <div className="mb-8">
          <div className="skeleton h-8 w-40 mt-8 mb-4"></div>
          <div className="skeleton h-6 w-full mb-1"></div>
          <div className="skeleton h-6 w-full mb-1"></div>
          <div className="skeleton h-6 w-1/2 mb-1"></div>
          <div className="skeleton h-6 w-1/2 mb-1"></div>
        </div>
      </div>
    </article>
  );
}

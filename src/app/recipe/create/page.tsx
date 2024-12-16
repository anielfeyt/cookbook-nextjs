"use client";
import FileInput from "@/components/Form/Controls/FileInput";
import Input from "@/components/Form/Controls/Input";
import List from "@/components/Form/Controls/List";
import Select from "@/components/Form/Controls/Select";
import Textarea from "@/components/Form/Controls/Textarea";
import { getAllCategories } from "@/queries/category";
import { addRecipe } from "@/queries/recipe";
import { uploadS3File } from "@/services/aws/s3";
import { createClient } from "@/services/supabase/client";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  title: string;
  timeToMake: string;
  category: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image: File | string | null;
}

export default function CreateRecipePage() {
  // const categories = await getAllCategories()
  const router = useRouter();
  const categories = [
    { value: "Main", label: "Main" },
    { value: "Lunch", label: "Lunch" },
    { value: "Desert", label: "Desert" },
  ];

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      timeToMake: "",
      category: "Main",
      description: "",
      ingredients: [],
      instructions: "",
      image: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data, e) => {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user.id;

    try {
      // 1. Upload the image to S3
      const currentDate = new Date();
      const milliseconds = currentDate.getTime();
      const file = e?.target.image.files[0]; // Get the file from the event, not the data value
      const filePath = `${userId}/images/recipe-${milliseconds}.jpg`;

      await uploadS3File(filePath, file);

      // 2. Add the recipe to the database
      const recipeData: Omit<Recipe, "id"> = {
        title: data.title,
        timeToMake: data.timeToMake,
        categoryName: data.category,
        description: data.description,
        ingredients: data.ingredients,
        instructions: data.instructions,
        image: filePath,
        userId: userId as string,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log(recipeData);
      await addRecipe(recipeData);
      router.push("/recipes/me");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-screen-lg">
      <h1 className="text-5xl font-bold mb-5">Create a Recipe</h1>

      <article>
        <form id="recipe-add-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Title"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  // required
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="timeToMake"
              control={control}
              // rules={{ required: "Time is required" }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  type="time"
                  label="Time (hh:mm)"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  // required
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  {...field}
                  options={categories}
                  // className="w-full border-2 border-gray-200 p-2 rounded-md"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="description"
              control={control}
              // rules={{ required: "Description is required" }}
              render={({ field, fieldState: { error } }) => (
                <Textarea
                  {...field}
                  label="Description"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  // required
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="ingredients"
              control={control}
              // rules={{ required: "Ingredients is required" }}
              render={({ field, fieldState: { error } }) => (
                <List
                  {...field}
                  label="Ingredients"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  // required
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="instructions"
              control={control}
              // rules={{ required: "Instructions is required" }}
              render={({ field, fieldState: { error } }) => (
                <Textarea
                  {...field}
                  label="Instructions"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  // required
                />
              )}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="image"
              control={control}
              // rules={{ required: "Image is required" }}
              render={({ field, fieldState: { error } }) => (
                <FileInput
                  {...field}
                  type="file"
                  label="Image"
                  error={!!error}
                  helperText={error ? error.message : ""}
                  // required
                />
              )}
            />
          </div>

          <input type="hidden" value={1} name="userId" id="userId" />

          <div className="flex gap-2 mt-10">
            <button className="btn btn-accent" type="submit">
              Create Recipe
            </button>

            <Link className="btn btn-neutral" href={`/recipes/me`} replace>
              Cancel
            </Link>
          </div>
        </form>
      </article>
    </div>
  );
}

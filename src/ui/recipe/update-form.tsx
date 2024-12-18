"use client";
import React from "react";
import FileInput from "@/components/Form/Controls/FileInput";
import Input from "@/components/Form/Controls/Input";
import List from "@/components/Form/Controls/List";
import Select from "@/components/Form/Controls/Select";
import Textarea from "@/components/Form/Controls/Textarea";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { uploadS3File } from "@/services/aws/s3";
import { Recipe } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/services/supabase/client";
import { updateRecipe } from "@/queries/recipe";
import { Alert, Toast } from "react-daisyui";

interface IFormInput {
  title: string;
  timeToMake: string;
  servingSize: number | null;
  category: string;
  description: string | null;
  ingredients: string[];
  instructions: string;
  image: File | string | null;
}

type UpdateFormProps = {
  recipe: Recipe;
  categories: { label: string; value: string }[];
};

export default function UpdateForm({ recipe, categories }: UpdateFormProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      title: recipe.title,
      timeToMake: recipe.timeToMake,
      servingSize: recipe.servingSize || 1,
      category: recipe.categoryName,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: "",
    },
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data, e) => {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user.id;

    try {
      const file = e?.target.image.files[0]; // Get the file from the event, not the data value
      let filePath = "";

      if (file) {
        // 1. Upload the image to S3
        const currentDate = new Date();
        const milliseconds = currentDate.getTime();
        filePath = `${userId}/images/recipe-${milliseconds}.jpg`;

        await uploadS3File(filePath, file);
      } else {
        filePath = recipe.image as string;
      }

      // 2. Add the recipe to the database
      let servingSize = 1;
      if (Number(data.servingSize) > 0) {
        servingSize = Number(data.servingSize);
      }

      const recipeData: Omit<Recipe, "createdAt"> = {
        id: recipe.id,
        title: data.title,
        timeToMake: data.timeToMake,
        servingSize: servingSize,
        categoryName: data.category,
        description: data.description,
        ingredients: data.ingredients,
        instructions: data.instructions,
        image: filePath,
        userId: userId as string,
        updatedAt: new Date(),
      };

      const response = await updateRecipe(recipeData, userId as string);
      if (response && response.status === 200) {
        setOpen(true);

        setTimeout(() => {
          setOpen(false);
          router.push("/recipes/me");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <article>
      <FormProvider {...methods}>
        <form id="recipe-add-form" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              label="Title"
              name="title"
              rules={{ required: "Title is required" }}
            />
          </div>

          <div className="mb-4">
            <Input
              label="Time (hh:mm)"
              name="timeToMake"
              type="time"
              rules={{ required: "Time is required" }}
            />
          </div>

          <div className="mb-4">
            <Input
              label="Serving Size"
              name="servingSize"
              rules={{ required: "Serving Size is required" }}
              type="number"
            />
          </div>

          <div className="mb-4">
            <Select
              label="Category"
              name="category"
              options={categories}
              // className="w-full border-2 border-gray-200 p-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <Textarea label="Description" name="description" />
          </div>

          <div className="mb-4">
            <List
              label="Ingredients"
              name="ingredients"
              rules={{ required: "Ingredients are required" }}
            />
          </div>

          <div className="mb-4">
            <Textarea
              label="Instructions"
              name="instructions"
              rules={{ required: "Instructions are required" }}
              inputProps={{ rows: 8 }}
            />
          </div>
          <div className="mb-4">
            <FileInput
              name="image"
              // rules={{ required: "Image is required" }}
              type="file"
              label="Image"
            />
          </div>

          <input type="hidden" value={1} name="userId" id="userId" />

          <div className="flex gap-2 mt-10">
            <button className="btn btn-accent" type="submit">
              Update Recipe
            </button>

            <Link className="btn btn-neutral" href={`/recipes/me`} replace>
              Cancel
            </Link>
          </div>
        </form>
      </FormProvider>

      {open && (
        <Toast vertical="bottom" horizontal="center">
          <Alert status="success" className="flex justify-center items-center">
            Updated
          </Alert>
        </Toast>
      )}
    </article>
  );
}

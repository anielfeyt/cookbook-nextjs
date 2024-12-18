"use client";
import React, { useCallback } from "react";
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
import { addRecipe } from "@/queries/recipe";
import { Modal } from "react-daisyui";

interface IFormInput {
  title: string;
  timeToMake: string;
  servingSize: number | null;
  category: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image: File | string | null;
}

type CreateFormProps = {
  categories: { label: string; value: string }[];
};

export default function CreateForm({ categories }: CreateFormProps) {
  const modalRef = React.useRef<HTMLDialogElement>(null);
  const showModal = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const hideModal = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      title: "",
      timeToMake: "",
      servingSize: 1,
      category: "Main",
      description: "",
      ingredients: [],
      instructions: "",
      image: "",
    },
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data, e) => {
    showModal();
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
      }

      // 2. Add the recipe to the database
      let servingSize = 1;
      if (Number(data.servingSize) > 0) {
        servingSize = Number(data.servingSize);
      }

      const recipeData: Omit<Recipe, "id"> = {
        title: data.title,
        timeToMake: data.timeToMake,
        categoryName: data.category,
        description: data.description,
        ingredients: data.ingredients,
        instructions: data.instructions,
        servingSize: servingSize,
        image: filePath,
        userId: userId as string,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addRecipe(recipeData);
      hideModal();
      router.push("/recipes/me");
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
              Create Recipe
            </button>

            <Link className="btn btn-neutral" href={`/recipes/me`} replace>
              Cancel
            </Link>
          </div>
        </form>
      </FormProvider>

      <Modal ref={modalRef} id="create_modal" backdrop className="max-w-xs">
        <Modal.Body>
          <p className="text-center">Creating...</p>
        </Modal.Body>
      </Modal>
    </article>
  );
}

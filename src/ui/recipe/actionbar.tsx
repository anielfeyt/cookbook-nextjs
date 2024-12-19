"use client";
import { deleteRecipe } from "@/queries/recipe";
import React, { useCallback } from "react";
import { Modal } from "react-daisyui";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ActionBarProps = {
  isUserRecipe: boolean;
  id: string;
  slug: string;
};

export default function ActionBar({ isUserRecipe, id, slug }: ActionBarProps) {
  const router = useRouter();
  const modalRef = React.useRef<HTMLDialogElement>(null);
  const showModal = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      router.push("/recipes/me");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="join" role="group">
        {isUserRecipe && (
          <>
            <Link
              href={`/recipe/${id}/${slug}/edit`}
              className="btn join-item btn-sm"
            >
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit
            </Link>
            <button
              type="button"
              className="btn join-item btn-sm btn-error"
              onClick={showModal}
            >
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Delete
            </button>
          </>
        )}

        {/* <button type="button" className="btn join-item btn-sm ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          Save
        </button> */}
      </div>
      <Modal ref={modalRef} id="delete_modal" backdrop>
        <Modal.Header className="font-bold">Delete Recipe</Modal.Header>
        <Modal.Body>Are you sure you want to delete the recipe?</Modal.Body>
        <Modal.Actions>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn" onClick={() => modalRef.current?.close()}>
            Cancel
          </button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

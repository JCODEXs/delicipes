"use client";
import FullPageImageView from "~/components/full-image-page";
import { Modal } from "../modal";
import Form from "~/app/_components/recipe design/ingredientsDatabase";
import { getIngredients } from "~/store/pantry";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function IngredientModal() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState();
  const onClose = () => {
    router.back();
  };
  return (
    <Modal>
      <Form
        setIngredients={setIngredients}
        onClose={onClose}
        editableIngredient={ingredients}
      />
    </Modal>
  );
}

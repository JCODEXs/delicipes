"use client";
import { useState } from "react";
import IngredientManagerPanel from "../_components/import/IngredientManagement";
import ConfirmModal from "../_components/recipe design/confirmModal";
import { DeleteIngredient, } from "~/store/pantry";

export default function IngredientManager() {
const [ingredientsList, setIngredientsList] = useState([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);     
  const handleConfirmDelete = () => {
    if (pendingDelete) {
    
        DeleteIngredient(pendingDelete._id);
        const filter = ingredientsList.filter(
          (ingredient) => ingredient._id !== pendingDelete._id,
        );
        setIngredientsList(filter);
    
      setPendingDelete(null);
      setConfirmModalOpen(false);
    }
  }

  const handleCancelDelete = () => {
    setPendingDelete(null);
    setConfirmModalOpen(false);
    
  };

  return (
    <>
      <IngredientManagerPanel
        setConfirmModalOpen={setConfirmModalOpen}
        setPendingDelete={setPendingDelete}
        ingredientsList={ingredientsList}
      />
      {confirmModalOpen && (
        <ConfirmModal          isOpen={confirmModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          pendingDelete={pendingDelete}
        >
         
     {    `Are you sure you want to delete this ingredient ${pendingDelete?.ingredient?.name}?`}
           
        </ConfirmModal>
      )}
    </>
  );
}
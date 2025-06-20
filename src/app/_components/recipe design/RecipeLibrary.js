"use client";
import { useEffect, useState } from "react";
import { usePantry } from "~/store/pantry";
import { getRecipes } from "~/store/pantry";
import RecipeCardComponent from "./recipeCardComponent";
import Skeleton from "./Skeleton";

// Simple confirmation modal
function ConfirmModal({ open, onConfirm, onCancel, recipeTitle }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.25)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: "2rem",
          minWidth: 280,
          boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 16, fontWeight: 600 }}>
          Delete recipe <span style={{ color: "#a33" }}>{recipeTitle}</span>?
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              background: "#a33",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.5rem 1.2rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            style={{
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: 6,
              padding: "0.5rem 1.2rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecipeLibrary() {
  const storeRecipes = usePantry((store) => store.recipes);
  const loading = usePantry((store) => store.loading);
  const addStoreRecipe = usePantry((store) => store.addStoreRecipe);
  const removeStoreRecipe = usePantry((store) => store.deleteSingleRecipe);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!storeRecipes || storeRecipes.length < 1) {
        const fetchedRecipes = await getRecipes();
        if (fetchedRecipes && fetchedRecipes.length > 0) {
          fetchedRecipes.forEach((recipe) => addStoreRecipe(recipe));
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (_recipe) => {
    setPendingDelete(_recipe);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (pendingDelete) {
      removeStoreRecipe(pendingDelete._id);
      setConfirmOpen(false);
      setPendingDelete(null);
      // Optionally: call your API to delete from backend
      // await DeleteRecipe(pendingDelete._id);
    }
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setPendingDelete(null);
  };

  const recipes = storeRecipes && storeRecipes.length > 0 ? storeRecipes : [];

  if (loading && recipes.length === 0) {
    return <Skeleton />;
  }

  return (
    <section className="ReceipLibrary" style={{ marginTop: "2rem" }}>
      <ConfirmModal
        open={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        recipeTitle={
          pendingDelete?.recipe?.tittle ?? pendingDelete?.recipe?.title
        }
      />
      <div
        style={{
          position: "sticky",
          top: 5,
          fontSize: "1.5rem",
          margin: "1rem 0",
          fontWeight: 600,
          background: "#fff",
          borderRadius: 8,
          padding: "0.5rem 1rem",
          boxShadow: "0 1px 4px rgba(200,180,120,0.08)",
          zIndex: 2,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          color: "rgba(39, 33, 15, 0.86)",
        }}
      >
        Recipes Library
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {recipes.map(
          (_recipe) =>
            _recipe?._id && (
              <div
                className="w-auto"
                key={_recipe?._id}
                style={{
                  background: "#f9f6ea",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  boxShadow: "0 1px 4px rgba(200,180,120,0.08)",
                }}
              >
                <RecipeCardComponent
                  key={_recipe?._id}
                  _id={_recipe?._id}
                  _recipe={_recipe}
                  deleteHandler={handleDelete}
                />
              </div>
            ),
        )}
      </div>
    </section>
  );
}

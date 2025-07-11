"use client";
import { useEffect, useState } from "react";
import { DeleteRecipe, usePantry } from "~/store/pantry";
import { getRecipes } from "~/store/pantry";
import RecipeCardComponent from "./recipeCardComponent";
import Skeleton from "./Skeleton";
import { useRouter } from "next/navigation";
import ConfirmModal from "./confirmModal";
// Simple confirmation modal

export default function RecipeLibrary() {
  const storeRecipes = usePantry((store) => store.recipes);
  const loading = usePantry((store) => store.loading);
  const addStoreRecipe = usePantry((store) => store.addStoreRecipe);
  const removeStoreRecipe = usePantry((store) => store.deleteSingleRecipe);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

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
      console.log(pendingDelete, "delete recipe");
      // Optionally: call your API to delete from backend

      await DeleteRecipe(pendingDelete);
    }
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setPendingDelete(null);
  };

  const handleEdit = (_recipe) => {
    // Assuming your design page is at /design/[id]
    router.push(`/design/${_recipe._id}`);
  };

  const libraryRecipes =
    storeRecipes && storeRecipes.length > 0 ? storeRecipes : [];

  const filteredRecipes = libraryRecipes.filter((_recipe) => {
    const name =
      _recipe?.recipe?.title?.toLowerCase() ||
      _recipe?.recipe?.tittle?.toLowerCase() ||
      "";
    const ingredients = (_recipe?.recipe?.ingredients || [])
      .map((i) => i?.ingredient?.name?.toLowerCase() || "")
      .join(" ");
    const q = search.toLowerCase();
    return name.includes(q) || ingredients.includes(q);
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    const aCount = a?.recipe?.ingredients?.length || 0;
    const bCount = b?.recipe?.ingredients?.length || 0;
    return bCount - aCount;
  });

  if (loading && libraryRecipes.length === 0) {
    return <Skeleton />;
  }

  return (
    <section className="library-section" style={{ marginTop: "2rem" }}>
      <ConfirmModal
        isOpen={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        pendingDeleteType={"recipe"}
        recipeTitle={
          pendingDelete?.recipe?.tittle ?? pendingDelete?.recipe?.title
        }
      />
      {/* <div
        className="library-header"
        style={{
          position: "sticky",
          top: 5,
          fontSize: "1.5rem",
          margin: "1rem 1rem",
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
        Recipe Booklet
      </div> */}
      <input
        type="text"
        placeholder="Search by name or ingredient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 340,
          margin: "1rem auto",
          display: "block",
          padding: "0.5rem 1rem",
          borderRadius: 8,
          border: "1px solid #e7c08a",
          fontSize: "1rem",
          background: "#fff",
          color: "#3a2412",
        }}
      />
      <div
        className="library-cards"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
          width: "100%",
        }}
      >
        {sortedRecipes.map(
          (_recipe) =>
            _recipe?._id && (
              <div
                className="library-card"
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
                  editHandler={handleEdit}
                />
              </div>
            ),
        )}
      </div>
    </section>
  );
}

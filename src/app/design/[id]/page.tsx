"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DesignRecipeMetods from "../../_components/recipe design/recipeDesignMetods";
import { getRecipeById, getIngredients } from "~/store/pantry";

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedRecipe = await getRecipeById(id);
      const fetchedIngredients = await getIngredients();
      if (!fetchedRecipe) {
        router.replace("/not-found");
        return;
      }
      setRecipe(fetchedRecipe);
      setIngredients(fetchedIngredients);
      setLoading(false);
    };
    fetchData();
  }, [id, router]);

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;

  return (
    <DesignRecipeMetods
      recipe={recipe}
      ingredients={ingredients}
      editMode={true}
    />
  );
}
"use client";

import { useEffect } from "react";
import { usePantry } from "~/store/pantry";

export default function DataStorage({ recipes, ingredients }) {
  const { addStoreRecipe, addSingleIngredient } = usePantry();
  if (!recipes || !ingredients) {
    console.error("Recipes or ingredients are missing:", {
      recipes,
      ingredients,
    });
    return;
  }
  useEffect(() => {
    console.log("Adding ingredients to store", ingredients);
    ingredients.forEach((ingredient) => {
      addSingleIngredient(ingredient);
    });
    console.log("Adding recipes to store", recipes);
    recipes.forEach((recipe) => {
      addStoreRecipe(recipe);
    });
  }, [addStoreRecipe, addSingleIngredient, recipes, ingredients]);

  return null;
}

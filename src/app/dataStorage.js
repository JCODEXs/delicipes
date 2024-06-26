"use client";

import { useEffect } from "react";
import { usePantry } from "~/store/pantry";

export default function DataStorage({ recipes, ingredients }) {
  const { addStoreRecipe, addSingleIngredient } = usePantry();

  useEffect(() => {
    ingredients.forEach((ingredient) => {
      addSingleIngredient(ingredient);
    });

    recipes.forEach((recipe) => {
      addStoreRecipe(recipe);
    });
  }, [addStoreRecipe, addSingleIngredient, recipes, ingredients]);

  return null;
}

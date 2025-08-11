"use server ";

import api from "~/app/api/recipes/api";
import { toast } from "sonner";
import { getIngredients, getRecipes, usePantry } from "~/store/pantry";
export const getMyPrograms = async (userId) => {
  const result = await api.get(`/program/${userId}`);

  // console.log("addIngredient", result.data);
  const { response, data } = result.data;
  return result.data.result;
};
export const importRecipesFromAPI = async () => {
  try {
    const recipes = await getRecipes();
    if (recipes.length > 0) {
      usePantry.setState({ recipes });
      toast.success("Recipes imported!");
    } else {
      toast.info("No recipes found to import.");
    }
  } catch (err) {
    toast.error("Failed to import recipes.");
  }
};

export const importIngredientsFromAPI = async () => {
  try {
    const ingredients = await getIngredients();
    if (ingredients.length > 0) {
      usePantry.setState({ ingredients });
      toast.success("Ingredients imported!");
    } else {
      toast.info("No ingredients found to import.");
    }
  } catch (err) {
    toast.error("Failed to import ingredients.");
  }
};
export const importIngredientsFromAPI2 = async () => {
  try {
    const ingredients = await getIngredients();
    return ingredients || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

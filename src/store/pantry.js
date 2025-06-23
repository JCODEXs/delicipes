import { produce } from "immer";
import { create } from "zustand";
import axios from "axios";

import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import api from "~/app/api/recipes/api";
import { index } from "drizzle-orm/pg-core";
import { toast } from "sonner";

const pantry = (set) => ({
  ingredients: [],
  recipes: [
    // {
    //   tittle: "first",
    //   ingredients: [
    //     {
    //       name: "tomate",🫙
    //       units: "gr",
    //       image: "🍅",
    //       grPrice: "5",
    //       quantity: "450",
    //     },
    //     {
    //       name: "huevo",
    //       units: "und",
    //       image: "🥚",
    //       grPrice: "500",
    //       quantity: 4,
    //     },
    //   ],
    //   description: "ejemplo",
    //   portions: 3,
    // },
  ],
  programing: [],
  pantryList: [],

  addListOfIngredients: (ingredientsList) =>
    set(
      produce((store) => {
        // console.log(ingredientsList);
        store.pantryList = ingredientsList;
        // console.log(store.pantryList);
      }),

      false,
      "addIngredient",
    ),

  addStoreIngredient: (ingredients) =>
    set(
      produce((store) => {
        console.log(ingredients);
        ingredients?.forEach((ingredient) => {
          const index = store.ingredients.findIndex(
            (item) => item._id === ingredient._id,
          );
          console.log(ingredient);
          if (index === -1) {
            console.log("new item", ingredient);
            // store.ingredients.push(ingredient);

            addIngredient(ingredient.ingredient);
          } else {
            console.log("updating item", ingredient);
            store.ingredients[index] = ingredient;
          }
        });
      }),
      false,
      "addIngredient",
    ),
  addStorePrograming: (program) =>
    set(
      produce((store) => {
        // //   console.log(Object.values(program), program);
        //   Object.entries(program)?.forEach(([day, recipes]) => {
        // //     console.log(day, recipes);

        //     let existingDay =
        //       store?.programing &&
        //       store?.programing?.find((item) => item.day === day);
        //     if (!existingDay) {
        // //       console.log("new day", day);
        //       store.programing[day] = recipes;
        //     } else {
        //       // Update existing day
        // //       console.log("updating day", day);
        //       existingDay = recipes;
        //     }
        //   });
        // }),

        // store.programing = program;

        store.programing.push(program);
      }),
      false,
      "addProgram",
    ),
  deletePrograming: () =>
    set(
      produce(
        (store) => {
          store.programing = [];
        },
        false,
        "deleteAll",
      ),
    ),
  addSingleRecipe: (recipe) =>
    set(
      // Use produce to modify the current state immutably
      produce((store) => {
        // console.log(recipe);
        store.recipes.push(recipe);
        // console.log(store.recipes); // Add the new recipe to the recipes array
      }),
      false,
      "SingleAddRecipe",
    ),
  updateSingleRecipe: (recipe) =>
    set(
      // Use produce to modify the current state immutably

      produce((store) => {
        const newRecipe = { ...recipe };
        // console.log(recipe);
        const index = store.recipes.findIndex(
          (item) => item._id === recipe._id,
        );
        // console.log(index);
        if (index !== -1) {
          store.recipes[index] = {
            ...store.recipes[index],
            ...recipe,
            ingredients: [...recipe.recipe.ingredients], // Ensuring new reference
          };
        } else {
          console.warn(`Recipe with id ${recipe._id} not found.`);
        }
        // console.log(store.recipes); // Add the new recipe to the recipes array
      }),
      false,
      "SingleUpdateRecipe",
    ),
  addSingleIngredient: (ingredient) =>
    set(
      // Use produce to modify the current state immutably
      produce((store) => {
        console.log(ingredient);
        const index = store.ingredients.findIndex(
          (item) => item._id === ingredient._id,
        );
        if (index === -1) {
          console.log("new item", ingredient);
          store.ingredients.push(ingredient);
        } else {
          store.ingredients[index] = ingredient;
        }
        console.log(store.ingredients); // Add the new recipe to the recipes array
      }),
      false,
      "SingleAddIngredient",
    ),

  addStoreRecipe: (_recipe) =>
    set(
      produce((store) => {
        // if (
        //   _recipe?._id &&
        //   _recipe._id !== undefined &&
        //   store.recipes.length < 1
        // ) {
        //   console.log({ _id: _recipe._id });
        //   console.log(store.recipes);
        //   store.recipes.push(_recipe);
        // }
        // if (store.recipes.length > 1) {
        //   const index = store.recipes.findIndex(
        //     (item) => item._id === _recipe._id
        //   );
        //   console.log(index, _recipe._id);
        //   if (index === -1) {
        //     console.log(store.recipes);

        //     store.recipes.push(_recipe);
        //   } else {
        //     console.log("updating item", _recipe);
        //     // console.log(store.recipes[index]);
        //     store.recipes[index] = _recipe;
        //   }
        // }
        if (_recipe?._id && _recipe._id !== undefined) {
          if (store.recipes.length === 0) {
            // If the recipes array is empty, add the new recipe
            store.recipes.push(_recipe);
            // console.log("first item", _recipe);
          } else {
            // Check if the recipe already exists
            const index = store.recipes.findIndex(
              (item) => item._id === _recipe._id,
            );

            if (index === -1) {
              // If the recipe doesn't exist, add it
              // console.log("new item", _recipe);
              store.recipes.push(_recipe);
            } else {
              // If the recipe exists, update it
              // console.log("updating item", _recipe);

              store.recipes[index] = _recipe;
              //  {
              //   ...store.recipes[index],
              //   ..._recipe,
              //   ingredients: [..._recipe.recipe.ingredients], // Ensuring new reference
              // };
            }
          }
        }
        // console.log(store.recipes);
      }),
      false,
      "addRecipe",
    ),
  addDBRecipe: async (_recipe) => {
    let recipeExists = false;
    console.log(_recipe);
    set(
      produce((store) => {
        if (_recipe._id) {
          const index = store.recipes.findIndex(
            (item) => item._id === _recipe._id,
          );
          if (index !== -1) {
            recipeExists = true;
          }
        }
      }),
    );

    // console.log(_recipe, recipeExists);
    if (!recipeExists) {
      // console.log("new item", _recipe);
      const newRecipe = await addRecipe(_recipe);
    } else {
      // If the recipe exists, update the store
      set(
        produce((store) => {
          const index = store.recipes.findIndex(
            (item) => item._id === _recipe._id,
          );
          // console.log("updating item", index, _recipe);
          // store.recipes[index] = _recipe;
          modifyRecipe(_recipe);
        }),
      );
    }
  },
  deleteSingleIngredient: (_id) => {
    // // console.log(_id);
    set(
      produce((store) => {
        // //console.log(store.ingredients);
        store.ingredients = store.ingredients.filter(
          (ingredient) => ingredient?._id !== _id,
        );
      }),
    );
  },
  deleteAllIngredient: (name) =>
    set((store) => ({
      ingredients: store.ingredients.filter(
        (ingredient) => ingredient.name !== "",
      ),
    })),
  deleteStoreRecipe: (name) => {
    // console.log(name);

    set((store) => ({
      recipes: store.recipes.filter((recipe) => recipe.tittle !== name),
    }));
  },
  deleteSingleRecipe: (_id) => {
    // console.log(_id);

    set((store) => ({
      recipes: store.recipes.filter((recipe) => recipe._id !== _id),
    }));
  },
  onRehydrate: (state) => {
    if (state) {
      // console.log(state);
      set((store) => ({
        recipes: state.state.recipes,
        ingredients: state.state.ingredients,
        programing: state.state.programing,
      }));
    }
  },

  // setDraggedTask: (title) => set({ draggedTask: title }),
  // moveTask: (title, state) =>
  //   set((store) => ({
  //     tasks: store.tasks.map((task) =>
  //       task.title === title ? { title, state } : task
  //     ),
  //   })),
});
const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      // // console.log(args);
      set(...args);
    },
    get,
    api,
  );

export const usePantry = create(
  subscribeWithSelector(log(pantry)),

  // subscribeWithSelector(log(persist(devtools(pantry), { name: "Devtools" })))
);
// console.log(pantry.recipes);

export const getRecipes = async () => {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        : "";
    const result = await axios.get(`${baseUrl}/api/recipes`);
    if (result.data.result.length > 0) {
      return result.data.result;
    } else {
      console.log("No recipes found in the database.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching ingredients:", error.message);
    return [];
  }
};
// export const getIngredients = async () => {
//   // console.log("hi");
//   const result = await axios.get("/api/ingredients");
//   console.log("getIngredients", result.data.result);
//   // const { response, data } = result.data;
//   return result.data.result;
// };
export const getIngredients = async () => {
  try {
    const result = await axios.get("/api/ingredients");

    // Check if the result data or the result itself is empty or undefined
    if (result?.data?.result?.length > 0) {
      console.log("getIngredients", result.data.result);
      return result.data.result;
    } else {
      // If the result is empty or the data is not available, handle it accordingly
      console.log("No ingredients found in the database.");
      return []; // Return an empty array or an appropriate default value
    }
  } catch (error) {
    // Catch any errors from the API call
    console.error("Error fetching ingredients:", error.message);
    return []; // Return an empty array or handle the error in another way
  }
};
export const addRecipe = async (recipe) => {
  try {
    const result = await axios.post("/api/recipes", { recipe });
    const RecipeNew = { ...recipe, _id: result.data.result.insertedId };
    usePantry.getState().addStoreRecipe(RecipeNew);
    toast.success("Recipe created!");
    return RecipeNew;
  } catch (error) {
    toast.error("Failed to create recipe.");
    throw error;
  }
};
export const modifyRecipe = async (recipe) => {
  try {
    const result = await axios.put("/api/recipes", { recipe });
    usePantry.getState().addStoreRecipe(recipe);
    toast.success("Recipe updated!");
    return result.data;
  } catch (error) {
    toast.error("Failed to update recipe.");
    throw error;
  }
};
export const DeleteRecipe = async (_recipe) => {
  try {
    if (_recipe?.recipe?.imageUrl) {
      await axios.delete(
        `/api/recipes/${_recipe._id}/${_recipe.recipe.imageUrl.key}`,
      );
    } else {
      await axios.delete(`/api/recipes/${_recipe._id}/`);
    }
    await usePantry.getState().deleteSingleRecipe(_recipe._id);
    toast.success("Recipe deleted!");
  } catch (error) {
    toast.error("Failed to delete recipe.");
    throw error;
  }
};

export const addIngredient = async (ingredient) => {
  try {
    const result = await axios.post("/api/ingredients", { ingredient });
    const ingredientNew = {
      ingredient,
      _id: result.data.result.insertedId,
    };
    await usePantry.getState().addSingleIngredient(ingredientNew);
    toast.success("Ingredient created!");
    return ingredientNew;
  } catch (error) {
    toast.error("Failed to create ingredient.");
    throw error;
  }
};

export const DeleteIngredient = async (_id) => {
  try {
    await usePantry.getState().deleteSingleIngredient(_id);
    toast.success("Ingredient deleted!");
  } catch (error) {
    toast.error("Failed to delete ingredient.");
    throw error;
  }
};

export const addProgram = async (_program) => {
  // const userIdObject = new ObjectId(userId);
  // console.log("hi");
  // const program = { ..._program, userId };
  toast(
    <div className="flex items-center gap-2 text-white">
      <LoadingSpinnerSVG />
      <span className="text-lg  text-black">Saving...</span>
    </div>,
    { duration: 10000, id: "upload-begin" },
  );
  const result = await axios.post("/api/program", { _program });
  const programNew = { _program, _id: result.data.result.insertedId };
  await usePantry.getState().addStorePrograming(programNew);
  // console.log("addIngredient", result.data);
  const { response, data } = result.data;
  toast.dismiss("upload-begin");
  toast("Saved!");
};
export const getMyPrograms = async (userId) => {
  // console.log(userId);
  try {
    const result = await api.get(`/program/${userId}`);

    const { response, data } = result.data;
    const index = data?.result ? data?.result.length - 1 : 0;
    const RecipesList =
      await result?.data?.result?.[index]?._program?.ingredientsTotList?.[0];
    // console.log("getPrograms", RecipesList);
    await usePantry.getState().addListOfIngredients(RecipesList);
    if (result.data.result.length > 0) {
      return result.data.result;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
export const getRecipeById = async (id) => {
  try {
    const result = await axios.get(`/api/recipes/${id}`);
    if (result?.data?.result) {
      return result.data.result;
    } else {
      toast.error("Recipe not found.");
      return null;
    }
  } catch (error) {
    toast.error("Failed to fetch recipe.");
    throw error;
  }
};

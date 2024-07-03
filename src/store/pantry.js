import { produce } from "immer";
import { create } from "zustand";
import axios from "axios";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

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

  addStoreIngredient: (ingredients) =>
    set(
      produce((store) => {
        // console.log(ingredients);
        ingredients?.forEach((ingredient) => {
          const index = store.ingredients.findIndex(
            (item) => item._id === ingredient._id,
          );
          // console.log(ingredient);
          if (index === -1) {
            // console.log("new item", ingredient);
            // store.ingredients.push(ingredient);
            addIngredient(ingredient.ingredient);
          } else {
            // console.log("updating item", ingredient);
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
        // console.log(ingredient);
        const index = store.ingredients.findIndex(
          (item) => item._id === ingredient._id,
        );
        if (index === -1) {
          // console.log("new item", ingredient);
          store.ingredients.push(ingredient);
        } else {
          store.ingredients[index] = ingredient;
        }
        // console.log(store.ingredients); // Add the new recipe to the recipes array
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
  // console.log("hi");
  const result = await axios.get("/api/recipes");
  // console.log("getRecipes", result.data.result);
  const { response, data } = result.data;
  return result.data.result;
};
export const getIngredients = async () => {
  // console.log("hi");
  const result = await axios.get("/api/ingredients");
  // console.log("getIngredients", result.data.result);
  // const { response, data } = result.data;
  return result.data.result;
};

export const addRecipe = async (recipe) => {
  console.log(recipe);
  const result = await axios.post("/api/recipes", {
    recipe,
  });
  // console.log(result.data);
  const RecipeNew = await { ...recipe, _id: result.data.result.insertedId };
  usePantry.getState().addStoreRecipe(RecipeNew);
  // console.log(RecipeNew);
  return result.data;
};
export const modifyRecipe = async (recipe) => {
  // console.log(recipe);
  const result = await axios.put("/api/recipes", {
    recipe,
  });
  console.log(recipe, result.data);
  usePantry.getState().addStoreRecipe(recipe);

  return result.data;
};
export const DeleteRecipe = async (_recipe) => {
  if (_recipe.recipe.imageUrl) {
    const result = await axios.delete(
      `/api/recipes/${_recipe._id}/${_recipe.recipe.imageUrl.key}`,
    );
  } else {
    const result = await axios.delete(`/api/recipes/${_recipe._id}/`);
  }

  await usePantry.getState().deleteSingleRecipe(_recipe._id);
  // console.log("Delete recipe", result.data);
  // const { response, data } = result.data;
};
export const DeleteIngredient = async (_id) => {
  // console.log(_id);
  const result = await axios.delete(`/api/ingredients/${_id}`);
  await usePantry.getState().deleteSingleIngredient(_id);
  // console.log("Delete ingredient", result.data);
  // const { response, data } = result.data;
};

export const addIngredient = async (ingredient) => {
  // console.log("hi");
  const result = await axios.post("/api/ingredients", {
    ingredient,
  });
  const ingredientNew = await {
    ingredient,
    _id: result.data.result.insertedId,
  };
  await usePantry.getState().addSingleIngredient(ingredientNew);
  // console.log("addIngredient", result.data);
  const { response, data } = result.data;
};

// useStore.subscribe(
//   (store) => store.ingredients,
//   (newIngredients, prevIngredients) => {
//     useStore.setState({
//       lowIngredient: newIngredients.filter((task) => task.state === 'ONGOING')
//         .length,
//     });
//   }
// );

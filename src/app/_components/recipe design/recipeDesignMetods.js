const updateRecipes = (recipe) => {
  const newRecipe = [];
  const updatedRecipe = recipe.ingredients.forEach((ing, index) => {
    const actualIngredient = ingredientsList.find((_ing) => {
      return _ing.ingredient.name === ing.ingredient.name;
    });

    if (actualIngredient) {
      newRecipe[index] = actualIngredient; // Update ing properties with actualIngredient

      // addStoreRecipe(recipe); // Update the recipe in storeRecipes
    } else {
      newRecipe[index] = ing;
    }
  });
  // // console.log(recipe, updatedRecipe);
  return newRecipe;
};
// useEffect(() => {
//   let total;
//   const updatedRecipes = storeRecipes.map((recipe) => {
// //     // console.log(recipe, ingredientsList);
//     recipe.ingredients.forEach((ing, index) => {
//       let newRecipe = { ...recipe };
//       const actualIngredient = ingredientsList.find((_ing) => {
// //         // console.log(_ing, ing);
// //         // console.log(_ing.ingredient.name == ing.ingredient.name);

//         return _ing.ingredient.name === ing.ingredient.name;
//       });
//       const defIngredient = { ...actualIngredient };
//       defIngredient.quantity ??= ing.quantity;
// //       console.log(newRecipe.ingredients, defIngredient);
//       const price = actualIngredient?.ingredient.grPrice;
//       if (price) {
//         newRecipe.ingredients = [
//           ...newRecipe.ingredients.slice(0, index),
//           defIngredient,
//           ...newRecipe.ingredients.slice(index + 1),
//         ];
// //         console.log("def", defIngredient, newRecipe.ingredients);
// //         // console.log(newRecipe.ingredients);
//         addStoreRecipe(newRecipe);
//         // setRecipes((prev) => [...prev, { [recipes[index]]: recipe }]);
//         total += price * ing.quantity;
//       } else {
//         // total += ing.ingredient.grPrice * ing.quantity;
//       }
//     });
//   });
// }, []);
useEffect(() => {
  setIngredientsList(storeIngredients);
  //console.log(storeIngredients);
}, [storeIngredients]);

const setSearch = () => {
  const searchValue = searchRef.current.value.trim();
  let filteredIngredients = ingredientsList;

  if (searchValue !== "") {
    filteredIngredients = ingredientsList.filter((ingredient) =>
      ingredient.ingredient.name.includes(searchValue),
    );
  } else {
    const usedItems = recipeList.map((item) => item.ingredient.name);

    filteredIngredients = storeIngredients.filter(
      (item) => !usedItems.includes(item.ingredient.name),
    );
  }
  if (searchValue == "") {
    const usedItems = recipeList.map((item) => item.ingredient.name);

    filteredIngredients = storeIngredients.filter(
      (item) => !usedItems.includes(item.ingredient.name),
    );
  }
  setIngredientsList(filteredIngredients);
  // console.log(filteredIngredients, searchValue, storeIngredients);
};
const editRecipe = (recipe) => {
  // console.log(recipe);
  setRecipe(recipe.recipe);
  setTittle(recipe.recipe.tittle);
  setId(recipe._id);
  descriptionRef.current = recipe.recipe.description;
  // //setDescriptionValue(recipe.description);
  const ingredients = updateRecipes(recipe.recipe);
  const quantity = recipe.recipe.ingredients.map((ingredient) => {
    return ingredient.quantity;
  });
  // console.log(ingredients, recipe);
  setRecipeList(ingredients);
  setQuantity(quantity);
  setPortions(recipe.recipe.portions);
};

const addToListofRecipe = () => {
  //no
  // console.log(recipeList);
  const ingredients = [];
  recipeList.map((item, index) => {
    const newIngredient = { ...item };
    newIngredient.quantity = quantity[index];
    ingredients.push(newIngredient);
  });
  // console.log(ingredients);
  addDBRecipe({
    recipe: {
      key: Math.random(8) * 10000000,
      ingredients: ingredients,
      description: descriptionValue,
      tittle: tittle,
      portions: portions,
    },
    _id: Id,
  });
  setRecipeList([]);
  setTittle("");
  descriptionRef.current = "";
  //setDescriptionValue("");
  setQuantity([]);
  setIngredientsList(storeIngredients);
  // // console.log(recipeList, ingredients);
  setPortions(1);
  setId(undefined);
};
const makeBkup = () => {
  storeIngredients.forEach((ingredient) => {
    // console.log(ingredient);
    addIngredient(ingredient.ingredient);
  });
};
const addToRecipe = (item) => {
  //
  // // console.log(item);
  if (actionMode == "delete") {
    DeleteIngredient(item._id);
    const filter = ingredientsList.filter(
      (ingredient) => ingredient._id !== item._id,
    );
    setIngredientsList(filter);
  }
  if (actionMode == "select") {
    if (
      recipeList.some((_item) => _item.ingredient.name === item.ingredient.name)
    ) {
    } else {
      setRecipeList((prev) => [...prev, item]);
      const filter = ingredientsList.filter(
        (ingredient) =>
          ingredient?.ingredient?.name !== item?.ingredient?.name || item.name,
      );
      setIngredientsList(filter);
    }
  }
  if (actionMode == "edit") {
    setEditableIngredient(item);
    setAddIngredientModal(true);
    //console.log(item)
  }
};
const removeItem = (item, index) => {
  if (
    ingredientsList.some(
      (ingredient) => ingredient?.ingredient?.name === item?.ingredient?.name, // || item.name
    )
  ) {
    const filter = recipeList.filter(
      (ingredient) => ingredient?.ingredient?.name !== item?.ingredient?.name,
    );
    // console.log(recipeList, "filter", filter, item);
    setQuantity((prev) => {
      let quantity = prev ? [...prev] : [];
      // console.log(quantity);
      const newquantity = [
        ...quantity.slice(0, index),
        ...quantity.slice(index + 1),
      ];
      return newquantity;
    });
    setRecipeList(filter);
  } else {
    setIngredientsList((prev) => [...prev, item]);
    const filter = recipeList.filter(
      (ingredient) => ingredient?.ingredient?.name !== item?.ingredient?.name,
    );
    // console.log(recipeList, "filter", filter, item);
    setQuantity((prev) => {
      let quantity = prev ? [...prev] : [];
      // console.log(quantity);
      const newquantity = [
        ...quantity.slice(0, index),
        ...quantity.slice(index + 1),
      ];
      return newquantity;
    });
    setRecipeList(filter);
  }
};
const validateForm = () => {
  if (tittle?.trim() === "" || +portions < 1 || recipeList.length < 1) {
    setIsDisabled(true);
  } else {
    setIsDisabled(false);
  }
  // ///  console.log(isDisabled,recipeList.length>1,+portions,tittle,tittle.trim() === "")
};
const increase = (index, units) => {
  setQuantity((prev) => {
    const newQuantity = [...prev];
    if (newQuantity[index]) {
      newQuantity[index] = +newQuantity[index] + min[units];
    } else {
      newQuantity[index] = 0 + min[units];
    }
    // // console.log(newQuantity);
    return newQuantity;
  });
};

const decrease = (index, units) => {
  setQuantity((prev) => {
    const newQuantity = [...prev];
    if (newQuantity[index] && newQuantity[index] >= min[units]) {
      newQuantity[index] = +newQuantity[index] - min[units];
    } else {
      newQuantity[index] = 0;
    }

    return newQuantity;
  });
};
function deleteHandler(_id) {
  const result = window.confirm(
    "¿Estás seguro de que deseas borrar este elemento?",
  );
  if (result) {
    // deleteStoreRecipe(recipe.tittle);
    // // console.log(recipe);
    DeleteRecipe(_id);
  }
}
const getBackgroundColor = (actionMode) => {
  switch (actionMode) {
    case "delete":
      return "#742109";
    case "edit":
      return "#C4B55E"; // Example color for edit mode
    case "select":
      return "#2B4438"; // Example color for select mode
    default:
      return "#2B4438"; // Default background color
  }
};

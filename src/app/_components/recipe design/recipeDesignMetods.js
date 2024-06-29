"use client";
import { DeleteIngredient, DeleteRecipe, usePantry } from "~/store/pantry";
import { useRef, useState } from "react";
import DesignRecipe from "./recepiDesign";
import { redirect } from "next/navigation";
export default function DesignRecipeMetods({ createRecipe }) {
  const store = usePantry();
  let [ingredients, setIngredients] = useState(store.ingredients); //[{name:"huevo",units:"und",image:"🥚",price:450,grPrice:450 }, {name:"harina",units:"gr",image:"🍚",price:500,grPrice:5}]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [quantity, setQuantity] = useState([0]);
  const [actionMode, setActionMode] = useState("select");
  const [editableIngredient, setEditableIngredient] = useState();
  const [addIngredientModal, setAddIngredientModal] = useState(false);
  const [Recipe, setRecipe] = useState({
    recipe: { tittle: "", portions: 0 },
    _id: null,
  });
  const searchRef = useRef();
  const descriptionRef = useRef("");
  const min = {
    gr: 25,
    und: 1,
    g: 1,
    ml: 25,
    Ml: 50,
    GR: 100,
    ML: 100,
    Gr: 50,
  };

  const updateRecipes = (_recipe) => {
    const newRecipe = [];
    const updatedRecipe = _recipe.ingredients.forEach((ing, index) => {
      const actualIngredient = ingredientsList.find((_ing) => {
        return _ing._id === ing._id;
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

  const setSearch = () => {
    const searchValue = searchRef.current.value.trim();
    let filteredIngredients = ingredientsList;

    if (searchValue !== "") {
      filteredIngredients = ingredientsList.filter((_ingredient) =>
        _ingredient.ingredient.name.includes(searchValue),
      );
    } else {
      const usedItems = recipeList.map((_item) => _item.ingredient.name);

      filteredIngredients = storeIngredients.filter(
        (_item) => !usedItems.includes(_item.ingredient.name),
      );
    }
    if (searchValue == "") {
      const usedItems = recipeList.map((_item) => _item.ingredient.name);

      filteredIngredients = storeIngredients.filter(
        (_item) => !usedItems.includes(_item.ingredient.name),
      );
    }
    setIngredientsList(filteredIngredients);
    // console.log(filteredIngredients, searchValue, storeIngredients);
  };
  const editRecipe = (_recipe) => {
    // console.log(_recipe);
    setRecipe(_recipe);
    // setTittle(_recipe.recipe.tittle);
    descriptionRef.current = _recipe?.recipe?.description;
    // //setDescriptionValue(_recipe.description);
    const updatedIngredients = updateRecipes(_recipe.recipe);
    const quantity = _recipe?.recipe?.ingredients.map((_ingredient) => {
      return _ingredient.quantity;
    });
    // console.log(updatedIngredients, recipe);
    setRecipeList(updatedIngredients);
    setQuantity(quantity);
    // setPortions(_recipe.recipe.portions);
  };

  const addToRecipe = (item) => {
    // // console.log(item);
    if (actionMode == "delete") {
      alert("are you sure?");
      DeleteIngredient(item._id);
      const filter = ingredientsList.filter(
        (ingredient) => ingredient._id !== item._id,
      );
      setIngredientsList(filter);
    }
    if (actionMode == "select") {
      if (
        recipeList.some(
          (_item) => _item.ingredient.name === item.ingredient.name,
        )
      ) {
      } else {
        setRecipeList((prev) => [...prev, item]);
        const filter = ingredientsList.filter(
          (ingredient) =>
            ingredient?.ingredient?.name !== item?.ingredient?.name ||
            item.name,
        );
        setIngredientsList(filter);
      }
    }
    if (actionMode == "edit") {
      setEditableIngredient(item);
      setAddIngredientModal(true);
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
  // useEffect(() => {
  //   setIngredientsList(ingredients);
  //   //console.log(storeIngredients);
  // }, [ingredients]);
  return (
    <DesignRecipe
      ingredients={ingredients}
      ingredientsList={ingredientsList}
      recipeList={recipeList}
      quantity={quantity}
      searchRef={searchRef}
      Recipe={Recipe}
      updateRecipes={updateRecipes}
      descriptionRef={descriptionRef}
      setSearch={setSearch}
      editRecipe={editRecipe}
      addToRecipe={addToRecipe}
      removeItem={removeItem}
      increase={increase}
      decrease={decrease}
      deleteHandler={deleteHandler}
      setIngredientsList={setIngredientsList}
      setQuantity={setQuantity}
      setRecipe={setRecipe}
      setRecipeList={setRecipeList}
      actionMode={actionMode}
      setActionMode={setActionMode}
      setEditableIngredient={setEditableIngredient}
      editableIngredient={editableIngredient}
      setAddIngredientModal={setAddIngredientModal}
      addIngredientModal={addIngredientModal}
    />
  );
}

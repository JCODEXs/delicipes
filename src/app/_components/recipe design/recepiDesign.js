"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
// import styles from "./recepiDesign.css";
import Form from "./ingredientsDatabase";

import { shallow } from "zustand/shallow";
import {
  getRecipes,
  getIngredients,
  addIngredient,
  DeleteRecipe,
  DeleteIngredient,
} from "~/store/pantry";
import { Modal } from "../modal/modal";
import RecipeCardComponent from "./recipeCardComponent";
import { usePantry } from "~/store/pantry";
import { personSvg } from "~/app/icons/icons";
export default function DesignRecipe() {
  const store = usePantry();
  let [ingredients, setIngredients] = useState(store.ingredients); //[{name:"huevo",units:"und",image:"🥚",price:450,grPrice:450 }, {name:"harina",units:"gr",image:"🍚",price:500,grPrice:5}]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [quantity, setQuantity] = useState([0]);
  const [tittle, setTittle] = useState("");
  const [portions, setPortions] = useState();
  const searchRef = useRef();
  const [recipe, setRecipe] = useState();
  const [addIngredientModal, setAddIngredientModal] = useState(false);
  const [Id, setId] = useState();
  //const [descriptionValue, setDescriptionValue] = useState("");
  const [actionMode, setActionMode] = useState("select");
  const [editableIngredient, setEditableIngredient] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  // const [shouldCheckLocalStorage, setShouldCheckLocalStorage] = useState(true);
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
  const { addDBRecipe, addSingleIngredient, addStoreRecipe } = usePantry();

  // let ingredients =
  let recipes = store.recipes;
  // console.log(recipes, ingredients);
  // let dependency = localStorage ? localStorage : null;
  // useEffect(() => {
  //   let storedState = null;
  //   if (typeof localStorage !== "undefined") {
  //     storedState = JSON.parse(localStorage.getItem("Devtools"));
  //     setShouldCheckLocalStorage(false);
  //   }

  //   if (storedState) {
  //     store.onRehydrate(storedState);
  //   }
  // }, []);
  // }, [dependency]);
  let total = 0;
  const descriptionRef = useRef("");
  const descriptionValue = descriptionRef.current;
  const storeIngredients = usePantry((store) => store.ingredients);
  const storeRecipes = usePantry((store) => store.recipes, shallow);
  // // console.log(storeIngredients);
  // console.log(storeRecipes);
  function openModal() {
    setAddIngredientModal(true);
  }

  function closeModal() {
    setAddIngredientModal(false);
  }

  useLayoutEffect(() => {
    validateForm();
  }, [tittle, portions, recipeList]);
  useEffect(() => {
    // console.log(ingredients);
    const fetchData = async () => {
      if (ingredients.length < 1 || recipes.length < 1) {
        ingredients = await getIngredients();
        recipes = await getRecipes();
      }
      try {
        // setIngredients([...ingredients]);
        ingredients.map((ingredient) => {
          addSingleIngredient(ingredient);
          // console.log(ingredient);
        });
        recipes.forEach((recipe) => {
          addStoreRecipe(recipe);
          // console.log(recipe);
        });
        setIngredientsList(ingredients);

        // console.log(ingredients, recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [ingredients]);

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
  const myDivRef = useRef(null);

  // Function to scroll to the referenced div
  const scrollToDiv = () => {
    myDivRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //console.log(actionMode)
  return (
    <div className="out-container">
      <div className="background"></div>
      <div className="container">
        <div id="+ingredientes" className="ingredients">
          <div className="addButton" onClick={() => openModal()}>
            {!addIngredientModal ? (
              <div>Create Ingredients</div>
            ) : (
              <div>Close form </div>
            )}
          </div>
          <div>
            <div>
              {addIngredientModal && (
                <Modal isOpen={addIngredientModal} onClose={closeModal}>
                  <Form
                    setIngredients={setIngredients}
                    editableIngredient={editableIngredient}
                    key={editableIngredient?.name}
                    onClose={closeModal}
                  />
                </Modal>
              )}
            </div>

            <div
              className="backGuide"
              onClick={() =>
                actionMode != "select"
                  ? actionMode == "delete"
                    ? setActionMode("select")
                    : setActionMode("delete")
                  : setActionMode("edit")
              }
            >
              {" "}
              {actionMode != "select" ? (
                actionMode == "delete" ? (
                  <div
                    style={{
                      fontSize: "1.2rem",
                      display: "flex",
                      gap: "3rem",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <button
                      style={{ background: "#bd2709" }}
                      className="modeButton"
                    >
                      Change mode{" "}
                    </button>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        color: "red",
                      }}
                    >
                      Delete Box{" "}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "1.2rem",
                      display: "flex",
                      gap: "3rem",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <button
                      style={{ background: "#bd2709" }}
                      className="modeButton"
                    >
                      Change mode{" "}
                    </button>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        color: "rgb(15,200,150,0.99)",
                      }}
                    >
                      Edit box{" "}
                    </div>
                  </div>
                )
              ) : (
                <div
                  style={{
                    fontSize: "1.2rem",
                    gap: "3rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <button
                    style={{ background: "#bd2709" }}
                    className="modeButton"
                  >
                    Change mode{" "}
                  </button>
                  <div
                    style={{
                      fontSize: "1.4rem",
                      color: "white",
                      fontWeight: 300,
                    }}
                  >
                    {" "}
                    Add box
                  </div>
                </div>
              )}{" "}
            </div>
            <div
              className="items"
              style={{
                background: getBackgroundColor(actionMode),
              }}
            >
              {
                // !shouldCheckLocalStorage &&
                ingredientsList?.map((item, index) => {
                  return (
                    <div
                      className="item"
                      key={item?._id}
                      onClick={() => addToRecipe(item)}
                      onMouseEnter={() =>
                        setHoveredItem(item.ingredient?.name || item.name)
                      }
                      onMouseLeave={() => setHoveredItem(null)}
                      data-tooltip={hoveredItem}
                    >
                      {item.ingredient?.image || item.image}
                    </div>
                  );
                })
              }
            </div>
            <div style={{ margin: "0.3rem", fontSize: "1.4rem" }}>
              <input
                type="text"
                style={{
                  minWidth: 120,
                  margin: "0.3rem",
                }}
                ref={searchRef}
                onChange={setSearch}
              />
              🔎
            </div>
            {/* <button className="button" type="button" onClick={() => makeBkup()}>
              bkup
            </button> */}
          </div>
        </div>

        <div ref={myDivRef} id="recipe" className="recipe">
          <div>
            {/* <h2 style={{ marginBottom: "1rem" }}>New recipe</h2> */}

            <div className="out-container">
              <input
                type="text"
                style={{
                  width: "70%",
                  height: 30,
                  borderRadius: 8,
                  padding: "0.2rem",
                  margin: "0.25rem",
                }}
                value={tittle}
                placeholder="Recipe name"
                onChange={(e) => setTittle(e.target.value)}
                required
              />{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                for:{" "}
                <input
                  type="number"
                  style={{
                    width: "22%",
                    height: 30,
                    borderRadius: 8,
                    padding: "0.2rem",
                  }}
                  value={portions}
                  placeholder="# 👤"
                  onChange={(e) => setPortions(e.target.value)}
                  required
                />
                {personSvg}
              </div>
            </div>
            {recipeList?.length > 0 ? (
              <h4>Adjust quantitys</h4>
            ) : (
              <h3 style={{ margin: "2rem", marginBottom: "0rem" }}>
                Add ingredients from the box abobe ☝🏽
              </h3>
            )}
            <div className="incrementalnputs">
              {recipeList?.map((item, index) => {
                // //  console.log(item);
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexBasis: "calc(30% - 10px)",
                      border: "1px solid rgb(220,170,180,0.8)", //rgb(20,70,110,0.7)",
                      padding: "0.15rem",
                      borderRadius: "8px",
                      boxShadow: "-1px -2px -3px rgb(20,70,110,0.7)",
                    }}
                    key={item?._id}
                  >
                    <div className="itemQ2" style={{ margin: "0.3rem" }}>
                      {item?.ingredient?.name}
                    </div>
                    <div className="in-container">
                      <button
                        className="buttonSum"
                        onClick={() => increase(index, item?.ingredient?.units)}
                      >
                        +
                      </button>
                      {}
                      <button
                        className="buttonSum"
                        onClick={() => decrease(index, item?.ingredient?.units)}
                      >
                        -
                      </button>{" "}
                    </div>
                    <div className="in-container">
                      {" "}
                      <div className="item2">{quantity?.[index]}</div>{" "}
                      <div className="baseMarc">{item?.ingredient?.units}</div>
                      <div
                        style={{
                          margin: "0.25rem",
                          fontSize: "1.5rem",
                          // marginInlineStart: "0.5rem",
                          padding: "0.5rem",
                          color: "rgb(200,30,14)",
                          // alignItems: "flex-start",
                          justifyContent: "flex-end",
                          borderLeft: "1px solid rbg(10,15,65,0.8)",
                        }}
                        onClick={() => removeItem(item, index)}
                      >
                        {" "}
                        X
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div id="description" className="description">
          <div>
            <textarea
              type="text"
              placeholder="Preparation steps"
              style={{
                width: "98%",
                height: "fit-content",
                borderRadius: 8,
                padding: "0.25rem",
              }}
              value={descriptionValue?.current}
              onChange={(e) => {
                descriptionRef.current = e.target.value;
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <button
              className={isDisabled ? "buttonDisabled" : "addButton"}
              disabled={isDisabled}
              onClick={() => addToListofRecipe(recipe)}
            >
              Add recipe to Library
            </button>
          </div>
        </div>

        {/* </div> */}
      </div>
      <div style={{}}>
        <div
          style={{
            position: "sticky",
            top: 5,
            fontSize: "1.8rem",
            margin: "1rem",
          }}
        >
          Library
        </div>
        <div className="ReceipLibrary">
          {
            // !shouldCheckLocalStorage &&
            storeRecipes.map((recipe) => {
              // console.log(recipe);
              if (recipe?._id) {
                return (
                  <div
                    key={recipe?._id}
                    onClick={() => {
                      editRecipe(recipe);
                      scrollToDiv();
                    }}
                  >
                    <RecipeCardComponent
                      key={recipe?._id}
                      _id={recipe?._id}
                      recipe={recipe.recipe}
                      storeIngredients={storeIngredients}
                      deleteHandler={deleteHandler}
                    />
                  </div>
                );
              }
            })
          }
        </div>
      </div>
    </div>
  );
}

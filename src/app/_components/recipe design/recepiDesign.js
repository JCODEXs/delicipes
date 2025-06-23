import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  Suspense,
  lazy,
} from "react";
// import styles from "./recepiDesign.css";
import Form from "./ingredientsDatabase";
import { getRecipes, getIngredients, addIngredient } from "~/store/pantry";
import { Modal } from "../modal/modal";

import { usePantry } from "~/store/pantry";

const ActionBox = lazy(() => import("./actionbox"));
import ActionBoxSkeleton from "./actionBoxSqueleton";
import { SimpleUploadButton } from "../simple-upload-button";
import Image from "next/image";
import RecipeIngredientCard from "./RecipeIngredientCard";
export default function DesignRecipe({
  ingredients,
  ingredientsList,
  recipeList,
  quantity,
  searchRef,
  Recipe,
  updateRecipes,
  descriptionRef,
  setSearch,
  editRecipe,
  addToRecipe,
  removeItem,
  increase,
  decrease,
  deleteHandler,
  setIngredientsList,
  setRecipeList,
  setRecipe,
  setQuantity,
  actionMode,
  setActionMode,
  setEditableIngredient,
  editableIngredient,
  setAddIngredientModal,
  addIngredientModal,
}) {
  const store = usePantry();
  const [isDisabled, setIsDisabled] = useState(false);
  // const [shouldCheckLocalStorage, setShouldCheckLocalStorage] = useState(true);
  // console.log(Recipe.recipe.portions);
  const { addDBRecipe, addSingleIngredient, addStoreRecipe } = usePantry();

  let recipes = store.recipes;
  const descriptionValue = descriptionRef?.current;
  const storeIngredients = usePantry((store) => store.ingredients);
  const storeRecipes = usePantry((store) => store.recipes);

  useEffect(() => {
    setIngredientsList(storeIngredients);
  }, [storeIngredients]);
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

  function openModal() {
    setAddIngredientModal(true);
  }

  function closeModal() {
    setAddIngredientModal(false);
  }

  useLayoutEffect(() => {
    validateForm();
  }, [Recipe?.recipe?.tittle, Recipe?.recipe?.portions, recipeList]);
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
  ///try

  const addToListofRecipe = () => {
    // console.log(Recipe.recipe.imageUrl);
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
        ingredients,
        description: descriptionValue,
        title: Recipe?.recipe?.tittle ?? Recipe.recipe.title,
        portions: Recipe?.recipe?.portions,
        imageUrl: Recipe?.recipe?.imageUrl,
      },
      _id: Recipe?._id,
    });
    setRecipeList([]);
    setRecipe({
      recipe: { title: "", portions: 0 },
      _id: null,
    });

    descriptionRef.current = "";
    //setDescriptionValue("");
    setQuantity([]);
    setIngredientsList(storeIngredients);
    // // console.log(recipeList, ingredients);
  };
  const makeBkup = () => {
    storeIngredients.forEach((ingredient) => {
      // console.log(ingredient);
      addIngredient(ingredient.ingredient);
    });
  };

  // console.log(Recipe);
  const validateForm = () => {
    if (
      Recipe?.title?.trim() === "" ||
      +Recipe?.portions < 1 ||
      recipeList.length < 1
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    // console.log(
    //   isDisabled,
    //   recipeList.length > 1,
    //   +portions,
    //   title,
    //   title.trim() === "",
    // );
  };

  const myDivRef = useRef(null);

  // Function to scroll to the referenced div
  const scrollToDiv = () => {
    myDivRef?.current.scrollIntoView({ behavior: "smooth" });
  };
  //console.log(actionMode)
  return (
    <div
      className="recipeDesignOutContainer"
      style={{
        background: "#f9f6ea",
        minHeight: "100vh",
        maxWidth: "100vw",
        // marginTop: "2rem",
      }}
    >
      {/* <div className="h-50px"> </div> */}
      <div
        className="recipeDesignContainer"
        style={{
          margin: "0 auto",
          padding: "0.6rem",
          color: "#3a2412",
          marginTop: "2rem",
        }}
      >
        {/* INGREDIENTS SECTION */}
        <section style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{ fontSize: "1.5rem", fontWeight: 600, color: "#a86b3c" }}
            >
              Ingredients
            </h2>
            <button
              className="addButton"
              onClick={openModal}
              style={{
                background: "#e7c08a",
                color: "#5a2d06",
                border: "none",
                borderRadius: 8,
                padding: "0.5rem 1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(200,180,120,0.10)",
              }}
            >
              {addIngredientModal ? "Close Form" : "Add Ingredient to the list"}
            </button>
          </div>
          {addIngredientModal && (
            <Modal isOpen={addIngredientModal} onClose={closeModal}>
              <Form
                editableIngredient={editableIngredient}
                key={editableIngredient?.name}
                onClose={closeModal}
              />
            </Modal>
          )}
          <div style={{ margin: "0.25rem 0" }}>
            <Suspense fallback={<ActionBoxSkeleton />}>
              <ActionBox
                ingredientsList={ingredientsList}
                addToRecipe={addToRecipe}
                actionMode={actionMode}
                setActionMode={setActionMode}
              />
            </Suspense>
          </div>
          <input
            type="text"
            placeholder="Search ingredients..."
            style={{
              minWidth: 200,
              margin: "0.5rem 0",
              padding: "0.4rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
            ref={searchRef}
            onChange={setSearch}
          />
        </section>

        {/* RECIPE FORM SECTION */}
        <section
          style={{
            background: "#fff6e3",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(168,107,60,0.10)",
            padding: "1.5rem",
            marginBottom: "2rem",
            color: "#3a2412",
          }}
        >
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#a86b3c",
            }}
          >
            Create Recipe
          </h2>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {/* Left: Title, Portions, Image */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <label style={{ fontWeight: 600 }}>Title</label>
              <input
                name="title"
                type="text"
                style={{
                  width: "100%",
                  height: 32,
                  borderRadius: 8,
                  padding: "0.3rem",
                  margin: "0.25rem 0 1rem 0",
                  border: "1px solid #ccc",
                }}
                defaultValue={Recipe?.recipe?.tittle ?? Recipe.recipe?.title}
                placeholder="Recipe name"
                onChange={(e) =>
                  setRecipe((prev) => ({
                    ...prev,
                    recipe: {
                      ...prev.recipe,
                      [e.target.name]: e.target.value,
                    },
                  }))
                }
                required
              />
              <label style={{ fontWeight: 600 }}>Portions</label>
              <input
                name="portions"
                type="number"
                min={1}
                style={{
                  width: "60px",
                  height: 32,
                  borderRadius: 8,
                  padding: "0.3rem",
                  margin: "0.25rem 0 1rem 0",
                  border: "1px solid #ccc",
                }}
                defaultValue={Recipe?.recipe?.portions}
                placeholder="#"
                onChange={(e) =>
                  setRecipe((prev) => ({
                    ...prev,
                    recipe: {
                      ...prev.recipe,
                      [e.target.name]: e.target.value,
                    },
                  }))
                }
                required
              />
              <div style={{ margin: "1rem 0" }}>
                {Recipe?.recipe?.imageUrl ? (
                  <div style={{ marginBottom: "0.5rem" }}>
                    <img
                      src={Recipe.recipe?.imageUrl?.url}
                      height={120}
                      width={90}
                      style={{ borderRadius: 8, objectFit: "cover" }}
                    />
                  </div>
                ) : null}
                <SimpleUploadButton
                  setRecipe={setRecipe}
                  image={!!Recipe?.recipe?.imageUrl}
                />
              </div>
            </div>
            {/* Right: Ingredients List */}
            <div style={{ flex: 2, minWidth: 320 }}>
              <label
                style={{
                  fontWeight: 600,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                Ingredients in Recipe
              </label>
              {recipeList?.length > 0 ? (
                <div style={{ marginBottom: "1rem" }}>
                  <div
                    className="ingredients-list-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "1rem",
                      width: "100%",
                    }}
                  >
                    {recipeList.map((item, index) => (
                      <RecipeIngredientCard
                        key={item?._id}
                        item={item}
                        index={index}
                        quantity={quantity}
                        removeItem={removeItem}
                        increase={increase}
                        decrease={decrease}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="ingredients-list-empty"
                  style={{
                    margin: "0.25rem 0",
                    background: "rgba(150,30,10,0.08)",
                    borderRadius: "5px",
                    padding: "0.25rem",
                    color: "#a33",
                    maxWidth: "70%",
                  }}
                >
                  Add ingredients from the box above ☝🏽
                </div>
              )}
            </div>
          </div>
        </section>

        {/* DESCRIPTION SECTION */}
        <section
          style={{
            background: "#fff6e3",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(168,107,60,0.10)",
            padding: "1.5rem",
            marginBottom: "2rem",
            color: "#3a2412",
          }}
        >
          <label
            style={{
              fontWeight: 600,
              marginBottom: 8,
              display: "block",
              color: "#a86b3c",
            }}
          >
            Preparation Steps
          </label>
          <textarea
            type="text"
            placeholder="Preparation steps"
            style={{
              width: "100%",
              minHeight: "80px",
              borderRadius: 8,
              padding: "0.5rem",
              color: "#3a2412",
              border: "1px solid #e7c08a",
              marginBottom: "1rem",
              background: "#fff",
            }}
            defaultValue={descriptionValue}
            onChange={(e) => {
              descriptionRef.current = e.target.value;
            }}
          />
          <div style={{ textAlign: "center" }}>
            <button
              className={isDisabled ? "buttonDisabled" : "addButton"}
              disabled={isDisabled}
              onClick={addToListofRecipe}
              style={{
                padding: "0.7rem 2rem",
                fontSize: "1.1rem",
                borderRadius: 8,
                background: isDisabled ? "#eee" : "#c9b87a",
                color: isDisabled ? "#aaa" : "#3a2412",
                fontWeight: "bold",
                border: "none",
                cursor: isDisabled ? "not-allowed" : "pointer",
                boxShadow: "0 1px 4px rgba(200,180,120,0.10)",
              }}
            >
              Add Recipe to Library
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

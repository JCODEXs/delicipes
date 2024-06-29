import { useEffect, useRef, useState, useLayoutEffect } from "react";
// import styles from "./recepiDesign.css";
import Form from "./ingredientsDatabase";
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
import ActionBox from "./actionbox";
import RecipeConstructionForm from "./recipeConstruction";
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

  const { addDBRecipe, addSingleIngredient, addStoreRecipe } = usePantry();

  let recipes = store.recipes;
  const descriptionValue = descriptionRef?.current;
  const storeIngredients = usePantry((store) => store.ingredients);
  const storeRecipes = usePantry((store) => store.recipes);

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
    // console.log(Recipe);
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
        tittle: Recipe?.recipe?.tittle,
        portions: Recipe?.recipe?.portions,
      },
      _id: Recipe?._id,
    });
    setRecipeList([]);
    setRecipe({
      recipe: { tittle: "", portions: 0 },
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

  const validateForm = () => {
    if (
      Recipe?.recipe?.tittle?.trim() === "" ||
      +Recipe?.recipe?.portions < 1 ||
      recipeList.length < 1
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    // ///  console.log(isDisabled,recipeList.length>1,+portions,tittle,tittle.trim() === "")
  };

  const myDivRef = useRef(null);

  // Function to scroll to the referenced div
  const scrollToDiv = () => {
    myDivRef?.current.scrollIntoView({ behavior: "smooth" });
  };
  //console.log(actionMode)
  return (
    <div className="out-container">
      <div className="background"></div>
      <div className="container ">
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
                    editableIngredient={editableIngredient}
                    key={editableIngredient?.name}
                    onClose={closeModal}
                  />
                </Modal>
              )}
            </div>

            <div ref={myDivRef}>
              <ActionBox
                ingredientsList={ingredientsList}
                addToRecipe={addToRecipe}
                actionMode={actionMode}
                setActionMode={setActionMode}
              />
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
          </div>
        </div>
        {/* ///begins recipe */}
        <RecipeConstructionForm
          recipeList={recipeList}
          increase={increase}
          decrease={decrease}
          quantity={quantity}
          removeItem={removeItem}
          Recipe={Recipe}
        />

        {/* //////
        ends recipe
        ///////// */}
        <div
          style={{
            position: "sticky",
            top: 5,
            fontSize: "1.8rem",
            margin: "2rem",
          }}
        >
          Library
        </div>
        <div className="ReceipLibrary">
          {
            // !shouldCheckLocalStorage &&
            storeRecipes.map((_recipe) => {
              // console.log(_recipe);
              if (_recipe?._id) {
                return (
                  <div
                    className="w-auto"
                    key={_recipe?._id}
                    onClick={() => {
                      editRecipe(_recipe);
                      scrollToDiv();
                    }}
                  >
                    <RecipeCardComponent
                      key={_recipe?._id}
                      _id={_recipe?._id}
                      recipe={_recipe.recipe}
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
//recipe
//  <div>
//    <div ref={myDivRef} id="recipe" className="recipe">
//      <div>
//        {/* <h2 style={{ marginBottom: "1rem" }}>New recipe</h2> */}

//        <div className="out-container">
//          <input
//            name="tittle"
//            type="text"
//            style={{
//              width: "70%",
//              height: 30,
//              borderRadius: 8,
//              padding: "0.2rem",
//              margin: "0.25rem",
//            }}
//            value={Recipe?.recipe?.tittle}
//            placeholder="Recipe name"
//            onChange={(e) =>
//              setRecipe((prev) => ({
//                ...prev,
//                [e.target.name]: e.target.value,
//              }))
//            }
//            required
//          />{" "}
//          <div
//            style={{
//              display: "flex",
//              flexDirection: "row",
//              alignItems: "center",
//            }}
//          >
//            for:{" "}
//            <input
//              name="portions"
//              type="number"
//              style={{
//                width: "22%",
//                height: 30,
//                borderRadius: 8,
//                padding: "0.2rem",
//              }}
//              value={Recipe?.recipe?.portions}
//              placeholder="# 👤"
//              onChange={(e) =>
//                setRecipe((prev) => ({
//                  ...prev,
//                  [e.target.name]: e.target.value,
//                }))
//              }
//              required
//            />
//            {/* {personSvg} */}
//          </div>
//        </div>
//        {recipeList?.length > 0 ? (
//          <h4>Adjust quantitys</h4>
//        ) : (
//          <h3 style={{ margin: "2rem", marginBottom: "0rem" }}>
//            Add ingredients from the box abobe ☝🏽
//          </h3>
//        )}
//        <div className="incrementalnputs">
//          {recipeList?.map((item, index) => {
//            // //  console.log(item);
//            return (
//              <div
//                style={{
//                  display: "flex",
//                  flexDirection: "row",
//                  alignItems: "center",
//                  justifyContent: "space-between",
//                  flexBasis: "calc(30% - 10px)",
//                  border: "1px solid rgb(220,170,180,0.8)", //rgb(20,70,110,0.7)",
//                  padding: "0.15rem",
//                  borderRadius: "8px",
//                  boxShadow: "-1px -2px -3px rgb(20,70,110,0.7)",
//                }}
//                key={item?._id}
//              >
//                <div className="itemQ2" style={{ margin: "0.3rem" }}>
//                  {item?.ingredient?.name}
//                </div>
//                <div className="in-container">
//                  <button
//                    className="buttonSum"
//                    onClick={() => increase(index, item?.ingredient?.units)}
//                  >
//                    +
//                  </button>
//                  {}
//                  <button
//                    className="buttonSum"
//                    onClick={() => decrease(index, item?.ingredient?.units)}
//                  >
//                    -
//                  </button>{" "}
//                </div>
//                <div className="in-container">
//                  {" "}
//                  <div className="item2">{quantity?.[index]}</div>{" "}
//                  <div className="baseMarc">{item?.ingredient?.units}</div>
//                  <div
//                    style={{
//                      margin: "0.25rem",
//                      fontSize: "1.5rem",
//                      // marginInlineStart: "0.5rem",
//                      padding: "0.5rem",
//                      color: "rgb(200,30,14)",
//                      // alignItems: "flex-start",
//                      justifyContent: "flex-end",
//                      borderLeft: "1px solid rbg(10,15,65,0.8)",
//                    }}
//                    onClick={() => removeItem(item, index)}
//                  >
//                    {" "}
//                    X
//                  </div>
//                </div>
//              </div>
//            );
//          })}
//        </div>
//      </div>
//    </div>
//    <div id="description" className="description">
//      <div>
//        <textarea
//          type="text"
//          placeholder="Preparation steps"
//          style={{
//            width: "98%",
//            height: "fit-content",
//            borderRadius: 8,
//            padding: "0.25rem",
//          }}
//        />
//      </div>
//      <div
//        style={{
//          display: "flex",
//          flexDirection: "row",
//          justifyContent: "center",
//        }}
//      >
//        <button
//          className={isDisabled ? "buttonDisabled" : "addButton"}
//          disabled={isDisabled}
//          onClick={() => addToListofRecipe()}
//        >
//          Add recipe to Library
//        </button>
//      </div>
//    </div>
//  </div>;

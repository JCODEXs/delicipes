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
const ActionBox = lazy(() => import("./actionbox"));
import { SimpleUploadButton } from "../simple-upload-button";
import Image from "next/image";
import ActionBoxSkeleton from "./actionBoxSqueleton";
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
  addRecipeIngredients,
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

            <div className=" actionBox mb-4 flex flex-row flex-wrap">
              {" "}
              <ActionBox
                ingredientsList={ingredientsList}
                addToRecipe={addToRecipe}
                actionMode={actionMode}
                setActionMode={setActionMode}
                recipes={false}
                addRecipeIngredients={addRecipeIngredients}
              />
            </div>
            <div className=" actionBox mb-4 flex flex-row flex-wrap">
              {" "}
              <ActionBox
                ingredientsList={storeRecipes}
                addToRecipe={addToRecipe}
                actionMode={actionMode}
                setActionMode={setActionMode}
                recipes={true}
                addRecipeIngredients={addRecipeIngredients}
              />
            </div>

            <div style={{ margin: "0.5rem", fontSize: "1.4rem" }}>
              <input
                type="text"
                style={{
                  minWidth: 120,
                  margin: "0.3rem",
                  color: "black",
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

        <div ref={myDivRef} id="recipe" className="recipe actionBox">
          <div>
            {/* <h2 style={{ marginBottom: "1rem" }}>New recipe</h2> */}

            <div className="out-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontWeight: 900,
                  marginLeft: "0.5rem",
                }}
              >
                {" "}
                Title :
                <input
                  name="title"
                  type="text"
                  style={{
                    width: "60%",
                    height: 30,
                    borderRadius: 8,
                    padding: "0.2rem",
                    margin: "0.25rem",
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
                />{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                  fontWeight: 900,
                  marginLeft: "0.5rem",
                }}
              >
                <div>For : </div>
                <input
                  name="portions"
                  type="number"
                  style={{
                    width: "50px",
                    height: 30,
                    borderRadius: 8,
                    padding: "0.2rem",
                  }}
                  defaultValue={Recipe?.recipe?.portions}
                  placeholder="# 👤"
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
                <p>Portions</p>
                {/* {personSvg} */}
              </div>
            </div>
            {recipeList?.length > 0 ? (
              <div className="z-10 bg-black">Adjust quantitys</div>
            ) : (
              <div
                style={{
                  margin: "0.5rem",
                  marginBottom: "0.5rem",
                  background: "rgb(150,30,10,0.5)",
                  borderRadius: "5px",
                  padding: "0.25rem",
                  width: "fit-content",
                }}
              >
                Add ingredients from the box abobe ☝🏽
              </div>
            )}
            <div className="incrementalnputs mb-4">
              {recipeList?.map((item, index) => {
                // //  console.log(item);
                return (
                  <div
                    className="actionBox2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexBasis: "calc(20% - 10px)",
                      background: "rgb(250,250,200,0.5)",
                      content: "☝🏽",
                      //border: "1px solid rgb(220,170,180,0.8)", //rgb(20,70,110,0.7)",
                      padding: "0.15rem",
                      borderRadius: "8px",
                      boxShadow: "-1px -2px -3px rgb(20,70,110,0.7)",
                      maxWidth: "155px",
                    }}
                    key={item?._id}
                  >
                    {" "}
                    <div className="itemQ2" style={{ margin: "0.3rem" }}>
                      {item?.ingredient?.name}
                      {item?.ingredient?.image}
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
                    <div
                      className="in-container "
                      style={{ marginLeft: "0.5rem", gap: "0.7rem" }}
                    >
                      {" "}
                      <div className="item2">
                        {quantity?.[index]}
                        {item?.ingredient?.units}
                      </div>{" "}
                      <div className="baseMarc"></div>
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
            {Recipe.recipe.imageUrl ? (
              <div className="relative right-0 top-0 m-6 h-16 w-16 rounded-t-lg bg-transparent object-cover p-2">
                {" "}
                <Image
                  className="rounded-md"
                  src={Recipe.recipe.imageUrl?.url}
                  height={200}
                  width={130}
                  alt="image"
                />
                <SimpleUploadButton
                  setRecipe={setRecipe}
                  image={!!Recipe.recipe.imageUrl}
                />
              </div>
            ) : (
              <SimpleUploadButton
                setRecipe={setRecipe}
                image={!!Recipe.recipe.imageUrl}
              />
            )}
          </div>
        </div>
        <div id="description" className="description actionBox">
          <div>
            <textarea
              type="text"
              placeholder="Preparation steps"
              style={{
                width: "98%",
                height: "fit-content",
                borderRadius: 8,
                padding: "0.25rem",
                color: "black",
              }}
              defaultValue={descriptionValue}
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
              onClick={() => addToListofRecipe()}
            >
              Add recipe to Library
            </button>
          </div>
        </div>

        {/* </div> */}

        <div className="ReceipLibrary">
          <div
            style={{
              position: "sticky",
              top: 5,
              fontSize: "1.8rem",
              margin: "1rem",
              maxWidth: 100,
            }}
          >
            All Recipes Library
          </div>
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
                      _recipe={_recipe}
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

// components/RecetasMatrix.js
"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./mealMatrix.css";
import { addProgram, getRecipes, usePantry } from "../../../store/pantry";
import RecipeCard from "./RecipeCard/recipeCard";
import { Modal } from "../modal/modal";
import ShopingList from "./shopingList";
const MealMatrix = ({ myPrograms }) => {
  const index = myPrograms ? myPrograms?.length - 1 : 0;
  const lastProgram = myPrograms?.[index]?._program?.selectedRecipes;
  const lastOrders = myPrograms?.[index]?._program?.portions;
  const [selectedRecipes, setSelectedRecipes] = useState(lastProgram);
  const storeRecipes = usePantry((store) => store.recipes);
  let [recipes, setRecipes] = useState();
  const [portions, setPortions] = useState({});
  const [orders, setOrders] = useState(lastOrders);
  const [dayTotals, setDayTotals] = useState();
  const [showList, setShowList] = useState(false);
  const [ingredientsTotList, setIngredientsTotList] = useState("");
  const programing = usePantry((store) => store.programing);
  const [openedModal, setOpenedModal] = useState(false);
  const [showRecipePicker, setShowRecipePicker] = useState(false);
  const [recipePickerDay, setRecipePickerDay] = useState(null);
  const { deletePrograming, addStoreRecipe, addStorePrograming } = usePantry();
  // // // console.log(ingredientsTotList);
  console.log("Recipes info", recipes);
  console.log("storeRecipes:", storeRecipes);

  // First useEffect: fetch from API if store is empty
  useEffect(() => {
    const fetchData = async () => {
      if (!storeRecipes || storeRecipes.length < 1) {
        const fetchedRecipes = await getRecipes();
        if (fetchedRecipes && fetchedRecipes.length > 0) {
          fetchedRecipes.forEach((recipe) => addStoreRecipe(recipe));
        }
      }
    };
    fetchData();
  }, []);

  // Second useEffect: always sync local recipes with store
  useEffect(() => {
    setRecipes(storeRecipes);
  }, [storeRecipes]);

  const OnClickExpand = () => {
    setShowList(!showList);
  };

  const deleteFromSelected = (day, recipeID) => {
    setSelectedRecipes((prevSelectedRecipes) => {
      return {
        ...prevSelectedRecipes,
        [day]: [
          ...(prevSelectedRecipes?.[day]?.filter(
            (prevRecipes) => prevRecipes?._id !== recipeID,
          ) || []),
        ],
      };
    });
  };

  const passPortions = (portions, _id) => {
    setPortions((prevPortions) => {
      // Create a new object that contains all previous portions and updates or adds the new portion
      return { ...prevPortions, [_id]: portions };
    });
  };
  const setProgramPortions = (day, portions, recipeID) => {
    setSelectedRecipes((prevSelectedRecipes) => {
      // // console.log(prevSelectedRecipes[day]);
      // // console.log(recipeID, currentRecipes);
      const currentRecipes = prevSelectedRecipes[day] ?? [];
      let modifiedRecipe = currentRecipes.find(
        (recipe) => recipe._id === recipeID,
      );
      let restRecipes = currentRecipes.filter(
        (recipe) => recipe._id !== recipeID,
      );
      if (modifiedRecipe) {
        const updatedRecipe = {
          ...modifiedRecipe,
          realPortions: portions[recipeID],
        };
        // // console.log(modifiedRecipe);
        const modifiedIndex = currentRecipes.findIndex(
          (recipe) => recipe._id === recipeID,
        );
        const newRecipes = [
          ...currentRecipes.slice(0, modifiedIndex),
          updatedRecipe,
          ...currentRecipes.slice(modifiedIndex + 1),
        ];
        const updatedSelectedRecipes = {
          ...prevSelectedRecipes,
          [day]: newRecipes,
        };
        // // console.log(updatedSelectedRecipes);
        return updatedSelectedRecipes;
      } else {
        return prevSelectedRecipes;
      }
    });
  };
  // console.log(selectedRecipes);

  const handleSelectRecipe = (day, _recipe) => {
    // console.log(day, _recipe);

    const isRecipeSelected = selectedRecipes?.[day]?.some((recipe) => {
      return _recipe._id === recipe._id;
    });
    // console.log(isRecipeSelected);
    if (!isRecipeSelected) {
      setSelectedRecipes((prevSelectedRecipes) => ({
        ...prevSelectedRecipes,
        [day]: [...(prevSelectedRecipes?.[day] || []), _recipe],
      }));
    }
  };

  useEffect(() => {
    calculateTotals();
  }, [selectedRecipes, portions]);

  const calculateTotals = () => {
    const ingredientsTotals = {};
    let ingredientsTotalsDay = {};
    let totalPrice = [];

    //Recorre las recetas seleccionadas

    {
      selectedRecipes &&
        Object?.entries(selectedRecipes).forEach(([key, recipes]) => {
          // console.log(selectedRecipes[key]);
          ingredientsTotalsDay[key] = {};

          selectedRecipes?.[key]?.map((recipe) => {
            const RecipeIngredients = recipe.ingredients;
            // // console.log(RecipeIngredients);
          });
          // // console.log(recipes);
          // Recorre los ingredientes de cada receta y suma las cantidades y precios
          if (selectedRecipes[key].length > 0) {
            totalPrice[key] = 0;
            selectedRecipes[key].forEach((recipe_) => {
              const recipe = recipe_.recipe;
              const portionsUnit =
                portions?.[`${recipe_._id}${key}`] ??
                Number(recipe.portions) ??
                1;
              const realPortions = recipe.realPortions ?? 1;
              // // console.log(realPortions, portionsUnit, portions?.[recipe.key]);
              // Only map if ingredients exist
              if (Array.isArray(recipe.ingredients)) {
                recipe.ingredients.map((ingredient) => {
                  const ingredientProps = ingredient.ingredient;
                  const cantidad = ingredient.quantity / recipe.portions;
                  const { name: nombre, grPrice: precio } = ingredientProps;
                  // // console.log(ingredientsTotalsDay[key]); //(realPortions, cantidad, portions, ingredientProps);
                  if (ingredientsTotals[nombre]) {
                    ingredientsTotals[nombre].cantidad +=
                      cantidad * portionsUnit;
                    if (!ingredientsTotalsDay[key][nombre]) {
                      ingredientsTotalsDay[key][nombre] = {
                        cantidad: 0,
                        precio: 0,
                      };
                    }
                    ingredientsTotalsDay[key][nombre].cantidad +=
                      cantidad * portionsUnit;
                    ingredientsTotals[nombre].precio +=
                      precio * cantidad * portionsUnit;
                    ingredientsTotalsDay[key][nombre].precio +=
                      precio * cantidad * portionsUnit;
                  } else {
                    ingredientsTotals[nombre] = {
                      cantidad: cantidad * portionsUnit,
                      precio: precio * cantidad * portionsUnit,
                    };
                    ingredientsTotalsDay[key][nombre] = {
                      cantidad: cantidad * portionsUnit,
                      precio: precio * cantidad * portionsUnit,
                    };
                  }
                  totalPrice[key] += precio * cantidad * portionsUnit;
                });
              }
            });
            // console.log(totalPrice[key], key, ingredientsTotalsDay);
            setDayTotals((prevDaysTotal) => ({
              ...prevDaysTotal,
              [key]: totalPrice[key],
            }));
          } else {
            totalPrice[key] = 0;
            selectedRecipes[key]?.[0]?.ingredients?.map((ingredient) => {
              const realPortions = selectedRecipes[key]?.[0].realPortions ?? 1;
              const porciones = Number(selectedRecipes[key]?.[0]?.portions);
              const Portions = portions[`${selectedRecipes[key][0]._id}${key}`];
              const ingredientProps = ingredient.ingredient;
              const cantidad = ingredient.quantity / porciones;
              const { name: nombre, grPrice: precio } = ingredientProps;
              // // console.log(
              //   realPortions,
              //   cantidad,
              //   selectedRecipes[key][0],
              //   portions,
              //   `${selectedRecipes[key][0].key}`,
              //   portions[`${selectedRecipes[key][0].key}`],
              //   nombre,
              //   precio
              // );
              if (ingredientsTotals[nombre]) {
                // // console.log(cantidad, Portions);
                ingredientsTotalsDay[key][nombre] = { cantidad: 0, precio: 0 };
                ingredientsTotals[nombre].cantidad += cantidad * Portions;
                ingredientsTotalsDay[key][nombre].cantidad +=
                  cantidad * Portions;
                ingredientsTotals[nombre].precio +=
                  precio * cantidad * Portions;
                ingredientsTotalsDay[key][nombre].precio +=
                  precio * cantidad * Portions;
              } else {
                ingredientsTotals[nombre] = {
                  cantidad: cantidad * Portions,
                  precio: precio * cantidad * Portions,
                };

                ingredientsTotalsDay[key][nombre] = {
                  cantidad: cantidad * Portions,
                  precio: precio * cantidad * Portions,
                };
              }
              totalPrice[key] += precio * cantidad * Portions;
            });
            // // console.log(ingredientsTotalsDay, key);
            setDayTotals((prevDaysTotal) => ({
              ...prevDaysTotal,
              [key]: totalPrice[key],
            }));
          }
          // console.log(dayTotals);
        });
    }
    // // console.log(ingredientsTotals, ingredientsTotalsDay);
    setIngredientsTotList([ingredientsTotals, ingredientsTotalsDay]);

    const weekPrice = Object.values(ingredientsTotals).reduce(
      (total, ingredient) => {
        return total + ingredient.precio;
      },
      0,
    );
    setDayTotals({
      ...dayTotals,
      ...Object.fromEntries(Object.entries(totalPrice).map(([k, v]) => [k, v])),
      total: weekPrice,
    });
    // // // // console.log(weekPrice);
    // // // // console.log(ingredientsTotals, dayTotals);
    // const weekPrice = in?.reduce((acc, ingredient) => {
    //   return ingredient.price + acc;
    // }, 0);
    // // // // console.log(weekPrice);
    return { ingredientsTotals, totalPrice, weekPrice, ingredientsTotalsDay };
  };

  const handleDragStart = (event, recipe) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify({ recipe }));
    // // // // console.log(recipe);
  };
  const handleDragStartFromDay = (event, recipe, dayFrom) => {
    // if(!dayFrom){
    //     event.dataTransfer.effectAllowed = 'move';
    //     event.dataTransfer.setData('text/plain', JSON.stringify({recipe}));
    // }
    const thisRecipe = recipe.recipe;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ recipe, dayFrom }),
    );
    // // // // console.log(recipe);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    const target = event;
    // // // console.log(target);
  };

  const handleDrop = (event, day) => {
    event.preventDefault();
    const data = event?.dataTransfer?.getData("text/plain");
    let parsedData = null;

    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      // Handle the error (e.g., display a message, set default values, etc.)
      console.error("Error parsing JSON data:", error);
    }

    const recipe = parsedData.recipe;
    const dayFrom = parsedData.dayFrom;
    if (dayFrom && selectedRecipes[dayFrom]) {
      const updatedRecipes = selectedRecipes[dayFrom].filter(
        (r) => r._id !== recipe._id,
      );
      // console.log(updatedRecipes, recipe._id, selectedRecipes);
      setSelectedRecipes((prevSelectedRecipes) => ({
        ...prevSelectedRecipes,
        [dayFrom]: updatedRecipes,
      }));
    }
    handleSelectRecipe(day, recipe);
  };
  const weekDays = [
    // "1ª",
    // "2ª",
    // "3ª",
    // "4ª",
    // "5ª",
    // "6ª",
    // "7ª",
    // "8ª",
    // "9ª",
    // "10ª",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    // "Lunesgo",
    // "Marto",
  ];
  const ingredientList = Object.entries(ingredientsTotList).map(
    ([ingredient, details]) => (
      <li key={ingredient}>
        {details.cantidad?.toFixed(1)}
        {details.cantidad > 49 ? "gr" : "unid"} {ingredient} Price:{" "}
        {details.precio?.toFixed(0)}
      </li>
    ),
  );
  const ingListByDay = (day) => {
    // // console.log(day, ingredientsTotList[1]?.[day]);
    if (ingredientsTotList[1]?.[day]) {
      // // console.log(day, ingredientsTotList[1]);
      return Object.entries(ingredientsTotList?.[1]?.[day])?.map(
        ([ingredient, details]) => (
          <li key={ingredient}>
            {details?.cantidad && details?.cantidad.toFixed(0)}{" "}
            {details?.cantidad > 12 ? "gr" : "unid"} {ingredient}
            {/*  ${" "}{details.precio?.toFixed(0)} */}
          </li>
        ),
      );
    }
  };
  console.log(recipes);

  const getRecipePrice = (recipe) => {
    if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) return 0;
    return recipe.ingredients.reduce((sum, ingredient) => {
      const grPrice = ingredient.ingredient?.grPrice || 0;
      const quantity = ingredient.quantity || 0;
      return sum + grPrice * quantity;
    }, 0);
  };

  useEffect(() => {
    if (showRecipePicker) setPickerSelected([]);
  }, [showRecipePicker]);

  const [pickerSelected, setPickerSelected] = useState([]);

  return (
    <div className="mealMatrix">
      {/* Floating Action Buttons */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: "rgba(20, 20, 30, 0.95)",
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "row",
          gap: "1.5rem",
          alignItems: "center",
        }}
      >
        <button
          className="buttonP"
          onClick={() => {
            addProgram({ selectedRecipes, portions, ingredientsTotList });
          }}
        >
          Save Program
        </button>
        <button
          className="buttonP"
          onClick={() => {
            deletePrograming();
          }}
        >
          Delete
        </button>
        {/* <button
          className="buttonP"
          onClick={() => setOpenedModal(!openedModal)}
        >
          Shopping List
        </button> */}
      </div>

      {/* Shopping List Modal */}
      {openedModal && (
        <Modal isOpen={openedModal} onClose={() => setOpenedModal(false)}>
          <ShopingList RecipeList={ingredientsTotList[0]} />
        </Modal>
      )}

      {/* Week Navigation & Sticky Week Total */}
      <div
        style={{
          position: "fixed",
          top: "108px", // <-- Adjust this to your menu height
          background: "rgba(10, 10, 20, 0.98)",
          zIndex: 110,
          padding: "0.5rem 0",
          marginBottom: "0.5rem",
          borderBottom: "2px solid #c9b87a",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "56px",
          width: "100%",
          left: 0,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "#23262e",
            borderRadius: "10px",
            padding: "0.5rem 1.5rem",
            boxShadow: "0 1px 8px rgba(0,0,0,0.10)",
            border: "2px solid #c9b87a",
          }}
        >
          <span
            style={{
              color: "#c9b87a",
              fontWeight: "bold",
              fontSize: "1.1rem",
              letterSpacing: "0.04em",
              textShadow: "0 1px 2px #181818",
            }}
          >
            Week Total:
          </span>
          <span
            style={{
              color: "#fffbe6",
              fontWeight: "bold",
              fontSize: "1.35rem",
              background: "linear-gradient(90deg, #c9b87a 60%, #e6e2c0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.04em",
            }}
          >
            ${dayTotals?.["total"]?.toFixed(0) ?? 0}
          </span>
        </div>
      </div>
      <div style={{ height: "110px" }}></div>
      {/* Days Columns */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1.5rem",
          overflowX: "auto",
          padding: "1rem 0",
        }}
      >
        {weekDays.map((day) => (
          <div
            key={day}
            style={{
              background: "rgba(18, 20, 24, 0.96)",
              borderRadius: "12px",
              minWidth: "340px",
              maxWidth: "90vw",
              padding: "1rem",
              boxShadow: "0 1px 8px rgba(0,0,0,0.10)",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <div
              id={`card-${day}`}
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.5rem",
                color: "#e6e2c0",
              }}
            >
              {day}
            </div>

            {/* Add Recipe Button */}
            <button
              className="buttonP"
              style={{
                marginBottom: "0.75rem",
                background: "#2a2d36",
                color: "#e6e2c0",
                border: "none",
                borderRadius: "6px",
                padding: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => {
                setRecipePickerDay(day);
                setShowRecipePicker(true);
              }}
            >
              + Add Recipe
            </button>

            {/* Selected Recipes for the Day */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {selectedRecipes?.[day] &&
                selectedRecipes[day].map((_selectedRecipe) => (
                  <div
                    key={_selectedRecipe._id + day}
                    draggable="true"
                    onDragStart={(event) =>
                      handleDragStartFromDay(event, _selectedRecipe, day)
                    }
                    style={{
                      borderRadius: "7px",
                      border: "1px solid #333",
                      background: "#23262e",
                      padding: "0.5rem",
                    }}
                  >
                    <RecipeCard
                      key={_selectedRecipe._id}
                      recipe_={_selectedRecipe.recipe}
                      day={day}
                      showPortions={true}
                      getPortions={setProgramPortions}
                      passPortions={passPortions}
                      _id={_selectedRecipe._id}
                      deleteCard={() => {
                        deleteFromSelected(day, _selectedRecipe._id);
                      }}
                      orders={orders?.[_selectedRecipe._id + day]}
                    />
                  </div>
                ))}
            </div>

            {/* Day Total */}
            <div
              style={{
                marginTop: "1rem",
                color: "#c9b87a",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Day total:{" "}
              {dayTotals?.[day] && <>${dayTotals?.[day]?.toFixed(0)}</>}
            </div>

            {/* Ingredient List Toggle */}
            <div style={{ marginTop: "0.5rem" }}>
              {showList ? (
                <div onClick={() => OnClickExpand()}>{ingListByDay(day)}</div>
              ) : (
                <div
                  onClick={() => OnClickExpand()}
                  style={{
                    color: "#8fa1b3",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    marginTop: "0.25rem",
                  }}
                >
                  Show ingredient list
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showRecipePicker && (
        <>
          {console.log("Recipes in picker:", recipes)}
          <Modal
            isOpen={showRecipePicker}
            onClose={() => {
              setShowRecipePicker(false);
              setPickerSelected([]);
            }}
          >
            <div>
              <h3 style={{ color: "#e6e2c0" }}>
                Pick recipes for {recipePickerDay}
              </h3>
              <div
                style={{
                  maxHeight: "80vh",
                  overflowY: "auto",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                {recipes &&
                  recipes.map((recipe_) => {
                    const recipe = recipe_.recipe || recipe_;
                    const price = getRecipePrice(recipe);
                    const isSelected = pickerSelected.some(
                      (r) => r._id === recipe_._id,
                    );
                    return (
                      <div
                        key={recipe_._id}
                        style={{
                          background: isSelected ? "#3a3e4a" : "#23262e",
                          border: isSelected
                            ? "2px solid #c9b87a"
                            : "1px solid #333",
                          borderRadius: "10px",
                          padding: "1rem",
                          width: "230px",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                          transition:
                            "box-shadow 0.2s, border 0.2s, background 0.2s",
                        }}
                        onClick={() => {
                          setPickerSelected((prev) =>
                            prev.some((r) => r._id === recipe_._id)
                              ? prev.filter((r) => r._id !== recipe_._id)
                              : [...prev, recipe_],
                          );
                        }}
                      >
                        {recipe.imageUrl?.url && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: "0.75rem",
                            }}
                          >
                            <img
                              src={recipe.imageUrl.url}
                              alt={recipe.title}
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                border: "1px solid #444",
                              }}
                            />
                          </div>
                        )}
                        <div
                          style={{
                            color: "#e6e2c0",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            marginBottom: "0.35rem",
                            textAlign: "center",
                          }}
                        >
                          {recipe.title}
                        </div>
                        {recipe.description && (
                          <div
                            style={{
                              color: "#bdbdbd",
                              fontSize: "0.97rem",
                              marginBottom: "0.35rem",
                              textAlign: "center",
                              minHeight: "38px",
                            }}
                          >
                            {recipe.description.length > 60
                              ? recipe.description.slice(0, 60) + "..."
                              : recipe.description}
                          </div>
                        )}
                        <div
                          style={{
                            color: "#c9b87a",
                            fontSize: "0.98rem",
                            marginBottom: "0.15rem",
                          }}
                        >
                          Portions: {recipe.portions}
                          Price: ${price.toFixed(0)}
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* Button is now outside the scrollable area */}
              <button
                style={{
                  marginTop: "1.5rem",
                  background: "#c9b87a",
                  color: "#23262e",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.75rem 1.5rem",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  alignSelf: "center",
                  display: "block",
                  width: "100%",
                }}
                disabled={pickerSelected.length === 0}
                onClick={() => {
                  setSelectedRecipes((prevSelectedRecipes) => {
                    const prev = prevSelectedRecipes?.[recipePickerDay] || [];
                    // Filter out recipes already present
                    const newOnes = pickerSelected.filter(
                      (picked) => !prev.some((r) => r._id === picked._id),
                    );
                    return {
                      ...prevSelectedRecipes,
                      [recipePickerDay]: [...prev, ...newOnes],
                    };
                  });

                  // Set default portions in orders for each new recipe
                  setOrders((prevOrders) => {
                    const prev = selectedRecipes?.[recipePickerDay] || [];
                    const newOnes = pickerSelected.filter(
                      (picked) => !prev.some((r) => r._id === picked._id),
                    );
                    const updates = {};
                    newOnes.forEach((recipe) => {
                      updates[`${recipe._id}${recipePickerDay}`] =
                        recipe.recipe.portions ?? 1;
                    });
                    return { ...prevOrders, ...updates };
                  });

                  setShowRecipePicker(false);
                  setPickerSelected([]);
                }}
              >
                Add Selected Recipes
              </button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default MealMatrix;

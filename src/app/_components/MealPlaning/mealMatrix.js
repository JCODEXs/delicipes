// components/RecetasMatrix.js
"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./mealMatrix.css";
import { addProgram, getRecipes, usePantry } from "../../../store/pantry";
import RecipeCard from "./RecipeCard/recipeCard";
import { Modal } from "../modal/modal";
import ShopingList from "./shopingList";
const MealMatrix = ({ myPrograms }) => {
  console.log(myPrograms);
  const [selectedRecipes, setSelectedRecipes] = useState(
    myPrograms?.[0]?._program?.selectedRecipes,
  );
  const storeRecipes = usePantry((store) => store.recipes);
  let [recipes, setRecipes] = useState();
  const [portions, setPortions] = useState({});
  const [dayTotals, setDayTotals] = useState();
  const [showList, setShowList] = useState(false);
  const [ingredientsTotList, setIngredientsTotList] = useState("");
  const programing = usePantry((store) => store.programing);
  const [openedModal, setOpenedModal] = useState(false);
  const { deletePrograming, addStoreRecipe, addStorePrograming } = usePantry();
  // // // console.log(ingredientsTotList);
  // // //  console.log(portions);

  useEffect(() => {
    const fetchData = async () => {
      if (storeRecipes.length < 1) {
        recipes = await getRecipes();
      }
      try {
        recipes?.forEach((recipe) => {
          addStoreRecipe(recipe);
          // // console.log(recipe);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [recipes]);

  const OnClickExpand = () => {
    setShowList(!showList);
  };

  const deleteFromSelected = (day, recipeID) => {
    setSelectedRecipes((prevSelectedRecipes) => {
      // // console.log(prevSelectedRecipes[day]);

      return {
        ...prevSelectedRecipes,
        [day]: [
          ...prevSelectedRecipes?.[day]?.filter(
            (prevRecipes) => prevRecipes?._id !== recipeID,
          ),
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
    setRecipes(storeRecipes);
    // // console.log(programing);
    // setSelectedRecipes(]);
  }, [storeRecipes]);
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

          selectedRecipes[key]?.map((recipe) => {
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
                portions?.[recipe_._id] ?? Number(recipe.portions);
              const realPortions = recipe.realPortions ?? 1;
              // // console.log(realPortions, portionsUnit, portions?.[recipe.key]);
              recipe.ingredients.map((ingredient) => {
                const ingredientProps = ingredient.ingredient;
                const cantidad = ingredient.quantity / recipe.portions;
                const { name: nombre, grPrice: precio } = ingredientProps;
                // // console.log(ingredientsTotalsDay[key]); //(realPortions, cantidad, portions, ingredientProps);
                if (ingredientsTotals[nombre]) {
                  ingredientsTotals[nombre].cantidad +=
                    cantidad * portions?.[recipe_._id + key] ?? 1;
                  // // console.log(ingredientsTotalsDay[key]);
                  if (!ingredientsTotalsDay[key][nombre]) {
                    // // console.log(ingredientsTotalsDay);
                    ingredientsTotalsDay[key][nombre] = {};
                    ingredientsTotalsDay[key][nombre].cantidad = 0;
                  }
                  ingredientsTotalsDay[key][nombre].cantidad +=
                    cantidad * portions?.[recipe_._id + key] ?? 1;
                  ingredientsTotals[nombre].precio += precio * cantidad;
                  ingredientsTotalsDay[key][nombre].precio += precio * cantidad;
                } else {
                  ingredientsTotals[nombre] = {
                    cantidad: cantidad * portions?.[recipe_._id + key] ?? 1,
                    precio:
                      precio * cantidad * portions?.[recipe_._id + key] ?? 1,
                  };
                  ingredientsTotalsDay[key][nombre] = {
                    cantidad: cantidad * portions?.[recipe_._id + key] ?? 1,
                    precio:
                      precio * cantidad * portions?.[recipe_._id + key] ?? 1,
                  };
                }
                totalPrice[key] +=
                  precio * cantidad * portions?.[recipe_._id + key] ?? 1;
              });
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
    setDayTotals((prevDaysTotal) => ({
      ...prevDaysTotal,
      ["total"]: weekPrice,
    }));
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

  return (
    <div
      className="mealMatrix"
      // style={{
      //   overflow: "auto",

      //   background: "rgb(0,10,10,0.8)",
      //   boxShadow: "-2px -2px -4px rgb(210,210,210,0.8)",
      //   // background: "rgb(220,180,0,0.8)",
      //   // minHeight: 200,
      // }}
    >
      <div>
        {openedModal && (
          <Modal isOpen={openedModal} onClose={() => setOpenedModal(false)}>
            <ShopingList RecipeList={ingredientsTotList[0]} />
          </Modal>
        )}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 4,
          right: 1,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            zIndex: 10,
            gap: "1.25rem",
          }}
        >
          <button
            className="buttonP"
            onClick={() => {
              addProgram({ selectedRecipes, ingredientsTotList });
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
            {" "}
            delete
          </button>
        </div>
      </div>
      <div style={{ position: "sticky", top: 5, height: 285, blur: "5px" }}>
        {/* <div style={{ fontSize: "1.2rem", padding: "0.25rem" }}>
          Available Recipes
        </div> */}
        {/* {ingredientList} */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginInline: "0.25rem", fontSize: "0.9rem" }}>
            Drag recipes over days
          </div>
          <div className="relative ">
            <button
              onClick={() => setOpenedModal(!openedModal)}
              className="buttonP absolute right-0 top-0"
            >
              Shoping list
            </button>
          </div>
        </div>
        <div
          style={{
            // position: "sticky",
            // top: 5,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            overflowX: "auto",
            scrollbarWidth: "thin",
            alignContent: "flex-start",
            justifyContent: "spaceAround",
            alignItems: "stretch",
            backgroundColor: "rgba(1, 1, 2, 0.8)",
            padding: "0.3rem",
            height: "205px",
            fontSize: "0.9rem",
          }}
        >
          {recipes?.map((recipe) => (
            <div
              draggable="true"
              key={recipe._id}
              onDragStart={(event) => handleDragStart(event, recipe)}
            >
              <div
                style={{
                  opacity: 1,
                  cursor: "move",
                  border: "2px solid",
                  padding: "3px",
                  margin: "3px",
                  background: "rgb(1,2,3,0.9)",
                  borderRadius: "8px",
                  borderColor: "rgb(15,50,55,0.9)",
                  minWidth: "150px",
                  maxWidth: "400px",
                  // height: "170px",
                  zIndex: 2,
                }}
              >
                <RecipeCard
                  key={recipe?.recipe?.key}
                  recipe_={recipe?.recipe}
                  showPortions={false}
                  passPortions={() => {}}
                />
              </div>
            </div>
          ))}

          {/* <div
            style={{
              //border: "3px solid blue",
              margin: "4px",
              minWidth: "400",
              padding: "4px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "space-arround",
              flexWrap: "wrap",
            }}
          >
            {ingredientList}
          </div> */}
          {/* <pre>{JSON.stringify(selectedRecipes, null, 2)}</pre> */}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "1.4rem",
            padding: "0.5rem",
            // background: "rgb(1,1,10,0.31)",
            justifyContent: "space-around",
            zIndex: 3,
          }}
        >
          {/* <div>🗓 Week Program</div>{" "} */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "1rem",
            }}
          >
            {weekDays.map((day) => (
              <button
                key={day}
                onClick={() => {
                  document
                    .getElementById(`card-${day}`)
                    .scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  padding: "10px",
                  margin: "0.15rem",
                  fontSize: "1.1rem",
                  borderRadius: "5px",
                  background: "rgb(1,2,3,0.9)",
                  color: "rgb(221,205,139,0.9)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {day[0]} {/* First letter of the day */}
              </button>
            ))}
          </div>
          <div
            style={{
              boxShadow: "-2px -2px 2px 1px rgb(60,60,60,0.8)",
              fontSize: "1.1rem",
              margin: "0.25rem",
              padding: "0.15rem",
              marginLeft: "0.25rem",
              backgroundImage:
                "linear-gradient(85deg, rgba(0, 10, 10, 0.8), rgba(220, 180, 0, 0.529) 20%, rgba(183, 85, 15, 0.8) 60%, rgba(20, 42, 42, 0.8))",
            }}
          >
            {" "}
            Total: {dayTotals?.["total"]?.toFixed(0)}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "spaceAround",
          alignItems: "stretch",
          overflowX: "scroll",
          scrollbarWidth: "thin",
          filter:
            "grayscale(10%) brightness(85%) sepia(15%) contrast(92%) opacity(98%)",
          marginTop: "1rem",
          // minHeight: "400px",
          gap: "5px",
        }}
      >
        <div
          style={{
            // height: "100px",
            //   border: '1px solid',
            color: "rgb(150,200,83,0.9)",
            backgroundColor: "rgb (220,240,230,0.7)",
            display: "flex",
            // flexWrap: "wrap",
            alignItems: "flexStart",
            justifyContent: "flexStart",
            // margin: "0.2rem",
            flexDirection: "row",
            gap: "5px",
          }}
          // style={{
          //   display: 'grid',
          //   gridTemplateColumns: 'repeat(7, 1fr)',
          //   gap: '10px',
          // }}
        >
          {weekDays.map((day) => (
            <div
              key={day}
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: 350,
                margin: "0.21rem",
                background: "rgb(2,0,1,0.9)",
                borderRadius: "12px",
                minWidth: "370px",
                maxWidth: "80vw",

                // flexWrap: "wrap",
              }}
            >
              <div></div>
              <div
                draggable
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, day)}
                style={{
                  minWidth: "260px",
                  minHeight: "260px",
                  borderTop: "2px solid",
                  display: "flex",
                  background: "rgb(1,2,3,0.9)",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flexStart",
                  borderRadius: "12px",
                  // boxShadow: "-2px -2px -4px rgb(210,210,210,0.8)",
                  flexWrap: "wrap",
                  gap: "5px",
                  color: "rgb(221,205,139,0.9)",
                }}
              >
                <div
                  id={`card-${day}`}
                  style={{ fontSize: "1.35rem", padding: "0.35rem" }}
                >
                  {day}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "0.35rem",
                    flexWrap: "wrap",
                    gap: "5px",
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
                          display: "flex",
                          flexDirection: "row",
                          opacity: 1,
                          borderRadius: "7px",
                          cursor: "move",
                          border: "1px solid",
                          // maxWidth: 190,
                          minHeight: 135,
                          padding: "5px",
                          marginBottom: "5px",
                          margin: "0.18rem",
                          // backgroundColor: "lightgray",
                          // textAlign: "center",
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
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div
                style={{
                  // position: "sticky",
                  // top: 10,
                  display: "flex",
                  margin: "3px",
                  color: "rgb(250,230,210,0.9)",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignContent: "space-around",
                  justifyContent: "space-around",
                  alignItems: "stretch",
                  // backgroundColor: "rgba(190, 190, 210, 0.8)",
                  padding: "0.2rem",
                  fontSize: "1.3rem",
                  // border: "2px solid rgb(190,40,20,0.9)",
                  // boxShadow: "2px 5px 10px",
                  // borderRadius: "8px",
                  gap: "5px",
                }}
              >
                Day total:
                {dayTotals?.[day] && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div>${dayTotals?.[day]?.toFixed(0)}</div>
                    <div
                      style={{ color: "rgb(90,75,150)", padding: "0.25rem" }}
                    >
                      ${(dayTotals?.[day] * 2.8).toFixed(0)}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", margin: "1rem" }}>
                {showList ? (
                  <div onClick={() => OnClickExpand()}>{ingListByDay(day)}</div>
                ) : (
                  <div onClick={() => OnClickExpand()}>
                    Show ingredient list
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealMatrix;

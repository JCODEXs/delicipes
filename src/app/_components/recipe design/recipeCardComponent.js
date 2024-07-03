import React, { useState, useEffect } from "react";
import { personSvg, eyeSvg, trashSvg } from "~/app/icons/icons";

const RecipeCardComponent = ({
  _recipe,
  storeIngredients,
  _id,
  deleteHandler,
}) => {
  const recipe = _recipe.recipe;
  const [total, setTotal] = useState(0);
  const [updatedIngredients, setUpdatedIngredients] = useState([]);

  // console.log(recipe, updatedIngredients);
  useEffect(() => {
    if (recipe?.ingredients) {
      const updatedList = recipe.ingredients.map((ingredient) => {
        const updatedIngredient =
          storeIngredients.find((i) => i._id === ingredient._id) ?? ingredient;
        // console.log(updatedIngredient);
        return {
          ...ingredient,
          grPrice: updatedIngredient?.ingredient?.grPrice,
        };
      });
      // console.log(updatedList);
      setUpdatedIngredients(updatedList);
      calculateTotal(updatedList);
    }
  }, [recipe]);

  const calculateTotal = (ingredients) => {
    let totalCost = 0;
    ingredients.forEach((ingredient) => {
      totalCost += ingredient?.grPrice * ingredient?.quantity;
    });
    // // console.log(totalCost);
    setTotal(totalCost);
  };
  // // console.log(res, recipe);
  return (
    <div className="totals3" key={recipe?._id}>
      <div
        id="totals"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0.2rem",
        }}
      >
        <div className=" flex max-h-28 flex-row-reverse justify-around align-middle">
          {recipe.imageUrl ? (
            <div className="h-26 overflow-hidden ">
              <img
                // className=" w-75px relative top-2 m-1 rounded-md border-4 border-solid border-black "
                src={recipe.imageUrl?.url}
                style={{
                  width: "75px",
                  height: "auto",
                }}
              />{" "}
            </div>
          ) : null}

          <div className="flex flex-col items-center justify-around ">
            <div className="tittle">{recipe?.tittle ?? recipe.title}</div>
            <div
              style={{
                fontSize: "1.25rem",
                display: "flex",
                justifyContent: "flex-start",
                borderRadius: 8,
                marginRight: "1rem",
                marginBottom: "0.25rem",
              }}
            >
              {recipe?.portions}
              {personSvg}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: "5rem",
                // width: "fit-content",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "1.5rem",
                  width: "fit-content",
                  cursor: "pointer",
                  marginBottom: "1rem",
                  color: "red",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the editRecipe.recipe function
                  deleteHandler(_recipe);
                }}
              >
                {trashSvg}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "1.5rem",
                  width: "fit-content",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the editRecipe function
                  // editRecipe(recipe);
                }}
              >
                {eyeSvg}
              </div>
            </div>
          </div>
        </div>

        <div className="in-2container">
          {updatedIngredients.map((ingredient) => {
            // console.log(ingredient);
            return (
              <div className="in-container2" key={ingredient._id}>
                <div>{ingredient?.ingredient?.image}</div>
                <div className="item3">
                  <div className="w-30 flex-nowrap ">
                    {ingredient?.ingredient?.name.length > 12
                      ? ingredient?.ingredient?.name.slice(0, -6)
                      : ingredient?.ingredient?.name}
                  </div>
                </div>
                <div
                  className="in-container"
                  // style={{
                  //   boxShadow: "-2px 1px 3px rgba(50, 2, 89, 0.644)",
                  // }}
                >
                  <div className="baseMarc">
                    <div>{ingredient?.quantity}</div>{" "}
                    <div>{ingredient?.ingredient?.units}</div>
                  </div>
                </div>
                =
                <div className="itemTotal">
                  ${(ingredient?.grPrice * ingredient?.quantity).toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          borderTop: "2px solid  rgba(40, 20, 7, 0.639)",
          marginTop: "1.5rem",
          padding: "0.5rem",
        }}
        key={recipe.key}
        className="itemTotal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          Total cost:
          <div className="itemTotal">${total.toFixed(0)}</div>
        </div>
        {recipe?.portions !== "1" && (
          <div
            style={{
              color: "#2B4438",
              display: "flex",
              flexDirection: "row",
              marginRight: "2rem",
            }}
          >
            Per person:
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingLeft: "0.25rem",
              }}
            >
              ${(total / recipe?.portions).toFixed(0)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCardComponent;

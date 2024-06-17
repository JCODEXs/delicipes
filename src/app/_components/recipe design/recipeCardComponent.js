import React, { useState, useEffect } from "react";

const RecipeCardComponent = ({
  recipe,
  storeIngredients,
  _id,
  deleteHandler,
}) => {
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
        }}
      >
        <div className="tittle">{recipe?.tittle}</div>
        <div
          style={{
            fontSize: "1.25rem",
            display: "flex",
            justifyContent: "flex-end",
            borderRadius: 8,
            marginRight: "1rem",
            marginBottom: "0.6rem",
          }}
        >
          {recipe?.portions}👤
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "1rem",
            width: "fit-content",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "1.5rem",
              width: "fit-content",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the editRecipe.recipe function
              deleteHandler(_id);
            }}
          >
            🗑
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
            ✏️
          </div>
        </div>
        <div className="in-2container">
          {updatedIngredients.map((ingredient) => {
            // console.log(ingredient);
            return (
              <div className="in-container" key={ingredient._id}>
                <div className="item3">
                  <div>{ingredient?.ingredient?.image}</div>
                </div>
                <div>
                  <div>{ingredient?.ingredient?.name}</div>
                </div>
                <div
                  className="in-container"
                  // style={{
                  //   boxShadow: "-2px 1px 3px rgba(50, 2, 89, 0.644)",
                  // }}
                >
                  <div className="baseMarc">
                    {ingredient?.quantity} {ingredient?.ingredient?.units}
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

import React, { useState, useEffect } from "react";
import { personSvg, eyeSvg, trashSvg } from "~/app/icons/icons";
import { DeleteRecipe } from "~/store/pantry";

const RecipeCardComponent = ({
  _recipe,
  storeIngredients,
  _id,
  deleteHandler,
  editHandler,
}) => {
  const recipe = _recipe.recipe;
  const [total, setTotal] = useState(0);
  const [updatedIngredients, setUpdatedIngredients] = useState([]);
  const [showIngredients, setShowIngredients] = useState(false);

  useEffect(() => {
    if (recipe?.ingredients) {
      const updatedList = recipe.ingredients.map((ingredient) => {
        const updatedIngredient =
          storeIngredients?.find((i) => i._id === ingredient._id) ?? ingredient;
        return {
          ...ingredient,
          grPrice: updatedIngredient?.ingredient?.grPrice,
        };
      });
      setUpdatedIngredients(updatedList);
      calculateTotal(updatedList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  const calculateTotal = (ingredients) => {
    let totalCost = 0;
    ingredients.forEach((ingredient) => {
      totalCost += ingredient?.grPrice * ingredient?.quantity;
    });
    setTotal(totalCost);
  };

  // const handleDelete = async (e) => {
  //   e.stopPropagation();
  //   await DeleteRecipe(_recipe);
  //   if (deleteHandler) deleteHandler(_recipe);
  // };

  return (
    <div
      className="totals3"
      key={recipe?._id}
      style={{
        margin: "1rem 0",
        padding: "1.2rem",
        borderRadius: "14px",
        background: "#fff8ed",
        boxShadow: "0 2px 8px rgba(120,70,30,0.10)",
        minWidth: 280,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        color: "#2e1a08",
      }}
    >
      {/* Header: Image and Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
          color: "#2e1a08",
        }}
      >
        {recipe.imageUrl && (
          <div style={{ flex: "0 0 auto" }}>
            <img
              src={recipe.imageUrl?.url}
              style={{
                width: "75px",
                height: "75px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "2px solid #e7c08a",
              }}
              alt={recipe?.title || "Recipe"}
            />
          </div>
        )}
        <div style={{ flex: "1 1 0", minWidth: 120 }}>
          <div className="tittle" style={{ marginBottom: 4, color: "#5a2d06" }}>
            {recipe?.tittle ?? recipe.title}
          </div>
          <div
            style={{
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: 6,
              color: "#3a2412",
            }}
          >
            {recipe?.portions}
            <span style={{ marginLeft: 2 }}>{personSvg}</span>
          </div>
        </div>
        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "flex-end",
            marginLeft: "auto",
          }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              color: "red",
              fontSize: "1.5rem",
              cursor: "pointer",
              marginBottom: "0.2rem",
            }}
            onClick={() => deleteHandler(_recipe)}
            title="Delete"
          >
            {trashSvg}
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#2B4438",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (editHandler) editHandler(_recipe);
            }}
            title="View"
          >
            {eyeSvg}
          </button>
        </div>
      </div>

      {/* Collapsible Ingredients List */}
      <button
        onClick={() => setShowIngredients((v) => !v)}
        style={{
          background: "#e7c08a",
          color: "#5a2d06",
          border: "none",
          borderRadius: 8,
          padding: "0.4rem 1rem",
          fontWeight: 600,
          cursor: "pointer",
          margin: "0.5rem 0",
          alignSelf: "flex-start",
        }}
      >
        {showIngredients ? "Hide Ingredients" : "Show Ingredients"}
      </button>
      {showIngredients && (
        <div
          className="recipe-card-ingredients"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            margin: "0.5rem 0",
          }}
        >
          {/* Header row for grid */}
          <div
            className="recipe-card-ingredients-header"
            style={{
              display: "grid",
              gridTemplateColumns: "32px 1fr 60px 60px",
              gap: "0.5rem",
              fontWeight: 600,
              color: "#5a2d06",
              fontSize: "0.98rem",
              padding: "0.2rem 0.7rem",
              background: "rgba(168,107,60,0.07)",
              borderRadius: "6px",
            }}
          >
            <div></div>
            <div>Ingredient</div>
            <div style={{ textAlign: "center" }}>Qty</div>
            <div style={{ textAlign: "right" }}>Price</div>
          </div>
          {updatedIngredients.map((ingredient) => (
            <div
              className="recipe-card-ingredient-row"
              key={ingredient._id}
              style={{
                display: "grid",
                gridTemplateColumns: "32px 1fr 60px 60px",
                gap: "0.5rem",
                alignItems: "center",
                background: "#f9f6ea",
                borderRadius: "7px",
                padding: "0.3rem 0.7rem",
                color: "#3a2412",
              }}
            >
              <div>
                {ingredient?.ingredient?.image}
                {_id}
              </div>
              <div
                className="recipe-card-ingredient-name"
                style={{
                  minWidth: 70,
                  color: "#5a2d06",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={ingredient?.ingredient?.name}
              >
                {ingredient?.ingredient?.name}
              </div>
              <div
                style={{
                  textAlign: "center",
                  color: "#2e1a08",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {ingredient?.quantity} {ingredient?.ingredient?.units}
              </div>
              <div
                className="recipe-card-ingredient-total"
                style={{
                  minWidth: 50,
                  color: "#a86b3c",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                ${(ingredient?.grPrice * ingredient?.quantity).toFixed(0)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      <div
        style={{
          borderTop: "2px solid rgba(40, 20, 7, 0.13)",
          marginTop: "1rem",
          padding: "0.5rem 0 0 0",
          color: "#2e1a08",
        }}
        className="itemTotal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            alignItems: "end",
            justifyContent: "end",
            paddingRight: "0.5rem",
          }}
        >
          <span>Total cost:</span>
          <span className="itemTotal" style={{ color: "#a86b3c" }}>
            ${total.toFixed(0)}
          </span>
        </div>
        {recipe?.portions !== "1" && (
          <div
            style={{
              color: "#2B4438",
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              marginTop: "0.3rem",
              justifyContent: "end",
              paddingRight: "0.5rem",
            }}
          >
            <span>Per person:</span>
            <span>${(total / recipe?.portions).toFixed(0)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCardComponent;

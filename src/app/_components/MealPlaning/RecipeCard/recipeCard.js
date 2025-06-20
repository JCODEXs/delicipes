import { useState, useEffect } from "react";
import Image from "next/image";

const RecipeCard = ({
  recipe_,
  day,
  showPortions,
  getPortions,
  passPortions,
  _id,
  deleteCard,
  orders,
}) => {
  const recipe = recipe_ || {};
  let total = 0;
  const [portions, setPortions] = useState(orders);
  const [showIngredients, setShowIngredients] = useState(false);

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  if (showPortions) {
    useEffect(() => {
      passPortions(portions, _id + day);
    }, [portions]);
  }

  // Move total calculation outside of the collapsible section
  if (recipe?.ingredients?.length) {
    total = recipe.ingredients.reduce(
      (sum, ingredient) =>
        sum + (ingredient.ingredient?.grPrice || 0) * (ingredient.quantity || 0),
      0
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        background: "#23262e",
        borderRadius: "12px",
        padding: "1rem",
        border: "1px solid #333",
        marginBottom: "0.75rem",
        minWidth: 220,
        maxWidth: 320,
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
      }}
      className="itemTotal2"
    >
      {/* Top Row: Image & Delete Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          {recipe?.imageUrl?.url && (
            <Image
              src={recipe?.imageUrl.url}
              className="rounded-md border-2 border-solid border-black object-cover"
              alt="Recipe"
              height={70}
              width={70}
              style={{
                marginRight: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #444",
                objectFit: "cover",
              }}
              onContextMenu={handleContextMenu}
            />
          )}
        </div>
        {showPortions && (
          <button
            style={{
              borderRadius: "50%",
              background: "rgba(190,37,7,0.9)",
              fontSize: "1.1rem",
              padding: "0.3rem 0.7rem",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginLeft: "auto",
            }}
            title="Remove recipe"
            onClick={deleteCard}
          >
            ×
          </button>
        )}
      </div>

      {/* Title */}
      <div
        className="tittlecard"
        style={{
          color: "#e6e2c0",
          fontWeight: "bold",
          fontSize: "1.15rem",
          margin: "0.5rem 0 0.25rem 0",
          textAlign: "center",
        }}
      >
        {recipe.title}
      </div>

      {/* Description */}
      {recipe.description && (
        <div
          style={{
            color: "#bdbdbd",
            fontSize: "0.97rem",
            marginBottom: "0.5rem",
            textAlign: "center",
            minHeight: "32px",
          }}
        >
          {recipe.description.length > 60
            ? recipe.description.slice(0, 60) + "..."
            : recipe.description}
        </div>
      )}

      {/* Portions Input */}
      {showPortions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            margin: "0.5rem 0",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#c9b87a", fontWeight: 500 }}>Portions:</span>
          <input
            type="number"
            min={1}
            max={20}
            style={{
              width: 48,
              height: 28,
              color: "#23262e",
              background: "#e6e2c0",
              borderRadius: 8,
              padding: "0.1rem 0.5rem",
              border: "1px solid #c9b87a",
              fontWeight: "bold",
              fontSize: "1rem",
              textAlign: "center",
            }}
            value={portions}
            placeholder="#"
            onChange={(e) => {
              const inputValue = parseInt(e.target.value);
              if (isNaN(inputValue) || inputValue < 1) {
                setPortions(1);
              } else if (inputValue > 20) {
                setPortions(20);
              } else {
                setPortions(inputValue);
              }
            }}
            required
          />
        </div>
      )}

      {/* Collapsible Ingredients List */}
      <div style={{ margin: "0.5rem 0" }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#c9b87a",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            marginBottom: "0.25rem",
            textDecoration: "underline",
            padding: 0,
          }}
          onClick={() => setShowIngredients((prev) => !prev)}
        >
          {showIngredients ? "Hide ingredients" : "Show ingredients"}
        </button>
        {showIngredients && (
          <div
            style={{
              color: "#bdbdbd",
              fontSize: "0.95rem",
              maxHeight: 80,
              overflowY: "auto",
              marginTop: "0.25rem",
            }}
          >
            {recipe?.ingredients?.map((ingredient, index) => (
              <div key={index} style={{ display: "flex", gap: "0.5rem" }}>
                <span>
                  {ingredient.quantity}
                  {ingredient.ingredient?.units ? ` ${ingredient.ingredient.units}` : ""}
                </span>
                <span>{ingredient.ingredient?.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div
        style={{
          marginTop: "0.5rem",
          color: "#c9b87a",
          fontWeight: "bold",
          fontSize: "1.25rem",
          textAlign: "center",
        }}
      >
        ${((total / recipe.portions) * (showPortions ? portions : 1)).toFixed(0)}
        <span style={{ fontSize: "1rem", color: "#e6e2c0", marginLeft: 6 }}>
          {showPortions ? " total" : " /portion"}
        </span>
      </div>
    </div>
  );
};

export default RecipeCard;

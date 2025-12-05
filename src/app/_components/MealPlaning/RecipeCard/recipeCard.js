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
  globalPortions,
}) => {
  console.log(recipe_, "recipe card recipe");
  const recipe = recipe_.recipe || {};
  let total = 0;
  const [portions, setPortions] = useState(orders || globalPortions);
  const [showIngredients, setShowIngredients] = useState(false);
  // Función para obtener colores según categoría
  const getCategoryColors = (category) => {
    const colors = {
      vegetarian: { bg: "#e8f5e8", border: "#4caf50" },
      vegan: { bg: "#e1f5fe", border: "#00bcd4" },
      meat: { bg: "#fce4ec", border: "#e91e63" },
      seafood: { bg: "#e3f2fd", border: "#2196f3" },
      italian: { bg: "#fff3e0", border: "#ff9800" },
      mexican: { bg: "#fff8e1", border: "#ffc107" },
      indian: { bg: "#fce4ec", border: "#e91e63" },
      french: { bg: "#f3e5f5", border: "#9c27b0" },
      asian: { bg: "#ffebee", border: "#f44336" },
      dessert: { bg: "#fce4ec", border: "#e91e63" },
      breakfast: { bg: "#fff3e0", border: "#ff9800" },
      snack: { bg: "#e8f5e8", border: "#4caf50" },
      default: { bg: "#fff6e3", border: "#e7c08a" },
    };
    return colors[category] || colors.default;
  };

  // Aplicación en el estilo de la tarjeta
  const categoryColors = getCategoryColors(recipe_?.category);
  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  if (showPortions) {
    useEffect(() => {
      passPortions(portions, _id + day);
    }, [portions]);
  }

  // Función para calcular el costo de un ingrediente
  const calculateIngredientCost = (ingredient) => {
    if (!ingredient.ingredient || !ingredient.quantity) return 0;

    const { units, grPrice, price } = ingredient.ingredient;
    const quantity = ingredient.quantity;

    // Si la unidad es por pieza (unidad)
    if (
      units === "unidad" ||
      units === "und" ||
      units === "paquete" ||
      units === "bolsa" ||
      units === "lb"
    ) {
      return (price || 0) * quantity;
    }
    // Si la unidad es por peso (gramos, kg, etc.)
    else {
      return (grPrice || 0) * quantity;
    }
  };

  // Calcular el total de la receta
  if (recipe?.ingredients?.length) {
    total = recipe.ingredients.reduce(
      (sum, ingredient) => sum + calculateIngredientCost(ingredient),
      0,
    );
  }

  // Calcular el costo por porción
  const costPerPortion = recipe.portions ? total / recipe.portions : total;

  // Calcular el costo total basado en las porciones seleccionadas
  const totalCost = showPortions ? costPerPortion * portions : costPerPortion;

  // Función para calcular la cantidad ajustada por porciones
  const calculateAdjustedQuantity = (
    ingredient,
    currentPortions = portions,
  ) => {
    if (!ingredient.quantity || !recipe.portions) return ingredient.quantity;

    const basePortions = recipe.portions;
    const multiplier = currentPortions / basePortions;

    // Para ingredientes "al gusto", no ajustamos la cantidad
    if (ingredient.ingredient?.units === "al gusto") {
      return ingredient.quantity;
    }

    // Redondear a 2 decimales para cantidades pequeñas, enteros para cantidades grandes
    const adjustedQuantity = ingredient.quantity * multiplier;
    return adjustedQuantity >= 10
      ? Math.round(adjustedQuantity)
      : Math.round(adjustedQuantity * 100) / 100;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        background: categoryColors.bg,
        boxShadow: "0 2px 8px rgba(120,70,30,0.10)",
        border: `2px solid ${categoryColors.border}`,
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "0.75rem",
        minWidth: 220,
        maxWidth: 320,
      }}
      // className="itemTotal2"
    >
      {/* Top Row: Image & Delete Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
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
          color: categoryColors.border || "#e6e2c0",
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
            color: "#5a5a5a",
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
            max={100}
            style={{
              width: 68,
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
              } else if (inputValue > 100) {
                setPortions(100);
              } else {
                setPortions(inputValue);
              }
            }}
            required
          />
        </div>
      )}

      {/* Debug info (puedes eliminar en producción) */}
      {process.env.NODE_ENV === "development" && (
        <div style={{ fontSize: "10px", color: "#666", marginBottom: "5px" }}>
          Base: ${total.toFixed(2)} | Porciones: {recipe.portions || 1} |
          C/porción: ${costPerPortion.toFixed(2)}
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
              maxHeight: 120,
              overflowY: "auto",
              marginTop: "0.25rem",
              padding: "0.5rem",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                borderBottom: "1px solid #444",
                paddingBottom: "0.25rem",
              }}
            >
              <span>Ingredient</span>
              <span>Quantity</span>
              <span>Cost</span>
            </div>

            {recipe?.ingredients?.map((ingredient, index) => {
              const adjustedQuantity = calculateAdjustedQuantity(ingredient);
              const ingredientCost = calculateIngredientCost({
                ...ingredient,
                quantity: adjustedQuantity,
              });

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <span style={{ flex: 2, textAlign: "left" }}>
                    {ingredient.ingredient?.name}
                  </span>
                  <span style={{ flex: 1, textAlign: "center" }}>
                    {adjustedQuantity}
                    {ingredient.ingredient?.units &&
                    ingredient.ingredient.units !== "al gusto"
                      ? ` ${ingredient.ingredient.units}`
                      : ""}
                  </span>
                  <span
                    style={{ flex: 1, textAlign: "right", color: "#c9b87a" }}
                  >
                    ${ingredientCost.toFixed(2)}
                  </span>
                </div>
              );
            })}

            {/* Resumen de ajuste de porciones */}
            {showPortions &&
              recipe.portions &&
              portions !== recipe.portions && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    paddingTop: "0.5rem",
                    borderTop: "1px dashed #555",
                    fontSize: "0.85rem",
                    color: "#999",
                  }}
                >
                  <div>
                    <strong>Ajuste:</strong> {recipe.portions} → {portions}{" "}
                    porciones
                  </div>
                  <div>
                    <strong>Multiplicador:</strong>{" "}
                    {(portions / recipe.portions).toFixed(2)}x
                  </div>
                </div>
              )}
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
        ${totalCost.toFixed(0)}
        <span style={{ fontSize: "1rem", color: "#e6e2c0", marginLeft: 6 }}>
          {showPortions ? " total" : " /portion"}
        </span>
      </div>
    </div>
  );
};

export default RecipeCard;

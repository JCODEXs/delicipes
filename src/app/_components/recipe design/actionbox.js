import { useState } from "react";

export default function ActionBox({
  ingredientsList,
  addToRecipe,
  actionMode,
  setActionMode,
  DeleteIngredient,
}) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const getBackgroundColor = (actionMode) => {
    switch (actionMode) {
      case "delete":
        return "#742109";
      case "edit":
        return "#C4B55E"; // Example color for edit mode
      case "select":
        return "#2B4438"; // Example color for select mode
      default:
        return "#2B4438"; // Default background color
    }
  };
  return (
    <div>
      <div
        className="backGuide"
        onClick={() =>
          actionMode != "select"
            ? actionMode == "delete"
              ? setActionMode("select")
              : setActionMode("delete")
            : setActionMode("edit")
        }
      >
        {" "}
        {actionMode != "select" ? (
          actionMode == "delete" ? (
            <div
              style={{
                fontSize: "1.15rem",
                display: "flex",
                gap: "2rem",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "0.9rem 1.5rem",
                background: "linear-gradient(90deg, #f5e6c5 60%, #e7c08a 100%)",
                borderRadius: "14px",
                boxShadow: "0 4px 16px rgba(120,70,30,0.13)",
                marginBottom: "0.8rem",
              }}
            >
              <button
                style={{
                  background:
                    "linear-gradient(90deg, #e74c3c 60%, #bd2709 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  padding: "0.5rem 1.2rem",
                  boxShadow: "0 1px 4px rgba(120,70,30,0.10)",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.1s",
                }}
                className="modeButton"
              >
                Change mode
              </button>
              <div
                style={{
                  fontSize: "1.15rem",
                  color: "#e74c3c",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                }}
              >
                Delete Ingredients by clicking on them
              </div>
            </div>
          ) : (
            <div
              style={{
                fontSize: "1.15rem",
                display: "flex",
                gap: "2rem",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "0.9rem 1.5rem",
                background: "linear-gradient(90deg, #f5e6c5 60%, #e7c08a 100%)",
                borderRadius: "14px",
                boxShadow: "0 4px 16px rgba(120,70,30,0.13)",
                marginBottom: "0.8rem",
              }}
            >
              <button
                style={{
                  background:
                    "linear-gradient(90deg, #1abc9c 60%, #2B4438 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  padding: "0.5rem 1.2rem",
                  boxShadow: "0 1px 4px rgba(120,70,30,0.10)",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.1s",
                }}
                className="modeButton"
              >
                Change mode
              </button>
              <div
                style={{
                  fontSize: "1.15rem",
                  color: "#1abc9c",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                }}
              >
                Edit Ingredient properties by clicking on them
              </div>
            </div>
          )
        ) : (
          <div
            style={{
              fontSize: "1.05rem",
              display: "flex",
              gap: "1rem",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "0.5rem 0.7rem",
              background: "linear-gradient(90deg, #f5e6c5 60%, #e7c08a 100%)",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(120,70,30,0.10)",
              marginBottom: "0.5rem",
            }}
          >
            <button
              style={{
                background: "linear-gradient(90deg, #c9b87a 60%, #a86b3c 100%)",
                color: "#3a2412",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "0.35rem 0.8rem",
                boxShadow: "0 1px 4px rgba(120,70,30,0.10)",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.1s",
              }}
              className="modeButton"
            >
              Change mode
            </button>
            <div
              style={{
                fontSize: "1.05rem",
                color: "#a86b3c",
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              Add Ingredient to the recipe by clicking on them
            </div>
          </div>
        )}{" "}
      </div>
      <div
        className="items"
        style={{
          background: "linear-gradient(90deg, #f9f6ea 60%, #e7c08a 100%)",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "0.15rem",
          padding: "0.5rem",
          borderRadius: "10px",
          minHeight: "40px",
          alignItems: "center",
          justifyContent: "flex-start",
          boxShadow: "0 1px 4px rgba(120,70,30,0.08)",
        }}
      >
        {ingredientsList &&
          ingredientsList?.map((item, index) => {
            return (
              <div
                className="item"
                key={item?._id}
                onClick={() => addToRecipe(item)}
                onMouseEnter={() =>
                  setHoveredItem(item.ingredient?.name || item.name)
                }
                onMouseLeave={() => setHoveredItem(null)}
                data-tooltip={hoveredItem}
                style={{
                  cursor: "pointer",
                  background: "#fff8ed",
                  border: "1px solid #e7c08a",
                  borderRadius: "6px",
                  padding: "0.15rem",
                  minWidth: "45px",
                  minHeight: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 2px rgba(120, 70, 30, 0.08)",
                  fontWeight: 300,
                  color: "#3a2412",
                  fontSize: "0.95rem",
                }}
              >
                {item.ingredient?.image || item.image}
              </div>
            );
          })}
      </div>
    </div>
  );
}

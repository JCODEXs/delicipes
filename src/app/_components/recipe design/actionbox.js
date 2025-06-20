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
                fontSize: "1.2rem",
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
                  fontSize: "1.3rem",
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
                fontSize: "1.2rem",
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
                  fontSize: "1.3rem",
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
              fontSize: "1.2rem",
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
                background: "linear-gradient(90deg, #c9b87a 60%, #a86b3c 100%)",
                color: "#3a2412",
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
                fontSize: "1.3rem",
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
          gap: "0.7rem",
          padding: "1.1rem",
          borderRadius: "14px",
          minHeight: "70px",
          alignItems: "center",
          justifyContent: "flex-start",
          boxShadow: "0 2px 8px rgba(120,70,30,0.10)",
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
                  border: "1.5px solid #e7c08a",
                  borderRadius: "8px",
                  padding: "0.25rem",
                  minWidth: "50px",
                  minHeight: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(120, 70, 30, 0.10)",
                  fontWeight: 300,
                  color: "#3a2412",
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

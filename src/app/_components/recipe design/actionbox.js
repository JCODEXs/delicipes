import { useState } from "react";

export default function ActionBox({
  ingredientsList,
  addToRecipe,
  actionMode,
  setActionMode,
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
                gap: "3rem",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <button style={{ background: "#bd2709" }} className="modeButton">
                Change mode{" "}
              </button>
              <div
                style={{
                  fontSize: "1.4rem",
                  color: "red",
                }}
              >
                Delete Box{" "}
              </div>
            </div>
          ) : (
            <div
              style={{
                fontSize: "1.2rem",
                display: "flex",
                gap: "3rem",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <button style={{ background: "#bd2709" }} className="modeButton">
                Change mode{" "}
              </button>
              <div
                style={{
                  fontSize: "1.4rem",
                  color: "rgb(15,200,150,0.99)",
                }}
              >
                Edit box{" "}
              </div>
            </div>
          )
        ) : (
          <div
            style={{
              fontSize: "1.2rem",
              gap: "3rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <button style={{ background: "#bd2709" }} className="modeButton">
              Change mode{" "}
            </button>
            <div
              style={{
                fontSize: "1.4rem",
                color: "white",
                fontWeight: 300,
              }}
            >
              {" "}
              Add box
            </div>
          </div>
        )}{" "}
      </div>
      <div
        className="items"
        style={{
          background: getBackgroundColor(actionMode),
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
              >
                {item.ingredient?.image || item.image}
              </div>
            );
          })}
      </div>
    </div>
  );
}

import Image from "next/image";
import { useState } from "react";

export default function ActionBox({
  ingredientsList,
  addToRecipe,
  actionMode,
  setActionMode,
  recipes,
  addRecipeIngredients,
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
  const addToRecipeList = (item) => {
    if (!recipes) {
      addToRecipe(item);
    } else {
      // item.recipe.ingredients.map((ingredient) => addToRecipe(ingredient));
      addRecipeIngredients(item);
    }
  };

  // console.log(ingredientsList);
  return (
    <div>
      {!recipes ? (
        <div
          className="backGuide mb-2"
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
                <button
                  style={{ background: "#D92B04" }}
                  className="modeButton"
                >
                  Change mode{" "}
                </button>
                <div
                  style={{
                    fontSize: "1.4rem",
                    color: "red",
                  }}
                >
                  Delete ingredient{" "}
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
                <button
                  style={{ background: "#bd2709" }}
                  className="modeButton"
                >
                  Change mode{" "}
                </button>
                <div
                  style={{
                    fontSize: "1.4rem",
                    color: "rgb(15,200,150,0.99)",
                  }}
                >
                  Edit ingredient{" "}
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
                Add single ingredient
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Add all recipe ingredients</div>
      )}
      <div
        className="items"
        style={{
          background: !recipes ? getBackgroundColor(actionMode) : "#2B4438",
        }}
      >
        {ingredientsList &&
          ingredientsList?.map((item, index) => {
            return (
              <div
                className="item"
                key={item?._id}
                onClick={() => addToRecipeList(item)}
                onMouseEnter={() =>
                  setHoveredItem(
                    recipes ? item?.recipe?.title : item?.ingredient?.name,
                  )
                }
                onMouseLeave={() => setHoveredItem(null)}
                data-tooltip={hoveredItem}
              >
                {!recipes
                  ? item.ingredient?.image || item.image
                  : item.recipe.imageUrl && (
                      <Image
                        src={item.recipe.imageUrl.url}
                        height={60}
                        width={60}
                        alt="image"
                      />
                    )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import styles from "./recipeCard.css";
import Image from "next/image";

export default function RecipeCard({
  recipe_,
  showPortions,
  getPortions,
  day,
  deleteCard,
  passPortions,
  _id,
  orders,
}) {
  let total = 0;
  const recipe = recipe_;
  // console.log(recipe);
  const [portions, setPortions] = useState(orders);
  if (showPortions) {
    useEffect(() => {
      passPortions(portions, _id + day);
      // getPortions(day, portions, recipe._id);
    }, [portions]);
  }
  // // console.log(recipe_);
  return (
    <div
      style={{ minHeight: 75, color: "rgb(192, 258, 255)" }}
      className="itemTotal2"
    >
      {/* <pre>{JSON.stringify(recipe, null, 2)}</pre> */}
      {/* <div className="sub-tittle">Receta</div> */}

      <div>
        {showPortions && (
          <button
            style={{
              borderRadius: "50%",
              background: "rgb(190,37,7,0.9)",
              fontSize: "1rem",
              padding: "0.2rem",
              margin: "0.15",
            }}
            onClick={() => {
              deleteCard();
            }}
          >
            X
          </button>
        )}
      </div>
      <div className="tittlecard">{recipe.title}</div>
      <div className=" flex h-14 flex-row overflow-hidden">
        {recipe?.imageUrl?.url && (
          <Image
            src={recipe?.imageUrl.url}
            className=" m-1  h-14 max-w-14  rounded-md border-2 border-solid border-black object-cover"
            alt="Recipe"
            height={120}
            width={120}
          />
        )}
        {/* <div
        style={{ display: "flex", justifyContent: "flex-start" }}
        onClick={() => deleteRecipe(recipe.tittle)}
      >
        🗑
      </div> */}
        <div style={{ color: "rgb(252, 255, 255)" }} className="in-2containers">
          {recipe?.ingredients?.map((ingredient, index) => {
            total += +(
              ingredient.ingredient?.grPrice * ingredient.quantity
            ).toFixed(1);
            // // console.log(total, ingredient);
            // return (
            //   <div className="in-container3" key={index}>
            //     <div className="baseMarc">
            //       <div>{ingredient?.ingredient?.image} </div>
            //       <div> {ingredient?.ingredient?.units}</div>
            //     </div>

            //     <div className="item3">{ingredient?.quantity} </div>
            //   </div>
            // );
          })}
        </div>
      </div>
      <div className="cardTotal3">
        {/* {portions}👤 Costo: */}
        {showPortions && (
          <div
            style={{ display: "flex", flexDirection: "row", gap: "0.25rem" }}
          >
            {" "}
            <div>Orders:</div>
            <input
              type="number"
              min={0}
              max={20}
              style={{
                width: 50,
                height: 25,
                color: "darkgreen",
                borderRadius: 8,
                padding: "0.1rem",
              }}
              value={portions}
              placeholder="#"
              onChange={
                (e) => {
                  const inputValue = parseInt(e.target.value);
                  const minRange = 0; // minimum allowed value
                  const maxRange = 20; // maximum allowed value

                  // if (!isNaN(inputValue)) {
                  // console.log("ch");
                  // Check if the entered value is a valid number
                  if (inputValue < minRange) {
                    setPortions(minRange); // Set the minimum value if it's below the range
                  } else if (inputValue > maxRange) {
                    setPortions(maxRange); // Set the maximum value if it's above the range
                  } else {
                    setPortions(inputValue); // Set the entered value if it's within the range
                  }
                }
                //    else {
                //     // setPortions(1); // Set an empty string if the entered value is not a number
                //   }
                // }
              }
              required
            />
          </div>
        )}

        <div className="itemcard" style={{ fontSize: "1.5rem" }}>
          $
          {((total / recipe.portions) * (showPortions ? portions : 1)).toFixed(
            0,
          )}
        </div>
        {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0.2rem",
              borderRadius: 8,
              marginRight: "0.6rem",
              color: "blue",
            }}
          >
            ${(total / recipe?.portions).toFixed(0)} 👤
          </div> */}
      </div>
      {/* <div className="textRecipe">{recipe.description} </div> */}
    </div>
  );
}

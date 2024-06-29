"use client";

import { useFormState } from "react-dom";
// import { useActionState } from "react";
import FormSubmit from "./form-submit";
import { SimpleUploadButton } from "../simple-upload-button";
import { createRecipe } from "actions/actions";

export default function RecipeConstructionForm({
  recipeList,
  increase,
  decrease,
  removeItem,
  quantity,
  myDivRef,
  Recipe,
}) {
  //   const [state, formAction] = useActionState(action, {});
  const ingredients = [];
  recipeList.map((item, index) => {
    const newIngredient = { ...item };
    newIngredient.quantity = quantity[index];
    ingredients.push(newIngredient);
  });

  const [state, formAction] = useFormState(createRecipe, []);

  return (
    <>
      <form action={formAction}>
        <input
          name="ingredients"
          type="text"
          value={JSON.stringify(ingredients)}
          style={{ display: "none" }}
        />
        <input
          name="_id"
          type="number"
          value={Recipe._id}
          style={{ display: "none" }}
        />
        <div ref={myDivRef} id="recipe" className="recipe">
          <h1>Create a new Recipe</h1>
          <p className="form-control">
            {/* <label htmlFor="title">Title</label> */}
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Recipe Name"
            />
          </p>
          <p className="form-control">
            {/* <label htmlFor="title">Portions</label> */}
            <input
              name="portions"
              type="number"
              style={{
                width: "22%",
                height: 30,
                borderRadius: 8,
                padding: "0.2rem",
              }}
              placeholder="# 👤"
            />
            {/* {personSvg} */}
          </p>
          <SimpleUploadButton />
          <div className="form-control">
            {recipeList?.length > 0 ? (
              <p>Adjust quantitys</p>
            ) : (
              <p style={{ margin: "2rem", marginBottom: "0rem" }}>
                Add ingredients from the box abobe ☝🏽
              </p>
            )}

            <div className="incrementalnputs">
              {recipeList?.map((item, index) => {
                // //  console.log(item);
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexBasis: "calc(30% - 10px)",
                      border: "1px solid rgb(220,170,180,0.8)", //rgb(20,70,110,0.7)",
                      padding: "0.15rem",
                      borderRadius: "8px",
                      boxShadow: "-1px -2px -3px rgb(20,70,110,0.7)",
                    }}
                    key={item?._id}
                  >
                    <div className="itemQ2" style={{ margin: "0.3rem" }}>
                      {item?.ingredient?.name}
                    </div>
                    {/* <input
                      name={item?.ingredient?.name}
                      type="number"
                      style={{
                        display: "none",
                      }}
                      value={quantity?.[index]}
                    /> */}
                    <div className="in-container">
                      <button
                        type="button"
                        className="buttonSum"
                        onClick={(event) => {
                          event.preventDefault();
                          increase(index, item?.ingredient?.units);
                        }}
                      >
                        +
                      </button>
                      {}
                      <button
                        type="button"
                        className="buttonSum"
                        onClick={(event) => {
                          event.preventDefault();
                          decrease(index, item?.ingredient?.units);
                        }}
                      >
                        -
                      </button>{" "}
                    </div>
                    <div className="in-container">
                      {" "}
                      <div className="item2">{quantity?.[index]}</div>{" "}
                      <div className="baseMarc">{item?.ingredient?.units}</div>
                      <div
                        style={{
                          margin: "0.25rem",
                          fontSize: "1.5rem",
                          // marginInlineStart: "0.5rem",
                          padding: "0.5rem",
                          color: "rgb(200,30,14)",
                          // alignItems: "flex-start",
                          justifyContent: "flex-end",
                          borderLeft: "1px solid rbg(10,15,65,0.8)",
                        }}
                        onClick={() => removeItem(item, index)}
                      >
                        {" "}
                        X
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div id="description" className="description">
          <p className="form-control">
            <textarea
              name="description"
              type="text"
              placeholder="Preparation steps"
              style={{
                width: "98%",
                height: "fit-content",
                borderRadius: 8,
                padding: "0.25rem",
              }}
            />
          </p>{" "}
          <p className="form-actions">
            <FormSubmit />
          </p>
          {state?.errors && (
            <ul className="form-errors">
              {state?.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </>
  );
}

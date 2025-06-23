"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../../../components/ui/table";
import { useEffect, useState } from "react";
import WhatCanICookModal from "./WhatCanICookModal";
import { getRecipes, usePantry } from "~/store/pantry";

export default function ShopingList({ myPrograms, allRecipes }) {
  const index = myPrograms ? myPrograms.length - 1 : 0;
  const lastProgram = myPrograms?.[index]?._program?.ingredientsTotList?.[0];
  const weekRecipes = allRecipes || [];
  const [RecipeList, setRecipeList] = useState(lastProgram);
  let total = 0;
  // For interactivity: allow marking as bought
  const [checked, setChecked] = useState({});

  const handleCheck = (ingredient) => {
    setChecked((prev) => ({
      ...prev,
      [ingredient]: !prev[ingredient],
    }));
  };
  console.log(weekRecipes, "weekRecipes");
  const [modalOpen, setModalOpen] = useState(false);
  const [cookableRecipes, setCookableRecipes] = useState([]);

  const handleWhatCanICook = () => {
    // Get checked ingredients
    const selectedIngredients = Object.keys(checked).filter(
      (key) => checked[key],
    );
    console.log("Checked ingredients:", selectedIngredients, weekRecipes);

    const found = weekRecipes.filter((recipe) => {
      const recipeIngredients = (recipe.recipe?.ingredients || []).map(
        (i) => i?.ingredient?.name,
      );
      // Log for each recipe
      console.log(
        `Recipe: ${recipe.recipe?.title || recipe.recipe?.tittle}`,
        "\nRecipe ingredients:",
        recipeIngredients,
        "\nSelected ingredients:",
        selectedIngredients,
      );
      // Find missing ingredients for debugging
      const missing = recipeIngredients.filter(
        (name) => !selectedIngredients.includes(name),
      );
      if (missing.length > 0) {
        console.log(
          `Missing for "${recipe.recipe?.title || recipe.recipe?.tittle}":`,
          missing,
        );
      }
      // Only show recipes if ALL their ingredients are checked
      return recipeIngredients.every((name) =>
        selectedIngredients.includes(name),
      );
    });

    console.log(
      "Cookable recipes found:",
      found.map((r) => r.recipe?.title || r.recipe?.tittle),
    );
    setCookableRecipes(found);
    setModalOpen(true);
  };

  const allIngredients = RecipeList ? Object.keys(RecipeList) : [];
  const allChecked =
    allIngredients.length > 0 && allIngredients.every((ing) => checked[ing]);
  const handleSelectAll = () => {
    if (allChecked) {
      // Uncheck all
      const unchecked = {};
      allIngredients.forEach((ing) => (unchecked[ing] = false));
      setChecked(unchecked);
    } else {
      // Check all
      const checkedAll = {};
      allIngredients.forEach((ing) => (checkedAll[ing] = true));
      setChecked(checkedAll);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        background: "#fff8ed",
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(120,70,30,0.10)",
        padding: "2rem 1rem",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "2rem",
          color: "#a86b3c",
          marginBottom: "1.5rem",
          letterSpacing: 1,
        }}
      >
        🛒 Shopping List
      </h2>
      <Table
        style={{
          fontSize: "1.1rem",
          width: "100%",
          background: "transparent",
        }}
      >
        <TableCaption style={{ color: "#a86b3c", fontWeight: 600 }}>
          Your week shopping list.
        </TableCaption>
        <TableHeader>
          <TableRow style={{ background: "rgba(168,107,60,0.07)" }}>
            <TableHead style={{ width: 40 }}>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleSelectAll}
                style={{
                  width: 18,
                  height: 18,
                  accentColor: "#a86b3c",
                  cursor: "pointer",
                }}
                title={allChecked ? "Unselect all" : "Select all"}
              />
            </TableHead>
            <TableHead className="w-[100px]" style={{ color: "#5a2d06" }}>
              Ingredient
            </TableHead>
            <TableHead style={{ color: "#5a2d06" }}>Quantity</TableHead>
            {/* <TableHead style={{ color: "#5a2d06" }}>Stock</TableHead>
            <TableHead style={{ color: "#5a2d06" }}>To buy</TableHead> */}
            <TableHead className="text-right" style={{ color: "#5a2d06" }}>
              Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {RecipeList &&
            Object.entries(RecipeList).map(([ingredient, details], index) => {
              total += details.precio;
              const needToBuy = Math.max(
                details.cantidad - (details.stock || 0),
                0,
              );
              return (
                <TableRow
                  key={index}
                  style={{
                    background: checked[ingredient]
                      ? "rgba(168,107,60,0.10)"
                      : "#f9f6ea",
                    textDecoration: checked[ingredient]
                      ? "line-through"
                      : "none",
                    opacity: checked[ingredient] ? 0.6 : 1,
                    transition: "all 0.2s",
                  }}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={!!checked[ingredient]}
                      onChange={() => handleCheck(ingredient)}
                      style={{
                        width: 18,
                        height: 18,
                        accentColor: "#a86b3c",
                        cursor: "pointer",
                      }}
                      title="Mark as bought"
                    />
                  </TableCell>
                  <TableCell
                    className="font-medium"
                    style={{ color: "#3a2412" }}
                  >
                    {ingredient}
                  </TableCell>
                  <TableCell style={{ color: "#2e1a08" }}>
                    {details.cantidad.toFixed(0)}
                  </TableCell>
                  {/* <TableCell
                    style={{ color: needToBuy === 0 ? "green" : "#a86b3c" }}
                  >
                    {details.stock || 0}
                  </TableCell> 
                  <TableCell style={{ color: "#2e1a08" }}>
                    {needToBuy}
                  </TableCell>*/}
                  <TableCell
                    className="text-right"
                    style={{ color: "#a86b3c", fontWeight: 600 }}
                  >
                    ${details.precio.toFixed(0)}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={3}
              style={{ fontWeight: 700, color: "#5a2d06" }}
            >
              Total
            </TableCell>
            <TableCell
              className="text-right"
              style={{
                color: "#a86b3c",
                fontWeight: 700,
                fontSize: "1.2rem",
              }}
            >
              ${total.toFixed(0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <span style={{ color: "#a86b3c", fontWeight: 600 }}>
          Tip: Mark ingredients as you buy them!
        </span>
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          onClick={handleWhatCanICook}
          style={{
            margin: "1rem auto",
            display: "block",
            background: "#c9b87a",
            color: "#23262e",
            border: "none",
            borderRadius: 10,
            padding: "1rem 2rem",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
        >
          What can I cook?
        </button>
      </div>
      <WhatCanICookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        recipes={cookableRecipes}
      />
    </div>
  );
}

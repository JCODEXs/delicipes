"use client";
import { useState } from "react";
import {
  importRecipesFromAPI,
  importIngredientsFromAPI2,
} from "actions/actions";
import { usePantry } from "~/store/pantry";

export default function ImportPanel() {
  const addIngredients = usePantry((s) => s.addStoreIngredients);
  const [step, setStep] = useState("menu");
  const [fetchedIngredients, setFetchedIngredients] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleFetchIngredients = async () => {
    const data = await importIngredientsFromAPI2();
    setFetchedIngredients(data || []);
    setSelectedIds([]); // reset selection
    setStep("select");
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === fetchedIngredients.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(fetchedIngredients.map((i) => i._id));
    }
  };

  const handleConfirm = () => {
    const selected = fetchedIngredients.filter((i) =>
      selectedIds.includes(i._id),
    );
    addIngredients(selected);
    setStep("menu");
  };

  if (step === "menu") {
    return (
      <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-gray-800">Import Data</h2>
        <div className="flex flex-col gap-3">
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600"
            onClick={importRecipesFromAPI}
          >
            Import Recipes
          </button>
          <button
            className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white transition hover:bg-green-600"
            onClick={handleFetchIngredients}
          >
            Import Ingredients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Select Ingredients to Import
        </h2>
        {fetchedIngredients.length > 0 && (
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <input
              type="checkbox"
              checked={selectedIds.length === fetchedIngredients.length}
              onChange={toggleSelectAll}
            />
            Select All
          </label>
        )}
      </div>

      <div className="max-h-64 space-y-2 overflow-y-auto">
        {fetchedIngredients.map((item) => {
          const ingredient = item.ingredient;
          return (
            <label
              key={item._id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2 transition hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item._id)}
                onChange={() => toggleSelection(item._id)}
              />
              <span className="text-xl">{ingredient?.image}</span>
              <span className="flex-1 font-medium">{ingredient?.name}</span>
              <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700">
                ${ingredient?.price}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          className="rounded-lg bg-gray-300 px-4 py-2 font-medium text-gray-800 transition hover:bg-gray-400"
          onClick={() => setStep("menu")}
        >
          Cancel
        </button>
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600 disabled:bg-blue-300"
          onClick={handleConfirm}
          disabled={selectedIds.length === 0}
        >
          Confirm Import
        </button>
      </div>
    </div>
  );
}

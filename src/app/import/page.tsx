"use client";
import { useState } from "react";
import {
  importRecipesFromAPI,
  importIngredientsFromAPI2,
  importPublicRecipesFromAPI,
} from "actions/actions";
import { usePantry } from "~/store/pantry";
import RecipeSelectionCard from "../_components/import/RecipeSelectionCard";
import { toast } from "sonner";

interface Ingredient {
  _id: string;
  ingredient: {
    name: string;
    image?: string;
    price?: string | number;
    units?: string;
    grPrice?: number;
  };
}

interface RecipeIngredient {
  _id?: string;
  ingredient: {
    name: string;
    units: string;
    image: string;
    price: string | number;
    grPrice: number;
  };
  quantity: number;
}

interface Recipe {
  _id: string;
  recipe: {
    key: number;
    title: string;
    description: string;
    portions: number;
    ingredients: RecipeIngredient[];
    imageUrl?: {
      name: string;
      size: number;
      key: string;
      url: string;
      appUrl: string;
      type: string;
    };
    isPrivate?: boolean;
    isSpicy?: boolean;
    isHealthy?: boolean;
    isLowCarb?: boolean;
    isQuickMeal?: boolean;
    isVegan?: boolean;
    isVegetarian?: boolean;
    category?: string;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
    updatedBy?: string;
    clonedFrom?: string;
    clonedAt?: string;
  };
}

export default function ImportPanel() {
  const addIngredients = usePantry((s) => s.addStoreIngredients);
  const addRecipes = usePantry((s) => s.addStoreRecipe);
  const [step, setStep] = useState<"menu" | "selectIngredients" | "selectRecipes">("menu");
  const [fetchedIngredients, setFetchedIngredients] = useState<Ingredient[]>([]);
  const [fetchedRecipes, setFetchedRecipes] = useState<Recipe[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleQuickImportRecipes = async () => {
    setLoading(true);
    try {
      await importPublicRecipesFromAPI();
      toast.success("¡Recetas importadas exitosamente!");
    } catch (error) {
      console.error("Error importing recipes:", error);
      toast.error("Error al importar recetas");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchIngredients = async () => {
    setLoading(true);
    try {
      const data = await importIngredientsFromAPI2();
      setFetchedIngredients(data || []);
      setSelectedIds([]); // reset selection
      setStep("selectIngredients");
      if (!data || data.length === 0) {
        toast.info("No se encontraron ingredientes para importar");
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      toast.error("Error al cargar ingredientes");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRecipes = async () => {
    setLoading(true);
    try {
      const data = await importPublicRecipesFromAPI();
      console.log(data, "data");
      setFetchedRecipes(data || []);
      setSelectedIds([]); // reset selection
      setStep("selectRecipes");
      if (!data || data.length === 0) {
        toast.info("No se encontraron recetas para importar");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Error al cargar recetas");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    const currentItems = step === "selectIngredients" ? fetchedIngredients : fetchedRecipes;
    if (selectedIds.length === currentItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentItems.map((i) => i._id));
    }
  };

  const handleConfirmIngredients = () => {
    const selected = fetchedIngredients.filter((i) =>
      selectedIds.includes(i._id),
    );
    addIngredients(selected);
    toast.success(`${selected.length} ingredientes importados exitosamente`);
    setStep("menu");
  };

  const handleConfirmRecipes = () => {
    const selected = fetchedRecipes.filter((r) => selectedIds.includes(r._id));
    selected.forEach((recipe) => addRecipes(recipe));
    toast.success(`${selected.length} recetas importadas exitosamente`);
    setStep("menu");
  };

  if (step === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-amber-900">
              📥 Importar Datos
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-amber-700">
              Importa recetas e ingredientes desde la base de datos compartida
              para expandir tu colección
            </p>
          </div>

          {/* Import Options */}
          <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
            {/* Import Recipes Card */}
            <div className="rounded-xl border border-amber-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <span className="text-3xl">👨‍🍳</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  Importar Recetas
                </h3>
                <p className="text-sm text-gray-600">
                  Selecciona y agrega recetas de la colección compartida a tu
                  recetario personal
                </p>
              </div>
              <button
                className="w-full rounded-lg bg-amber-600 px-4 py-3 font-medium text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                onClick={handleFetchRecipes}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Cargando...
                  </div>
                ) : (
                  "Explorar Recetas"
                )}
              </button>
            </div>

            {/* Import Ingredients Card */}
            <div className="rounded-xl border border-green-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <span className="text-3xl">🥕</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  Importar Ingredientes
                </h3>
                <p className="text-sm text-gray-600">
                  Agrega ingredientes de la base de datos para usar en tus
                  recetas
                </p>
              </div>
              <button
                className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                onClick={handleFetchIngredients}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Cargando...
                  </div>
                ) : (
                  "Explorar Ingredientes"
                )}
              </button>
            </div>
          </div>

          {/* Quick Import Option */}
          <div className="mt-8 text-center">
            <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-2 font-semibold text-gray-800">
                Importación Rápida
              </h4>
              <p className="mb-3 text-sm text-gray-600">
                Importa todas las recetas disponibles de una vez
              </p>
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                onClick={handleQuickImportRecipes}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Importando...
                  </div>
                ) : (
                  "Importar Todas las Recetas"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ingredients Selection View
  if (step === "selectIngredients") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-amber-900">
              🥕 Seleccionar Ingredientes
            </h1>
            <p className="mb-6 text-amber-700">
              Elige los ingredientes que deseas agregar a tu despensa
            </p>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between rounded-lg border border-amber-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {selectedIds.length} de {fetchedIngredients.length} seleccionados
                </span>
                {fetchedIngredients.length > 0 && (
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === fetchedIngredients.length}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-2 border-gray-300 bg-white text-amber-600 focus:ring-amber-500"
                    />
                    Seleccionar Todo
                  </label>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  className="rounded-lg bg-gray-300 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-400"
                  onClick={() => setStep("menu")}
                >
                  Cancelar
                </button>
                <button
                  className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  onClick={handleConfirmIngredients}
                  disabled={selectedIds.length === 0}
                >
                  Importar ({selectedIds.length})
                </button>
              </div>
            </div>
          </div>

          {/* Ingredients Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fetchedIngredients.map((item) => {
              const ingredient = item.ingredient;
              const isSelected = selectedIds.includes(item._id);

              return (
                <div
                  key={item._id}
                  className={`
                    relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                    ${isSelected
                      ? "border-green-500 bg-green-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md"
                    }
                  `}
                  onClick={() => toggleSelection(item._id)}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute right-3 top-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelection(item._id)}
                      className="h-4 w-4 rounded border-2 border-gray-300 bg-white text-green-600 focus:ring-green-500"
                    />
                  </div>

                  {/* Ingredient Content */}
                  <div className="text-center">
                    <div className="mb-3 text-4xl">
                      {ingredient?.image || "🥄"}
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-800">
                      {ingredient?.name}
                    </h3>
                    {ingredient?.price && (
                      <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                        ${ingredient.price}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {fetchedIngredients.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">🤷‍♂️</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-600">
                No hay ingredientes disponibles
              </h3>
              <p className="text-gray-500">
                No se encontraron ingredientes para importar.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Recipes Selection View
  if (step === "selectRecipes") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-amber-900">
              👨‍🍳 Seleccionar Recetas
            </h1>
            <p className="mb-6 text-amber-700">
              Elige las recetas que deseas agregar a tu recetario
            </p>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between rounded-lg border border-amber-200 bg-white p-4 shadow-sm ">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {selectedIds.length} de {fetchedRecipes.length} seleccionadas
                </span>
                {fetchedRecipes.length > 0 && (
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === fetchedRecipes.length}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-2 border-gray-300 bg-white text-amber-600 focus:ring-amber-500"
                    />
                    Seleccionar Todo
                  </label>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  className="rounded-lg bg-gray-300 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-400"
                  onClick={() => setStep("menu")}
                >
                  Cancelar
                </button>
                <button
                  className="rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  onClick={handleConfirmRecipes}
                  disabled={selectedIds.length === 0}
                >
                  Importar ({selectedIds.length})
                </button>
              </div>
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fetchedRecipes.map((recipe) => (
              <RecipeSelectionCard
                key={recipe._id}
                recipe={recipe}
                isSelected={selectedIds.includes(recipe._id)}
                onToggle={toggleSelection}
              />
            ))}
          </div>

          {fetchedRecipes.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">🤷‍♂️</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-600">
                No hay recetas disponibles
              </h3>
              <p className="text-gray-500">
                No se encontraron recetas para importar.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

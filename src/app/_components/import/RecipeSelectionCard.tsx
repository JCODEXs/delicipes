"use client";
import Image from "next/image";
import { useState } from "react";
import { cloneRecipe } from "~/store/pantry";
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
  };
}

interface RecipeSelectionCardProps {
  recipe: Recipe;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export default function RecipeSelectionCard({ 
  recipe, 
  isSelected, 
  onToggle 
}: RecipeSelectionCardProps) {
  const [showIngredients, setShowIngredients] = useState(false);
  
  const recipeData = recipe.recipe;
  const totalCost = recipeData.ingredients?.reduce((sum, ing) => {
    const price = typeof ing.ingredient.price === 'string' ? parseFloat(ing.ingredient.price) : ing.ingredient.price;
    return sum + (price || 0) * ing.quantity / 1000; // Convert to reasonable units
  }, 0) || 0;

  return (
    <div className={`
      relative rounded-xl border-2 transition-all duration-200 cursor-pointer
      ${isSelected 
        ? 'border-amber-500 bg-amber-50 shadow-lg' 
        : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-md'
      }
    `}>
      {/* Selection Checkbox */}
      <div className="absolute top-3 right-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(recipe._id)}
          className="w-5 h-5 text-amber-600 bg-white border-2 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
        />
      </div>

      <div className="p-4" onClick={() => onToggle(recipe._id)}>
        {/* Recipe Image */}
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
          {recipeData.imageUrl?.url ? (
            <Image
              src={recipeData.imageUrl.url}
              alt={recipeData.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

<button
  onClick={(e) => {
    e.stopPropagation();
    cloneRecipe(recipe);
  }}
  className="mt-2 w-full rounded-lg bg-green-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-green-700"
>
  🔄 Clonar Receta
</button>

        {/* Recipe Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {recipeData.title}
        </h3>

        {/* Recipe Description */}
        {recipeData.description && recipeData.description.trim() && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {recipeData.description}
          </p>
        )}

        {/* Recipe Stats */}
        <div className="flex justify-between items-center mb-3 text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {recipeData.portions} porciones
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              {recipeData.ingredients.length} ingredientes
            </span>
          </div>
          {totalCost > 0 && (
            <span className="font-semibold text-amber-600">
              ${totalCost.toFixed(0)}
            </span>
          )}
        </div>

        {/* Ingredients Toggle */}
        {recipeData.ingredients && recipeData.ingredients.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowIngredients(!showIngredients);
            }}
            className="w-full text-sm text-amber-600 hover:text-amber-700 font-medium py-2 border-t border-gray-200 transition-colors"
          >
            {showIngredients ? 'Ocultar ingredientes' : 'Ver ingredientes'}
            <svg
              className={`w-4 h-4 inline ml-1 transition-transform ${showIngredients ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {/* Ingredients List */}
        {showIngredients && recipeData.ingredients && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {recipeData.ingredients.map((ingredient, index) => {
                const price = typeof ingredient.ingredient.price === 'string'
                  ? parseFloat(ingredient.ingredient.price)
                  : ingredient.ingredient.price;
                const cost = (price || 0) * ingredient.quantity / 1000;

                return (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-lg">{ingredient.ingredient.image}</span>
                      <span className="text-gray-700">
                        {ingredient.ingredient.name}
                      </span>
                    </div>
                    <span className="text-gray-500 mx-2">
                      {ingredient.quantity} {ingredient.ingredient.units}
                    </span>
                    {price && (
                      <span className="text-amber-600 font-medium">
                        ${cost.toFixed(2)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

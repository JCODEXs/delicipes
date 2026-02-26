"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateIngredient, usePantry } from "~/store/pantry";

/* =======================
   Types
======================= */

interface PriceHistory {
  price: number;
  date: string;
}

interface IngredientEntity {
  _id: string;
  ingredient: {
    name: string;
    image?: string;
    price?: number;
    units?: string;
    grPrice?: number;
  };
  priceHistory?: PriceHistory[];
}

/* =======================
  API calls
======================= */

async function updateIngredientDB(
  id: string,
  payload: Partial<IngredientEntity>,
) {
  return updateIngredient({
    _id: id,
    ...payload,
  });
}



/* =======================
   Component
======================= */

export default function IngredientManagerPanel({
  setConfirmModalOpen,
  setPendingDelete,
  ingredientsList,
}: {
  setConfirmModalOpen: (open: boolean) => void;
  setPendingDelete: (item: IngredientEntity) => void;
}) {
  const setPantryIngredients = usePantry(
    (s) => s.addStoreIngredients,
  );
  const ingredients = usePantry((s) => s.ingredients);
const [searchValue, setSearchValue] = useState("");
  const [localIngredients, setLocalIngredients] = useState<IngredientEntity[]>([]);

  
  useEffect(() => {
    setLocalIngredients(ingredients);
  }, [ingredients]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

const filteredIngredients = localIngredients.filter((i) =>
  i.ingredient.name
    .toLowerCase()
    .includes(searchValue.toLowerCase()),
);



  /* =======================
     Handlers
  ======================= */

  const startEdit = (id: string) => setEditingId(id);

  
  const cancelEdit = () => setEditingId(null);

const handleChange = (
  id: string,
  field: "name" | "price",
  value: string,
) => {
  setLocalIngredients((prev) =>
    prev.map((item) =>
      item._id === id
        ? {
            ...item,
            ingredient: {
              ...item.ingredient,
              [field]:
                field === "price" ? Number(value) : value,
            },
          }
        : item,
    ),
  );
};


const saveIngredient = async (item: IngredientEntity) => {
  setLoadingId(item._id);

  try {
    const newPrice = item.ingredient.price || 0;

    const updatedHistory: PriceHistory[] = [
      ...(item.priceHistory || []),
      {
        price: newPrice,
        date: new Date().toISOString(),
      },
    ];

    const updatedItem = {
      ...item,
      priceHistory: updatedHistory,
    };

    // 1️⃣ Update DB
    await updateIngredientDB(item._id, {
      ingredient: item.ingredient,
    });

    // 2️⃣ Update Zustand store properly
    setPantryIngredients((prev: IngredientEntity[]) =>
      prev.map((i) =>
        i._id === item._id ? updatedItem : i
      )
    );

    toast.success("Ingrediente actualizado");
    setEditingId(null);
  } catch (err) {
    console.log(err);
    toast.error("Error al guardar ingrediente");
  } finally {
    setLoadingId(null);
  }
};


  const deleteIngredient = async (item: IngredientEntity) => {
    
    setPendingDelete(item);
    setConfirmModalOpen(true);  

  };

  /* =======================
     Render
  ======================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-amber-900">
            🧺 Gestión de Ingredientes
          </h1>
          <p className="text-amber-700">
            Edita precios, nombres o elimina ingredientes de tu despensa
          </p>
        </header>
        {/* <div className="mb-8 text-center">
          <button
            onClick={() => setLocalIngredients(pantryIngredients)}
            className="rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Recargar Ingredientes
          </button>
        </div> */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Buscar ingrediente"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}  
            className="rounded-lg bg-gray-200 px-4 py-3 font-medium hover:text-white transition-colors hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-400 text-black"
          />
            
          
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIngredients.map((item,index) => {
            const isEditing = editingId === item._id;

            return (
              <div
                key={item._id+index}
                className="rounded-lg border border-amber-200 bg-white p-4 shadow-sm"
              >
               
                  <div className="mb-3 text-center text-4xl">
                    {item.ingredient.image || "🥄"}
                  </div>
                    {/* <div className="text-black p-6">{item.ingredient.name}</div> */}
               

                {/* Name */}
                <div className="mb-2">
                  {isEditing ? (
                    <div className="flex flex-row">
                      <div className="text-black font-bold mr-2 pt-1">Nombre</div> <input
                        type="text"
                        placeholder="Nombre"
                        value={item.ingredient.name}
                        onChange={(e) =>
                          handleChange(
                            item._id,
                            "name",
                            e.target.value,
                          )
                        }
                        className="text-black rounded border px-2 py-1"
                      />
                    </div>
                  ) : (
                    <h3 className="text-center font-semibold text-black">
                      {item.ingredient.name}
                    </h3>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  {isEditing ? (
                     <div className="flex flex-row">
                      <div className="text-black font-bold mr-2 pt-1">Precio</div> 
                    <input
                      type="number"
                      placeholder="Precio"

                      value={item.ingredient.price || 0}
                      onChange={(e) =>
                        handleChange(
                          item._id,
                          "price",
                          e.target.value,
                        )
                      }
                      className="w-full text-black rounded border px-2 py-1"
                    />
                    </div>
                  ) : (
                    <p className="text-center text-sm text-gray-600">
                      ${item.ingredient.price}
                    </p>
                  )}
                </div>

                {/* Price history */}
                {item.priceHistory && item.priceHistory.length > 0 && (
                  <div className="mb-3 text-xs text-gray-500">
                    Último cambio:{" "}
                    {
                      item.priceHistory[
                        item.priceHistory.length - 1
                      ].price
                    }
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => saveIngredient(item)}
                        disabled={loadingId === item._id}
                        className="flex-1 rounded bg-green-600 px-3 py-1 text-white"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 rounded bg-gray-300 px-3 py-1"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item._id)}
                        className="flex-1 rounded bg-amber-500 px-3 py-1 text-white"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteIngredient(item)}
                        className="flex-1 rounded bg-red-500 px-3 py-1 text-white"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {ingredients.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No hay ingredientes registrados
          </div>
        )}
      </div>
    </div>
  );
}

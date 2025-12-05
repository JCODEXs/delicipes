import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const defaultPreferences = {
  planningMode: "sequential",
  defaultDaysCount: 7,
  defaultPortions: 1,
  autoSavePrograms: true,
  notifications: {
    mealReminders: true,
    shoppingListUpdates: true,
    weeklyPlanning: false,
  },
};

export const useUserPreferences = create(
  persist(
    (set, get) => ({
      preferences: defaultPreferences,
      isLoading: false,

      updatePreference: (key, value) =>
        set((state) => ({
          preferences: { ...state.preferences, [key]: value },
        })),

      updateNotificationPreference: (key, value) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            notifications: { ...state.preferences.notifications, [key]: value },
          },
        })),

      savePreferences: async () => {
        set({ isLoading: true });
        try {
          const { preferences } = get();

          // Verificar si ya existen preferencias
          const existingPrefs = await axios.get("/api/user-preferences");

          if (existingPrefs.data.preferences) {
            // Actualizar existentes
            await axios.put("/api/user-preferences", { preferences });
            toast.success("Preferencias actualizadas!");
          } else {
            // Crear nuevas
            await axios.post("/api/user-preferences", { preferences });
            toast.success("Preferencias guardadas!");
          }
        } catch (error) {
          toast.error("Error al guardar preferencias");
          console.error("Failed to save preferences:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      loadPreferences: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get("/api/user-preferences");
          if (response.data.preferences) {
            set({
              preferences: {
                ...defaultPreferences,
                ...response.data.preferences,
              },
            });
          }
        } catch (error) {
          console.error("Failed to load preferences:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-preferences-storage",
      partialize: (state) => ({ preferences: state.preferences }),
    },
  ),
);

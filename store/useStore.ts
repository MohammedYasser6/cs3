import { create } from "zustand";
import { persist } from "zustand/middleware";
import { saveProgressToDB } from "../app/actions"; // Import our new server action!

interface StoreState {
  xp: number;
  level: number;
  completedModules: string[];
  completeModule: (moduleId: string, xpReward: number) => void;
  resetProgress: () => void;
  syncFromDB: (dbXP: number, dbModules: string[]) => void; // New sync method
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      completedModules: [],

      completeModule: (moduleId: string, xpReward: number) => {
        const state = get();
        if (state.completedModules?.includes(moduleId)) return;

        // 1. Fire the database update silently in the background
        saveProgressToDB(moduleId, xpReward).catch(console.error);

        // 2. Instantly update the UI (Optimistic Update)
        const newXP = state.xp + xpReward;
        const newLevel = Math.floor(newXP / 100) + 1;
        const updatedModules = [...(state.completedModules || []), moduleId];

        if (typeof document !== "undefined") {
          document.cookie = `user_xp=${newXP}; path=/; max-age=2592000; SameSite=Lax`;
        }

        set({
          completedModules: updatedModules,
          xp: newXP,
          level: newLevel,
        });
      },

      resetProgress: () => {
        if (typeof document !== "undefined") {
          document.cookie = "user_xp=0; path=/; max-age=0; SameSite=Lax";
        }
        set({ xp: 0, level: 1, completedModules: [] });
      },

      // Overwrites local state with the official Database state
      syncFromDB: (dbXP: number, dbModules: string[]) => {
        if (typeof document !== "undefined") {
          document.cookie = `user_xp=${dbXP}; path=/; max-age=2592000; SameSite=Lax`;
        }
        set({
          xp: dbXP,
          completedModules: dbModules,
          level: Math.floor(dbXP / 100) + 1,
        });
      },
    }),
    { name: "cs3-storage" }, // Persist config
  ),
);

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  xp: number;
  level: number;
  completedModules: string[];
  completeModule: (moduleId: string, xpReward: number) => void; // 1. Add to interface
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      completedModules: [],

      // 2. Implement the completeModule function
      completeModule: (moduleId: string, xpReward: number) =>
        set((state) => {
          // Prevent rewarding XP twice if they take the quiz again
          const alreadyCompleted = state.completedModules?.includes(moduleId);
          if (alreadyCompleted) return state;

          const updatedModules = [...(state.completedModules || []), moduleId];
          const newXP = state.xp + xpReward;
          const newLevel = Math.floor(newXP / 100) + 1;

          // Sync cookie for your middleware route guard
          if (typeof document !== "undefined") {
            document.cookie = `user_xp=${newXP}; path=/; max-age=2592000; SameSite=Lax`;
          }

          return {
            completedModules: updatedModules,
            xp: newXP,
            level: newLevel,
          };
        }),
    }),
    {
      name: "cs3-storage",
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== "undefined") {
          document.cookie = `user_xp=${state.xp}; path=/; max-age=2592000; SameSite=Lax`;
        }
      },
    },
  ),
);

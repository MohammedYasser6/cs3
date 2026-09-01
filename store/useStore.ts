import { create } from "zustand";
import { persist } from "zustand/middleware";
import { saveProgressToDB } from "../app/actions";

export type Track = "cs" | "ai" | "cyber";

interface StoreState {
  xp: number;
  csXp: number;
  aiXp: number;
  cyberXp: number;
  level: number;
  completedModules: string[];
  completeModule: (moduleId: string, xpReward: number, track?: Track) => void;
  resetProgress: () => void;
  resetSession: () => void; // Completely clears local store on logout
  syncFromDB: (
    dbXP: number,
    dbModules: string[],
    dbCsXp?: number,
    dbAiXp?: number,
    dbCyberXp?: number,
  ) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      xp: 0,
      csXp: 0,
      aiXp: 0,
      cyberXp: 0,
      level: 1,
      completedModules: [],

      completeModule: (
        moduleId: string,
        xpReward: number,
        track: Track = "cs",
      ) => {
        const state = get();
        if (state.completedModules?.includes(moduleId)) return;

        saveProgressToDB(moduleId, xpReward, track).catch(console.error);

        const newTotalXP = state.xp + xpReward;
        const newTrackXP = state[`${track}Xp`] + xpReward;
        const newLevel = Math.floor(newTotalXP / 100) + 1;
        const updatedModules = [...(state.completedModules || []), moduleId];

        if (typeof document !== "undefined") {
          document.cookie = `user_xp=${newTotalXP}; path=/; max-age=2592000; SameSite=Lax`;
        }

        set({
          completedModules: updatedModules,
          xp: newTotalXP,
          [`${track}Xp`]: newTrackXP,
          level: newLevel,
        });
      },

      resetProgress: () => {
        if (typeof document !== "undefined")
          document.cookie = "user_xp=0; path=/; max-age=0; SameSite=Lax";
        set({
          xp: 0,
          csXp: 0,
          aiXp: 0,
          cyberXp: 0,
          level: 1,
          completedModules: [],
        });
      },

      resetSession: () => {
        if (typeof document !== "undefined")
          document.cookie = "user_xp=0; path=/; max-age=0; SameSite=Lax";
        localStorage.removeItem("cs3-storage"); // Clears persistent Zustand cache entirely
        set({
          xp: 0,
          csXp: 0,
          aiXp: 0,
          cyberXp: 0,
          level: 1,
          completedModules: [],
        });
      },

      syncFromDB: (dbXP, dbModules, dbCsXp = 0, dbAiXp = 0, dbCyberXp = 0) => {
        if (typeof document !== "undefined")
          document.cookie = `user_xp=${dbXP}; path=/; max-age=2592000; SameSite=Lax`;
        const safeCsXp = dbCsXp === 0 && dbXP > 0 ? dbXP : dbCsXp;
        set({
          xp: dbXP,
          csXp: safeCsXp,
          aiXp: dbAiXp,
          cyberXp: dbCyberXp,
          completedModules: dbModules,
          level: Math.floor(dbXP / 100) + 1,
        });
      },
    }),
    {
      name: "cs3-storage",
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          persistedState.csXp = persistedState.xp || 0;
        }
        return persistedState;
      },
    },
  ),
);

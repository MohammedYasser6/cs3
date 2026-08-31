import { create } from "zustand";
import { persist } from "zustand/middleware";
import { saveProgressToDB } from "../app/actions";

export type Track = "cs" | "ai" | "cyber";

interface StoreState {
  xp: number; // Global Total XP
  csXp: number; // Legacy/Standard CS Track
  aiXp: number; // AI Track
  cyberXp: number; // Cyber Track
  level: number;
  completedModules: string[];
  completeModule: (moduleId: string, xpReward: number, track?: Track) => void;
  resetProgress: () => void;
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

        // 1. Fire the database update silently in the background
        // NOTE: Update your saveProgressToDB action to accept the 'track' parameter!
        saveProgressToDB(moduleId, xpReward, track).catch(console.error);

        // 2. Instantly update the UI (Optimistic Update)
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
        if (typeof document !== "undefined") {
          document.cookie = "user_xp=0; path=/; max-age=0; SameSite=Lax";
        }
        set({
          xp: 0,
          csXp: 0,
          aiXp: 0,
          cyberXp: 0,
          level: 1,
          completedModules: [],
        });
      },

      // Overwrites local state with the official Database state
      syncFromDB: (dbXP, dbModules, dbCsXp = 0, dbAiXp = 0, dbCyberXp = 0) => {
        if (typeof document !== "undefined") {
          document.cookie = `user_xp=${dbXP}; path=/; max-age=2592000; SameSite=Lax`;
        }
        set({
          xp: dbXP,
          csXp: dbCsXp,
          aiXp: dbAiXp,
          cyberXp: dbCyberXp,
          completedModules: dbModules,
          level: Math.floor(dbXP / 100) + 1,
        });
      },
    }),
    { name: "cs3-storage" }, // Persist config
  ),
);

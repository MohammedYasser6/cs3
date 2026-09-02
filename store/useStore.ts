import { create } from "zustand";
import { persist } from "zustand/middleware";
import { saveProgressToDB } from "../app/actions";

export type Track = "cs" | "ai" | "cyber" | "swe";

interface StoreState {
  xp: number;
  csXp: number;
  aiXp: number;
  cyberXp: number;
  sweXp: number;
  level: number;
  completedModules: string[];
  completeModule: (moduleId: string, xpReward: number, track?: Track) => void;
  resetProgress: () => void;
  resetSession: () => void;
  syncFromDB: (
    dbXP: number,
    dbModules: string[],
    dbCsXp?: number,
    dbAiXp?: number,
    dbCyberXp?: number,
    dbSweXp?: number,
  ) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      xp: 0,
      csXp: 0,
      aiXp: 0,
      cyberXp: 0,
      sweXp: 0,
      level: 1,
      completedModules: [],

      completeModule: (
        moduleId: string,
        xpReward: number,
        track: Track = "cs",
      ) => {
        const state = get();
        if (state.completedModules?.includes(moduleId)) return;

        // Fire and forget DB save
        saveProgressToDB(moduleId, xpReward, track).catch(console.error);

        // Safely extract the track XP using TypeScript key assertions
        const trackKey = `${track}Xp` as keyof StoreState;
        const currentTrackXP = (state[trackKey] as number) || 0;

        const newTotalXP = state.xp + xpReward;
        const newTrackXP = currentTrackXP + xpReward;
        const newLevel = Math.floor(newTotalXP / 100) + 1;
        const updatedModules = [...(state.completedModules || []), moduleId];

        if (typeof document !== "undefined") {
          document.cookie = `user_xp=${newTotalXP}; path=/; max-age=2592000; SameSite=Lax`;
        }

        set({
          completedModules: updatedModules,
          xp: newTotalXP,
          [trackKey]: newTrackXP,
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
          sweXp: 0,
          level: 1,
          completedModules: [],
        });
      },

      resetSession: () => {
        if (typeof document !== "undefined")
          document.cookie = "user_xp=0; path=/; max-age=0; SameSite=Lax";
        localStorage.removeItem("cs3-storage");
        set({
          xp: 0,
          csXp: 0,
          aiXp: 0,
          cyberXp: 0,
          sweXp: 0,
          level: 1,
          completedModules: [],
        });
      },

      syncFromDB: (
        dbXP,
        dbModules,
        dbCsXp = 0,
        dbAiXp = 0,
        dbCyberXp = 0,
        dbSweXp = 0,
      ) => {
        if (typeof document !== "undefined")
          document.cookie = `user_xp=${dbXP}; path=/; max-age=2592000; SameSite=Lax`;
        const safeCsXp = dbCsXp === 0 && dbXP > 0 ? dbXP : dbCsXp;
        set({
          xp: dbXP,
          csXp: safeCsXp,
          aiXp: dbAiXp,
          cyberXp: dbCyberXp,
          sweXp: dbSweXp,
          completedModules: dbModules,
          level: Math.floor(dbXP / 100) + 1,
        });
      },
    }),
    {
      name: "cs3-storage",
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          persistedState.csXp = persistedState.xp || 0;
        }
        if (version < 2) {
          persistedState.sweXp = 0;
        }
        return persistedState;
      },
    },
  ),
);

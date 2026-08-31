import { create } from "zustand";

interface TrackState {
  csXp: number;
  aiXp: number;
  cyberXp: number;
  addXp: (track: "cs" | "ai" | "cyber", amount: number) => void;
  setAllXp: (cs: number, ai: number, cyber: number) => void;
}

export const useTrackStore = create<TrackState>((set) => ({
  csXp: 0,
  aiXp: 0,
  cyberXp: 0,
  addXp: (track, amount) =>
    set((state) => ({
      [track + "Xp"]:
        (state[`${track}Xp` as keyof TrackState] as number) + amount,
    })),
  setAllXp: (cs, ai, cyber) => set({ csXp: cs, aiXp: ai, cyberXp: cyber }),
}));

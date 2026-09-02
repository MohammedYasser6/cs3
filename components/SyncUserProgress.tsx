"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { getUserProgressFromDB } from "@/app/actions";

export default function SyncUserProgress() {
  const syncFromDB = useStore((state) => state.syncFromDB);

  useEffect(() => {
    getUserProgressFromDB().then((data) => {
      if (data) {
        syncFromDB(
          data.xp,
          data.completedModules,
          data.csXp,
          data.aiXp,
          data.cyberXp,
          data.sweXp, // <-- IF THIS IS MISSING, SWE XP RESTORES TO 0 ON REFRESH
        );
      }
    });
  }, [syncFromDB]);

  return null;
}

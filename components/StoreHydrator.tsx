"use client";

import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";

export default function StoreHydrator({
  dbXP,
  dbModules,
}: {
  dbXP: number;
  dbModules: string[];
}) {
  const { xp, syncFromDB } = useStore();
  const hydrated = useRef(false);

  useEffect(() => {
    // If the database has more XP than our local cache (e.g. fresh login)
    if (!hydrated.current && dbXP > xp) {
      syncFromDB(dbXP, dbModules);
      hydrated.current = true;
    }
  }, [dbXP, dbModules, xp, syncFromDB]);

  return null; // This component renders absolutely nothing!
}

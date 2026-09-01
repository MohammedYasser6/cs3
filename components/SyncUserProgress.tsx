"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/store/useStore";
import { getUserProgressFromDB } from "@/app/actions";

export default function SyncUserProgress() {
  const { status } = useSession();
  const syncFromDB = useStore((state) => state.syncFromDB);

  useEffect(() => {
    if (status === "authenticated") {
      getUserProgressFromDB()
        .then((data) => {
          if (data) {
            syncFromDB(data.xp, [], data.csXp, data.aiXp, data.cyberXp);
          }
        })
        .catch(console.error);
    }
  }, [status, syncFromDB]);

  return null;
}

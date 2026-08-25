"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "../store/useStore"; // Adjust path to your Zustand store

// 1. DEFINE ALL XP REQUIREMENTS IN ONE PLACE
const ROUTE_XP_REQUIREMENTS: Record<string, { minXP: number; label: string }> =
  {
    "/trees": { minXP: 50, label: "Trees & Hierarchical Structures" },
    "/graphs": { minXP: 100, label: "Graphs & Networks" },
    "/dp": { minXP: 150, label: "Dynamic Programming" },
    "/quiz/trees": { minXP: 50, label: "Trees Quiz" },
    "/quiz/graphs": { minXP: 100, label: "Graphs Quiz" },
    // Add as many routes here as you want!
  };

export default function GlobalRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { xp } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Find if the current route has an XP threshold
  const matchedRoute = Object.entries(ROUTE_XP_REQUIREMENTS).find(([route]) =>
    pathname.startsWith(route),
  );

  const isLocked = Boolean(
    matchedRoute && isMounted && xp < matchedRoute[1].minXP,
  );

  useEffect(() => {
    if (isLocked) {
      // Redirect back to dashboard if locked
      router.replace("/");
    }
  }, [isLocked, router]);

  // While mounting or redirecting, don't flash the locked content
  if (!isMounted || isLocked) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}

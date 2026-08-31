"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "../store/useStore";

type TrackXP = "csXp" | "aiXp" | "cyberXp";

const ROUTE_XP_REQUIREMENTS: Record<string, { minXP: number; track: TrackXP }> =
  {
    // Track 1: CS Fundamentals (0 XP)
    "/hardware": { minXP: 0, track: "csXp" },
    "/binary": { minXP: 0, track: "csXp" },
    "/pointers": { minXP: 0, track: "csXp" },

    // Track 2: Linear Data Structures (Requires XP from previous track)
    "/arrays": { minXP: 50, track: "csXp" },
    "/2d-arrays": { minXP: 100, track: "csXp" },
    "/linked-lists": { minXP: 150, track: "csXp" },
    "/stacks-queues": { minXP: 200, track: "csXp" },
    "/hash-tables": { minXP: 250, track: "csXp" },

    // Track 3: Non-Linear Structures
    "/trees": { minXP: 300, track: "csXp" },
    "/quiz/trees": { minXP: 300, track: "csXp" },
    "/graphs": { minXP: 350, track: "csXp" },
    "/quiz/graphs": { minXP: 350, track: "csXp" },

    // Track 4: Algorithms & Logic
    "/recursion": { minXP: 400, track: "csXp" },
    "/sorting": { minXP: 450, track: "csXp" },
    "/search": { minXP: 450, track: "csXp" },

    // AI Track
    "/ai/vectors-and-matrices": { minXP: 100, track: "aiXp" },
    "/ai/linear-regression": { minXP: 250, track: "aiXp" },
  };

export default function GlobalRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const csXp = useStore((state) => state.csXp) ?? 0;
  const aiXp = useStore((state) => state.aiXp) ?? 0;
  const cyberXp = useStore((state) => state.cyberXp) ?? 0;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trackXpMap: Record<TrackXP, number> = { csXp, aiXp, cyberXp };
  const matchedRoute = Object.entries(ROUTE_XP_REQUIREMENTS).find(([route]) =>
    pathname.startsWith(route),
  );

  const isLocked = Boolean(
    isMounted &&
    matchedRoute &&
    trackXpMap[matchedRoute[1].track] < matchedRoute[1].minXP,
  );

  useEffect(() => {
    if (isLocked) {
      router.replace("/");
    }
  }, [isLocked, router]);

  if (!isMounted) return <>{children}</>;
  if (pathname === "/login" || pathname === "/") return <>{children}</>;

  if (isLocked) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}

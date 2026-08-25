"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "../store/useStore";

const ROUTE_XP_REQUIREMENTS: Record<string, { minXP: number; label: string }> =
  {
    "/trees": { minXP: 50, label: "Trees & Hierarchical Structures" },
    "/graphs": { minXP: 100, label: "Graphs & Networks" },
    "/dp": { minXP: 150, label: "Dynamic Programming" },
    "/quiz/trees": { minXP: 50, label: "Trees Quiz" },
    "/quiz/graphs": { minXP: 100, label: "Graphs Quiz" },
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

  // 1. Always allow the login page instantly
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // 2. Find if the current route has an XP threshold
  const matchedRoute = Object.entries(ROUTE_XP_REQUIREMENTS).find(([route]) =>
    pathname.startsWith(route),
  );

  // If the route doesn't have an XP requirement, render immediately! No blocking spinners.
  if (!matchedRoute) {
    return <>{children}</>;
  }

  // Only evaluate locking once mounted and Zustand has loaded
  const isLocked = Boolean(isMounted && xp < matchedRoute[1].minXP);

  useEffect(() => {
    if (isLocked) {
      router.replace("/");
    }
  }, [isLocked, router]);

  // Only show the spinner if the route is actively locked and we are redirecting away from an advanced module
  if (isLocked) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}

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

  // Find if the current route has an XP threshold
  const matchedRoute = Object.entries(ROUTE_XP_REQUIREMENTS).find(([route]) =>
    pathname.startsWith(route),
  );

  // Calculate lock condition safely
  const isLocked = Boolean(
    isMounted && matchedRoute && xp < matchedRoute[1].minXP,
  );

  // PLACE ALL HOOKS HERE - Safely at the top level!
  useEffect(() => {
    if (isLocked) {
      router.replace("/");
    }
  }, [isLocked, router]);

  // --- EARLY RETURNS ARE SAFE ONLY AFTER ALL HOOKS ---

  // 1. Prevent server-side rendering mismatch by waiting for mount
  if (!isMounted) {
    return <>{children}</>;
  }

  // 2. Always allow the login page instantly
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // 3. Show spinner only if locked and redirecting
  if (isLocked) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}

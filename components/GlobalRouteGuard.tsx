"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "../store/useStore";

// 1. ADDED sweXp to the type
type TrackXP = "csXp" | "aiXp" | "cyberXp" | "sweXp";

const ROUTE_XP_REQUIREMENTS: Record<string, { minXP: number; track: TrackXP }> =
  {
    // --- CS TRACK ---
    "/hardware": { minXP: 0, track: "csXp" },
    "/binary": { minXP: 0, track: "csXp" },
    "/pointers": { minXP: 0, track: "csXp" },
    "/arrays": { minXP: 50, track: "csXp" },
    "/2d-arrays": { minXP: 100, track: "csXp" },
    "/linked-lists": { minXP: 150, track: "csXp" },
    "/stacks-queues": { minXP: 200, track: "csXp" },
    "/hash-tables": { minXP: 250, track: "csXp" },
    "/trees": { minXP: 300, track: "csXp" },
    "/quiz/trees": { minXP: 300, track: "csXp" },
    "/graphs": { minXP: 350, track: "csXp" },
    "/quiz/graphs": { minXP: 350, track: "csXp" },
    "/recursion": { minXP: 400, track: "csXp" },
    "/sorting": { minXP: 450, track: "csXp" },
    "/search": { minXP: 450, track: "csXp" },

    // --- AI TRACK ---
    "/ai/vectors-and-matrices": { minXP: 100, track: "aiXp" },
    "/ai/linear-regression": { minXP: 250, track: "aiXp" },
    "/ai/deep-learning": { minXP: 400, track: "aiXp" },
    "/ai/overfitting": { minXP: 800, track: "aiXp" },
    "/ai/clustering": { minXP: 1000, track: "aiXp" },
    "/ai/computer-vision": { minXP: 1200, track: "aiXp" },
    "/ai/rnns-lstms": { minXP: 1500, track: "aiXp" },
    "/ai/nlp": { minXP: 1800, track: "aiXp" },
    "/ai/transformers": { minXP: 2000, track: "aiXp" },
    "/ai/generative-ai": { minXP: 2300, track: "aiXp" },

    // --- SWE TRACK ---
    // --- SWE TRACK ---
    "/swe/srs-requirements": { minXP: 100, track: "sweXp" },
    "/swe/solid-principles": { minXP: 250, track: "sweXp" },
    "/swe/structural-patterns": { minXP: 400, track: "sweXp" },

    // FIX: Lowered from 600 to 550
    "/swe/behavioral-patterns": { minXP: 550, track: "sweXp" },

    // FIX: Lowered from 800 to 750 (550 + 200 reward from Behavioral)
    "/swe/creational-patterns": { minXP: 750, track: "sweXp" },
    "/swe/architecture-components": { minXP: 950, track: "sweXp" },
    "/swe/microservices": { minXP: 1150, track: "sweXp" },
    // --- CYBER TRACK ---
    "/cyber/cryptography": { minXP: 0, track: "cyberXp" },
    "/cyber/network-analysis": { minXP: 150, track: "cyberXp" },
    "/cyber/mobile-sec": { minXP: 350, track: "cyberXp" },
    "/cyber/iam": { minXP: 600, track: "cyberXp" },
    "/cyber/forensics": { minXP: 850, track: "cyberXp" },
    "/cyber/pentesting": { minXP: 1100, track: "cyberXp" },
    "/cyber/malware": { minXP: 1400, track: "cyberXp" },
    "/cyber/threat-intel": { minXP: 1700, track: "cyberXp" },
    "/cyber/ml-defense": { minXP: 2000, track: "cyberXp" },
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
  // 2. EXTRACT sweXp from store
  const sweXp = useStore((state) => state.sweXp) ?? 0;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 3. MAP sweXp into the dictionary
  const trackXpMap: Record<TrackXP, number> = { csXp, aiXp, cyberXp, sweXp };

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

import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Centralized XP Requirements for ALL courses
// Folders requiring 0 XP (like binary, hardware, programming) are left off the list
// so brand new users can access them immediately.
const ROUTE_XP_RULES: Record<string, number> = {
  // --- Tier 1 (Basic Data Structures) ---
  // Requires 50 XP
  "/arrays": 50,
  "/2d-arrays": 50,

  // --- Tier 2 (Memory & Linking) ---
  // Requires 100 XP
  "/pointers": 100,
  "/linked-lists": 100,

  // --- Tier 3 (Collections) ---
  // Requires 150 XP
  "/stacks-queues": 150,
  "/hash-tables": 150,

  // --- Tier 4 (Algorithms) ---
  // Requires 200 XP
  "/recursion": 200,
  "/sorting": 200,

  // --- Tier 5 (Advanced Non-Linear) ---
  // Requires 250 XP
  "/trees": 250,

  // Requires 300 XP
  "/graphs": 300,

  // --- Global Tools ---
  "/search": 100, // Locks the search page until they have 100 XP
};

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // 1. Always allow Next.js internal files, images, and Auth API routes
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Gate 1: Must be logged in to visit any page other than the homepage "/"
  if (!isLoggedIn && pathname !== "/") {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/";
    return NextResponse.redirect(loginUrl);
  }

  // 3. Gate 2: Check XP Requirement via Zustand's secure cookie
  for (const [route, minXP] of Object.entries(ROUTE_XP_RULES)) {
    // pathname.startsWith("/trees") automatically locks "/trees" AND "/trees/quiz"
    if (pathname.startsWith(route)) {
      const xpCookie = req.cookies.get("user_xp")?.value;
      const currentXP = xpCookie ? parseInt(xpCookie, 10) : 0;

      if (currentXP < minXP) {
        // Reject the URL jump and bounce back to homepage with an error flag
        const lockedUrl = req.nextUrl.clone();
        lockedUrl.pathname = "/";
        lockedUrl.searchParams.set("error", "locked");
        return NextResponse.redirect(lockedUrl);
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  // Monitors every route except static system files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

import { auth } from "@/auth";
import { NextResponse } from "next/server";

// 1. Centralized XP Requirements (Server-side)
const ROUTE_XP_RULES: Record<string, number> = {
  "/trees": 50,
  "/graphs": 100,
  "/dp": 150,
  "/quiz/trees": 50,
  "/quiz/graphs": 100,
};

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Always allow internal Auth routes & static assets
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Gate 1: Must be logged in to visit any page other than "/"
  if (!isLoggedIn && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Gate 2: Check XP Requirement via Cookie
  for (const [route, minXP] of Object.entries(ROUTE_XP_RULES)) {
    if (pathname.startsWith(route)) {
      const xpCookie = req.cookies.get("user_xp")?.value;
      const currentXP = xpCookie ? parseInt(xpCookie, 10) : 0;

      if (currentXP < minXP) {
        // Reject the URL jump and bounce back to homepage
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

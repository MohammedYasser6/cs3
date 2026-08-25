import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROUTE_XP_RULES: Record<string, number> = {
  "/arrays": 50,
  "/2d-arrays": 50,
  "/pointers": 100,
  "/linked-lists": 100,
  "/stacks-queues": 150,
  "/hash-tables": 150,
  "/recursion": 200,
  "/sorting": 200,
  "/trees": 250,
  "/graphs": 300,
  "/search": 100,
};

export async function proxy(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  if (!isLoggedIn && pathname !== "/") {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  for (const [route, minXP] of Object.entries(ROUTE_XP_RULES)) {
    if (pathname.startsWith(route)) {
      const xpCookie = request.cookies.get("user_xp")?.value;
      const currentXP = xpCookie ? parseInt(xpCookie, 10) : 0;

      if (currentXP < minXP) {
        const lockedUrl = request.nextUrl.clone();
        lockedUrl.pathname = "/";
        lockedUrl.searchParams.set("error", "locked");
        return NextResponse.redirect(lockedUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

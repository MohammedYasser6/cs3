import Link from "next/link";
import { auth, signIn } from "@/auth";
import ClientXPBar from "./ClientXPBar";
import UserDropdown from "../components/UserDropdown";
import { prisma } from "@/lib/prisma";
import StoreHydrator from "../components/StoreHydrator";

// Custom CS³ SVG Logo Component
const CSTubedLogo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300"
  >
    <defs>
      <linearGradient
        id="topFace"
        x1="20"
        y1="2"
        x2="20"
        y2="18"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#67e8f9" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
      <linearGradient
        id="leftFace"
        x1="4"
        y1="12"
        x2="20"
        y2="28"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient
        id="rightFace"
        x1="36"
        y1="12"
        x2="20"
        y2="28"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0ea5e9" />
        <stop offset="1" stopColor="#0369a1" />
      </linearGradient>
    </defs>
    <path
      d="M20 4L34 11L20 18L6 11L20 4Z"
      fill="url(#topFace)"
      stroke="#cffafe"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path
      d="M6 11V27L20 34V18L6 11Z"
      fill="url(#leftFace)"
      stroke="#bfdbfe"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path
      d="M34 11V27L20 34V18L34 11Z"
      fill="url(#rightFace)"
      stroke="#bae6fd"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="4" r="2" fill="#ffffff" />
    <circle cx="6" cy="11" r="2" fill="#ffffff" />
    <circle cx="34" cy="11" r="2" fill="#ffffff" />
    <circle cx="20" cy="18" r="2" fill="#ffffff" />
    <circle cx="20" cy="34" r="2" fill="#ffffff" />
  </svg>
);

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  // Ask Neon for this user's official XP
  let dbUser = null;
  if (user?.email) {
    dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { xp: true, completedModules: true },
    });
  }

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-50 shadow-md">
      {/* Mount the invisible hydrator if we found DB stats */}
      {dbUser && (
        <StoreHydrator dbXP={dbUser.xp} dbModules={dbUser.completedModules} />
      )}

      <div className="flex items-center gap-10">
        <Link href="/" className="group flex items-center gap-3 transition-all">
          <CSTubedLogo />
          <span className="text-2xl font-extrabold text-white tracking-tight">
            CS
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              ³
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-bold tracking-wide uppercase">
          <Link
            href="/"
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Profile
          </Link>
        </nav>
      </div>

      <div className="flex items-center">
        <ClientXPBar />

        <div className="flex items-center justify-center ml-4">
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all text-sm cursor-pointer"
              >
                Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import { UserCircle, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { csXp, aiXp, cyberXp, level } = useStore();

  const isAI = pathname.startsWith("/ai");
  const isCyber = pathname.startsWith("/cyber");
  const isCS = !isAI && !isCyber && pathname !== "/" && pathname !== "/profile";

  const activeXp = isAI ? aiXp : isCyber ? cyberXp : csXp;
  const progressPercent = Math.min((activeXp % 1000) / 10, 100);

  const themeColor = isAI
    ? "bg-purple-500"
    : isCyber
      ? "bg-emerald-500"
      : "bg-cyan-500";
  const textColor = isAI
    ? "text-purple-400"
    : isCyber
      ? "text-emerald-400"
      : "text-cyan-400";
  const trackName = isAI ? "AI XP" : isCyber ? "CYBER XP" : "CS XP";

  return (
    <header className="flex w-full items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur-md z-50">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-white"
        >
          CS<span className="text-cyan-500">³</span>
        </Link>

        <nav className="hidden space-x-1 md:flex">
          <Link
            href="/cs"
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${isCS ? "bg-cyan-900/30 text-cyan-400" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
          >
            Computer Science
          </Link>
          <Link
            href="/ai"
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${isAI ? "bg-purple-900/30 text-purple-400" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
          >
            Artificial Intelligence
          </Link>
          <Link
            href="/cyber"
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${isCyber ? "bg-emerald-900/30 text-emerald-400" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
          >
            Cybersecurity
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {(isCS || isAI || isCyber) && (
          <div className="hidden flex-col items-end md:flex">
            <div className="mb-1 flex w-40 justify-between text-xs font-bold">
              <span className={textColor}>
                {trackName}: {activeXp}
              </span>
              <span className="text-slate-400">LVL {level}</span>
            </div>
            <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full ${themeColor} transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {session ? (
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 p-1 pr-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-500"
          >
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={28}
                height={28}
                className="rounded-full"
              />
            ) : (
              <UserCircle className="h-7 w-7 text-slate-400" />
            )}
            <span className="hidden sm:inline">
              {session.user?.name?.split(" ")[0] || "Profile"}
            </span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
          >
            <LogIn className="h-4 w-4" /> Login
          </Link>
        )}
      </div>
    </header>
  );
}

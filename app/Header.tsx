"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Code2, Brain, Shield, Component, UserCircle } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { csXp, aiXp, cyberXp, sweXp, level } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/cs", label: "CS", icon: Code2, color: "text-blue-400", xp: csXp },
    {
      href: "/swe",
      label: "SWE",
      icon: Component,
      color: "text-amber-500",
      xp: sweXp,
    },
    {
      href: "/ai",
      label: "AI",
      icon: Brain,
      color: "text-purple-400",
      xp: aiXp,
    },
    {
      href: "/cyber",
      label: "Cyber",
      icon: Shield,
      color: "text-emerald-400",
      xp: cyberXp,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-8">
        {/* CS³ Logo (Larger) */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-500"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span className="font-black text-white text-3xl tracking-wider">
            CS<span className="text-cyan-500">³</span>
          </span>
        </Link>

        {/* Desktop Links (Larger Text & Icons) */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2.5 text-base font-bold transition-all ${
                  isActive
                    ? "text-white scale-105"
                    : "text-slate-400 hover:text-slate-200 hover:scale-105"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? link.color : "opacity-70"}`}
                />
                {link.label}
                <span
                  className={`ml-1.5 rounded bg-slate-800 px-2 py-0.5 text-xs ${link.color}`}
                >
                  {mounted ? link.xp || 0 : 0} XP
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right Side: Level & Profile */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-base font-bold text-white shadow-inner">
            <span className="text-slate-400">Level</span>
            <span className="text-cyan-400 text-lg">{mounted ? level : 1}</span>
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-full bg-slate-800 p-2 text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
          >
            <UserCircle className="h-7 w-7" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

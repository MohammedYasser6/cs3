"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Code2, Brain, Shield, Component } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Header() {
  const pathname = usePathname();

  // 1. Add a mounted state to prevent hydration mismatches from localStorage
  const [mounted, setMounted] = useState(false);

  const { csXp, aiXp, cyberXp, sweXp, level } = useStore();

  // 2. Set mounted to true after the first client-side render
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
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Restored CS³ Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span className="font-black text-white text-2xl tracking-wider">
            CS<span className="text-blue-500">³</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? link.color : "opacity-70"}`}
                />
                {link.label}
                <span
                  className={`ml-1 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] ${link.color}`}
                >
                  {/* 3. Render 0 on the server, and the real XP on the client */}
                  {mounted ? link.xp || 0 : 0} XP
                </span>
              </Link>
            );
          })}
        </div>

        {/* Global Level Indicator */}
        <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-sm font-bold text-white shadow-inner">
          <span className="text-slate-400">Level</span>
          <span className="text-cyan-400">{mounted ? level : 1}</span>
        </div>
      </div>
    </nav>
  );
}

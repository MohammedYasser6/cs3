"use client";

import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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
        <stop stopColor="#67e8f9" /> {/* Cyan 300 */}
        <stop offset="1" stopColor="#06b6d4" /> {/* Cyan 500 */}
      </linearGradient>
      <linearGradient
        id="leftFace"
        x1="4"
        y1="12"
        x2="20"
        y2="28"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3b82f6" /> {/* Blue 500 */}
        <stop offset="1" stopColor="#1d4ed8" /> {/* Blue 700 */}
      </linearGradient>
      <linearGradient
        id="rightFace"
        x1="36"
        y1="12"
        x2="20"
        y2="28"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0ea5e9" /> {/* Sky 500 */}
        <stop offset="1" stopColor="#0369a1" /> {/* Sky 700 */}
      </linearGradient>
    </defs>

    {/* Top Face */}
    <path
      d="M20 4L34 11L20 18L6 11L20 4Z"
      fill="url(#topFace)"
      stroke="#cffafe"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Left Face */}
    <path
      d="M6 11V27L20 34V18L6 11Z"
      fill="url(#leftFace)"
      stroke="#bfdbfe"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Right Face */}
    <path
      d="M34 11V27L20 34V18L34 11Z"
      fill="url(#rightFace)"
      stroke="#bae6fd"
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* Data Structure Nodes (Vertices) */}
    <circle cx="20" cy="4" r="2" fill="#ffffff" />
    <circle cx="6" cy="11" r="2" fill="#ffffff" />
    <circle cx="34" cy="11" r="2" fill="#ffffff" />
    <circle cx="20" cy="18" r="2" fill="#ffffff" />
    <circle cx="20" cy="34" r="2" fill="#ffffff" />
  </svg>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { xp, level, completedModules } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <body className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 selection:bg-blue-500 selection:text-white">
        {/* GLOBAL TOP NAVBAR */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-50 shadow-md">
          <div className="flex items-center gap-10">
            {/* LOGO & BRAND */}
            <Link
              href="/"
              className="group flex items-center gap-3 transition-all"
            >
              <CSTubedLogo />
              <span className="text-2xl font-extrabold text-white tracking-tight">
                CS
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  ³
                </span>
              </span>
            </Link>

            {/* QUICK LINKS */}
            <nav className="hidden md:flex gap-6 text-sm font-bold tracking-wide uppercase">
              <Link
                href="/"
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-slate-600 cursor-not-allowed">
                Curriculum
              </span>
            </nav>
          </div>

          {/* USER PROFILE & STATS */}
          {isMounted && (
            <div className="flex items-center gap-6">
              {/* Level & XP Bar */}
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Level {level}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
                      style={{ width: `${xp % 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-black text-cyan-400 w-12 text-right">
                    {xp} XP
                  </span>
                </div>
              </div>

              {/* Profile Avatar Link */}
              <Link
                href="/profile"
                className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg border-2 border-slate-800 hover:scale-105 hover:border-cyan-400 transition-all"
              >
                MY
              </Link>
            </div>
          )}
        </header>

        {/* DYNAMIC MAIN CONTENT AREA */}
        <main className="flex-1 relative overflow-hidden bg-slate-950">
          {children}
        </main>
      </body>
    </html>
  );
}

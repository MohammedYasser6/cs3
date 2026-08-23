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

  // Calculate global progress
  const totalAvailableModules = 9; // Adjust as we add more
  const progressPercentage = Math.round(
    (completedModules.length / totalAvailableModules) * 100,
  );

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <body className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 selection:bg-blue-500 selection:text-white">
        {/* GLOBAL TOP NAVBAR */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-50 shadow-md">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2 hover:opacity-80 transition"
            >
              <span className="text-blue-500">CS</span> 3D Vis
            </Link>

            {/* Quick Links (Can expand later) */}
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-slate-300 hover:text-white transition"
              >
                Dashboard
              </Link>
              <span className="text-slate-600 cursor-not-allowed">
                Curriculum Map
              </span>
            </nav>
          </div>

          {/* User Stats / Profile */}
          {isMounted && (
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Level {level}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                      style={{ width: `${xp % 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-blue-400">
                    {xp} XP
                  </span>
                </div>
              </div>

              {/* Profile Avatar Avatar */}
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg border-2 border-slate-800 cursor-pointer hover:scale-105 transition">
                MY
              </div>
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

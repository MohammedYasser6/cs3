"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useStore } from "../store/useStore";

export default function UserDropdown({
  user,
}: {
  user: { name?: string | null; image?: string | null; email?: string | null };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { resetProgress } = useStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    resetProgress(); // Reset client XP, level, and cookies
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:scale-105 transition-transform border-2 border-slate-800 hover:border-cyan-400 rounded-full flex items-center justify-center bg-slate-900 h-10 w-10 overflow-hidden cursor-pointer"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-bold text-cyan-400">
            {user.name?.charAt(0) || "U"}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col">
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/50">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors flex items-center gap-3"
          >
            👤 View Profile
          </Link>

          <div className="border-t border-slate-800" />

          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3 cursor-pointer"
          >
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  ShieldAlert,
  Database,
  User,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

export default function OWASPVisualizer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Checking for the classic SQLi payload: ' OR 1=1 --
  // (We use a simple regex to catch variations of it for the simulation)
  const isHacked =
    username.includes("'") &&
    (username.includes("OR") || username.includes("or")) &&
    username.includes("1=1");

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-rose-500 uppercase flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" /> SQL Injection Sandbox
          </h3>
          <p className="text-xs text-slate-400">
            Try to bypass the login by injecting SQL commands into the username
            field.
          </p>
        </div>
      </div>

      <div className="relative flex-1 bg-black p-8 flex flex-col lg:flex-row items-center justify-center overflow-hidden gap-8">
        {/* Left: Frontend Form */}
        <div className="flex-1 w-full max-w-sm bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl relative">
          <div className="absolute -top-3 left-6 bg-slate-900 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700 rounded">
            Frontend Login UI
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-2">
                <User className="h-3 w-3" /> Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                placeholder="Try: ' OR 1=1 --"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-2">
                <KeyRound className="h-3 w-3" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                placeholder="********"
              />
            </div>

            {isHacked ? (
              <div className="bg-emerald-950/50 border border-emerald-500 text-emerald-400 p-3 rounded flex items-center justify-center gap-2 font-bold text-sm animate-pulse">
                <CheckCircle2 className="h-4 w-4" /> Welcome, Admin
              </div>
            ) : (
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-3 rounded transition-colors">
                Login
              </button>
            )}
          </div>
        </div>

        {/* Right: Backend SQL Engine */}
        <div className="flex-1 w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl relative">
          <div className="absolute -top-3 left-6 bg-slate-900 px-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest border border-slate-700 rounded flex items-center gap-1">
            <Database className="h-3 w-3" /> Backend Database Execution
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Notice how your input is directly concatenated into the database
            query string without sanitization:
          </p>

          <div className="bg-black border border-slate-800 rounded p-4 font-mono text-sm leading-relaxed overflow-x-auto">
            <span className="text-purple-400">SELECT</span> *{" "}
            <span className="text-purple-400">FROM</span> users{" "}
            <span className="text-purple-400">WHERE</span>
            <br />
            &nbsp;&nbsp;username = <span className="text-amber-400">'</span>
            <span
              className={
                isHacked
                  ? "text-rose-400 font-bold bg-rose-950/40"
                  : "text-amber-400"
              }
            >
              {username || "..."}
            </span>
            <span className="text-amber-400">'</span> <br />
            &nbsp;&nbsp;<span className="text-purple-400">AND</span> password ={" "}
            <span className="text-amber-400">'</span>
            <span
              className={
                isHacked ? "text-slate-600 line-through" : "text-amber-400"
              }
            >
              {password || "..."}
            </span>
            <span className="text-amber-400">'</span>;
          </div>

          {isHacked && (
            <div className="mt-6 p-4 bg-rose-950/30 border border-rose-900/50 rounded animate-fade-in">
              <p className="text-xs font-bold text-rose-400 uppercase mb-2">
                Vulnerability Exploited!
              </p>
              <p className="text-xs text-rose-300/80">
                By injecting a single quote{" "}
                <code className="text-white">'</code>, you closed the username
                string early. Adding <code className="text-white">OR 1=1</code>{" "}
                made the entire WHERE clause mathematically True. The{" "}
                <code className="text-white">--</code> commented out the
                password check entirely. The database returned the first user
                (usually Admin) without needing a password.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

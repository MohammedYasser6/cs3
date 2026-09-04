"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

// 1. We move the actual logic into its own component
function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="p-8 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 w-96 text-center">
      <h1 className="text-2xl font-black mb-6 text-white tracking-wider">
        CS<span className="text-cyan-500">³</span>
      </h1>

      {error && (
        <div className="bg-rose-950/30 border border-rose-900/50 rounded-lg p-3 mb-6">
          <p className="text-rose-400 text-sm font-bold">
            {error === "locked"
              ? "You need more XP to access that area!"
              : "Error logging in. Please try again."}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-3 px-4 rounded-xl transition-all hover:scale-[1.02]"
        >
          Sign in with GitHub
        </button>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

// 2. The main page now just wraps the content in Suspense to prevent build crashes
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
      <Suspense
        fallback={
          <div className="text-cyan-500 font-mono text-sm font-bold animate-pulse">
            Initializing Secure Gateway...
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </div>
  );
}

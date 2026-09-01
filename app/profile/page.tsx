"use client";

import { useStore } from "@/store/useStore";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Code2, Brain, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { xp, csXp, aiXp, cyberXp, level, completedModules, resetSession } =
    useStore();

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    resetSession(); // Wipe local Zustand state and storage
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div className="flex items-center gap-6">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="Avatar"
                width={80}
                height={80}
                className="rounded-full border-2 border-cyan-500"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-900/50 border border-cyan-500 text-3xl font-black text-cyan-400">
                {level}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-slate-100">
                {session.user?.name || "Student"}
              </h1>
              <p className="text-slate-400">{session.user?.email}</p>
              <p className="mt-1 font-mono text-cyan-400">
                Global Rank: Level {level} ({xp} Total XP)
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-rose-900/50 bg-rose-900/20 px-4 py-2 text-sm font-semibold text-rose-400 transition-colors hover:bg-rose-900/40"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </header>

        <h2 className="mb-6 text-2xl font-bold text-slate-200">
          Track Milestones
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-cyan-900/30 bg-slate-900/50 p-6">
            <div className="mb-4 flex items-center gap-3 border-b border-slate-800 pb-4">
              <Code2 className="h-6 w-6 text-cyan-500" />
              <h3 className="text-lg font-bold">Software Eng.</h3>
            </div>
            <div className="mb-2 text-3xl font-black text-cyan-400">
              {csXp} XP
            </div>
            <p className="text-sm text-slate-400">Completed Modules</p>
          </div>

          <div className="rounded-xl border border-purple-900/30 bg-slate-900/50 p-6">
            <div className="mb-4 flex items-center gap-3 border-b border-slate-800 pb-4">
              <Brain className="h-6 w-6 text-purple-500" />
              <h3 className="text-lg font-bold">AI & Machine Learning</h3>
            </div>
            <div className="mb-2 text-3xl font-black text-purple-400">
              {aiXp} XP
            </div>
            <p className="text-sm text-slate-400">Completed Modules</p>
          </div>

          <div className="rounded-xl border border-emerald-900/30 bg-slate-900/50 p-6">
            <div className="mb-4 flex items-center gap-3 border-b border-slate-800 pb-4">
              <Shield className="h-6 w-6 text-emerald-500" />
              <h3 className="text-lg font-bold">Cybersecurity</h3>
            </div>
            <div className="mb-2 text-3xl font-black text-emerald-400">
              {cyberXp} XP
            </div>
            <p className="text-sm text-slate-400">Completed Modules</p>
          </div>
        </div>
      </div>
    </div>
  );
}

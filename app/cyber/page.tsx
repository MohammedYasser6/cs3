"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Lock, Unlock, Shield } from "lucide-react";

// Placeholder modules until you build the track out fully
const MODULES = [
  {
    id: "crypto",
    title: "01. Cryptography Basics",
    path: "/cyber/cryptography",
    reqXp: 0,
  },
  {
    id: "network",
    title: "02. Network Traffic Analysis",
    path: "/cyber/network-analysis",
    reqXp: 150,
  },
  {
    id: "owasp",
    title: "03. Web Vulnerabilities (OWASP)",
    path: "/cyber/owasp",
    reqXp: 350,
  },
  {
    id: "mobile",
    title: "04. Android & Mobile Security",
    path: "/cyber/mobile-sec",
    reqXp: 600,
  },
  { id: "iam", title: "05. Identity & JWTs", path: "/cyber/iam", reqXp: 850 },
  {
    id: "dfir",
    title: "06. Digital Forensics",
    path: "/cyber/forensics",
    reqXp: 1100,
  },
  {
    id: "pentest",
    title: "07. Penetration Testing",
    path: "/cyber/pentesting",
    reqXp: 1350,
  },
  {
    id: "malware",
    title: "08. Malware Analysis",
    path: "/cyber/malware",
    reqXp: 1650,
  },
  {
    id: "threat",
    title: "09. Threat Intel & Honeypots",
    path: "/cyber/threat-intel",
    reqXp: 1950,
  },
  {
    id: "mlcyber",
    title: "10. ML in Cybersecurity",
    path: "/cyber/ml-defense",
    reqXp: 2250,
  },
];

export default function CyberPage() {
  const [mounted, setMounted] = useState(false);
  const xp = useStore((state) => state.cyberXp) ?? 0;

  useEffect(() => setMounted(true), []);

  return (
    <div className="h-full w-full overflow-y-auto p-8 text-white bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-emerald-900/50 pb-6">
          <h1 className="text-4xl font-black text-emerald-400 flex items-center gap-4">
            <Shield className="h-10 w-10" /> Cybersecurity
          </h1>
          <p className="mt-2 text-slate-400">
            Networking, encryption, and defense.
          </p>
        </header>

        <div className="grid gap-4">
          {MODULES.map((mod) => {
            const isUnlocked = mounted && xp >= mod.reqXp;
            return (
              <div
                key={mod.id}
                className={`flex items-center justify-between rounded-xl border p-5 transition-all ${isUnlocked ? "border-emerald-800/50 bg-slate-900/50 hover:border-emerald-500" : "border-slate-800 bg-slate-950/50 opacity-60"}`}
              >
                <h2 className="text-lg font-bold text-slate-200">
                  {mod.title}
                </h2>
                {isUnlocked ? (
                  <Link
                    href={mod.path}
                    className="flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500"
                  >
                    <Unlock className="h-4 w-4" /> Enter
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-2 rounded bg-slate-800 px-4 py-2 text-sm font-bold text-slate-500"
                  >
                    <Lock className="h-4 w-4" /> {mod.reqXp} XP
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

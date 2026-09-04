"use client";

import Link from "next/link";
import MLCyberVisualizer from "@/components/canvas/MLCyberVisualizer";

export default function MLDefensePage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-cyan-500 font-bold tracking-widest uppercase text-sm mb-1">
            Cyber Track • Level 10
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Machine Learning Defense
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                Cybersecurity is an arms race. As attackers use automation to
                generate thousands of new malware variants a day, human-written
                firewall rules can no longer keep up. The defense must also rely
                on Artificial Intelligence.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-amber-400">
                Signature-Based Detection (The Past)
              </h3>
              <p className="text-xs text-slate-400">
                Traditional antivirus and firewalls use "signatures"—a giant
                database of known bad strings or file hashes. If a file's hash
                matches the database, it's blocked.
              </p>
              <p className="text-xs text-rose-400 mt-2 border-t border-slate-800 pt-2 font-bold">
                The Flaw: A hacker can simply change a single byte in their
                malware. The hash changes entirely, bypassing the signature
                database. This is how Zero-Days succeed.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-cyan-400">
                Behavioral Anomaly Detection (The Present)
              </h3>
              <p className="text-xs text-slate-400">
                Instead of looking for specific bad strings, we train a Machine
                Learning model on millions of normal network logs. The model
                learns what "normal" looks like.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                If a request arrives that behaves wildly differently (e.g.,
                trying to execute shellcode in a URL parameter), the ML model
                flags it as an anomaly and blocks it—
                <strong className="text-white">
                  even if it has never seen that specific attack before.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <MLCyberVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Next-Gen WAF Simulation
          </p>
          <Link
            href="/cyber/ml-defense/quiz"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Final Assessment (+300 Cyber XP)
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import ThreatIntelVisualizer from "@/components/canvas/ThreatIntelVisualizer";

export default function ThreatIntelPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
            Cyber Track • Level 9
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Threat Intelligence
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                Passive defense (like setting up a firewall and hoping for the
                best) is no longer enough. Modern security operations centers
                (SOCs) use{" "}
                <strong className="text-emerald-400">Active Defense</strong> to
                hunt for threats before they breach the network.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-purple-400">Honeypots</h3>
              <p className="text-xs text-slate-400 mb-2">
                A Honeypot is a decoy server deliberately left vulnerable. It
                contains no real data and no legitimate user should ever connect
                to it.
              </p>
              <p className="text-xs text-slate-400">
                Therefore,{" "}
                <strong className="text-rose-400">
                  any connection to a honeypot is 100% guaranteed to be an
                  attacker
                </strong>
                . Defenders use honeypots to study new attack techniques and
                capture attacker IP addresses.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-purple-400">
                Indicators of Compromise (IoCs)
              </h3>
              <p className="text-xs text-slate-400">
                When a honeypot is attacked, we extract IoCs (IP addresses,
                malware hashes, malicious domain names). We feed these IoCs into
                a{" "}
                <strong className="text-white">
                  SIEM (Security Information and Event Management)
                </strong>{" "}
                system, which automatically updates the global corporate
                firewall to block those IPs everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <ThreatIntelVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Honeypot SIEM Dashboard
          </p>
          <Link
            href="/cyber/threat-intel/quiz"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+300 Cyber XP)
          </Link>
        </div>
      </div>
    </section>
  );
}

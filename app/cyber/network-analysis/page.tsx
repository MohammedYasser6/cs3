"use client";

import Link from "next/link";
import NetworkVisualizer from "@/components/canvas/NetworkVisualizer";

export default function NetworkAnalysisPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
            Cyber Track • Level 2
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Network Traffic
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                Networks are noisy. Every web page, image, and login attempt is broken down into small chunks of data called <strong className="text-emerald-400">Packets</strong>, which fly across routers to reach their destination.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-slate-100">Packet Sniffing</h3>
              <p className="text-xs text-slate-400">
                Network interfaces normally ignore packets not addressed to them. However, tools like Wireshark put network cards into <strong className="text-white">Promiscuous Mode</strong>, allowing an attacker to quietly capture and read all traffic passing through the local network (Man-in-the-Middle).
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-rose-400">The Danger of HTTP (Port 80)</h3>
              <p className="text-xs text-slate-400 mb-2">
                Standard HTTP transmits data in completely raw, readable plaintext. If you log into a website via HTTP on a public café WiFi, a hacker sniffing the network will instantly see your password.
              </p>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-emerald-400">The Defense: HTTPS (Port 443)</h3>
              <p className="text-xs text-slate-400">
                HTTPS adds an SSL/TLS encryption layer on top of HTTP. An attacker sniffing an HTTPS connection will still intercept the packets, but the payload will be unreadable mathematical gibberish.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <NetworkVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">Live Wireshark Simulation</p>
          <Link href="/cyber/network-analysis/quiz" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md">
            Take Assessment (+200 Cyber XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
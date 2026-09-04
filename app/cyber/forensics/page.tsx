"use client";

import Link from "next/link";
import DFIRVisualizer from "@/components/canvas/DFIRVisualizer";

export default function ForensicsPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
            Cyber Track • Level 6
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Digital Forensics
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                Digital Forensics and Incident Response (DFIR) is the science of
                investigating cybercrimes, identifying how a breach occurred,
                and recovering compromised data—often from systems the attacker
                tried to wipe.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-emerald-400">
                The "Deletion" Myth
              </h3>
              <p className="text-xs text-slate-400">
                When you empty the recycling bin on a computer, the files are
                not erased. The OS simply deletes the <em>pointer</em> (the map)
                to the file and marks that sector of the hard drive as
                "available to be overwritten." Until new data is saved directly
                on top of it, the raw binary data is still sitting there.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-emerald-400">
                File Carving & Magic Bytes
              </h3>
              <p className="text-xs text-slate-400 mb-2">
                If the file map is destroyed, how do we find files? We look for{" "}
                <strong className="text-white">Magic Bytes</strong>.
              </p>
              <ul className="list-disc space-y-2 pl-4 text-xs text-slate-400">
                <li>
                  Every file type has a unique hexadecimal signature at the very
                  beginning of its code.
                </li>
                <li>
                  For example, all PDF files begin with{" "}
                  <code className="text-white">25 50 44 46</code> (which
                  translates to `%PDF` in ASCII).
                </li>
                <li>
                  Forensic tools (like Autopsy or The Sleuth Kit) scan the raw
                  disk sector-by-sector, carving out files whenever they spot
                  these magic signatures.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <DFIRVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Hexadecimal Disk Inspector
          </p>
          <Link
            href="/cyber/forensics/quiz"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+250 Cyber XP)
          </Link>
        </div>
      </div>
    </section>
  );
}

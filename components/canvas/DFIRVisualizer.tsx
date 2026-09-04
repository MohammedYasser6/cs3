"use client";

import { useState } from "react";
import { HardDrive, FileSearch, CheckCircle2, ScanSearch } from "lucide-react";

export default function DFIRVisualizer() {
  const [scanned, setScanned] = useState(false);
  const [flagFound, setFlagFound] = useState(false);

  // Simulated Hex Dump. The flag is hidden at address 0x00000040.
  const hexDump = [
    {
      addr: "00000000",
      hex: "89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52",
      ascii: ".PNG........IHDR",
    },
    {
      addr: "00000010",
      hex: "00 00 01 00 00 00 01 00 08 06 00 00 00 5C 72 A8",
      ascii: ".............\\r.",
    },
    {
      addr: "00000020",
      hex: "66 00 00 00 01 73 52 47 42 00 AE CE 1C E9 00 00",
      ascii: "f....sRGB.......",
    },
    {
      addr: "00000030",
      hex: "00 04 67 41 4D 41 00 00 B1 8F 0B FC 61 05 00 00",
      ascii: "..gAMA......a...",
    },
    {
      addr: "00000040",
      hex: "43 59 42 45 52 7B 44 61 74 61 5F 43 61 72 76 65",
      ascii: "CYBER{Data_Carve",
      isFlag: true,
    },
    {
      addr: "00000050",
      hex: "7D 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
      ascii: "}...............",
    },
    {
      addr: "00000060",
      hex: "00 00 00 20 63 48 52 4D 00 00 7A 26 00 00 80 84",
      ascii: "... cHRM..z&....",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-emerald-500 uppercase flex items-center gap-2">
            <HardDrive className="h-4 w-4" /> Hex Editor: Disk Sector 4A
          </h3>
          <p className="text-xs text-slate-400">
            Scan the raw memory of a "deleted" file to carve out hidden data.
          </p>
        </div>

        <button
          onClick={() => setScanned(true)}
          disabled={scanned}
          className="flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
        >
          <ScanSearch className="h-4 w-4" /> Scan Unallocated Space
        </button>
      </div>

      <div className="relative flex-1 bg-black p-8 flex flex-col items-center justify-center overflow-hidden gap-8">
        <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative">
          <div className="absolute -top-3 left-6 bg-slate-900 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700 rounded flex items-center gap-1">
            <FileSearch className="h-3 w-3" /> Raw Hexadecimal View
          </div>

          <div className="flex flex-col gap-1 font-mono text-xs md:text-sm">
            {/* Header */}
            <div className="flex items-center text-slate-500 border-b border-slate-800 pb-2 mb-2 font-bold px-2">
              <span className="w-24">Address</span>
              <span className="flex-1 tracking-widest">
                00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F
              </span>
              <span className="w-48 text-right">ASCII Decode</span>
            </div>

            {/* Hex Dump Body */}
            {hexDump.map((row, i) => {
              // Hide everything until scanned, then let user click the flag
              const isRevealed = scanned;
              const isHighlight = row.isFlag && flagFound;

              return (
                <div
                  key={i}
                  className={`flex items-center px-2 py-1 rounded transition-colors ${
                    isHighlight
                      ? "bg-emerald-950/60 border border-emerald-900"
                      : row.isFlag && isRevealed && !flagFound
                        ? "hover:bg-slate-800 cursor-pointer"
                        : ""
                  }`}
                  onClick={() => {
                    if (row.isFlag && isRevealed) setFlagFound(true);
                  }}
                >
                  <span className="w-24 text-slate-500">{row.addr}</span>
                  <span
                    className={`flex-1 tracking-widest ${isHighlight ? "text-emerald-400 font-bold" : isRevealed ? "text-slate-300" : "text-slate-800 blur-[2px]"}`}
                  >
                    {row.hex}
                  </span>
                  <span
                    className={`w-48 text-right tracking-[0.2em] ${isHighlight ? "text-emerald-400 font-bold" : isRevealed ? "text-amber-400/80" : "text-slate-800 blur-[2px]"}`}
                  >
                    {row.ascii}
                  </span>
                </div>
              );
            })}
          </div>

          {flagFound && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-950/80 border border-emerald-500 text-emerald-400 px-6 py-3 rounded-lg flex items-center gap-3 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-slide-up backdrop-blur-sm z-20">
              <CheckCircle2 className="h-5 w-5" /> Flag Recovered:
              CYBER&#123;Data_Carve&#125;
            </div>
          )}
        </div>

        <div className="max-w-4xl w-full flex gap-4 text-xs text-slate-400">
          <div className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <strong className="text-emerald-400 block mb-1">
              File Signatures (Magic Bytes)
            </strong>
            Notice the first row starts with{" "}
            <code className="text-white">89 50 4E 47</code>. This is the
            hexadecimal signature for a PNG image. The operating system uses
            these bytes, not the file extension, to determine file types.
          </div>
          <div className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <strong className="text-emerald-400 block mb-1">
              Data Carving
            </strong>
            Even though this file was "deleted", the OS only deleted the pointer
            to it. The raw bytes remained on the disk. By scanning the
            unallocated space, we recovered hidden text.
          </div>
        </div>
      </div>
    </div>
  );
}

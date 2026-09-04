"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Wifi,
  Server,
  Laptop,
  Search,
} from "lucide-react";

type Packet = {
  id: number;
  protocol: "HTTP" | "HTTPS";
  source: string;
  payload: string;
  status: "flowing" | "intercepted";
};

export default function NetworkVisualizer() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);

  // Auto-generate network traffic
  useEffect(() => {
    const interval = setInterval(() => {
      const isSecure = Math.random() > 0.5;
      const newPacket: Packet = {
        id: Date.now(),
        protocol: isSecure ? "HTTPS" : "HTTP",
        source: `192.168.1.${Math.floor(Math.random() * 255)}`,
        payload: isSecure
          ? "U2FsdGVkX1+v8O/xZ..." // Gibberish
          : `POST /login user=admin pass=P@ssw0rd${Math.floor(Math.random() * 100)}`, // Plaintext
        status: "flowing",
      };

      setPackets((prev) => [...prev.slice(-4), newPacket]); // Keep last 5
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const intercept = (id: number) => {
    const packet = packets.find((p) => p.id === id);
    if (packet) {
      setSelectedPacket(packet);
      setPackets((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "intercepted" } : p)),
      );
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-emerald-500 uppercase flex items-center gap-2">
            <Activity className="h-4 w-4" /> Packet Sniffer (Wireshark Sim)
          </h3>
          <p className="text-xs text-slate-400">
            Intercept live packets to inspect their payloads.
          </p>
        </div>
      </div>

      <div className="relative flex-1 bg-black p-8 flex flex-col gap-6 overflow-hidden">
        {/* Network Diagram */}
        <div className="flex items-center justify-between px-12 py-8 border-b border-slate-800">
          <div className="flex flex-col items-center gap-2">
            <Laptop className="h-10 w-10 text-slate-400" />
            <span className="text-xs font-mono text-slate-500">Client Net</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative h-10 mx-8">
            <div className="absolute w-full h-px bg-slate-700 top-1/2 -translate-y-1/2" />
            <div className="absolute bg-slate-900 border border-emerald-500 text-emerald-400 px-3 py-1 rounded text-[10px] font-bold tracking-widest flex items-center gap-2 z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Search className="h-3 w-3" /> Promiscuous Mode (MitM)
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Server className="h-10 w-10 text-slate-400" />
            <span className="text-xs font-mono text-slate-500">Web Server</span>
          </div>
        </div>

        <div className="flex flex-1 gap-6 min-h-[200px]">
          {/* Live Traffic Log */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            <div className="bg-slate-950 p-2 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-500 grid grid-cols-3 px-4">
              <span>Protocol</span>
              <span>Source IP</span>
              <span>Action</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {packets.map((p) => (
                <div
                  key={p.id}
                  className={`grid grid-cols-3 items-center p-2 rounded text-xs font-mono border ${p.protocol === "HTTP" ? "bg-rose-950/20 border-rose-900/50 text-rose-300" : "bg-emerald-950/20 border-emerald-900/50 text-emerald-300"}`}
                >
                  <span className="flex items-center gap-2 font-bold">
                    {p.protocol === "HTTP" ? (
                      <ShieldAlert className="h-3 w-3 text-rose-500" />
                    ) : (
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    )}
                    {p.protocol}
                  </span>
                  <span>{p.source}</span>
                  <button
                    onClick={() => intercept(p.id)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded transition-colors w-fit"
                  >
                    Intercept
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Packet Inspector */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col">
            <div className="bg-slate-950 p-3 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Wifi className="h-4 w-4" /> Packet Inspector
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              {selectedPacket ? (
                <div className="animate-fade-in space-y-4">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">
                      Decoded Payload (Hex/ASCII)
                    </span>
                    <div
                      className={`mt-2 p-4 rounded border font-mono text-sm break-all shadow-inner ${selectedPacket.protocol === "HTTP" ? "bg-rose-950/40 border-rose-500/50 text-rose-400" : "bg-emerald-950/40 border-emerald-500/50 text-emerald-400"}`}
                    >
                      {selectedPacket.payload}
                    </div>
                  </div>
                  {selectedPacket.protocol === "HTTP" ? (
                    <p className="text-xs text-rose-400 bg-rose-950/20 p-2 rounded border border-rose-900/50">
                      <strong>CRITICAL VULNERABILITY:</strong> Data is sent in
                      plaintext over port 80. Credentials compromised.
                    </p>
                  ) : (
                    <p className="text-xs text-emerald-400 bg-emerald-950/20 p-2 rounded border border-emerald-900/50">
                      <strong>SECURE:</strong> TLS handshake established. Data
                      is encrypted and useless to sniffers.
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center text-slate-500 text-xs font-mono">
                  No packet selected.
                  <br />
                  Click "Intercept" on the live traffic log.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

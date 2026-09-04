"use client";

import { useState, useEffect } from "react";
import {
  Server,
  Activity,
  ShieldAlert,
  Globe,
  ShieldCheck,
  Database,
  Ban,
} from "lucide-react";

type AttackLog = {
  id: number;
  type: string;
  ip: string;
  payload: string;
  status: "active" | "blocked";
};

export default function ThreatIntelVisualizer() {
  const [honeypotActive, setHoneypotActive] = useState(false);
  const [logs, setLogs] = useState<AttackLog[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<string[]>([]);

  useEffect(() => {
    if (!honeypotActive) return;

    const interval = setInterval(() => {
      const isSSH = Math.random() > 0.5;
      const attackIP = `${Math.floor(Math.random() * 255)}.14.92.${Math.floor(Math.random() * 255)}`;

      // If the IP is already blocked in our SIEM/Firewall, don't let it attack again
      if (blockedIPs.includes(attackIP)) return;

      const newLog: AttackLog = {
        id: Date.now(),
        type: isSSH ? "SSH Brute Force" : "Apache Struts Exploit",
        ip: attackIP,
        payload: isSSH ? "root:admin123" : "CVE-2017-5638",
        status: "active",
      };

      setLogs((prev) => [newLog, ...prev].slice(0, 5));
    }, 2500);

    return () => clearInterval(interval);
  }, [honeypotActive, blockedIPs]);

  const blockIP = (ip: string) => {
    setBlockedIPs((prev) => [...prev, ip]);
    setLogs((prev) =>
      prev.map((log) => (log.ip === ip ? { ...log, status: "blocked" } : log)),
    );
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-purple-500 uppercase flex items-center gap-2">
            <Globe className="h-4 w-4" /> Active Defense Dashboard
          </h3>
          <p className="text-xs text-slate-400">
            Deploy a honeypot to capture Threat Intelligence and update the
            Firewall.
          </p>
        </div>

        <button
          onClick={() => setHoneypotActive(!honeypotActive)}
          className={`flex items-center gap-2 rounded px-4 py-2 text-xs font-bold transition-all ${
            honeypotActive
              ? "bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}
        >
          <Activity className="h-4 w-4" />{" "}
          {honeypotActive ? "Take Honeypot Offline" : "Deploy Honeypot to DMZ"}
        </button>
      </div>

      <div className="relative flex-1 bg-black p-8 flex flex-col md:flex-row gap-8 overflow-hidden">
        {/* Left: Honeypot Server */}
        <div className="flex-1 w-full max-w-sm bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative flex flex-col">
          <div className="absolute -top-3 left-6 bg-slate-900 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700 rounded flex items-center gap-1">
            <Server className="h-3 w-3" /> Fake Vulnerable Server
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div
              className={`relative h-32 w-32 rounded-full border-4 flex items-center justify-center transition-colors duration-500 ${
                honeypotActive
                  ? "border-blue-500 bg-blue-950/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                  : "border-slate-700 bg-slate-900"
              }`}
            >
              <Server
                className={`h-12 w-12 ${honeypotActive ? "text-blue-400" : "text-slate-600"}`}
              />
              {honeypotActive && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full animate-ping" />
              )}
            </div>
            <p className="text-xs font-mono text-slate-400 mt-6 text-center">
              {honeypotActive
                ? "Listening for attacks on all ports. Presenting fake Apache signature."
                : "System Offline"}
            </p>
          </div>
        </div>

        {/* Right: SIEM / Intel Feed */}
        <div className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative flex flex-col">
          <div className="absolute -top-3 left-6 bg-slate-900 px-2 text-[10px] font-bold text-purple-400 uppercase tracking-widest border border-slate-700 rounded flex items-center gap-1">
            <Database className="h-3 w-3" /> SIEM Intel Feed
          </div>

          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-500">
              Live Attack Logs
            </span>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/50 px-2 py-1 rounded border border-purple-900/50">
              Blocked IPs: {blockedIPs.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
            {logs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-slate-600 font-mono italic">
                Awaiting telemetry data...
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded-lg border font-mono text-xs flex items-center justify-between animate-slide-up ${
                    log.status === "blocked"
                      ? "bg-slate-950/50 border-slate-800 text-slate-600"
                      : "bg-rose-950/20 border-rose-900/50 text-rose-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {log.status === "blocked" ? (
                        <ShieldCheck className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <ShieldAlert className="h-3 w-3 text-rose-500" />
                      )}
                      <span className="font-bold text-white">{log.ip}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      [{log.type}] Payload: {log.payload}
                    </div>
                  </div>

                  {log.status === "active" && (
                    <button
                      onClick={() => blockIP(log.ip)}
                      className="bg-rose-900/50 hover:bg-rose-900 border border-rose-700 text-rose-200 px-3 py-1.5 rounded flex items-center gap-2 transition-colors"
                    >
                      <Ban className="h-3 w-3" /> Block IP
                    </button>
                  )}
                  {log.status === "blocked" && (
                    <span className="text-[10px] font-bold text-emerald-500 px-3 py-1 border border-emerald-900 bg-emerald-950/30 rounded">
                      MITIGATED
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

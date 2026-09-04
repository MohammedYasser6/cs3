"use client";

import { useState } from "react";
import {
  Brain,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Send,
  Server,
  FileWarning,
} from "lucide-react";

type RequestType = "normal" | "signature" | "zeroday";
type ScanStage = "idle" | "incoming" | "rules" | "ml" | "resolved";

export default function MLCyberVisualizer() {
  const [stage, setStage] = useState<ScanStage>("idle");
  const [currentReq, setCurrentReq] = useState<RequestType | null>(null);
  const [anomalyScore, setAnomalyScore] = useState(0);

  const sendTraffic = (type: RequestType) => {
    if (stage !== "idle" && stage !== "resolved") return;

    setCurrentReq(type);
    setStage("incoming");
    setAnomalyScore(0);

    // Pipeline Animation Sequence
    setTimeout(() => setStage("rules"), 800);

    setTimeout(() => {
      if (type === "signature") {
        setStage("resolved"); // Blocked at rule level
      } else {
        setStage("ml");
        // Animate the ML score calculating
        let score = 0;
        const targetScore = type === "normal" ? 12 : 94;
        const interval = setInterval(() => {
          score += 4;
          if (score >= targetScore) {
            score = targetScore;
            clearInterval(interval);
            setTimeout(() => setStage("resolved"), 500);
          }
          setAnomalyScore(score);
        }, 30);
      }
    }, 2000);
  };

  const getReqDetails = () => {
    switch (currentReq) {
      case "normal":
        return {
          payload: "GET /dashboard/user?id=402",
          color: "text-emerald-400",
        };
      case "signature":
        return { payload: "POST /login ' OR 1=1 --", color: "text-amber-400" };
      case "zeroday":
        return {
          payload: "GET /api?data=\\x00\\x89\\xff\\xeb\\x19",
          color: "text-rose-400",
        };
      default:
        return { payload: "Waiting for traffic...", color: "text-slate-500" };
    }
  };

  const req = getReqDetails();

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-cyan-500 uppercase flex items-center gap-2">
            <Brain className="h-4 w-4" /> Next-Gen AI Firewall (WAF)
          </h3>
          <p className="text-xs text-slate-400">
            Test how the ML engine detects Zero-Day exploits that bypass
            standard rules.
          </p>
        </div>
      </div>

      <div className="relative flex-1 bg-black p-8 flex flex-col justify-center overflow-hidden gap-10">
        {/* Top Controls */}
        <div className="flex flex-wrap justify-center gap-4 z-20">
          <button
            onClick={() => sendTraffic("normal")}
            disabled={stage !== "idle" && stage !== "resolved"}
            className="flex items-center gap-2 rounded-lg bg-slate-800 border border-emerald-900/50 hover:bg-slate-700 px-4 py-2 text-xs font-bold transition-all shadow-lg disabled:opacity-50"
          >
            <Send className="h-4 w-4 text-emerald-400" /> Send Normal Traffic
          </button>
          <button
            onClick={() => sendTraffic("signature")}
            disabled={stage !== "idle" && stage !== "resolved"}
            className="flex items-center gap-2 rounded-lg bg-slate-800 border border-amber-900/50 hover:bg-slate-700 px-4 py-2 text-xs font-bold transition-all shadow-lg disabled:opacity-50"
          >
            <FileWarning className="h-4 w-4 text-amber-400" /> Send Known
            Exploit (SQLi)
          </button>
          <button
            onClick={() => sendTraffic("zeroday")}
            disabled={stage !== "idle" && stage !== "resolved"}
            className="flex items-center gap-2 rounded-lg bg-slate-800 border border-rose-900/50 hover:bg-slate-700 px-4 py-2 text-xs font-bold transition-all shadow-lg shadow-[0_0_15px_rgba(244,63,94,0.2)] disabled:opacity-50"
          >
            <ShieldAlert className="h-4 w-4 text-rose-500" /> Send Zero-Day
            Exploit
          </button>
        </div>

        {/* Pipeline Visualizer */}
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 -z-10 hidden md:block" />

          {/* Incoming Packet Node */}
          <div
            className={`w-full md:w-64 bg-slate-900 border-2 rounded-xl p-4 transition-all duration-300 ${stage === "incoming" ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105" : "border-slate-800"}`}
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              1. Ingress Traffic
            </div>
            <div
              className={`font-mono text-xs break-all p-2 rounded bg-black border border-slate-800 h-16 flex items-center justify-center text-center ${req.color}`}
            >
              {req.payload}
            </div>
          </div>

          {/* Rule Engine Node (Traditional WAF) */}
          <div
            className={`w-full md:w-64 bg-slate-900 border-2 rounded-xl p-4 transition-all duration-300 ${stage === "rules" ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105" : "border-slate-800"}`}
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              2. Signature WAF
            </div>
            <div className="h-16 flex items-center justify-center">
              {stage === "rules" ? (
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 animate-pulse">
                  <Activity className="h-4 w-4" /> Scanning Signatures...
                </div>
              ) : stage === "resolved" && currentReq === "signature" ? (
                <div className="flex items-center gap-2 text-xs font-bold text-rose-500 bg-rose-950/50 p-2 rounded border border-rose-900">
                  <ShieldAlert className="h-4 w-4" /> SQLi Signature Match!
                  BLOCKED
                </div>
              ) : (stage === "ml" || stage === "resolved") &&
                currentReq !== null ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-950/30 p-2 rounded border border-emerald-900/50">
                  <ShieldCheck className="h-4 w-4" /> No Match. ALLOWED
                </div>
              ) : (
                <span className="text-xs text-slate-600 font-mono">Idle</span>
              )}
            </div>
          </div>

          {/* ML Anomaly Engine Node */}
          <div
            className={`w-full md:w-72 bg-slate-900 border-2 rounded-xl p-4 transition-all duration-300 ${stage === "ml" ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] scale-110" : "border-slate-800"}`}
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Brain className="h-3 w-3 text-purple-500" /> 3. ML Anomaly Engine
            </div>
            <div className="h-16 flex flex-col justify-center gap-2">
              {(stage === "ml" || stage === "resolved") &&
              currentReq !== "signature" &&
              currentReq !== null ? (
                <>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Behavior Variance:</span>
                    <span
                      className={
                        anomalyScore > 80
                          ? "text-rose-400 font-bold"
                          : "text-emerald-400 font-bold"
                      }
                    >
                      {anomalyScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-75 ${anomalyScore > 80 ? "bg-rose-500" : "bg-purple-500"}`}
                      style={{ width: `${anomalyScore}%` }}
                    />
                  </div>
                </>
              ) : currentReq === "signature" && stage === "resolved" ? (
                <span className="text-xs text-slate-600 font-mono text-center">
                  Bypassed (Blocked earlier)
                </span>
              ) : (
                <span className="text-xs text-slate-600 font-mono text-center">
                  Idle
                </span>
              )}
            </div>
          </div>

          {/* Final Server Destination */}
          <div
            className={`w-full md:w-48 bg-slate-900 border-2 rounded-xl p-4 transition-all duration-300 ${stage === "resolved" ? (currentReq === "normal" ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "border-rose-500") : "border-slate-800"}`}
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">
              4. App Server
            </div>
            <div className="h-16 flex items-center justify-center">
              {stage === "resolved" ? (
                currentReq === "normal" ? (
                  <div className="flex flex-col items-center text-emerald-400">
                    <Server className="h-6 w-6 mb-1" />
                    <span className="text-xs font-bold">200 OK</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-rose-500">
                    <ShieldAlert className="h-6 w-6 mb-1" />
                    <span className="text-xs font-bold">403 Forbidden</span>
                  </div>
                )
              ) : (
                <Server className="h-6 w-6 text-slate-600" />
              )}
            </div>
          </div>
        </div>

        {/* Conclusion Output */}
        <div className="h-20 w-full max-w-4xl mx-auto flex items-center justify-center text-sm">
          {stage === "resolved" && currentReq === "signature" && (
            <p className="bg-amber-950/30 text-amber-300 border border-amber-900/50 p-4 rounded-lg animate-slide-up text-center w-full">
              The exploit was a known SQL Injection. The traditional Signature
              WAF matched the string{" "}
              <code className="font-mono text-amber-500">' OR 1=1</code> in its
              database and dropped the packet instantly.
            </p>
          )}
          {stage === "resolved" && currentReq === "zeroday" && (
            <p className="bg-rose-950/30 text-rose-300 border border-rose-900/50 p-4 rounded-lg animate-slide-up text-center w-full">
              This is a Zero-Day (never-before-seen) exploit. It bypassed the
              Signature WAF because no rule exists for it. However, the{" "}
              <strong className="text-rose-400">ML Anomaly Engine</strong>{" "}
              detected a 94% deviation from normal user behavior (highly unusual
              byte sequences) and blocked it.
            </p>
          )}
          {stage === "resolved" && currentReq === "normal" && (
            <p className="bg-emerald-950/30 text-emerald-300 border border-emerald-900/50 p-4 rounded-lg animate-slide-up text-center w-full">
              Normal user traffic. It passed the Signature rules, and the ML
              engine recognized the structure as standard behavior (12%
              variance). Request processed successfully.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

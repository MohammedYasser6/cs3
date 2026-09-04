"use client";

import Link from "next/link";
import OWASPVisualizer from "@/components/canvas/OWASPVisualizer";

export default function OWASPPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
            Cyber Track • Level 3
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Web Vulnerabilities
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                The Open Worldwide Application Security Project (OWASP)
                maintains the "Top 10" list of the most critical security risks
                to web applications. Most of these stem from a single cardinal
                sin:{" "}
                <strong className="text-rose-400">trusting user input</strong>.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-rose-400">
                SQL Injection (SQLi)
              </h3>
              <p className="text-xs text-slate-400 mb-2">
                Occurs when backend code concatenates raw user text directly
                into a database query. A hacker can insert SQL syntax (like{" "}
                <code className="text-white">OR 1=1</code>) into a login box to
                alter the query's structure and bypass authentication entirely.
              </p>
              <p className="text-xs text-emerald-400 mt-2 border-t border-slate-800 pt-2">
                <strong>Defense:</strong> Never concatenate strings. Always use
                Prepared Statements (Parameterized Queries), which treat input
                strictly as data, never as executable code.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-rose-400">
                Cross-Site Scripting (XSS)
              </h3>
              <p className="text-xs text-slate-400">
                Instead of attacking the database, XSS attacks other users. The
                hacker submits malicious JavaScript into a comment field. When
                another user views that comment, their browser unwittingly
                executes the script, which steals their session cookies and
                sends them to the hacker.
              </p>
              <p className="text-xs text-emerald-400 mt-2 border-t border-slate-800 pt-2">
                <strong>Defense:</strong> Input sanitization and Output Encoding
                (converting <code className="text-white">&lt;script&gt;</code>{" "}
                to safe HTML entities like{" "}
                <code className="text-white">&amp;lt;script&amp;gt;</code>).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <OWASPVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            SQL Injection Sandbox
          </p>
          <Link
            href="/cyber/owasp/quiz"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+250 Cyber XP)
          </Link>
        </div>
      </div>
    </section>
  );
}

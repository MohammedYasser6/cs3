"use client";

import Link from "next/link";
import IAMVisualizer from "@/components/canvas/IAMVisualizer";

export default function IAMPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
            Cyber Track • Level 5
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Identity & Access
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                Knowing exactly who a user is, and what they are allowed to do,
                is the foundation of backend security. This is broken down into
                two distinct phases: AuthN and AuthZ.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-emerald-400">
                AuthN vs AuthZ
              </h3>
              <ul className="list-disc space-y-2 pl-4 text-xs text-slate-400">
                <li>
                  <strong className="text-white">
                    Authentication (AuthN):
                  </strong>{" "}
                  Proving <em>who</em> you are (e.g., logging in with a password
                  or Biometrics).
                </li>
                <li>
                  <strong className="text-white">Authorization (AuthZ):</strong>{" "}
                  Verifying <em>what</em> you are allowed to do (e.g., stopping
                  a regular user from accessing the admin dashboard).
                </li>
              </ul>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-rose-400">
                The Anatomy of a JWT
              </h3>
              <p className="text-xs text-slate-400 mb-2">
                JSON Web Tokens (JWT) are the modern standard for stateless
                authentication. A JWT has three parts separated by dots:
              </p>
              <ol className="list-decimal space-y-2 pl-4 text-xs text-slate-400">
                <li>
                  <strong className="text-rose-400">Header:</strong> Declares
                  the algorithm used (e.g., HS256).
                </li>
                <li>
                  <strong className="text-purple-400">Payload:</strong> The data
                  (User ID, Role, Expiration).{" "}
                  <strong className="text-white bg-slate-800 px-1">
                    It is NOT encrypted!
                  </strong>{" "}
                  It is only Base64 encoded.
                </li>
                <li>
                  <strong className="text-cyan-400">Signature:</strong> A hash
                  of the Header, Payload, and the server's Private Key. If a
                  hacker alters the payload, the signature breaks.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <IAMVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            JWT Tampering Simulator
          </p>
          <Link
            href="/cyber/iam/quiz"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+250 Cyber XP)
          </Link>
        </div>
      </div>
    </section>
  );
}

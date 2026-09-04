"use client";

import { useState, useEffect } from "react";
import {
  KeyRound,
  ShieldAlert,
  CheckCircle2,
  FileJson,
  Lock,
} from "lucide-react";

export default function IAMVisualizer() {
  const [role, setRole] = useState("user");
  const [serverKey, setServerKey] = useState("super_secret_key");
  const [hackerKey, setHackerKey] = useState("super_secret_key");
  const [jwt, setJwt] = useState({ header: "", payload: "", signature: "" });

  const encodeBase64Url = (str: string) =>
    btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  // Simulate JWT Generation (Mock HMAC SHA256)
  useEffect(() => {
    const headerStr = JSON.stringify({ alg: "HS256", typ: "JWT" });
    const payloadStr = JSON.stringify({
      sub: "123",
      role: role,
      exp: 1712345678,
    });

    const encHeader = encodeBase64Url(headerStr);
    const encPayload = encodeBase64Url(payloadStr);

    // Simulate signature generation based on the key the user provides
    const mockSignature = encodeBase64Url(
      `MOCK_HMAC(${encHeader}.${encPayload}, ${hackerKey})`,
    );

    setJwt({
      header: encHeader,
      payload: encPayload,
      signature: mockSignature,
    });
  }, [role, hackerKey]);

  // The server checks if the signature generated with the REAL server key matches the provided JWT
  const expectedSignature = encodeBase64Url(
    `MOCK_HMAC(${jwt.header}.${jwt.payload}, ${serverKey})`,
  );
  const isSignatureValid = jwt.signature === expectedSignature;

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-emerald-500 uppercase flex items-center gap-2">
            <Lock className="h-4 w-4" /> JWT Tampering Sandbox
          </h3>
          <p className="text-xs text-slate-400">
            Change your role to admin. See why the signature protects the token.
          </p>
        </div>
      </div>

      <div className="relative flex-1 bg-black p-8 flex flex-col gap-8 overflow-y-auto">
        {/* Attacker View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative">
            <div className="absolute -top-3 left-6 bg-slate-900 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700 rounded flex items-center gap-1">
              <FileJson className="h-3 w-3" /> Client Side (Decoded Payload)
            </div>

            <p className="text-xs text-slate-400 mb-4 mt-2">
              A JWT is just Base64 encoded, <strong>not encrypted</strong>.
              Anyone can decode and edit the payload. Try changing the role.
            </p>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 border border-rose-900/50 rounded font-mono text-sm text-slate-300">
                &#123;
                <br />
                &nbsp;&nbsp;"sub": "123",
                <br />
                &nbsp;&nbsp;"role":
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-rose-950 border border-rose-500 text-rose-400 rounded px-2 py-1 outline-none ml-2"
                >
                  <option value="user">"user"</option>
                  <option value="admin">"admin"</option>
                </select>
                ,<br />
                &nbsp;&nbsp;"exp": 1712345678
                <br />
                &#125;
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-2">
                  <KeyRound className="h-3 w-3" /> Attacker's Guess for the
                  Signing Key
                </label>
                <input
                  type="text"
                  value={hackerKey}
                  onChange={(e) => setHackerKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Server View */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative flex flex-col">
            <div className="absolute -top-3 left-6 bg-slate-900 px-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest border border-slate-700 rounded flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" /> Server Side (Verification)
            </div>

            <p className="text-xs text-slate-400 mb-4 mt-2">
              The server receives the JWT, takes the Header and Payload, and
              recalculates the signature using its private{" "}
              <strong className="text-amber-400">Server Secret</strong>.
            </p>

            <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-[10px] sm:text-xs break-all leading-relaxed flex-1">
              <span className="text-rose-400">{jwt.header}</span>
              <span className="text-slate-500">.</span>
              <span className="text-purple-400">{jwt.payload}</span>
              <span className="text-slate-500">.</span>
              <span className="text-cyan-400">{jwt.signature}</span>
            </div>

            <div
              className={`mt-4 p-4 rounded-lg flex items-center gap-3 font-bold border transition-colors ${isSignatureValid ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-400" : "bg-rose-950/30 border-rose-500/50 text-rose-400"}`}
            >
              {isSignatureValid ? (
                <>
                  <CheckCircle2 className="h-5 w-5 shrink-0" /> Signature
                  Verified. Access Granted.
                </>
              ) : (
                <>
                  <ShieldAlert className="h-5 w-5 shrink-0" /> Invalid
                  Signature. Token Tampered!
                </>
              )}
            </div>

            {!isSignatureValid && (
              <p className="text-[10px] text-slate-500 mt-2 text-center">
                The payload was modified, so the hash changed. Since you don't
                know the Server Secret, you couldn't generate the correct new
                signature.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

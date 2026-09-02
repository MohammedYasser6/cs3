"use client";

import { useState } from "react";
import { Server, Globe, Key, FileJson, Trash2 } from "lucide-react";

type RequestState = {
  method: string | null;
  url: string | null;
  headers: boolean;
  body: boolean;
};

export default function CreationalVisualizer() {
  const [req, setReq] = useState<RequestState>({
    method: null,
    url: null,
    headers: false,
    body: false,
  });

  const reset = () =>
    setReq({ method: null, url: null, headers: false, body: false });

  const isComplete = req.method && req.url;

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      {/* Control Bar: The "Director" */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-amber-500 uppercase">
            HttpRequestBuilder
          </h3>
          <p className="text-xs text-slate-400">
            Construct complex objects step-by-step to avoid huge constructors
            with unreadable parameters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setReq({ ...req, method: "POST" })}
            disabled={req.method !== null}
            className="flex items-center gap-2 rounded border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:border-emerald-500 disabled:text-emerald-400"
          >
            <Server className="h-4 w-4" /> .method("POST")
          </button>
          <button
            onClick={() => setReq({ ...req, url: "/api/users" })}
            disabled={req.url !== null}
            className="flex items-center gap-2 rounded border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:border-blue-500 disabled:text-blue-400"
          >
            <Globe className="h-4 w-4" /> .url("/api/users")
          </button>
          <button
            onClick={() => setReq({ ...req, headers: true })}
            disabled={req.headers}
            className="flex items-center gap-2 rounded border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:border-purple-500 disabled:text-purple-400"
          >
            <Key className="h-4 w-4" /> .header("Auth")
          </button>
          <button
            onClick={() => setReq({ ...req, body: true })}
            disabled={req.body}
            className="flex items-center gap-2 rounded border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:border-amber-500 disabled:text-amber-400"
          >
            <FileJson className="h-4 w-4" /> .body(json)
          </button>

          <button
            onClick={reset}
            className="ml-4 flex items-center justify-center rounded p-2 text-rose-500 hover:bg-rose-950/50 transition-all"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 bg-black p-8 flex flex-col lg:flex-row gap-8 overflow-hidden items-center justify-center">
        {/* Anti-Pattern View */}
        <div className="flex-1 max-w-lg rounded-xl border border-rose-900/50 bg-rose-950/20 p-6 shadow-2xl relative">
          <div className="absolute -top-3 left-6 bg-rose-950 px-2 text-[10px] font-bold text-rose-400 uppercase tracking-widest border border-rose-900 rounded">
            Anti-Pattern: Telescoping Constructor
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Without a builder, you must pass{" "}
            <code className="text-rose-400">null</code> for optional arguments,
            making the code completely unreadable.
          </p>

          <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap">
            <span className="text-purple-400">new</span> HttpRequest(
            <br />{" "}
            <span
              className={req.method ? "text-emerald-400" : "text-slate-500"}
            >
              {req.method ? '"POST"' : "null"}
            </span>
            ,
            <br />{" "}
            <span className={req.url ? "text-blue-400" : "text-slate-500"}>
              {req.url ? '"/api/users"' : "null"}
            </span>
            ,
            <br />{" "}
            <span
              className={req.headers ? "text-purple-400" : "text-slate-500"}
            >
              {req.headers ? "new AuthToken()" : "null"}
            </span>
            ,
            <br /> <span className="text-slate-500">null</span>,{" "}
            <span className="text-slate-500">// timeout</span>
            <br /> <span className="text-slate-500">null</span>,{" "}
            <span className="text-slate-500">// retries</span>
            <br />{" "}
            <span className={req.body ? "text-amber-400" : "text-slate-500"}>
              {req.body ? "jsonPayload" : "null"}
            </span>
            <br />
            );
          </pre>
        </div>

        {/* Builder View */}
        <div className="flex-1 max-w-lg rounded-xl border border-emerald-900/50 bg-emerald-950/10 p-6 shadow-2xl relative">
          <div className="absolute -top-3 left-6 bg-emerald-950 px-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-900 rounded">
            Clean Code: Builder Pattern
          </div>
          <p className="text-xs text-slate-400 mb-4">
            The Builder handles optional parameters via method chaining,
            creating a highly readable fluent interface.
          </p>

          <pre className="text-sm font-mono text-slate-300">
            HttpRequest.builder()
            {req.method && (
              <>
                <br /> <span className="text-emerald-400">.method</span>(
                <span className="text-green-300">"POST"</span>)
              </>
            )}
            {req.url && (
              <>
                <br /> <span className="text-blue-400">.url</span>(
                <span className="text-blue-300">"/api/users"</span>)
              </>
            )}
            {req.headers && (
              <>
                <br /> <span className="text-purple-400">.header</span>(
                <span className="text-purple-300">"Authorization", token</span>)
              </>
            )}
            {req.body && (
              <>
                <br /> <span className="text-amber-400">.body</span>(
                <span className="text-amber-300">jsonPayload</span>)
              </>
            )}
            <br />{" "}
            <span
              className={isComplete ? "text-white font-bold" : "text-slate-500"}
            >
              .build();
            </span>
          </pre>

          {isComplete && (
            <div className="absolute bottom-6 right-6 animate-slide-up rounded border border-emerald-500 bg-emerald-900/50 px-4 py-2 text-xs font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Object successfully built!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

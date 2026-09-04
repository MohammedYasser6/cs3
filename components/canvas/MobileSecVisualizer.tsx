"use client";

import { useState } from "react";
import {
  Smartphone,
  FileCode,
  FileJson,
  Folder,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

export default function MobileSecVisualizer() {
  const [activeFile, setActiveFile] = useState<
    "manifest" | "strings" | "sharedprefs" | null
  >(null);

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 z-10">
        <div>
          <h3 className="mb-1 text-sm font-bold tracking-wider text-emerald-500 uppercase flex items-center gap-2">
            <Smartphone className="h-4 w-4" /> APK Decompiler (JADX Sim)
          </h3>
          <p className="text-xs text-slate-400">
            Reverse-engineering an Android package to find hardcoded secrets.
          </p>
        </div>
      </div>

      <div className="relative flex-1 bg-black flex overflow-hidden">
        {/* Left: File Explorer */}
        <div className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 flex flex-col gap-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            Extracted Files
          </div>

          <button
            onClick={() => setActiveFile("manifest")}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded text-sm transition-colors ${activeFile === "manifest" ? "bg-emerald-900/30 text-emerald-400" : "hover:bg-slate-800 text-slate-300"}`}
          >
            <FileCode className="h-4 w-4 shrink-0" /> AndroidManifest.xml
          </button>

          <div className="flex items-center gap-2 w-full text-left px-3 py-2 rounded text-sm text-slate-300">
            <Folder className="h-4 w-4 shrink-0 text-amber-500" /> res/values
          </div>
          <button
            onClick={() => setActiveFile("strings")}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 pl-8 rounded text-sm transition-colors ${activeFile === "strings" ? "bg-emerald-900/30 text-emerald-400" : "hover:bg-slate-800 text-slate-300"}`}
          >
            <FileCode className="h-4 w-4 shrink-0" /> strings.xml
          </button>

          <div className="flex items-center gap-2 w-full text-left px-3 py-2 rounded text-sm text-slate-300">
            <Folder className="h-4 w-4 shrink-0 text-amber-500" />{" "}
            data/data/com.app
          </div>
          <button
            onClick={() => setActiveFile("sharedprefs")}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 pl-8 rounded text-sm transition-colors ${activeFile === "sharedprefs" ? "bg-emerald-900/30 text-emerald-400" : "hover:bg-slate-800 text-slate-300"}`}
          >
            <FileJson className="h-4 w-4 shrink-0" /> shared_prefs.xml
          </button>
        </div>

        {/* Right: Code Viewer */}
        <div className="flex-1 bg-black p-8 overflow-y-auto">
          {activeFile === "manifest" && (
            <div className="animate-fade-in space-y-4 max-w-3xl">
              <h4 className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <ChevronRight className="h-4 w-4" /> AndroidManifest.xml
              </h4>
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 font-mono text-xs leading-relaxed overflow-x-auto">
                <span className="text-slate-500">
                  &lt;manifest xmlns:android="..."&gt;
                </span>
                <br />
                &nbsp;&nbsp;
                <span className="text-slate-500">&lt;application&gt;</span>
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-slate-500">
                  &lt;activity android:name=".HiddenAdminPanel"
                </span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-rose-400 font-bold bg-rose-950/40 px-1 border border-rose-900/50 rounded">
                  android:exported="true"
                </span>
                <span className="text-slate-500">&gt;</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-slate-500">&lt;/activity&gt;</span>
                <br />
                <br />
                &nbsp;&nbsp;
                <span className="text-slate-500">&lt;/application&gt;</span>
                <br />
                <span className="text-slate-500">&lt;/manifest&gt;</span>
              </div>
              <div className="bg-rose-950/20 border border-rose-900/50 p-4 rounded-lg flex gap-3 text-sm text-rose-300">
                <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500" />
                <p>
                  <strong className="text-rose-400">
                    Vulnerability: Insecurely Exported Component.
                  </strong>{" "}
                  Because `android:exported="true"`, any other malicious app
                  installed on the user's phone can directly launch the
                  `HiddenAdminPanel` activity, bypassing the login screen
                  entirely.
                </p>
              </div>
            </div>
          )}

          {activeFile === "strings" && (
            <div className="animate-fade-in space-y-4 max-w-3xl">
              <h4 className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <ChevronRight className="h-4 w-4" /> res/values/strings.xml
              </h4>
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 font-mono text-xs leading-relaxed overflow-x-auto">
                <span className="text-slate-500">&lt;resources&gt;</span>
                <br />
                &nbsp;&nbsp;
                <span className="text-slate-300">
                  &lt;string name="app_name"&gt;SecureBank&lt;/string&gt;
                </span>
                <br />
                &nbsp;&nbsp;
                <span className="text-slate-300">
                  &lt;string
                  name="api_url"&gt;https://api.securebank.com&lt;/string&gt;
                </span>
                <br />
                &nbsp;&nbsp;
                <span className="text-rose-400 font-bold bg-rose-950/40 px-1 border border-rose-900/50 rounded">
                  &lt;string
                  name="aws_secret_key"&gt;AKIAIOSFODNN7EXAMPLE&lt;/string&gt;
                </span>
                <br />
                <span className="text-slate-500">&lt;/resources&gt;</span>
              </div>
              <div className="bg-rose-950/20 border border-rose-900/50 p-4 rounded-lg flex gap-3 text-sm text-rose-300">
                <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500" />
                <p>
                  <strong className="text-rose-400">
                    Vulnerability: Hardcoded API Secrets.
                  </strong>{" "}
                  Extracting an APK to read strings.xml is trivial. The attacker
                  now has full access to your AWS environment.
                </p>
              </div>
            </div>
          )}

          {activeFile === "sharedprefs" && (
            <div className="animate-fade-in space-y-4 max-w-3xl">
              <h4 className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />{" "}
                data/data/.../shared_prefs/auth.xml
              </h4>
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 font-mono text-xs leading-relaxed overflow-x-auto">
                <span className="text-slate-500">&lt;map&gt;</span>
                <br />
                &nbsp;&nbsp;
                <span className="text-slate-300">
                  &lt;boolean name="is_logged_in" value="true" /&gt;
                </span>
                <br />
                &nbsp;&nbsp;
                <span className="text-rose-400 font-bold bg-rose-950/40 px-1 border border-rose-900/50 rounded">
                  &lt;string name="user_pin"&gt;8492&lt;/string&gt;
                </span>
                <br />
                <span className="text-slate-500">&lt;/map&gt;</span>
              </div>
              <div className="bg-rose-950/20 border border-rose-900/50 p-4 rounded-lg flex gap-3 text-sm text-rose-300">
                <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500" />
                <p>
                  <strong className="text-rose-400">
                    Vulnerability: Insecure Local Storage.
                  </strong>{" "}
                  SharedPreferences are stored in plaintext. If the device is
                  rooted (or compromised via another vulnerability), attackers
                  can read the user's PIN directly from the file system.
                </p>
              </div>
            </div>
          )}

          {!activeFile && (
            <div className="flex h-full items-center justify-center text-slate-500 text-sm">
              Select a file from the explorer to decompile and inspect.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

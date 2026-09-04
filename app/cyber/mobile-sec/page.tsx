"use client";

import Link from "next/link";
import MobileSecVisualizer from "@/components/canvas/MobileSecVisualizer";

export default function MobileSecPage() {
  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
            Cyber Track • Level 4
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Mobile Security
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
            <div>
              <p>
                Mobile applications run on devices that are completely out of
                your control. Assuming that the client-side app is a "trusted
                environment" is the biggest mistake a mobile developer can make.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-rose-400">
                Reverse Engineering
              </h3>
              <p className="text-xs text-slate-400">
                An APK (Android Application Package) is just a glorified ZIP
                file. Anyone can rename `.apk` to `.zip`, extract it, and use
                tools like JADX to decompile the binary back into readable
                Java/Kotlin code and view all resource files.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-rose-400">
                Hardcoded Secrets
              </h3>
              <p className="text-xs text-slate-400 mb-2">
                Because an app can be easily decompiled,{" "}
                <strong className="text-white">
                  you can never store API keys, AWS credentials, or database
                  passwords in the app's source code or strings.xml
                </strong>
                . Hackers will extract them and abuse your infrastructure.
              </p>
              <p className="text-xs text-emerald-400 mt-2 border-t border-slate-800 pt-2">
                <strong>Defense:</strong> The app should only contain a standard
                user authentication token. All sensitive operations must happen
                on your backend server.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
              <h3 className="mb-2 font-bold text-rose-400">
                Insecure Components
              </h3>
              <p className="text-xs text-slate-400">
                In Android, setting an Activity or Service to{" "}
                <code className="text-white">exported="true"</code> means any
                other app on the phone can trigger it. If an admin panel is
                exported, a malicious app can launch it directly without logging
                in.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <MobileSecVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            JADX Decompiler Simulator
          </p>
          <Link
            href="/cyber/mobile-sec/quiz"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+250 Cyber XP)
          </Link>
        </div>
      </div>
    </section>
  );
}

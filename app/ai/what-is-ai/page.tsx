import Header from "@/app/Header";
import ClientXPBar from "@/app/ClientXPBar"; // Ensure this reads 'aiXp' now
import Link from "next/link";

export default function WhatIsAIPage() {
  return (
    <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-purple-800/50 relative overflow-hidden">
        {/* Subtle glow effect behind the text */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />

        <h1 className="text-3xl font-bold mb-4 text-purple-300">
          01. What is AI?
        </h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Standard programming requires explicit instructions. Machine Learning
          inverses this paradigm: feed the algorithm data and answers, and it
          calculates the mathematical rules itself.
        </p>

        <Link
          href="/ai/what-is-ai/quiz"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
        >
          Take Assessment (+100 AI XP)
        </Link>
      </section>

      <section className="bg-black rounded-xl overflow-hidden border border-purple-900/50 h-[500px] flex items-center justify-center">
        <span className="text-purple-700 font-mono text-sm animate-pulse">
          [ Canvas: RuleBasedVisualizer mounting... ]
        </span>
      </section>
    </main>
  );
}

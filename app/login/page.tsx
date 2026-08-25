"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl w-96 text-center">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error === "locked"
              ? "You need more XP to access that area!"
              : "Error logging in."}
          </p>
        )}

        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with GitHub
          </button>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

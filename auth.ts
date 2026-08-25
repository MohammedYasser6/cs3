import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // Required to keep edge middleware working
  pages: {
    signIn: "/login", // 1. Tells NextAuth to use our custom page!
  },
  providers: [
    // 2. Auth.js v5 automatically infers credentials from AUTH_ variables
    GitHub,
    Google,
  ],
});

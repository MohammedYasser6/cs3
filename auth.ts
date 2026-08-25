import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Adjust path if your lib folder isn't at the root

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // We use JWT here so your proxy.ts (middleware) can still read the session on the Edge network
  session: { strategy: "jwt" },
  providers: [GitHub, Google],
});

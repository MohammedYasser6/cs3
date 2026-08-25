import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  // If you add a database adapter later (Prisma/Drizzle), you'll add it here.
});

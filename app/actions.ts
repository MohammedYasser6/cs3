"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function saveProgressToDB(moduleId: string, xpReward: number) {
  const session = await auth();

  // If they aren't logged in, we do nothing
  if (!session?.user?.email) return;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return;
  if (user.completedModules.includes(moduleId)) return; // Prevent cheating

  // Save to Neon Postgres!
  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      xp: { increment: xpReward },
      completedModules: { push: moduleId },
    },
  });
}

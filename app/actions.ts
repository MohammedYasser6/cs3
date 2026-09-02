"use server";

import { prisma } from "../lib/prisma";
import { auth } from "@/auth";

type Track = "cs" | "ai" | "cyber" | "swe";

export async function saveProgressToDB(
  moduleId: string,
  xpReward: number,
  track: Track = "cs",
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized: User not logged in");
  }

  const trackField = `${track}Xp`;

  try {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        xp: { increment: xpReward },
        [trackField]: { increment: xpReward },
        completedModules: { push: moduleId }, // <-- CRITICAL: Save the module so they can't farm XP
      },
    });
  } catch (error) {
    console.error("Failed to save progress to database:", error);
    throw new Error("Database sync failed");
  }
}

export async function getUserProgressFromDB() {
  const session = await auth();
  if (!session?.user?.email) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      // <-- CRITICAL: Added sweXp and completedModules so state restores on refresh
      select: {
        xp: true,
        csXp: true,
        aiXp: true,
        cyberXp: true,
        sweXp: true,
        completedModules: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to fetch user progress from database:", error);
    return null;
  }
}

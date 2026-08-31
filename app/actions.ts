"use server";

import { prisma } from "../lib/prisma";
import { auth } from "@/auth"; // Assuming you use Auth.js based on your directory tree

type Track = "cs" | "ai" | "cyber";

export async function saveProgressToDB(
  moduleId: string,
  xpReward: number,
  track: Track = "cs",
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized: User not logged in");
  }

  // Dynamically target the correct column (csXp, aiXp, or cyberXp)
  const trackField = `${track}Xp`;

  try {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        // Increment the global XP
        xp: { increment: xpReward },
        // Increment the specific track's XP
        [trackField]: { increment: xpReward },
        // Append the module to the completed list (if tracked in DB)
        // completedModules: { push: moduleId }
      },
    });
  } catch (error) {
    console.error("Failed to save progress to database:", error);
    throw new Error("Database sync failed");
  }
}

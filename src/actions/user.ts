"use server";

import { env } from "@/env";
import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

export const FindOrCreateUser = async () => {
  try {
    const user = await currentUser();
    const isAdmin =
      user?.emailAddresses[0]?.emailAddress &&
      env.ADMIN_EMAILS.split(",").includes(
        user?.emailAddresses[0]?.emailAddress,
      );
    const clerkId = user?.id ?? "";
    const dbUser = await db.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    if (dbUser) return dbUser;

    return await db.user.create({
      data: {
        clerkId,
        email: user?.emailAddresses[0]?.emailAddress ?? "",
        name: user?.fullName ?? user?.username ?? "",
        role: isAdmin ? "SB_CHAIR" : "CHAPTER_CHAIR",
      },
    });
  } catch (error) {
    console.log(error)
    return false;
  }
};

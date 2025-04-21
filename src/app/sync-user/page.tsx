import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { db } from "~/server/db";

const SyncUser = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (!user.emailAddresses[0]?.emailAddress) {
    return notFound();
  }
  try {
    console.log("here");

    await db.user.upsert({
      where: {
        emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
      },
      update: {
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      create: {
        id: userId,
        emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Error saving user to DB:", error);
    throw error;
  }

  return redirect("/dashboard");
};

export default SyncUser;
// sync-user route act as middle where when we login it force to go /sync-user for storing hte user in the database after store it it return the /dashboard route

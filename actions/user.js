"use server";

import { db } from "@/lib/prisma";
import { generateAIInsights } from "./dashboard";
import { auth } from "@/lib/auth";

export async function updateUser(data) {
  const { user : authUser } = await auth();
  if (!authUser) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      firebaseUid: authUser.firebaseUid,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(
      async (tx) => {
        // find if the industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });
        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }
        //update the user
        const updateUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updateUser, industryInsight };
      },
      {
        timeout: 50000,
      }
    );

    
    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile " + error.message);
  }
}

export async function getUserOnboardingStatus() {
  const { user : authUser } = await auth();
  if (!authUser) {
    // If authUser is not available, we can return a default response
    return { isOnboarded: false };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        firebaseUid: authUser.firebaseUid,
      },
      select: {
        industry: true,
      },
    });

    if (!user) {
        return { isOnboarded: false };
    }

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding staus:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}

"use server";

import { authAdmin } from "@/lib/firebase-admin";
import { auth } from "@/lib/auth";
import { deleteSessionCookie } from "@/lib/session";

export async function changePassword(newPassword) {
  const { user: authUser } = await auth();
  if (!authUser) {
    throw new Error("Unauthorized");
  }

  try {
    await authAdmin.updateUser(authUser.firebaseUid, {
      password: newPassword,
    });

    // Invalidate session cookie
    await deleteSessionCookie();

    return { success: true };
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error("Failed to change password.");
  }
}

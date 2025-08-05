import { getSessionCookie } from './session'; 
import { authAdmin } from './firebase-admin';
import { db } from './prisma';

export async function auth() {
  try {
    const sessionCookie = await getSessionCookie();

    if (!sessionCookie?.value) {
      return { user: null };
    }

    const decodedToken = await authAdmin.verifySessionCookie(sessionCookie.value, true);
    
    const user = await db.user.findUnique({
      where: { firebaseUid: decodedToken.uid },
      select: { id: true, name: true, email: true, imageUrl: true, firebaseUid: true }
    });

    return { user };
  } catch (error) {
    return { user: null };
  }
}
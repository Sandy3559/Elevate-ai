"use server";

import { cookies } from 'next/headers';

export async function getSessionCookie() {
    const cookieStore = await cookies();
    return cookieStore.get('session');
}

export async function createSessionCookie(sessionCookie, expiresIn) {
    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
}

export async function deleteSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
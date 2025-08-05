import { NextResponse } from 'next/server';
import { createSessionCookie, deleteSessionCookie } from '@/lib/session';
import { authAdmin } from '@/lib/firebase-admin';

export async function POST(request) {
  try {
    const { idToken } = await request.json();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie = await authAdmin.createSessionCookie(idToken, { expiresIn });
    
    await createSessionCookie(sessionCookie, expiresIn);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Session Login Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create session' }, { status: 401 });
  }
}

export async function DELETE() {
  try {
    await deleteSessionCookie();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Session Logout Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete session' }, { status: 500 });
  }
}
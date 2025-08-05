import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
    try {
        const { firebaseUid, email, name, imageUrl } = await request.json();
        
        const existingUser = await db.user.findUnique({
            where: { firebaseUid },
        });

        if (existingUser) {
            return NextResponse.json(existingUser);
        }

        const newUser = await db.user.create({
            data: {
                firebaseUid,
                email,
                name,
                imageUrl,
            },
        });

        return NextResponse.json(newUser);
    } catch (error) {
        console.error("Failed to create user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
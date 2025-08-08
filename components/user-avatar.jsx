"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function UserAvatar({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(authClient);
      router.push('/');
      router.refresh();
    } catch (error) {
        console.error("Failed to log out:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/profile">Manage Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer text-red-500">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
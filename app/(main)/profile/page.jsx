"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { authClient } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("You must be logged in to update your profile.");
            return;
        }

        setIsLoading(true);
        try {
            await updateProfile(authClient.currentUser, {
                displayName: name,
            });

            const response = await fetch('/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update profile in the database.');
            }

            toast.success("Profile updated successfully!");
            router.refresh(); 
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error(error.message || "Failed to update profile.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-4xl font-bold gradient-title mb-6">Manage Profile</h1>
            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>Update your name below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={user.email} disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                                id="name" 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
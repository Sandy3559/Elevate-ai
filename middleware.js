import { NextResponse } from 'next/server';

const protectedRoutes = [
    "/dashboard",
    "/resume",
    "/interview",
    "/ai-cover-letter",
    "/onboarding",
    "/profile",
];

export function middleware(request) {
    const sessionCookie = request.cookies.get('session')?.value;
    const { pathname } = request.nextUrl;

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute && !sessionCookie) {
        const url = request.nextUrl.clone();
        url.pathname = '/sign-in';
        return NextResponse.redirect(url);
    }
    
    if ((pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) && sessionCookie) {
         const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }


    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
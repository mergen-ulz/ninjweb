import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;
    const cookie = req.cookies.get('admin_auth');

    const isAdminRoute = pathname.startsWith('/admin');
    const isLoginPage = pathname === '/admin/login';
    const isLoggedIn = cookie?.value === 'true';

    if (isAdminRoute && !isLoginPage && !isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next(); // fixed: removed intlMiddleware
}

export const config = {
    matcher: ['/admin/:path*'], // fixed: only matches admin pages
};

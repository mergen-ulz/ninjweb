import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET() {
    const cookie = serialize('admin_auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        path: '/',
    });

    return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            'Set-Cookie': cookie,
            'Content-Type': 'application/json',
        },
    });
}

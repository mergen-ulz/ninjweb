import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const ADMIN_USERNAME = 'admin@ninj.web';
const ADMIN_PASSWORD = 'MergenIsAdmin21';

export async function POST(req) {
    const { username, password } = await req.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const cookie = serialize('admin_auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60,
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

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}

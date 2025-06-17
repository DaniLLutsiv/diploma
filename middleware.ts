import "server-only"
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import * as jose from 'jose';

const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function middleware(req: NextRequest) {
    const cookie = (await cookies()).get('accessToken')?.value || ""

    if (!cookie) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    const decoded = await jose.jwtVerify(cookie, encodedSecret)
    // 4. Redirect to /login if the user is not authenticated
    if (!decoded.payload.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],  // Apply middleware only to /dashboard routes
    runtime: 'nodejs',
};
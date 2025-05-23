import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    const isLoggedIn = token !== undefined

    if (!isLoggedIn){
        return NextResponse.redirect(new URL('/', request.url))
    }
}
 
export const config = {
  matcher: '/admin/:path*',
}
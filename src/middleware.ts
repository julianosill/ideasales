import { NextRequest, NextResponse } from 'next/server'

import { getSession } from './auth/auth'

export async function middleware(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/sign-out', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - auth (Auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|auth|_next/static|_next/image|favicon.ico).*)',
  ],
}

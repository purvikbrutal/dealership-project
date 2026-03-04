import { NextResponse, type NextRequest } from 'next/server'

const AUTH_COOKIE = 'admin-auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname.startsWith('/admin/login')) return NextResponse.next()

  const hasAuth = req.cookies.get(AUTH_COOKIE)?.value === 'true'
  if (!hasAuth) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

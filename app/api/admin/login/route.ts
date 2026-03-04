import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const COOKIE_NAME = 'admin-auth'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { password } = body
  const expected = process.env.ADMIN_PASSWORD

  if (!expected) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD not set' }, { status: 500 })
  }

  if (password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, '', { path: '/', maxAge: 0 })
  return NextResponse.json({ ok: true })
}

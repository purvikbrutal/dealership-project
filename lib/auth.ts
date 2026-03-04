import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin-auth'

export function isAuthenticated() {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)
  return Boolean(token?.value === 'true')
}

export function requirePassword() {
  return process.env.ADMIN_PASSWORD
}

export function setAuthCookie() {
  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

export function clearAuthCookie() {
  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, '', { path: '/', maxAge: 0 })
}

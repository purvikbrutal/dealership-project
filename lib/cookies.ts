import { cookies } from 'next/headers'

export const VISITOR_COOKIE = 'visitor_access'
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function hasVisitorAccess() {
  return Boolean(cookies().get(VISITOR_COOKIE))
}

export function setVisitorAccessCookie() {
  cookies().set({
    name: VISITOR_COOKIE,
    value: 'true',
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: '/',
  })
}

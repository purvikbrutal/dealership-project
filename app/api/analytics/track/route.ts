import { NextResponse } from 'next/server'
import { trackEvent } from '@/lib/analytics'

export async function POST(req: Request) {
  const { page, event_type, visitor_id, user_agent } = await req.json().catch(() => ({}))

  if (!page || !event_type) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  await trackEvent({
    page,
    eventType: event_type,
    visitorId: visitor_id || null,
    userAgent: user_agent || null,
  })

  return NextResponse.json({ ok: true })
}

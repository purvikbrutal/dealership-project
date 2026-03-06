export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from '@/lib/cookies'
import { cookies } from 'next/headers'

const RECIPIENTS = ['zahira.zareon@gmail.com', 'altafdewise@gmail.com']

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { fullName, email, phone, dealership = '', visitorType = '' } = body || {}

    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.FROM_EMAIL

    if (!apiKey || !fromEmail) {
      return NextResponse.json({ success: false, error: 'Email service not configured' }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const timestamp = new Date().toISOString()
    const visitorIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''

    const html = `
      <h2>New Website Visitor</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Dealership:</strong> ${dealership || '-'}</p>
      <p><strong>Visitor Type:</strong> ${visitorType || '-'}</p>
      <p><strong>Timestamp:</strong> ${timestamp}</p>
      <p><strong>IP:</strong> ${visitorIp}</p>
    `

    await resend.emails.send({
      from: `Visitor Access <${fromEmail}>`,
      to: RECIPIENTS,
      subject: 'New Website Visitor',
      html,
      replyTo: email,
    })

    const response = NextResponse.json({ success: true })
    response.cookies.set({
      name: VISITOR_COOKIE,
      value: 'true',
      maxAge: VISITOR_COOKIE_MAX_AGE,
      path: '/',
    })
    return response
  } catch (error: any) {
    console.error('Visitor gate error', error)
    return NextResponse.json({ success: false, error: 'Failed to submit visitor info' }, { status: 500 })
  }
}

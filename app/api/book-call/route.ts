export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, email, phone, dealership, date, time, problem } = data || {}

    const toEnv = process.env.EMAIL_TO
    const fromEnv = process.env.FROM_EMAIL
    const recipients = toEnv?.split(",").map(r => r.trim()).filter(Boolean)

    if (!process.env.RESEND_API_KEY || !fromEnv || !recipients || recipients.length === 0) {
      console.error("Email config missing", {
        hasApiKey: Boolean(process.env.RESEND_API_KEY),
        hasFrom: Boolean(fromEnv),
        recipients,
      })
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 })
    }

    const html = `
      <h2>New Booking</h2>
      <p><b>Name:</b> ${name || "-"}</p>
      <p><b>Email:</b> ${email || "-"}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Dealership:</b> ${dealership || "-"}</p>
      <p><b>Date:</b> ${date || "-"}</p>
      <p><b>Time:</b> ${time || "-"}</p>
      <p><b>Problem:</b> ${problem || "-"}</p>
    `

    const response = await resend.emails.send({
      from: `Fatimuj Zahira Booking <${fromEnv}>`,
      to: recipients,
      replyTo: email,
      subject: "New Strategy Call Booked",
      html,
    })

    console.log("Resend response", response)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Book-call email error", error)
    return NextResponse.json({ success: false, error: error?.message || "Email failed" }, { status: 500 })
  }
}

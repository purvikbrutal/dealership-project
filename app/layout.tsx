import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fatimuj Zahira | Decision Intelligence for Luxury Dealerships',
  description:
    'I help dealership leaders see where cash, risk, and margin truly sit—before the damage shows up on the P&L.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-dark-bg text-text-primary">
        {children}
        <AnalyticsTracker />
        <Analytics />
      </body>
    </html>
  )
}

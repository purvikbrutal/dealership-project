import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luxury Portfolio - Automobile Business Consultant',
  description: 'Helping pre-owned car dealerships grow revenue and improve conversion systems',
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
      </body>
    </html>
  )
}

"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    const buildVisitorId = async () => {
      const stored = localStorage.getItem('visitor_id')
      if (stored) return stored

      const fingerprint = [
        navigator.userAgent,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        window.screen.width,
        window.screen.height,
        Date.now(),
      ].join('|')

      try {
        const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(fingerprint))
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
        localStorage.setItem('visitor_id', hashHex)
        return hashHex
      } catch (err) {
        const fallback = crypto.randomUUID()
        localStorage.setItem('visitor_id', fallback)
        return fallback
      }
    }

    const sendEvent = async () => {
      const visitorId = await buildVisitorId()
      const payload = JSON.stringify({
        page: pathname,
        event_type: 'page_view',
        visitor_id: visitorId,
        user_agent: navigator.userAgent,
      })
      const blob = new Blob([payload], { type: 'application/json' })
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/track', blob)
      } else {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => undefined)
      }
    }

    sendEvent()
  }, [pathname])

  return null
}

'use client'

import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight - 120
      setVisible(window.scrollY <= threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="scroll-indicator"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <span className="scroll-indicator__text">Scroll down</span>
      <div className="scroll-indicator__arrow" />
    </div>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!menuOpen) return

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (navRef.current && !navRef.current.contains(target)) {
        setMenuOpen(false)
      }
    }

    const handleScroll = () => setMenuOpen(false)

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [menuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      ref={navRef}
      className="navbar-container site-header navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="w-full h-full flex items-center justify-between leading-none">
        <Link href="#" className="nav-logo text-[17px] font-semibold tracking-[-0.01em] whitespace-nowrap leading-none">
          <span className="font-semibold">Fatimuj </span>
          <span className="font-bold">Zahira</span>
        </Link>

        <div className="desktop-nav items-center gap-10 leading-none">
          <button onClick={() => scrollToSection('hero')} className="nav-link text-[14px] leading-none">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link text-[14px] leading-none">
            About
          </button>
          <Link href="/blog" className="nav-link text-[14px] leading-none">
            Blogs
          </Link>
          <button onClick={() => scrollToSection('method')} className="nav-link text-[14px] leading-none">
            How I Help
          </button>
          <button onClick={() => scrollToSection('potential-impact')} className="nav-link text-[14px] leading-none">
            Impact
          </button>
          <Link href="/intellectual-property" className="nav-link text-[14px] leading-none">
            Proprietary
          </Link>
          <button onClick={() => scrollToSection('schedule-call')} className="nav-link text-[14px] leading-none">
            Contact
          </button>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
      >
        <div className="mobile-menu-inner">
          <a href="#hero" onClick={() => scrollToSection('hero')}>
            Home
          </a>
          <a href="#about" onClick={() => scrollToSection('about')}>
            About
          </a>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>
            Blogs
          </Link>
          <a href="#method" onClick={() => scrollToSection('method')}>
            How I Help
          </a>
          <a href="#potential-impact" onClick={() => scrollToSection('potential-impact')}>
            Impact
          </a>
          <Link href="/intellectual-property" onClick={() => setMenuOpen(false)}>
            Proprietary
          </Link>
          <a href="#schedule-call" onClick={() => scrollToSection('schedule-call')}>
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

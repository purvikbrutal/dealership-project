'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
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

        <div className="hidden md:flex items-center gap-10 leading-none">
          <button onClick={() => scrollToSection('hero')} className="nav-link text-[14px] leading-none">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link text-[14px] leading-none">
            About
          </button>
          <button onClick={() => scrollToSection('method')} className="nav-link text-[14px] leading-none">
            How I Help
          </button>
          <button onClick={() => scrollToSection('results')} className="nav-link text-[14px] leading-none">
            Results
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-link text-[14px] leading-none">
            Contact
          </button>
        </div>

        <button className="md:hidden text-2xl text-white">☰</button>
      </div>
    </motion.nav>
  )
}

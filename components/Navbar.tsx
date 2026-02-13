'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-bg/80 backdrop-blur-md border-b border-glass-border'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Brand */}
        <Link href="#" className="text-2xl font-semibold text-text-primary tracking-tight">
          CLIENT NAME
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <button
            onClick={() => scrollToSection('home')}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            How I Help
          </button>
          <button
            onClick={() => scrollToSection('results')}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            Results
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            Contact
          </button>
        </div>

        {/* CTA Button */}
        <motion.button
          className="hidden md:block btn-primary text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book a Call
        </motion.button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-text-primary text-2xl">☰</button>
      </div>
    </motion.nav>
  )
}

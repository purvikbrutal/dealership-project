'use client'

import { Bebas_Neue, Inter } from 'next/font/google'
import { motion } from 'framer-motion'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' })
const inter = Inter({ subsets: ['latin'], weight: '300' })

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      data-theme="dark"
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-[#040915] text-white"
    >
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[#040915]">
        <video
          className="w-full h-full object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(4,10,22,0.34),rgba(6,15,31,0.58),rgba(3,8,18,0.82))]" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(65,120,214,0.18),transparent_42%)]" />

      {/* Centered content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-3"
      >
        <div className="hero-title-wrapper">
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: `${bebas.style.fontFamily}, ${inter.style.fontFamily}, sans-serif`,
            }}
            className="hero-title text-white/85 text-center text-[clamp(5.8rem,16vw,11rem)]"
          >
            ZAHIRA
          </motion.h1>
        </div>

        <motion.div
          variants={fadeUp}
          className="hero-tagline-wrapper -mt-1"
        >
          <p
            className={`${inter.className} hero-tagline font-light`}
          >
            Decision Intelligence for New and{' '}
            <span className="whitespace-nowrap sm:whitespace-normal">Pre-Owned</span> Luxury Dealerships
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4"
        >
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#schedule-call"
            className={`${inter.className} px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white text-black text-sm font-semibold tracking-wide transition duration-300 hover:bg-[#eef4ff]`}
          >
            Book a Call
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#about"
            className={`${inter.className} px-7 py-3 sm:px-8 sm:py-3.5 rounded-full border border-[#9bc4ff]/65 text-white text-sm font-semibold tracking-wide transition duration-300 bg-[#0a1730]/28 hover:bg-[#11213f]/52`}
          >
            About Me
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

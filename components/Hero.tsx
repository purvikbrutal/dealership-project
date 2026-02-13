'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen pt-32 md:pt-40 pb-24 px-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          {/* Circular Portrait with Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative mb-12 md:mb-16"
          >
            {/* Gradient Glow Background */}
            <div className="hero-glow" />
            
            {/* Circular Image */}
            <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
              className="relative w-40 h-40 md:w-56 md:h-56 lg:w-60 lg:h-60 mx-auto"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-glass-border bg-dark-secondary">
                {/* Replace with client's professional portrait */}
                <Image
                  src="/images/hero.jpg"
                  alt="Professional Portrait"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500"%3E%3Ccircle cx="250" cy="250" r="250" fill="%23121821"/%3E%3Ctext x="50%" y="50%" font-size="28" fill="%239aa4b2" text-anchor="middle" dominant-baseline="middle" font-family="system-ui"%3EProfile Photo%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-text-primary mb-6 leading-tight"
          >
            CLIENT NAME
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-lg md:text-xl text-text-muted mb-12 max-w-2xl leading-relaxed"
          >
            Helping pre-owned car dealerships grow revenue by fixing operational gaps and improving conversion systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
          >
            <motion.button
              className="btn-primary whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Strategy Call
            </motion.button>

            <motion.button
              className="btn-secondary whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See How I Help
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

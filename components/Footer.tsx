'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 px-6 border-t border-glass-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-text-muted text-sm">
            © {currentYear} CLIENT NAME. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-purple-accent transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-text-muted hover:text-purple-accent transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

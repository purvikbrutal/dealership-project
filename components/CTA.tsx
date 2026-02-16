'use client'

import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 cta-spotlight" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary mb-6 leading-tight"
        >
          If You Want Clearer Inventory Decisions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Book a Diagnostic Conversation.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true }}
          className="btn-primary text-lg"
        >
          Schedule a Strategy Call
        </motion.button>
      </div>
    </section>
  )
}

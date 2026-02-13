'use client'

import { motion } from 'framer-motion'

const trustItems = [
  {
    icon: '⚙️',
    label: 'Dealership Operations',
  },
  {
    icon: '📊',
    label: 'Lead Conversion',
  },
  {
    icon: '💼',
    label: 'Sales Process',
  },
  {
    icon: '📈',
    label: 'Revenue Optimization',
  },
]

export default function TrustStrip() {
  return (
    <section className="py-12 px-6 border-y border-glass-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <span className="text-4xl md:text-5xl mb-4">{item.icon}</span>
              <p className="text-text-muted text-sm md:text-base">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

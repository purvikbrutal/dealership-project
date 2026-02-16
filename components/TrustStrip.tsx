'use client'

import { motion } from 'framer-motion'
import { Compass, LineChart, Radar, Timer } from 'lucide-react'

const trustItems = [
  {
    Icon: Compass,
    label: 'Decision Intelligence',
  },
  {
    Icon: Timer,
    label: 'Inventory Timing',
  },
  {
    Icon: LineChart,
    label: 'Capital Deployment',
  },
  {
    Icon: Radar,
    label: 'Risk Signals',
  },
]

export default function TrustStrip() {
  return (
    <section className="py-28 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center text-center">
          {trustItems.map((item, index) => {
            const Icon = item.Icon
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center opacity-45 grayscale transition duration-300 hover:opacity-90"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.45, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Icon className="text-white" size={28} strokeWidth={1.5} />
                <p className="text-white/60 text-sm md:text-base mt-3">{item.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

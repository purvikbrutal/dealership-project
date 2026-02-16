'use client'

import { motion } from 'framer-motion'
import { Activity, Compass, Radar, Scale } from 'lucide-react'

const services = [
  {
    title: 'Diagnostic Assessment',
    description:
      'Examine inventory timing, margin exposure, and capital allocation patterns across new and pre-owned stock.',
    Icon: Activity,
  },
  {
    title: 'Signal Mapping',
    description: 'Identify early indicators of risk before they impact cash flow and rotation objectives.',
    Icon: Radar,
  },
  {
    title: 'Decision Framework',
    description: 'Translate insights into repeatable intervention logic leadership can act on weekly.',
    Icon: Compass,
  },
  {
    title: 'Strategic Clarity',
    description: 'Continuously refine decision discipline under real market pressure to protect enterprise value.',
    Icon: Scale,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg mt-4">
            A diagnostic and decision-intelligence layer built over your dealership operations.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => {
            const Icon = service.Icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition"
              >
                <div className="relative">
                  <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="text-white/90" size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-white/90 mt-2">
                    {service.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base mt-3">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: 'Dealership Audit',
    description: 'In-depth analysis of your current operations, sales process, and systems to identify gaps and opportunities.',
    icon: '🔍',
  },
  {
    title: 'Sales Process Optimization',
    description: 'Develop standardized, repeatable sales processes that improve consistency and increase closing rates.',
    icon: '🎯',
  },
  {
    title: 'Lead Conversion System',
    description: 'Build automated follow-up sequences and conversion systems that turn more prospects into buyers.',
    icon: '⚡',
  },
  {
    title: 'Growth Strategy Consulting',
    description: 'Quarterly strategic guidance to align marketing, sales, and operations for sustainable revenue growth.',
    icon: '📊',
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
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary mb-4">
            How I Help
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
            Premium consulting services designed to fix your dealership's operational gaps
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-morphism p-10 transition-all group"
            >
              <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">
                {service.icon}
              </span>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                {service.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

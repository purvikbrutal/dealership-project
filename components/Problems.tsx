'use client'

import { motion } from 'framer-motion'

const problems = [
  {
    title: 'Low Lead Conversion',
    description: 'Converting fewer prospects into buyers despite consistent lead volume',
    icon: '📉',
  },
  {
    title: 'No Follow-Up Process',
    description: 'Leads fall through the cracks due to inconsistent follow-up systems',
    icon: '⏱️',
  },
  {
    title: 'Inconsistent Sales Performance',
    description: 'Sales team results vary wildly with no standardized approach',
    icon: '📊',
  },
  {
    title: 'Poor Inventory Positioning',
    description: 'Right cars in inventory but marketed to wrong audience',
    icon: '🏷️',
  },
  {
    title: 'Wasted Marketing Spend',
    description: 'Money spent on ads bringing wrong type of leads or low quality prospects',
    icon: '💰',
  },
  {
    title: 'No Data Tracking',
    description: 'Operating blind without visibility into what actually drives sales',
    icon: '📈',
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

export default function Problems() {
  return (
    <section className="py-24 px-6 bg-dark-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary mb-4">
            Why Most Pre-Owned Car Dealerships Struggle to Grow
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
            These are the operational gaps that prevent dealerships from reaching their potential
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group glass-morphism p-8 transition-all cursor-pointer"
            >
              <span className="text-4xl mb-4 block">{problem.icon}</span>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {problem.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

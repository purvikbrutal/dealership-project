'use client'

import { motion } from 'framer-motion'

const processSteps = [
  {
    number: 1,
    title: 'Book a Call',
    description: 'Schedule a 30-minute consultation to discuss your dealership\'s challenges',
  },
  {
    number: 2,
    title: 'Business Analysis',
    description: 'Deep dive audit of your operations, sales process, and systems',
  },
  {
    number: 3,
    title: 'Strategy Plan',
    description: 'Custom roadmap identifying gaps and detailing specific improvements',
  },
  {
    number: 4,
    title: 'Implementation',
    description: 'Hands-on guidance implementing changes and optimizing processes',
  },
  {
    number: 5,
    title: 'Performance Tracking',
    description: 'Ongoing monitoring and optimization to ensure sustained growth',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function Process() {
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
            Our Process
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
            A structured approach to identifying and fixing what's holding your dealership back
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {processSteps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              {/* Card */}
              <div className="glass-morphism p-8 rounded-2xl border border-glass-border text-center h-full flex flex-col justify-between">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white text-black font-semibold mb-4">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(100%+8px)] w-[calc(100%-32px)] h-0.5 bg-gradient-to-r from-white to-transparent opacity-20" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

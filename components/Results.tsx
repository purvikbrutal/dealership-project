'use client'

import { motion } from 'framer-motion'

const caseStudies = [
  {
    metric: '12% → 27%',
    title: 'Closing Ratio Improvement',
    description: 'Dealer improved closing ratio from 12% to 27% after implementing structured follow-up system',
  },
  {
    metric: '+45%',
    title: 'Lead Conversion',
    description: 'Mid-size dealership increased lead-to-sale conversion by 45% through optimized sales process',
  },
  {
    metric: '+$280K',
    title: 'Annual Revenue Growth',
    description: 'Small dealership added $280K in annual revenue by fixing inventory positioning and sales ops',
  },
]

const testimonials = [
  {
    quote: 'We were working hard but spinning our wheels. Within 3 months of implementing the recommendations, our sales process became consistent and our closing rate increased dramatically.',
    author: 'Owner, Pre-owned Dealership',
  },
  {
    quote: 'The operational audit revealed gaps we didn\'t even know existed. The cost of fixing them was nothing compared to the revenue increase we\'ve seen.',
    author: 'Sales Manager, Auto Group',
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

export default function Results() {
  return (
    <section id="results" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary mb-4">
            Real Results From Real Dealerships
          </h2>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-morphism p-10 transition-all text-center"
            >
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-text-primary mb-4">
                {study.metric}
              </h3>
              <p className="text-xl md:text-2xl font-semibold text-text-primary mb-3">
                {study.title}
              </p>
              <p className="text-text-muted leading-relaxed text-base md:text-lg">
                {study.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary text-center mb-12">
            What Clients Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="glass-morphism p-8 transition-all"
              >
                <p className="text-text-muted italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <p className="text-text-primary font-semibold">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

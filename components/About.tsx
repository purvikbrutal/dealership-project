'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="blue-section py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <div className="blue-panel relative max-w-[420px] mx-auto aspect-[4/5] rounded-2xl overflow-hidden hover:scale-[1.02] transition duration-500">
              <Image
                src="/images/about.jpg"
                alt="About Section"
                fill
                className="object-cover grayscale-[12%] brightness-[0.96]"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500"%3E%3Crect fill="%23000000" width="500" height="500"/%3E%3Ctext x="50%" y="50%" font-size="20" fill="%239aa4b2" text-anchor="middle" dominant-baseline="middle"%3EReplace with professional image%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
              About
            </h2>

            <div className="space-y-6 text-white/60 leading-relaxed text-base md:text-lg max-w-xl mt-6">
              <p>
                I work alongside luxury automotive retailers to bring precision to where capital is genuinely moving within the business. My attention centers on inventory velocity, margin resilience, and the quality of operational decisions, identifying pressure points long before they surface in the financial accounts. In a high-capital environment, delayed judgement is costly. My role is to equip leadership with the clarity to act decisively and at the right moment.
              </p>
              <p>
                Rather than relying on retrospective reporting, I focus on forward signals that indicate where intervention will protect profit and release capital. I analyze stock aging, capital deployment, and margin compression to uncover vehicles that quietly erode return. Early warning indicators are extracted from operational noise and reframed into clear, prioritized actions that management teams can execute weekly with confidence. The outcome is sharper decision-making, stronger capital efficiency, and sustained margin protection, delivered through disciplined operational insight rather than assumption.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

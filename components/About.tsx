'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Replace about.jpg with client's professional image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-glass-border glass-morphism p-1">
              <Image
                src="/images/about.jpg"
                alt="About Section"
                fill
                className="object-cover rounded-xl"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500"%3E%3Crect fill="%23121821" width="500" height="500"/%3E%3Ctext x="50%" y="50%" font-size="20" fill="%239aa4b2" text-anchor="middle" dominant-baseline="middle"%3EReplace with professional image%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 text-text-primary">
              About Me
            </h2>

            <div className="space-y-6 text-text-muted leading-relaxed text-base md:text-lg">
              <p>
                With over a decade of experience in the automobile industry, I've worked with hundreds of dealerships facing the same challenge: they're working hard but still not growing. I've learned that the problem isn't always about getting more leads—it's about fixing the system behind the business.
              </p>

              <p>
                My expertise spans dealership operations, sales team management, inventory positioning, and conversion optimization. I understand the unique challenges pre-owned car dealerships face, from managing inconsistent sales performance to handling the complexity of inventory flow and customer follow-up systems.
              </p>

              <p>
                I focus on systems and processes, not just marketing tactics. Every improvement I implement is designed to create sustainable growth through better operational efficiency, stronger sales processes, and data-driven decision making.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-glass-border">
              <p className="text-lg md:text-xl font-semibold text-text-primary">
                "I don't run ads. I fix the business behind the ads."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

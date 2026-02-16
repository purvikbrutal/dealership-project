'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <div className="relative max-w-[460px] mx-auto aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:scale-[1.02] transition duration-500">
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
                I work with luxury dealerships to understand where their money actually moves. I look at inventory flow, margin pressure, and operational decisions to find issues before they show up in the financials.
              </p>

              <p>
                My goal is simple: help leadership make faster and clearer decisions in a high-capital business. Instead of reacting late, you act at the right moment with confidence.
              </p>

              <p>
                I identify vehicles that quietly drain profit, highlight early warning signs, and turn complicated operational data into clear actions your team can follow every week.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

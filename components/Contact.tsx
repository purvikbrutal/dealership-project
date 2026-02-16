'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-28 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg">
            Ready to discuss how to grow your dealership?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2.5">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/25 focus:bg-white/[0.05] transition"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2.5">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/25 focus:bg-white/[0.05] transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/25 focus:bg-white/[0.05] transition resize-none"
                placeholder="Tell me about your dealership challenges..."
              />
            </div>

            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3 rounded-full bg-white text-black font-medium transition hover:bg-white/90"
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

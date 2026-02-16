'use client'

import { useEffect, useRef, useState } from 'react'
import { Activity, Compass, Radar, Scale } from 'lucide-react'

const steps = [
  {
    title: 'Diagnostic Assessment',
    description:
      'Examine inventory timing, margin exposure, and capital allocation patterns across new and pre-owned stock.',
    Icon: Activity,
  },
  {
    title: 'Signal Mapping',
    description: 'Identify early indicators of risk before it impacts cash flow.',
    Icon: Radar,
  },
  {
    title: 'Decision Framework',
    description: 'Translate insights into a repeatable intervention logic leadership can act on weekly.',
    Icon: Compass,
  },
  {
    title: 'Strategic Clarity',
    description: 'Refine decision discipline continuously under real market pressure.',
    Icon: Scale,
  },
]

export default function Process() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(Array(steps.length).fill(false))
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    stepRefs.current.forEach((node, index) => {
      if (!node) return

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setVisibleSteps(prev => {
                if (prev[index]) return prev
                const next = [...prev]
                next[index] = true
                return next
              })
              observer.unobserve(node)
            }
          })
        },
        { threshold: 0.35 }
      )

      observer.observe(node)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const filledPercent = (visibleSteps.filter(Boolean).length / steps.length) * 100

  return (
    <section id="method" className="pt-6 md:pt-8 pb-24 md:pb-28 px-6 bg-[#050505] text-[#f5f5f5]">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-white/50 mb-3">My Method</p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">How It Works</h2>
      </div>

      <div className="relative max-w-6xl mx-auto mt-16">
        {/* Timeline lines */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/12" aria-hidden />
        <div
          className="hidden md:block absolute left-1/2 top-0 w-px bg-white/70 origin-top transition-all duration-700 ease-out"
          style={{ height: `${filledPercent}%` }}
          aria-hidden
        />

        {/* Mobile line */}
        <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-white/12" aria-hidden />
        <div
          className="md:hidden absolute left-5 top-0 w-px bg-white/70 origin-top transition-all duration-700 ease-out"
          style={{ height: `${filledPercent}%` }}
          aria-hidden
        />

        <div className="flex flex-col gap-12">
          {steps.map((step, index) => {
            const Icon = step.Icon
            const isLeft = index % 2 === 0
            const visible = visibleSteps[index]

            return (
              <div key={step.title} className="relative md:min-h-[140px]">
                {/* Connector node */}
                <div
                  className={`absolute ${isLeft ? 'md:left-1/2 md:-translate-x-1/2' : 'md:left-1/2 md:-translate-x-1/2'} left-5 md:left-1/2 md:-translate-x-1/2 top-3 flex items-center justify-center`}
                  aria-hidden
                >
                  <div className="relative h-4 w-4">
                    <span
                      className={`absolute inset-0 rounded-full border border-white/60 bg-[#050505] transition-all duration-500 ${visible ? 'shadow-[0_0_0_6px_rgba(255,255,255,0.07)]' : ''}`}
                    />
                    <span
                      className={`absolute inset-[5px] rounded-full bg-white transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-40'}`}
                    />
                  </div>
                </div>

                <div
                  ref={el => {
                    stepRefs.current[index] = el
                  }}
                  className={`relative flex md:flex-row ${isLeft ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16'} pl-12 md:pl-0`}
                >
                  <div
                    className={`relative max-w-[420px] w-full rounded-[18px] border border-white/8 bg-[#0e0e0e] p-7 transition-all duration-300 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}`}
                  >
                    <div className="flex items-center gap-3 text-white/60 text-xs tracking-[0.08em] uppercase">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div className="h-px w-8 bg-white/15" />
                      <Icon className="text-white/80" size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mt-3">{step.title}</h3>
                    <p className="text-[#a1a1a1] leading-relaxed mt-3">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

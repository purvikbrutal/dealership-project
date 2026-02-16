'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Metric = {
  id: 'closing' | 'lead' | 'revenue'
  value: number
  prefix?: string
  suffix?: string
  label: string
  sub: string
  detailTitle: string
  detailText: string
}

const metrics: Metric[] = [
  {
    id: 'closing',
    value: 27,
    suffix: '%',
    label: 'Closing Ratio',
    sub: 'Improved from 12% after structured follow-up intervention',
    detailTitle: 'Sales Follow-Up Discipline',
    detailText:
      'Dealership lacked structured follow-up cadence. Leads were contacted inconsistently and dropped after first interaction. Implementing a weekly response protocol and accountability checkpoints increased close rate from 12% to 27%.',
  },
  {
    id: 'lead',
    value: 45,
    prefix: '+',
    suffix: '%',
    label: 'Lead Conversion',
    sub: 'Optimized response timing and sales process discipline',
    detailTitle: 'Response Timing & Process Correction',
    detailText:
      'Lead handling delays exceeded 4 hours on average. Adjusting response windows, lead ownership, and manager review cadence improved conversion efficiency by 45%.',
  },
  {
    id: 'revenue',
    value: 280,
    prefix: '+$',
    suffix: 'K',
    label: 'Annual Revenue',
    sub: 'Inventory positioning and margin correction',
    detailTitle: 'Inventory Positioning & Margin Protection',
    detailText:
      'Capital was tied in aged units and price adjustments lagged market conditions. Strategic repricing and rotation discipline generated an additional $280K annual revenue.',
  },
]

export default function Results() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0))
  const [activeId, setActiveId] = useState<Metric['id']>('closing')
  const [panelVisible, setPanelVisible] = useState(true)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const duration = 1200
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCounts(metrics.map(m => Math.round(m.value * eased)))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [visible])

  const activeMetric = useMemo(() => metrics.find(m => m.id === activeId) ?? metrics[0], [activeId])

  useEffect(() => {
    setPanelVisible(false)
    const t = setTimeout(() => setPanelVisible(true), 60)
    return () => clearTimeout(t)
  }, [activeId])

  const formatMetric = (value: number, metric: Metric) => {
    const prefix = metric.prefix ?? ''
    const suffix = metric.suffix ?? ''
    return `${prefix}${value}${suffix}`
  }

  return (
    <section id="results" ref={sectionRef} className="bg-[#050505] text-[#f5f5f5] px-5 pt-20 pb-12 md:pt-24 md:pb-12 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Performance Impact</h2>
          <p className="text-[#a1a1a1] max-w-2xl mx-auto text-base md:text-lg mt-4">
            Measured operational improvements after structured intervention.
          </p>
        </div>

        <div className="performance-section mt-12 grid grid-cols-1 md:[grid-template-columns:1fr_1.1fr] items-start gap-10 md:gap-[60px] md:min-h-[650px]">
          <div className="relative kpi-column flex flex-col h-full min-h-[420px]">
            <span className="absolute left-3 top-0 bottom-0 w-px bg-white/12" aria-hidden />
            <div className="flex flex-col gap-[22px]">
              {metrics.map((metric, index) => {
                const isActive = activeId === metric.id
                const displayValue = visible ? counts[index] : 0

                return (
                  <button
                    key={metric.id}
                    onMouseEnter={() => setActiveId(metric.id)}
                    className="kpi-item group relative w-full text-left pl-10 pr-2 md:pr-4 py-2 md:py-2 rounded-xl transition-colors duration-300 bg-white/[0.03] border border-white/8 md:bg-transparent md:border-none"
                  >
                    <div
                      className={`absolute left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-white/70 transition-all duration-300 ${
                        isActive ? 'bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.07)]' : 'bg-[#050505]'
                      }`}
                      aria-hidden
                    />
                    <div className={`kpi-number text-5xl md:text-7xl font-semibold leading-none transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'} mb-[6px]`}>
                      {formatMetric(displayValue, metric)}
                    </div>
                    <div className="flex flex-col">
                      <span className={`kpi-label text-[13px] md:text-sm uppercase tracking-[0.18em] md:tracking-[0.12em] ${isActive ? 'text-white/70' : 'text-white/50'} mb-[8px]`}>
                        {metric.label}
                      </span>
                      <span className="text-[#8c8c8c] text-sm leading-relaxed">{metric.sub}</span>
                    </div>
                    <div className="mt-2 h-px w-full bg-white/8" aria-hidden />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="case-column hidden md:flex items-start md:items-center mt-7 md:mt-0">
            <div
              className="case-card relative rounded-[24px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-11 min-h-[420px] md:sticky md:top-[140px] transition-opacity duration-250 backdrop-blur-[14px] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_40px_80px_rgba(0,0,0,0.45)] flex-1 h-full"
              aria-live="polite"
            >
              <span className="pointer-events-none absolute inset-0 rounded-[24px] opacity-35" style={{ background: 'radial-gradient(600px circle at 20% 10%, rgba(255,255,255,0.12), transparent 60%)' }} aria-hidden />
              <div className={`${panelVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 ease-out`}>
                <p className="text-[12px] uppercase tracking-[0.22em] text-white/55 mb-3">Case Insight</p>
                <h3 className="case-title text-[22px] md:text-[28px] font-semibold text-white mb-[18px] leading-tight">{activeMetric.detailTitle}</h3>
                <p className="case-text text-[14px] md:text-[15px] leading-[1.7] md:leading-[1.8] text-white/85 md:text-white/75 max-w-[520px]">{activeMetric.detailText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

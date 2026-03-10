'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Metric = {
  id: 'inventory' | 'margin' | 'decision' | 'alignment'
  from: string
  to: string
  label: string
  sub: string
  detailTitle: string
  detailText: string
}

const metrics: Metric[] = [
  {
    id: 'inventory',
    from: '20–25%',
    to: '5–10%',
    label: 'Aged Inventory Exposure',
    sub: 'Capital trapped in slow-moving units reduced through rotation discipline.',
    detailTitle: 'Inventory Rotation Discipline',
    detailText:
      'Dealerships typically carry a significant portion of capital in aging inventory. By identifying slow-moving units early and adjusting pricing and positioning, inventory turnover improves and capital is released back into operations.',
  },
  {
    id: 'margin',
    from: '3–5% monthly',
    to: 'Controlled',
    label: 'Margin Leakage',
    sub: 'Early detection allows corrective action weeks sooner.',
    detailTitle: 'Margin Protection Timing',
    detailText:
      'Margin deterioration often begins weeks before it appears in reports. Early warning signals allow managers to intervene before discounts escalate and profitability declines.',
  },
  {
    id: 'decision',
    from: '5–7 days',
    to: '1–2 days',
    label: 'Decision Turnaround',
    sub: 'Leadership receives clear intervention signals faster.',
    detailTitle: 'Decision Speed',
    detailText:
      'Instead of waiting for monthly reporting cycles, leadership receives actionable signals weekly. This shortens reaction time and prevents operational drift.',
  },
  {
    id: 'alignment',
    from: '65–75%',
    to: '80–90%',
    label: 'Units Selling Above Floor Plan',
    sub: 'Improved pricing and positioning alignment.',
    detailTitle: 'Pricing & Positioning Alignment',
    detailText:
      'When vehicles are aligned with real market demand, more units sell above floor plan and require fewer late-stage price reductions.',
  },
]

export default function PotentialImpact() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeId, setActiveId] = useState<Metric['id']>('inventory')
  const [panelVisible, setPanelVisible] = useState(true)

  const activeMetric = useMemo(() => metrics.find(m => m.id === activeId) ?? metrics[0], [activeId])

  useEffect(() => {
    setPanelVisible(false)
    const t = setTimeout(() => setPanelVisible(true), 60)
    return () => clearTimeout(t)
  }, [activeId])

  return (
    <section
      id="potential-impact"
      ref={sectionRef}
      className="blue-section text-[#f5f5f5] px-5 md:px-6 py-[80px] md:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-white/50 mb-3">POTENTIAL IMPACT</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Expected Operational Improvement</h2>
          <p className="text-[#a1a1a1] max-w-2xl mx-auto text-base md:text-lg mt-4">
            Typical operational changes dealerships experience after structured decision intelligence is implemented.
          </p>
        </div>

        <div className="performance-section mt-12 grid grid-cols-1 md:[grid-template-columns:1.1fr_0.9fr] items-center gap-9 md:gap-[72px] md:min-h-[650px]">
          <div className="relative kpi-column flex flex-col h-full min-h-[420px]">
            <span className="absolute left-3 top-0 bottom-0 w-px bg-white/12" aria-hidden />
            <div className="flex flex-col space-y-[44px] md:space-y-[44px]">
              {metrics.map(metric => {
                const isActive = activeId === metric.id

                return (
                  <button
                    key={metric.id}
                    onMouseEnter={() => setActiveId(metric.id)}
                    onClick={() => setActiveId(metric.id)}
                    className="group relative w-full text-left pl-[26px] pr-2 md:pr-4 pt-1 pb-1 rounded-xl transition-colors duration-300 bg-[#0d1b31]/55 border border-[#87b2ff]/10 md:bg-transparent md:border-none"
                  >
                    <div
                      className={`absolute left-0 top-[14px] h-3 w-3 rounded-full border border-[#b3d0ff]/70 transition-all duration-300 ${
                        isActive ? 'bg-[#eef6ff] shadow-[0_0_0_6px_rgba(112,165,245,0.16)]' : 'bg-[#06111f]'
                      }`}
                      aria-hidden
                    />
                    <div className={`kpi-number text-[26px] md:text-[32px] lg:text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'}`}>
                      <span>{metric.from}</span>
                      <span className="mx-[10px] opacity-60">→</span>
                      <span>{metric.to}</span>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="text-[12px] uppercase tracking-[0.18em] text-white/60 mt-[8px] mb-[6px]">
                        {metric.label}
                      </span>
                      <span className="text-[14px] leading-[1.6] text-white/55 max-w-[420px] mt-[10px]">{metric.sub}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="case-column grid md:flex items-center mt-2 md:mt-0">
            <div
              className="blue-panel case-card relative rounded-[24px] md:min-h-[360px] min-h-[360px] transition-opacity duration-250 flex flex-col justify-center px-[32px] py-[32px] md:px-[44px] md:py-[42px]"
              aria-live="polite"
            >
              <span className="pointer-events-none absolute inset-0 rounded-[24px] opacity-35" style={{ background: 'radial-gradient(600px circle at 20% 10%, rgba(122, 173, 255, 0.18), transparent 60%)' }} aria-hidden />
              <div className={`${panelVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 ease-out`}>
                <p className="text-[12px] uppercase tracking-[0.22em] text-white/55 mb-3">Insight</p>
                <h3 className="case-title text-[22px] font-semibold text-white mb-[12px] leading-tight">{activeMetric.detailTitle}</h3>
                <p className="case-text text-[15px] leading-[1.7] text-white/85 md:text-white/75 max-w-[440px]">{activeMetric.detailText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

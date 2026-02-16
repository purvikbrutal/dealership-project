'use client'

import { useEffect, useRef, useState } from 'react'
import { Activity, Hourglass, Radar, RefreshCcw, Target, Timer } from 'lucide-react'

const problems = [
  {
    title: 'Capital Locked in Ageing Inventory',
    description:
      'Liquidity compresses, floorplan exposure rises, and capital stays trapped as units exceed optimal holding periods.',
    Icon: Hourglass,
  },
  {
    title: 'Margin Sensitivity Blind Spots',
    description:
      'Delayed pricing, recon, or market alignment quietly erode gross margins long before it shows in reporting.',
    Icon: Activity,
  },
  {
    title: 'Delayed Intervention Timing',
    description:
      'Corrective action often comes after thresholds are crossed—by then, margin and capital efficiency are already hit.',
    Icon: Timer,
  },
  {
    title: 'Fragmented Operational Signals',
    description:
      'Data exists, but without a unified diagnostic lens, leadership lacks structured prioritization and decisive actions.',
    Icon: Radar,
  },
  {
    title: 'Distorted Rotation Objectives',
    description:
      'Ageing stock and misaligned incentives break strategic rotation, restricting purchasing power and tying cash.',
    Icon: RefreshCcw,
  },
  {
    title: 'Hesitation Under Pressure',
    description:
      'In high-capital environments, the cost is in hesitation—not awareness—when intervention logic is unclear.',
    Icon: Target,
  },
]

const trackItems = [...problems, ...problems, ...problems]

export default function Problems() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const node = trackRef.current
    if (!node) return

    const handlePointerDown = (e: PointerEvent) => {
      const startX = e.clientX
      const startScroll = node.scrollLeft
      const onMove = (moveEvent: PointerEvent) => {
        node.scrollLeft = startScroll - (moveEvent.clientX - startX)
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    }

    node.addEventListener('pointerdown', handlePointerDown)
    return () => node.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  return (
    <section className="py-28 px-0 bg-[#050505] text-[#f5f5f5]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">The Silent Erosion of Value in Luxury Inventory</h2>
        <p className="max-w-2xl mx-auto text-[#a1a1a1] text-base md:text-lg leading-relaxed mt-4">
          Pinpoint the capital leaks before they hollow out margin and momentum.
        </p>
      </div>

      <div className="relative w-full mt-16" aria-label="Luxury risks carousel">
        <div
          ref={trackRef as React.RefObject<HTMLDivElement>}
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className={`flex gap-8 w-max items-stretch animate-[carousel-scroll_48s_linear_infinite] ${paused ? '[animation-play-state:paused]' : ''}`}
          >
            {trackItems.map((problem, index) => {
              const Icon = problem.Icon
              return (
                <div
                  key={`${problem.title}-${index}`}
                  className="group relative min-w-[280px] md:min-w-[320px] max-w-[340px] flex-shrink-0 rounded-2xl border border-white/10 bg-[#0e0e0e] p-7 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 before:absolute before:inset-0 before:rounded-2xl before:bg-white/5 before:opacity-0 hover:before:opacity-100 before:transition"
                >
                  <div className="relative flex flex-col gap-3">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <Icon className="text-white/90" size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-white leading-tight">{problem.title}</h3>
                    <p className="text-[#a1a1a1] leading-relaxed text-sm md:text-base">{problem.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { memo } from 'react'

type Step = {
  key: string
  label: string
  title: string
}

type StepIndicatorProps = {
  steps: Step[]
  step: number
}

const StepIndicator = ({ steps, step }: StepIndicatorProps) => (
  <div className="flex items-center justify-center gap-3 mb-8 md:mb-10" aria-label="Progress">
    {steps.map((s, idx) => {
      const active = idx === step
      const complete = idx < step
      return (
        <div key={s.key} className="flex items-center gap-3">
          <div
            className={`h-4 w-4 rounded-full border transition-colors duration-200 ${
              active ? 'bg-white border-white' : complete ? 'bg-white/70 border-white/70' : 'border-white/30'
            }`}
            aria-hidden
          />
          {idx < steps.length - 1 && <span className="h-px w-10 md:w-14 bg-white/15" aria-hidden />}
        </div>
      )
    })}
  </div>
)

export default memo(StepIndicator)

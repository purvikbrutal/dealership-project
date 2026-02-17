'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

type ConfirmStepProps = {
  selectedDate: Date | null
  selectedTime: string
  selectedTimeLabel: string
  fullName: string
  email: string
  phone: string
  biggestProblem: string
  consent: boolean
  error: string | null
  onBiggestProblemChange: (value: string) => void
  onConsentChange: (value: boolean) => void
}

const ConfirmStep = ({
  selectedDate,
  selectedTime,
  selectedTimeLabel,
  fullName,
  email,
  phone,
  biggestProblem,
  consent,
  error,
  onBiggestProblemChange,
  onConsentChange,
}: ConfirmStepProps) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
    <h2 className="text-2xl md:text-[26px] font-semibold text-white">Confirm Your Strategy Call</h2>
    <p className="text-white/65 mt-2">Review your booking before confirming.</p>

    <div className="mt-6 rounded-xl border border-white/10 bg-[#0f0f0f] p-5 flex flex-col gap-3">
      <div className="flex justify-between text-sm text-white/80"><span>Date</span><span>{selectedDate ? selectedDate.toDateString() : 'Not set'}</span></div>
      <div className="flex justify-between text-sm text-white/80"><span>Time</span><span>{selectedTimeLabel || selectedTime || 'Not set'}</span></div>
      <div className="flex justify-between text-sm text-white/80"><span>Name</span><span>{fullName || '—'}</span></div>
      <div className="flex justify-between text-sm text-white/80"><span>Email</span><span>{email || '—'}</span></div>
      <div className="flex justify-between text-sm text-white/80"><span>Phone</span><span>{phone || '—'}</span></div>
    </div>

    <div className="mt-5 flex flex-col">
      <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Anything you want me to review?</label>
      <textarea
        value={biggestProblem}
        onChange={e => onBiggestProblemChange(e.target.value)}
        rows={4}
        className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
        placeholder="Share context or links to review before the call."
      />
    </div>

    <label className="mt-4 flex items-start gap-3 text-sm text-white/80">
      <input
        type="checkbox"
        checked={consent}
        onChange={e => onConsentChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-white/40 bg-[#0f0f0f]"
      />
      <span>I agree to be contacted regarding this consultation.</span>
    </label>

    {error && <p className="text-red-400 text-sm mt-3" role="alert">{error}</p>}
  </motion.div>
)

export default memo(ConfirmStep)

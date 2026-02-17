'use client'

import { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type DetailsStepProps = {
  fullName: string
  email: string
  phone: string
  dealershipName: string
  location: string
  inventoryType: string
  monthlyVolume: string
  biggestProblem: string
  contactMethod: string
  detailsOpen: boolean
  error: string | null
  onToggleDetails: () => void
  onFullNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onDealershipNameChange: (value: string) => void
  onLocationChange: (value: string) => void
  onInventoryTypeChange: (value: string) => void
  onMonthlyVolumeChange: (value: string) => void
  onContactMethodChange: (value: string) => void
  onBiggestProblemChange: (value: string) => void
}

const DetailsStep = ({
  fullName,
  email,
  phone,
  dealershipName,
  location,
  inventoryType,
  monthlyVolume,
  biggestProblem,
  contactMethod,
  detailsOpen,
  error,
  onToggleDetails,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  onDealershipNameChange,
  onLocationChange,
  onInventoryTypeChange,
  onMonthlyVolumeChange,
  onContactMethodChange,
  onBiggestProblemChange,
}: DetailsStepProps) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
    <h2 className="text-2xl md:text-[26px] font-semibold text-white">A Few Details First</h2>
    <p className="text-white/65 mt-2">So I can prepare for your dealership.</p>

    <div className="mt-6 flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Full Name *</label>
          <input
            value={fullName}
            onChange={e => onFullNameChange(e.target.value)}
            className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
            placeholder="Your name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Email Address *</label>
          <input
            type="email"
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Phone Number *</label>
          <input
            value={phone}
            onChange={e => onPhoneChange(e.target.value)}
            className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
            placeholder="+1 555 123 4567"
            required
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0c0c0c]">
        <button
          type="button"
          onClick={onToggleDetails}
          className="w-full flex items-center justify-between px-4 py-3 text-white/80"
        >
          <span className="text-[13px] uppercase tracking-[0.12em]">Dealership Info (optional)</span>
          <span className="text-sm text-white/60">{detailsOpen ? 'Hide' : 'Add'}</span>
        </button>
        <AnimatePresence initial={false}>
          {detailsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-4 pt-1 flex flex-col gap-4"
            >
              <div className="flex flex-col">
                <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Dealership Name</label>
                <input
                  value={dealershipName}
                  onChange={e => onDealershipNameChange(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                  placeholder="Your dealership"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Location</label>
                <input
                  value={location}
                  onChange={e => onLocationChange(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                  placeholder="City, Country"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Inventory Type</label>
                <select
                  value={inventoryType}
                  onChange={e => onInventoryTypeChange(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                >
                  <option value="">Select</option>
                  <option value="New">New</option>
                  <option value="Pre-Owned">Pre-Owned</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Average monthly sales volume</label>
                <select
                  value={monthlyVolume}
                  onChange={e => onMonthlyVolumeChange(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                >
                  <option value="">Select</option>
                  <option value="<20">&lt;20</option>
                  <option value="20-50">20-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Preferred contact method</label>
                <select
                  value={contactMethod}
                  onChange={e => onContactMethodChange(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                >
                  <option value="Call">Call</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Biggest current problem</label>
                <textarea
                  value={biggestProblem}
                  onChange={e => onBiggestProblemChange(e.target.value)}
                  rows={3}
                  placeholder="Inventory aging, low conversion, slow leads, pricing issues, margins, etc."
                  className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
    </div>
  </motion.div>
)

export default memo(DetailsStep)

'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'

type TimeSlot = {
  label: string
  value: string
}

type TimeStepProps = {
  selectedDate: Date | null
  selectedTime: string
  timeSlots: TimeSlot[]
  onDateChange: (date: Date | null) => void
  onTimeSelect: (value: string) => void
}

const TimeStep = ({ selectedDate, selectedTime, timeSlots, onDateChange, onTimeSelect }: TimeStepProps) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
    <h2 className="text-2xl md:text-[26px] font-semibold text-white">Choose a Time</h2>
    <p className="text-white/65 mt-2">Pick a time that works for you.</p>

    <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f0f0f] p-4 md:p-5">
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        inline
        calendarClassName="!bg-[#0f0f0f] !text-white w-full"
        dayClassName={() => '!text-white'}
        minDate={new Date()}
      />
    </div>

    {selectedDate && (
      <div className="mt-6">
        <p className="text-white/70 text-sm mb-3">Available slots (10:00 AM - 7:00 PM)</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {timeSlots.map(slot => (
            <button
              key={slot.value}
              type="button"
              onClick={() => onTimeSelect(slot.value)}
              className={`rounded-xl px-3 py-2 text-sm transition-all duration-150 border ${
                selectedTime === slot.value
                  ? 'bg-white text-black border-white'
                  : 'border-white/15 text-white/80 hover:border-white/40 hover:bg-white/5'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>
    )}

    {!selectedDate && <p className="text-xs text-white/50 mt-3">Select a date to unlock available times.</p>}
  </motion.div>
)

export default memo(TimeStep)

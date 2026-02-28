"use client"

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const timeSlotLabels = (startHour: number, endHour: number, intervalMinutes: number) => {
  const slots: { label: string; value: string }[] = []
  const date = new Date()
  date.setSeconds(0, 0)
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      if (hour === endHour && minute > 0) break
      const d = new Date(date)
      d.setHours(hour, minute, 0, 0)
      slots.push({ label: d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}` })
    }
  }
  return slots
}

export default function BookCallPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [formData, setFormData] = useState({
    fullName: "",
    "use client"

    import { AnimatePresence, motion } from "framer-motion"
    import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
    import DatePicker from "react-datepicker"
    import "react-datepicker/dist/react-datepicker.css"

    const steps = [
      { key: "time", label: "Step 1", title: "Time" },
      { key: "details", label: "Step 2", title: "Details" },
      { key: "confirm", label: "Step 3", title: "Confirm" },
    ]

    const timeSlotLabels = (startHour: number, endHour: number, intervalMinutes: number) => {
      const slots: { label: string; value: string }[] = []
      const date = new Date()
      date.setSeconds(0, 0)
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
          if (hour === endHour && minute > 0) break
          const d = new Date(date)
          d.setHours(hour, minute, 0, 0)
          slots.push({
            label: d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
          })
        }
      }
      return slots
    }

    export default function BookCallPage() {
      const [step, setStep] = useState(0)
      const [selectedDate, setSelectedDate] = useState<Date | null>(null)
      const [selectedTime, setSelectedTime] = useState("")
      const [detailsOpen, setDetailsOpen] = useState(false)
      const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        dealershipName: "",
        location: "",
        inventoryType: "",
        monthlyVolume: "",
        biggestProblem: "",
        contactMethod: "Call",
        consent: false,
      })
      const [submitting, setSubmitting] = useState(false)
      const [error, setError] = useState<string | null>(null)
      const [success, setSuccess] = useState(false)

      const timeSlots = useMemo(() => timeSlotLabels(10, 19, 30), [])
      const selectedTimeLabel = useMemo(() => timeSlots.find(t => t.value === selectedTime)?.label || "", [selectedTime, timeSlots])

      useEffect(() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      }, [step])

      const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
      }

      const canContinueStep1 = selectedDate && selectedTime
      const canContinueStep2 = formData.fullName.trim() && formData.email.trim() && formData.phone.trim()

      const goNext = () => {
        setError(null)
        if (step === 0 && !canContinueStep1) return
        if (step === 1 && !canContinueStep2) {
          setError("Please fill in name, email, and phone.")
          return
        }
        setStep(prev => Math.min(prev + 1, steps.length - 1))
      }

      const goBack = () => {
        setError(null)
        setStep(prev => Math.max(prev - 1, 0))
      }

      const handleSubmit = async (e?: FormEvent) => {
        if (e) e.preventDefault()
        setError(null)

        if (!selectedDate || !selectedTime) {
          setError("Please select a date and time for your call.")
          return
        }
        if (!formData.fullName || !formData.email || !formData.phone) {
          setError("Please fill in name, email, and phone.")
          setStep(1)
          return
        }
        if (!formData.consent) {
          setError("Please agree to be contacted for this consultation.")
          return
        }

        const [hours, minutes] = selectedTime.split(":").map(Number)
        const combined = new Date(selectedDate)
        combined.setHours(hours, minutes, 0, 0)

        setSubmitting(true)
        try {
          const res = await fetch("/api/book-call", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              datetime: combined.toISOString(),
              dateDisplay: selectedDate.toDateString(),
              timeDisplay: combined.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            }),
          })

          if (!res.ok) {
            const data = await res.json().catch(() => ({}))
            throw new Error(data?.error || "Failed to send booking. Please try again.")
          }

          setSuccess(true)
        } catch (err: any) {
          setError(err.message || "Failed to send booking. Please try again.")
        } finally {
          setSubmitting(false)
        }
      }

      const StepIndicator = () => (
        <div className="flex items-center justify-center gap-3 mb-8 md:mb-10" aria-label="Progress">
          {steps.map((s, idx) => {
            const active = idx === step
            const complete = idx < step
            return (
              <div key={s.key} className="flex items-center gap-3">
                <div
                  className={`h-4 w-4 rounded-full border transition-colors duration-200 ${
                    active ? "bg-white border-white" : complete ? "bg-white/70 border-white/70" : "border-white/30"
                  }`}
                  aria-hidden
                />
                {idx < steps.length - 1 && <span className="h-px w-10 md:w-14 bg-white/15" aria-hidden />}
              </div>
            )
          })}
        </div>
      )

      const TimeStep = () => (
        <motion.div key="time" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          <h2 className="text-2xl md:text-[26px] font-semibold text-white">Choose a Time</h2>
          <p className="text-white/65 mt-2">Pick a time that works for you.</p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f0f0f] p-4 md:p-5">
            <DatePicker
              selected={selectedDate}
              onChange={date => {
                setSelectedDate(date)
                setSelectedTime("")
              }}
              inline
              calendarClassName="!bg-[#0f0f0f] !text-white w-full"
              dayClassName={() => "!text-white"}
              minDate={new Date()}
            />
          </div>

          {selectedDate && (
            <div className="mt-6">
              <p className="text-white/70 text-sm mb-3">Available slots (10:00 AM – 7:00 PM)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {timeSlots.map(slot => (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => setSelectedTime(slot.value)}
                    className={`rounded-xl px-3 py-2 text-sm transition-all duration-150 border ${
                      selectedTime === slot.value
                        ? "bg-white text-black border-white"
                        : "border-white/15 text-white/80 hover:border-white/40 hover:bg-white/5"
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

      const DetailsStep = () => (
        <motion.div key="details" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          <h2 className="text-2xl md:text-[26px] font-semibold text-white">A Few Details First</h2>
          <p className="text-white/65 mt-2">So I can prepare for your dealership.</p>

          <div className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Full Name *</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Phone Number *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                  placeholder="+1 555 123 4567"
                  required
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0c0c0c]">
              <button
                type="button"
                onClick={() => setDetailsOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3 text-white/80"
              >
                <span className="text-[13px] uppercase tracking-[0.12em]">Dealership Info (optional)</span>
                <span className="text-sm text-white/60">{detailsOpen ? "Hide" : "Add"}</span>
              </button>
              <AnimatePresence initial={false}>
                {detailsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 pt-1 flex flex-col gap-4"
                  >
                    <div className="flex flex-col">
                      <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Dealership Name</label>
                      <input
                        name="dealershipName"
                        value={formData.dealershipName}
                        onChange={handleInputChange}
                        className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                        placeholder="Your dealership"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Location</label>
                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Inventory Type</label>
                      <select
                        name="inventoryType"
                        value={formData.inventoryType}
                        onChange={handleInputChange}
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
                        name="monthlyVolume"
                        value={formData.monthlyVolume}
                        onChange={handleInputChange}
                        className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                      >
                        <option value="">Select</option>
                        <option value="<20">&lt;20</option>
                        <option value="20-50">20–50</option>
                        <option value="50-100">50–100</option>
                        <option value="100+">100+</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Preferred contact method</label>
                      <select
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleInputChange}
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
                        name="biggestProblem"
                        value={formData.biggestProblem}
                        onChange={handleInputChange}
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

      const ConfirmStep = () => (
        <motion.div key="confirm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          <h2 className="text-2xl md:text-[26px] font-semibold text-white">Confirm Your Strategy Call</h2>
          <p className="text-white/65 mt-2">Review your booking before confirming.</p>

          <div className="mt-6 rounded-xl border border-white/10 bg-[#0f0f0f] p-5 flex flex-col gap-3">
            <div className="flex justify-between text-sm text-white/80"><span>Date</span><span>{selectedDate ? selectedDate.toDateString() : "Not set"}</span></div>
            <div className="flex justify-between text-sm text-white/80"><span>Time</span><span>{selectedTimeLabel || selectedTime || "Not set"}</span></div>
            <div className="flex justify-between text-sm text-white/80"><span>Name</span><span>{formData.fullName || "—"}</span></div>
            <div className="flex justify-between text-sm text-white/80"><span>Email</span><span>{formData.email || "—"}</span></div>
            <div className="flex justify-between text-sm text-white/80"><span>Phone</span><span>{formData.phone || "—"}</span></div>
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-[13px] uppercase tracking-[0.12em] text-white/60">Anything you want me to review?</label>
            <textarea
              name="biggestProblem"
              value={formData.biggestProblem}
              onChange={handleInputChange}
              rows={4}
              className="mt-2 w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              placeholder="Share context or links to review before the call."
            />
          </div>

          <label className="mt-4 flex items-start gap-3 text-sm text-white/80">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 rounded border-white/40 bg-[#0f0f0f]"
            />
            <span>I agree to be contacted regarding this consultation.</span>
          </label>

          {error && <p className="text-red-400 text-sm mt-3" role="alert">{error}</p>}
        </motion.div>
      )

      const renderContent = () => {
        if (success) {
          return (
            <div className="text-center p-10 md:p-12">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black text-2xl">✔</div>
              <h2 className="text-3xl font-semibold text-white mb-3">You're Booked</h2>
              <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
                I’ve received your request. I’ll review your dealership before our call and reach out if needed.
              </p>
              {selectedDate && selectedTimeLabel && (
                <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/90">
                  <span className="font-medium">Selected:</span>
                  <span>
                    {selectedDate.toDateString()} • {selectedTimeLabel}
                  </span>
                </div>
              )}
              <a
                href="/"
                className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:translate-y-[-1px] transition-transform"
              >
                Back to Home
              </a>
            </div>
          )
        }

        return (
          <>
            <StepIndicator />
            <AnimatePresence mode="wait">{
              step === 0 ? <TimeStep /> : step === 1 ? <DetailsStep /> : <ConfirmStep />
            }</AnimatePresence>
          </>
        )
      }

      const renderActions = () => {
        if (success) return null
        return (
          <div className="fixed md:static bottom-0 left-0 right-0 bg-[#050505]/95 backdrop-blur-sm border-t border-white/5 px-4 py-4 md:px-0 md:py-0 md:bg-transparent md:border-0 z-20">
            <div className="max-w-[720px] mx-auto flex items-center justify-between gap-3">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="w-full md:w-auto rounded-xl border border-white/20 px-4 py-3 text-white hover:border-white/50 transition-colors"
                >
                  Back
                </button>
              ) : (
                <span className="w-full md:w-auto" />
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={(step === 0 && !canContinueStep1) || (step === 1 && !canContinueStep2)}
                  className="w-full md:w-auto rounded-xl bg-white text-black font-semibold px-5 py-3 transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full md:w-auto rounded-xl bg-white text-black font-semibold px-5 py-3 transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" aria-hidden />}
                  {submitting ? "Sending..." : "Confirm Booking"}
                </button>
              )}
            </div>
          </div>
        )
      }

      return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] px-4 py-16 md:py-20">
          <div className="max-w-[720px] mx-auto pb-24 md:pb-0">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-[34px] md:text-5xl font-semibold tracking-tight">Book a Strategy Call</h1>
              <p className="text-white/70 mt-3 max-w-xl mx-auto text-base md:text-lg">
                Select a time and share a few details so I can prepare before our conversation.
              </p>
            </div>

            <div className="relative rounded-[18px] border border-white/10 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.45)] p-6 md:p-10">
              {renderContent()}
            </div>
          </div>
          {renderActions()}

          <style jsx global>{`
            .react-datepicker {
              background-color: #0f0f0f !important;
              border: 1px solid rgba(255, 255, 255, 0.12) !important;
              color: #f5f5f5 !important;
              width: 100%;
            }
            .react-datepicker__header {
              background-color: #0d0d0d !important;
              border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
            }
            .react-datepicker__current-month,
            .react-datepicker__day-name {
              color: #f5f5f5 !important;
            }
            .react-datepicker__day {
              color: #f5f5f5 !important;
            }
            .react-datepicker__day--selected,
            .react-datepicker__day--keyboard-selected {
              background-color: rgba(255, 255, 255, 0.16) !important;
              color: #fff !important;
            }
            .react-datepicker__day:hover {
              background-color: rgba(255, 255, 255, 0.08) !important;
            }
          `}</style>
        </div>
      )
    }

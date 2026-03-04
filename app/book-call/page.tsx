"use client"

import { AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useState, type FormEvent } from "react"
import ConfirmStep from "../../components/book-call/ConfirmStep"
import DetailsStep from "../../components/book-call/DetailsStep"
import StepIndicator from "../../components/book-call/StepIndicator"
import TimeStep from "../../components/book-call/TimeStep"
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
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const timeSlots = useMemo(() => timeSlotLabels(10, 19, 30), [])
  const selectedTimeLabel = useMemo(
    () => timeSlots.find(t => t.value === selectedTime)?.label || "",
    [selectedTime, timeSlots],
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [step])

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
          notes,
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
        <StepIndicator steps={steps} step={step} />
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <TimeStep
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              timeSlots={timeSlots}
              onDateChange={(date: Date | null) => {
                setSelectedDate(date)
                setSelectedTime("")
              }}
              onTimeSelect={value => setSelectedTime(value)}
            />
          ) : step === 1 ? (
            <DetailsStep
              fullName={formData.fullName}
              email={formData.email}
              phone={formData.phone}
              dealershipName={formData.dealershipName}
              location={formData.location}
              inventoryType={formData.inventoryType}
              monthlyVolume={formData.monthlyVolume}
              biggestProblem={formData.biggestProblem}
              contactMethod={formData.contactMethod}
              detailsOpen={detailsOpen}
              error={error}
              onToggleDetails={() => setDetailsOpen(o => !o)}
              onFullNameChange={value => setFormData(prev => ({ ...prev, fullName: value }))}
              onEmailChange={value => setFormData(prev => ({ ...prev, email: value }))}
              onPhoneChange={value => setFormData(prev => ({ ...prev, phone: value }))}
              onDealershipNameChange={value => setFormData(prev => ({ ...prev, dealershipName: value }))}
              onLocationChange={value => setFormData(prev => ({ ...prev, location: value }))}
              onInventoryTypeChange={value => setFormData(prev => ({ ...prev, inventoryType: value }))}
              onMonthlyVolumeChange={value => setFormData(prev => ({ ...prev, monthlyVolume: value }))}
              onContactMethodChange={value => setFormData(prev => ({ ...prev, contactMethod: value }))}
              onBiggestProblemChange={value => setFormData(prev => ({ ...prev, biggestProblem: value }))}
            />
          ) : (
            <ConfirmStep
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedTimeLabel={selectedTimeLabel}
              fullName={formData.fullName}
              email={formData.email}
              phone={formData.phone}
              notes={notes}
              consent={formData.consent}
              error={error}
              onNotesChange={setNotes}
              onConsentChange={value => setFormData(prev => ({ ...prev, consent: value }))}
            />
          )}
        </AnimatePresence>
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

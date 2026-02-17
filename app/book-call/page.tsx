"use client"

import { AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useState, type FormEvent } from "react"
import StepIndicator from "@/components/book-call/StepIndicator"
import TimeStep from "@/components/book-call/TimeStep"
import DetailsStep from "@/components/book-call/DetailsStep"
import ConfirmStep from "@/components/book-call/ConfirmStep"
import "react-datepicker/dist/react-datepicker.css"

const steps = [
  { key: "time", label: "Step 1", title: "Time" },
  { key: "details", label: "Step 2", title: "Details" },
  { key: "confirm", label: "Step 3", title: "Confirm" },
]

const timeSlotLabels = (startHour: number, endHour: number, intervalMinutes: number) => {
  const slots: { label: string; value: string }[] = []
  const base = new Date()
  base.setSeconds(0, 0)
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      if (hour === endHour && minute > 0) break
      const d = new Date(base)
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
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dealershipName, setDealershipName] = useState("")
  const [location, setLocation] = useState("")
  const [inventoryType, setInventoryType] = useState("")
  const [monthlyVolume, setMonthlyVolume] = useState("")
  const [biggestProblem, setBiggestProblem] = useState("")
  const [contactMethod, setContactMethod] = useState("Call")
  const [consent, setConsent] = useState(false)
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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    setSelectedTime("")
  }

  const canContinueStep1 = Boolean(selectedDate && selectedTime)
  const canContinueStep2 = Boolean(fullName.trim() && email.trim() && phone.trim())

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
    if (!fullName || !email || !phone) {
      setError("Please fill in name, email, and phone.")
      setStep(1)
      return
    }
    if (!consent) {
      setError("Please confirm consent before booking.")
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        name: fullName,
        email,
        phone,
        dealership: dealershipName,
        location,
        inventoryType,
        volume: monthlyVolume,
        contactMethod,
        date: selectedDate.toDateString(),
        time: selectedTimeLabel || selectedTime,
        problem: biggestProblem,
      }

      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
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
              key="time"
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              timeSlots={timeSlots}
              onDateChange={handleDateChange}
              onTimeSelect={setSelectedTime}
            />
          ) : step === 1 ? (
            <DetailsStep
              key="details"
              fullName={fullName}
              email={email}
              phone={phone}
              dealershipName={dealershipName}
              location={location}
              inventoryType={inventoryType}
              monthlyVolume={monthlyVolume}
              biggestProblem={biggestProblem}
              contactMethod={contactMethod}
              detailsOpen={detailsOpen}
              error={error}
              onToggleDetails={() => setDetailsOpen(open => !open)}
              onFullNameChange={setFullName}
              onEmailChange={setEmail}
              onPhoneChange={setPhone}
              onDealershipNameChange={setDealershipName}
              onLocationChange={setLocation}
              onInventoryTypeChange={setInventoryType}
              onMonthlyVolumeChange={setMonthlyVolume}
              onContactMethodChange={setContactMethod}
              onBiggestProblemChange={setBiggestProblem}
            />
          ) : (
            <ConfirmStep
              key="confirm"
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedTimeLabel={selectedTimeLabel}
              fullName={fullName}
              email={email}
              phone={phone}
              biggestProblem={biggestProblem}
              consent={consent}
              error={error}
              onBiggestProblemChange={setBiggestProblem}
              onConsentChange={setConsent}
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
              disabled={submitting || !consent}
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

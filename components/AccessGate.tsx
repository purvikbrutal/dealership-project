"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

type AccessGateProps = {
  initialHasAccess: boolean
}

export default function AccessGate({ initialHasAccess }: AccessGateProps) {
  const pathname = usePathname()
  const [hasAccess, setHasAccess] = useState(initialHasAccess)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dealership, setDealership] = useState("")
  const [visitorType, setVisitorType] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (pathname?.startsWith("/admin")) return null
  if (hasAccess) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in full name, email, and phone.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, dealership, visitorType }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Submission failed")
      }

      setHasAccess(true)
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[12000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[rgba(20,20,20,0.6)] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-6 md:p-8">
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          opacity: 0.18,
        }} />

        <div className="relative space-y-3">
          <h2 className="text-3xl font-semibold text-white">Before You Continue</h2>
          <p className="text-white/70">Share a few details so I know who's exploring the platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Full Name *</label>
            <input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Email *</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Phone Number *</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              placeholder="+1 555 123 4567"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Dealership Name (optional)</label>
            <input
              value={dealership}
              onChange={e => setDealership(e.target.value)}
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              placeholder="Your dealership"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Visitor Type (optional)</label>
            <select
              value={visitorType}
              onChange={e => setVisitorType(e.target.value)}
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
            >
              <option value="">Select</option>
              <option value="Dealership">Dealership</option>
              <option value="Consumer">Consumer</option>
              <option value="Consultant">Consultant</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center button-glow-hover"
          >
            {loading ? "Submitting..." : "Continue to Website"}
          </button>
        </form>
      </div>
    </div>
  )
}

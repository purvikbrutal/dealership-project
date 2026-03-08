"use client"

import { useEffect, useState } from "react"

export default function BlogEngagement({ slug }: { slug: string }) {
  const [likes, setLikes] = useState<number>(0)
  const [comments, setComments] = useState<Array<{ id: string; name: string; message: string; createdAt: string }>>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [liked, setLiked] = useState(false)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [debug, setDebug] = useState<any>(null)

  useEffect(() => {
    let isMounted = true
    // Check if already liked from localStorage
    const wasLiked = typeof window !== "undefined" ? localStorage.getItem(`liked-${slug}`) === "true" : false
    if (wasLiked) setLiked(true)

    const load = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}/engagement`, { 
          cache: "no-store",
          headers: { 'Cache-Control': 'no-cache' }
        })
        if (!res.ok) throw new Error("Failed to load engagement")
        const data = await res.json()
        if (!isMounted) return
        
        // Debug info
        console.log('[BlogEngagement] API response:', data)
        setDebug(data.debug)
        
        setLikes(typeof data.likes === "number" ? data.likes : 0)
        setComments(Array.isArray(data.comments) ? data.comments : [])
        setEnabled(data.enabled !== false)
      } catch (err: any) {
        if (!isMounted) return
        console.error('[BlogEngagement] Load error:', err)
        setError(err?.message || "Could not load engagement")
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [slug])

  const handleLike = async () => {
    setError(null)
    if (!enabled || liked) {
      if (liked) return // silently ignore if already liked
      setError("Engagement is currently disabled")
      return
    }
    try {
      const res = await fetch(`/api/blog/${slug}/like`, { method: "POST" })
      const data = await res.json().catch(() => ({}))
      console.log('[BlogEngagement] Like response:', data)
      if (!res.ok || data?.error) throw new Error(data?.error || "Could not register like")
      
      // Update likes from server response
      if (typeof data.likes === "number") {
        setLikes(data.likes)
      } else {
        setLikes((prev) => prev + 1)
      }
      setLiked(true)
      if (typeof window !== "undefined") localStorage.setItem(`liked-${slug}`, "true")
    } catch (err: any) {
      console.error('[BlogEngagement] Like error:', err)
      setError(err?.message || "Something went wrong")
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) {
      setError("Please enter a comment")
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch(`/api/blog/${slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      })
      const data = await res.json().catch(() => ({}))
      console.log('[BlogEngagement] Comment response:', data)
      if (!res.ok || !data?.success) throw new Error(data?.error || "Could not post comment")
      setComments((prev) => [data.comment, ...prev].slice(0, 50))
      setMessage("")
    } catch (err: any) {
      console.error('[BlogEngagement] Comment error:', err)
      setError(err?.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-12 space-y-6">
      {/* Debug info - remove after fixing */}
      {debug && (
        <div className="text-xs text-text-muted bg-white/5 p-2 rounded">
          Debug: postId={debug.postId}, likes={debug.likesCount}, comments={debug.commentsCount}
        </div>
      )}
      
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/4 via-white/2 to-transparent p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Engagement</p>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">❤️ {likes} likes</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">💬 {comments.length} comments</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/50 bg-black text-white shadow-[0_6px_22px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-white/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:-translate-y-[1px] active:scale-95 disabled:opacity-50 disabled:translate-y-0 disabled:active:scale-100"
              disabled={submitting || !enabled || liked}
            >
              <span className="text-lg leading-none">{liked ? "♥" : "♡"}</span>
              <span className="text-sm font-medium tracking-wide">{liked ? "Liked" : "Like"}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20">{likes}</span>
              <span className="pointer-events-none absolute inset-0 rounded-full border border-white/10 opacity-0 group-hover:opacity-60 transition-opacity" />
            </button>
            {loading ? <span className="text-text-muted text-sm">Loading...</span> : null}
          </div>
        </div>
        {error ? <p className="text-red-400 text-sm">{error}</p> : null}
        {!enabled && !loading ? <p className="text-text-muted text-sm">Engagement is disabled.</p> : null}
      </div>

      <div className="glass-morphism border border-white/10 rounded-2xl p-6 space-y-5 shadow-[0_12px_36px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Comments</h3>
          <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Share your take</span>
        </div>

        <form onSubmit={handleComment} className="space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-text-muted">Name (optional)</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-text-muted">Comment</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              rows={3}
              placeholder="Share your thoughts"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-secondary px-4 py-2 border border-white/20"
            disabled={submitting || !enabled}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>

        <div className="space-y-3">
          {comments.length === 0 && !loading ? (
            <p className="text-text-muted text-sm">No comments yet. Be the first.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>{c.name || "Anonymous"}</span>
                  <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-text-secondary mt-2 whitespace-pre-wrap">{c.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

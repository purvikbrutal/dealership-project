"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/slug'

export default function NewPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    coverImage: '',
    content: '',
    published: false,
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  useEffect(() => {
    setForm((prev) => ({ ...prev, slug: slugify(prev.title) }))
  }, [form.title])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const submit = async (publish: boolean) => {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, published: publish }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to save post')
        setSaving(false)
        return
      }
      router.push('/admin/blog')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to save post')
      setSaving(false)
    }
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError(null)
    setUploading(true)
    try {
      const body = new FormData()
      body.append('file', file)
      const res = await fetch('/api/uploads/cover', { method: 'POST', body })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Upload failed')
      }
      const data = await res.json()
      setForm((prev) => ({ ...prev, coverImage: data.url }))
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <main className="min-h-screen bg-dark-bg text-text-primary px-6 py-14">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-text-muted">New Post</p>
          <h1 className="text-3xl md:text-4xl font-semibold">Create Blog Post</h1>
        </div>

        <div className="glass-morphism p-6 border border-glass-border/70 bg-surface-elevated/60 rounded-2xl space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted">Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted">Excerpt</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted">Cover Image</label>
              <input
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="Paste image URL or upload"
                className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              />
              <div className="flex flex-wrap items-center gap-3">
                <label className="px-4 py-2 rounded-xl border border-white/12 text-sm cursor-pointer hover:border-white/35 transition">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                  {uploading ? 'Uploading…' : 'Upload image'}
                </label>
                {form.coverImage && <span className="text-text-muted text-xs break-all">{form.coverImage}</span>}
              </div>
              {uploadError && <p className="text-red-400 text-xs" role="alert">{uploadError}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-text-muted">Content (Markdown)</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={14}
              className="w-full rounded-xl bg-[#0f0f0f] border border-white/12 px-4 py-3 text-white focus:outline-none focus:border-white/35"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => submit(false)}
              disabled={saving}
              className="btn-secondary px-5 py-3 border border-white/20"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => submit(true)}
              disabled={saving}
              className="btn-primary button-glow-hover px-5 py-3"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

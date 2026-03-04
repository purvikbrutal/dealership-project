"use client"

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { useState } from 'react'

type Props = {
  posts: Post[]
}

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export default function AdminPostList({ posts }: Props) {
  const router = useRouter()
  const [busyId, setBusyId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this post?')
    if (!confirmed) return
    setBusyId(id)
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    setBusyId(null)
    router.refresh()
  }

  const handleToggle = async (post: Post) => {
    setBusyId(post.id)
    await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    })
    setBusyId(null)
    router.refresh()
  }

  if (posts.length === 0) {
    return <p className="text-text-muted">No posts yet.</p>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <div key={post.id} className="glass-morphism p-6 border border-glass-border/70 bg-surface-elevated/60 rounded-2xl flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">{formatDate(post.createdAt)}</p>
              <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
              <p className="text-text-secondary text-sm">{post.excerpt}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full border ${post.published ? 'border-white/30 text-white' : 'border-white/20 text-text-muted'}`}>
              {post.published ? 'Published' : 'Draft'}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/admin/blog/${post.id}`} className="btn-secondary px-4 py-2 border border-white/20">Edit</Link>
            <button
              type="button"
              onClick={() => handleToggle(post)}
              className="btn-secondary px-4 py-2 border border-white/20"
              disabled={busyId === post.id}
            >
              {post.published ? 'Unpublish' : 'Publish'}
            </button>
            <button
              type="button"
              onClick={() => handleDelete(post.id)}
              className="px-4 py-2 rounded-xl border border-red-400/50 text-red-300"
              disabled={busyId === post.id}
            >
              Delete
            </button>
            <Link href={`/blog/${post.slug}`} className="text-text-muted text-sm underline">View</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

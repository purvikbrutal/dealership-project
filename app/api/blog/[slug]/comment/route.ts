import { NextResponse } from 'next/server'
import { addComment } from '@/lib/engagement'
import { getPostBySlug } from '@/lib/posts'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const body = await req.json().catch(() => ({}))
  const name = body?.name || 'Anonymous'
  const message = body?.message || ''

  if (!message.trim()) return NextResponse.json({ error: 'Message is required' }, { status: 400 })

  const post = await getPostBySlug(params.slug, true)
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

  const result = await addComment(post.id, name, message)
  if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 })

  return NextResponse.json({ success: true, comment: result.comment })
}

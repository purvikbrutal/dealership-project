import { NextResponse } from 'next/server'
import { deletePost, getPostById, upsertPost } from '@/lib/posts'
import { cookies } from 'next/headers'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = await getPostById(params.id)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const authed = cookies().get('admin-auth')?.value === 'true'
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const existing = await getPostById(params.id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const updated = await upsertPost({
    id: params.id,
    title: body.title || existing.title,
    slug: body.slug || existing.slug,
    excerpt: body.excerpt ?? existing.excerpt,
    content: body.content || existing.content,
    coverImage: body.coverImage ?? existing.coverImage,
    published: body.published ?? existing.published,
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const authed = cookies().get('admin-auth')?.value === 'true'
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const removed = await deletePost(params.id)
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}

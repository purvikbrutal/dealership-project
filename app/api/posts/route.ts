import { NextResponse } from 'next/server'
import { getAllPosts, upsertPost } from '@/lib/posts'
import { cookies } from 'next/headers'

export async function GET() {
  const posts = await getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const authed = cookies().get('admin-auth')?.value === 'true'
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const required = body?.title && body?.content
  if (!required) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const post = await upsertPost({
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    coverImage: body.coverImage,
    published: Boolean(body.published),
  })
  return NextResponse.json(post)
}

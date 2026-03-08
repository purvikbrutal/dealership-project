import { NextResponse } from 'next/server'
import { addLike } from '@/lib/engagement'
import { getPostBySlug } from '@/lib/posts'

export async function POST(_: Request, { params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, true)
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

  const result = await addLike(post.id)
  if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 })

  return NextResponse.json({ success: true, likes: result.likes })
}

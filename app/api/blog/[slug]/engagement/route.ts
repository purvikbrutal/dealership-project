import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/posts'
import { getPostEngagement } from '@/lib/engagement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return NextResponse.json({ error: 'Post not found', slug: params.slug }, { status: 404 })
  }

  const engagement = await getPostEngagement(post.id)
  
  return NextResponse.json(engagement, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}

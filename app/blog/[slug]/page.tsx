import ReactMarkdown from 'react-markdown'
import { getPostBySlug } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  const readingTime = Math.max(3, Math.round(post.content.split(' ').length / 200))

  return (
    <main className="bg-dark-bg text-text-primary min-h-screen px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted mb-3">{new Date(post.createdAt).toLocaleDateString()}</p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">{post.title}</h1>
          <p className="text-text-muted text-sm">Reading time • {readingTime} min</p>
        </div>

        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden border border-glass-border/70 mb-8">
            <img src={post.coverImage} alt={post.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <article className="space-y-4 leading-relaxed text-text-secondary">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        <div className="mt-12 flex justify-between items-center text-sm text-text-muted">
          <Link href="/blog" className="btn-secondary px-4 py-2 border border-white/20">Back to Blog</Link>
          <span>Last updated {new Date(post.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </main>
  )
}

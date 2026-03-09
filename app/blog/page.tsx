import Link from 'next/link'
import { getPublishedPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <main className="bg-dark-bg text-text-primary min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.24em] text-text-muted mb-3">Insights</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Blog</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Strategy notes, decision frameworks, and lessons from luxury dealerships.</p>
        </header>

        {posts.length === 0 ? (
          <p className="text-center text-text-muted">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="glass-morphism p-6 md:p-7 h-full flex flex-col justify-between border border-glass-border/60 bg-surface-elevated/60">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-3">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{post.excerpt || 'Read the latest insights.'}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted text-sm">Read time • {Math.max(3, Math.round(post.content.split(' ').length / 200))} min</span>
                  <Link href={`/blog/${post.slug}`} className="btn-secondary px-4 py-2 border border-white/20">
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

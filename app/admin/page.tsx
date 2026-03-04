import Link from 'next/link'
import { getAnalyticsSummary } from '@/lib/analytics'
import { getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Admin Dashboard',
}

export default async function AdminHome() {
  const [analytics, posts] = await Promise.all([getAnalyticsSummary(), getAllPosts()])

  const cards = [
    { label: 'Total Visitors', value: analytics.totalVisitors.toLocaleString() },
    { label: 'Page Views', value: analytics.pageViews.toLocaleString() },
    { label: 'Posts', value: posts.length.toString() },
  ]

  const sections = [
    { title: 'Analytics', href: '/admin/analytics', description: 'Visitors, page views, and top pages.' },
    { title: 'Blog Management', href: '/admin/blog', description: 'Edit, publish, and delete posts.' },
    { title: 'Create Blog Post', href: '/admin/blog/new', description: 'Draft a new article.' },
  ]

  return (
    <main className="min-h-screen bg-dark-bg text-text-primary px-6 py-14">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.22em] text-text-muted">Admin</p>
          <h1 className="text-4xl font-semibold">Dashboard Overview</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.label} className="glass-morphism p-6 border border-glass-border/70 bg-surface-elevated/60 rounded-2xl">
              <p className="text-text-muted text-sm mb-2">{card.label}</p>
              <p className="text-3xl font-semibold">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="glass-morphism p-6 border border-glass-border/70 bg-surface-elevated/60 rounded-2xl flex flex-col gap-3 hover:translate-y-[-2px] transition-transform"
            >
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="text-text-secondary text-sm leading-relaxed">{section.description}</p>
              <span className="text-text-muted text-sm">Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

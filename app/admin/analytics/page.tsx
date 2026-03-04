import { getAnalyticsSummary } from '@/lib/analytics'

export const metadata = {
  title: 'Admin Analytics',
}

export default async function AdminAnalyticsPage() {
  const data = await getAnalyticsSummary()

  const topCards = [
    { label: 'Total Visitors', value: data.totalVisitors.toLocaleString() },
    { label: 'Page Views', value: data.pageViews.toLocaleString() },
    { label: 'Avg Visit Duration', value: `${data.averageDuration} sec` },
  ]

  return (
    <main className="min-h-screen bg-dark-bg text-text-primary px-6 py-14">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.22em] text-text-muted">Analytics</p>
          <h1 className="text-4xl font-semibold">Traffic Overview</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {topCards.map((card) => (
            <div key={card.label} className="glass-morphism p-6 border border-glass-border/70 bg-surface-elevated/60 rounded-2xl">
              <p className="text-text-muted text-sm mb-2">{card.label}</p>
              <p className="text-3xl font-semibold">{card.value}</p>
            </div>
          ))}
        </div>

        <section className="glass-morphism p-6 border border-glass-border/70 bg-surface-elevated/60 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Page Views by Page</h2>
            <span className="text-text-muted text-sm">Top pages</span>
          </div>
          <div className="space-y-3">
            {data.topPages.length === 0 && <p className="text-text-muted text-sm">No data yet.</p>}
            {data.topPages.map((page) => (
              <div key={page.path} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-text-secondary">{page.path}</span>
                <span className="text-text-primary font-semibold">{page.count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-morphism p-6 border border-glass-border/70 bg-surface-elevated/60 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Visitors</h2>
            <span className="text-text-muted text-sm">Last 24h</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-text-muted text-left border-b border-white/10">
                  <th className="py-2">Visitor</th>
                  <th className="py-2">Path</th>
                  <th className="py-2">Event</th>
                  <th className="py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentVisitors.length === 0 && (
                  <tr>
                    <td className="py-3 text-text-muted" colSpan={4}>No visitors tracked yet.</td>
                  </tr>
                )}
                {data.recentVisitors.map((visit, idx) => (
                  <tr key={idx} className="border-b border-white/5 last:border-0">
                    <td className="py-2 text-text-secondary">{visit.visitorId?.slice(0, 8) || 'Anonymous'}</td>
                    <td className="py-2 text-text-secondary">{visit.page}</td>
                    <td className="py-2 text-text-secondary">{visit.eventType}</td>
                    <td className="py-2 text-text-secondary">{new Date(visit.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

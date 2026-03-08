import { getSupabaseClient } from './supabase'

export type AnalyticsSummary = {
  totalVisitors: number
  pageViews: number
  averageDuration: number
  topPages: { path: string; count: number }[]
  recentVisitors: { visitorId: string | null; page: string; timestamp: string; eventType: string; userAgent: string | null }[]
}

const supabase = getSupabaseClient()

export async function trackEvent(input: {
  page: string
  eventType: string
  visitorId: string | null
  userAgent: string | null
}) {
  if (!supabase) return
  const { error } = await supabase.from('analytics_events').insert({
    page: input.page || '/',
    event_type: input.eventType,
    visitor_id: input.visitorId,
    user_agent: input.userAgent,
  })

  if (error) return
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  if (!supabase) {
    return {
      totalVisitors: 0,
      pageViews: 0,
      averageDuration: 0,
      topPages: [],
      recentVisitors: [],
    }
  }
  // Page view count
  const { count: pageViewsRaw = 0 } = await supabase
    .from('analytics_events')
    .select('id', { head: true, count: 'exact' })
  const pageViews = pageViewsRaw || 0

  // Distinct visitors
  const { data: visitorRows = [] } = await supabase.from('analytics_events').select('visitor_id')
  const visitorList = visitorRows ?? []
  const totalVisitors = new Set(visitorList.map((r: any) => r.visitor_id).filter(Boolean)).size

  // Top pages
  const { data: pageRows = [] } = await supabase.from('analytics_events').select('page').limit(2000)
  const pageCountMap = new Map<string, number>()
  const pageList = pageRows ?? []
  pageList.forEach((row: any) => {
    const key = row.page || '/'
    pageCountMap.set(key, (pageCountMap.get(key) || 0) + 1)
  })
  const topPages = Array.from(pageCountMap.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Recent events
  const { data: recent = [] } = await supabase
    .from('analytics_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  const recentList = Array.isArray(recent) ? recent : []
  const recentVisitors = recentList.map((r) => ({
    visitorId: r.visitor_id || null,
    page: r.page,
    timestamp: r.created_at,
    eventType: r.event_type,
    userAgent: r.user_agent || null,
  }))

  return {
    totalVisitors,
    pageViews,
    averageDuration: 90,
    topPages,
    recentVisitors,
  }
}

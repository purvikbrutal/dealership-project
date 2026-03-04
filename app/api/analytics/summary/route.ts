import { NextResponse } from 'next/server'
import { getAnalyticsSummary } from '@/lib/analytics'

export async function GET() {
  const data = await getAnalyticsSummary()
  return NextResponse.json(data)
}

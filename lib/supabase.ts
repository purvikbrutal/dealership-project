import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null | undefined

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    cachedClient = null
    return null
  }

  cachedClient = createClient(url, serviceKey)
  return cachedClient
}

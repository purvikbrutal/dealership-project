import { getSupabaseClient } from './supabase'
import { slugify } from './slug'
import fs from 'fs/promises'
import path from 'path'

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string | null
  published: boolean
  createdAt: string
  updatedAt: string
}

type PostRow = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string | null
}

const supabase = getSupabaseClient()

function mapRow(row: PostRow): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content,
    coverImage: row.cover_image,
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
  }
}

export async function getPublishedPosts() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map(mapRow)
}

export async function getAllPosts() {
  if (!supabase) return []
  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
  if (error) throw error

  if (data && data.length > 0) return data.map(mapRow)

  // Migration fallback: if Supabase is empty but legacy file exists, seed once
  const legacyPath = path.join(process.cwd(), 'data', 'posts.json')
  try {
    const raw = await fs.readFile(legacyPath, 'utf-8')
    const legacy: any[] = JSON.parse(raw || '[]')
    if (legacy.length === 0) return []

    const payload = legacy.map((p) => ({
      title: p.title,
      slug: slugify(p.slug || p.title),
      excerpt: p.excerpt || '',
      content: p.content,
      cover_image: p.coverImage ?? null,
      published: Boolean(p.published),
      created_at: p.createdAt || new Date().toISOString(),
      updated_at: p.updatedAt || p.createdAt || new Date().toISOString(),
    }))

    if (payload.length) {
      await supabase.from('posts').insert(payload)
      const { data: seeded } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
      return (seeded || []).map(mapRow)
    }
  } catch (err) {
    return []
  }

  return []
}

export async function getPostBySlug(slug: string, includeUnpublished = false) {
  if (!supabase) return null
  let query = supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .order('published', { ascending: false })
    .order('updated_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (!includeUnpublished) {
    query = query.eq('published', true)
  }

  const { data, error } = await query.limit(1)
  if (error || !data || data.length === 0) return null

  return mapRow(data[0] as PostRow)
}

export async function getPostById(id: string) {
  if (!supabase) return null
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
  if (error) return null
  return mapRow(data as PostRow)
}

export async function upsertPost(input: Partial<Post> & { title: string; content: string }) {
  if (!supabase) throw new Error('Supabase is not configured')
  const now = new Date().toISOString()
  const slug = input.slug ? slugify(input.slug) : slugify(input.title)

  if (input.id) {
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: input.title,
        slug,
        excerpt: input.excerpt ?? '',
        content: input.content,
        cover_image: input.coverImage ?? null,
        published: input.published ?? false,
        updated_at: now,
      })
      .eq('id', input.id)
      .select()
      .single()

    if (error) throw error
    return mapRow(data as PostRow)
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: input.title,
      slug,
      excerpt: input.excerpt ?? '',
      content: input.content,
      cover_image: input.coverImage ?? null,
      published: Boolean(input.published),
      updated_at: now,
    })
    .select()
    .single()

  if (error) throw error
  return mapRow(data as PostRow)
}

export async function deletePost(id: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
  return true
}

import { getSupabaseClient } from './supabase'

export type PostComment = {
  id: string
  name: string
  message: string
  createdAt: string
}

export type PostEngagement = {
  likes: number
  comments: PostComment[]
  enabled: boolean
}

export async function getPostEngagement(postId: string): Promise<PostEngagement> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { likes: 0, comments: [], enabled: false }
  }

  try {
    // Get likes count
    const { data: likesData } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)

    const likesCount = Array.isArray(likesData) ? likesData.length : 0

    // Get comments
    const { data: commentsData } = await supabase
      .from('post_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false })
      .limit(50)

    const commentsList = Array.isArray(commentsData) ? commentsData : []

    return {
      likes: likesCount,
      comments: commentsList.map((c: any) => ({
        id: c.id,
        name: c.name || 'Anonymous',
        message: c.message || '',
        createdAt: c.created_at,
      })),
      enabled: true,
    }
  } catch (err: any) {
    return { likes: 0, comments: [], enabled: false }
  }
}

export async function addLike(postId: string) {
  const supabase = getSupabaseClient()
  if (!supabase) return { success: false, error: 'Engagement is not configured' }

  const { error } = await supabase.from('post_likes').insert({ post_id: postId })
  if (error) {
    console.error('[Engagement] addLike error:', error)
    return { success: false, error: error.message }
  }

  // Count likes after insert
  const { data: likesData } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)

  const likesCount = Array.isArray(likesData) ? likesData.length : 0
  return { success: true, likes: likesCount }
}

export async function addComment(postId: string, name: string, message: string) {
  const supabase = getSupabaseClient()
  if (!supabase) return { success: false, error: 'Engagement is not configured' }
  const trimmedName = (name || '').trim().slice(0, 80) || 'Anonymous'
  const trimmedMessage = (message || '').trim()
  if (!trimmedMessage) return { success: false, error: 'Message is required' }

  const { data, error } = await supabase
    .from('post_comments')
    .insert({ post_id: postId, name: trimmedName, message: trimmedMessage })
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  return {
    success: true,
    comment: {
      id: data.id,
      name: data.name || 'Anonymous',
      message: data.message || '',
      createdAt: data.created_at,
    } as PostComment,
  }
}

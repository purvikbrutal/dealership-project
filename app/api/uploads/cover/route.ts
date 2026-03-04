import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const formData = await req.formData().catch(() => null)
  if (!formData) return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })

  const file = formData.get('file')
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 })
  }

  const fileName = (file as File).name || 'upload'
  const path = `covers/${crypto.randomUUID()}-${fileName}`

  const { data, error } = await supabase.storage.from('blog-covers').upload(path, file, {
    contentType: (file as File).type || 'application/octet-stream',
    upsert: false,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: publicUrl } = supabase.storage.from('blog-covers').getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl.publicUrl })
}

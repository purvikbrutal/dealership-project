import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/posts'
import EditPostForm from '@/components/admin/EditPostForm'

export const metadata = {
  title: 'Edit Post',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)
  if (!post) return notFound()

  return (
    <main className="min-h-screen bg-dark-bg text-text-primary px-6 py-14">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-text-muted">Edit Post</p>
          <h1 className="text-3xl md:text-4xl font-semibold">{post.title}</h1>
        </div>
        <EditPostForm post={post} />
      </div>
    </main>
  )
}

import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import AdminPostList from '@/components/admin/PostList'

export const metadata = {
  title: 'Admin Blog',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminBlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-dark-bg text-text-primary px-6 py-14">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-text-muted">Blog</p>
            <h1 className="text-3xl md:text-4xl font-semibold">Manage Posts</h1>
          </div>
          <Link href="/admin/blog/new" className="btn-primary button-glow-hover">New Post</Link>
        </div>

        <AdminPostList posts={posts} />
      </div>
    </main>
  )
}

import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="min-h-screen pt-32 pb-16 bg-cream">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-semibold text-charcoal mb-4">Article not found</h1>
          <Link to="/blog" className="text-sm font-medium text-terracotta cursor-pointer">Back to Journal</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-24 bg-cream">
      <article className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/50 hover:text-terracotta transition-colors cursor-pointer mb-10">
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <span className="text-sm font-medium tracking-[0.2em] uppercase text-terracotta">{post.category}</span>
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-charcoal mt-4 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-charcoal/40 mb-10">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <img src={post.image} alt={post.title} className="w-full rounded-2xl mb-12 aspect-[16/10] object-cover" />

        <div className="space-y-6 text-lg leading-relaxed text-charcoal/70">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

export default function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group cursor-pointer">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sand/50"
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-cream/90 backdrop-blur text-charcoal rounded-full">
            {post.category}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-charcoal/30 mb-2">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-2 group-hover:text-terracotta transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-charcoal/40 line-clamp-2 leading-relaxed">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-terracotta">
            Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

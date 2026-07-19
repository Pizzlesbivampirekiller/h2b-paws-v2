import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { blogPosts } from '../../data/blogPosts'
import BlogCard from './BlogCard'

const categories = ['All', 'Guides', 'Health', 'Stories']

export default function BlogMasonry() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return blogPosts
    return blogPosts.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-terracotta">Journal</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-charcoal mt-4 mb-4">
            Stories & Insights
          </h1>
          <p className="text-charcoal/40 max-w-lg mx-auto">
            Tips, stories, and behind-the-scenes from the H2B Paws team.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-terracotta text-cream'
                  : 'bg-white text-charcoal/50 hover:text-charcoal border border-sand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-charcoal/40 py-20">No articles in this category yet.</p>
        )}
      </div>
    </section>
  )
}

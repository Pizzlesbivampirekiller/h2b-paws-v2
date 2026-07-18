import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { products } from '../../data/products'
import ProductCard from './ProductCard'
import FilterSidebar from './FilterSidebar'
import ScrollReveal from '../ui/ScrollReveal'

export default function ProductGrid() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 200])

  const filtered = useMemo(() => {
    let result = [...products]

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    result = result.filter((p) => p.price <= priceRange[1])

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // featured — prioritize featured items
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [selectedCategory, sortBy, priceRange])

  return (
    <section className="min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Shop All</h1>
            <p className="text-charcoal/40 mt-1">{filtered.length} products</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Active filters */}
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-terracotta/10 text-terracotta rounded-full cursor-pointer"
              >
                {selectedCategory}
                <X size={12} />
              </button>
            )}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex lg:hidden items-center gap-2 px-4 py-2 text-sm border border-sand rounded-full hover:border-charcoal transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar — always visible */}
          <div className="hidden lg:block">
            <FilterSidebar
              open={true}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Mobile sidebar */}
          <FilterSidebar
            open={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* Products */}
          <div className="flex-1">
            <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-charcoal/40 text-lg">No products match your filters.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setPriceRange([0, 200]) }}
                  className="mt-4 text-terracotta underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

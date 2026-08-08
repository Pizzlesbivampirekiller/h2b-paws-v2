import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { categories } from '../../data/products'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
]

export default function FilterSidebar({
  open,
  onClose,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-charcoal lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-cream p-6 overflow-y-auto lg:relative lg:z-0 lg:w-64 lg:flex-shrink-0 lg:translate-x-0 lg:shadow-none"
          >
            <div className="flex items-center justify-between mb-8 lg:hidden">
              <h3 className="font-serif text-xl font-semibold">Filters</h3>
              <button onClick={onClose} className="p-2 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-4">Category</h4>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-terracotta text-cream'
                        : 'text-charcoal/60 hover:bg-sand/50 hover:text-charcoal'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.name}
                    </span>
                    {selectedCategory === cat.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-4">Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-sand bg-transparent text-sm text-charcoal cursor-pointer focus:outline-none focus:border-terracotta"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-4">Max Price</h4>
              <input
                type="range"
                min={0}
                max={200}
                step={5}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-terracotta cursor-pointer"
              />
              <div className="flex justify-between text-xs text-charcoal/40 mt-2">
                <span>$0</span>
                <span className="font-medium text-terracotta">${priceRange[1]}</span>
              </div>
            </div>

            {/* Clear on mobile */}
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSortBy('featured')
                setPriceRange([0, 200])
              }}
              className="mt-8 w-full py-2.5 text-sm text-terracotta border border-terracotta/30 rounded-full hover:bg-terracotta/5 transition-colors cursor-pointer lg:hidden"
            >
              Clear All Filters
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

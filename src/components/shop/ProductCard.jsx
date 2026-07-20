import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import TiltCard from '../ui/TiltCard'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(
      product,
      product.sizes?.[0] || 'Standard',
      product.colors?.[0] || null
    )
  }

  return (
    <TiltCard>
      <Link to={`/shop/${product.slug}`} className="block group cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl bg-sand/20 aspect-[3/4] mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.badge && (
            <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${
              product.badge === 'Eco'
                ? 'bg-sage text-white'
                : product.badge === 'New'
                ? 'bg-terracotta text-white'
                : 'bg-charcoal text-cream'
            }`}>
              {product.badge}
            </span>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0 transition-transform">
            <button
              onClick={handleQuickAdd}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-lg text-charcoal hover:text-terracotta hover:scale-110 transition-all cursor-pointer"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-lg text-charcoal hover:text-red-400 hover:scale-110 transition-all cursor-pointer"
              aria-label="Add to wishlist"
            >
              <Heart size={16} />
            </button>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Star size={12} className="fill-golden text-golden" />
            <span className="text-xs font-medium text-charcoal">{product.rating}</span>
            <span className="text-xs text-charcoal/30">({product.reviews})</span>
          </div>
          <h3 className="font-serif text-base font-semibold text-charcoal mb-1 group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>
          <span className="text-base font-semibold text-charcoal">${product.price}</span>
        </div>
      </Link>
    </TiltCard>
  )
}

import { Link } from 'react-router-dom'
import TiltCard from '../ui/TiltCard'
import { formatPrice } from '../../lib/format'

export default function ProductCard({ product }) {
  return (
    <TiltCard>
      <Link to={`/shop/${product.handle}`} className="block group cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl bg-sand/20 aspect-[3/4] mb-4">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          {!product.available && (
            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-charcoal text-cream">
              Sold out
            </span>
          )}
        </div>
        <h3 className="font-serif text-base font-semibold text-charcoal mb-1 group-hover:text-terracotta transition-colors">
          {product.name}
        </h3>
        <span className="text-base font-semibold text-charcoal">
          {product.variants.length > 1 && 'From '}
          {formatPrice(product.price, product.currency)}
        </span>
      </Link>
    </TiltCard>
  )
}

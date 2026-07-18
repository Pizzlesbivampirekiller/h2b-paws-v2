import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { products } from '../../data/products'
import TiltCard from '../ui/TiltCard'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured)

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          subtitle="Curated Selection"
          title="Featured Favorites"
          description="Our most-loved pieces, handpicked for quality and style."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <TiltCard>
                <Link to={`/shop/${product.slug}`} className="block group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl bg-sand/30 aspect-[3/4] mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-charcoal text-cream rounded-full">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-charcoal rounded-full">
                        Quick View
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={14} className="fill-golden text-golden" />
                      <span className="text-sm font-medium text-charcoal">{product.rating}</span>
                      <span className="text-xs text-charcoal/30">({product.reviews})</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal mb-1 group-hover:text-terracotta transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-charcoal/40 mb-2 line-clamp-1">{product.description}</p>
                    <span className="text-lg font-semibold text-charcoal">${product.price}</span>
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-terracotta font-medium hover:gap-3 transition-all cursor-pointer"
          >
            View All Products <ArrowRight size={18} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

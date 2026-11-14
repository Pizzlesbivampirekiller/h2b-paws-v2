import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import ScrollReveal from '../components/ui/ScrollReveal'
import ProductCard from '../components/shop/ProductCard'
import { fetchProducts } from '../lib/shopify'

export default function ShopPage() {
  const { siteContent } = useAdmin()
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => {
        console.error('Shopify products error:', e)
        setError(e.message)
      })
  }, [])

  return (
    <main className="min-h-screen pt-24 lg:pt-28 pb-16 bg-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-terracotta">{siteContent.shopSubtitle}</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-charcoal mt-4 mb-4">{siteContent.shopTitle}</h1>
          <p className="text-charcoal/40 max-w-lg mx-auto">{siteContent.shopDesc}</p>
        </ScrollReveal>

        {!products && !error && (
          <div className="flex items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-2 border-terracotta/30 border-t-terracotta rounded-full" />
          </div>
        )}

        {error && (
          <p className="text-center text-charcoal/50 py-20">Products could not be loaded right now. Please try again shortly.</p>
        )}

        {products && products.length === 0 && (
          <p className="text-center text-charcoal/50 py-20">No products available yet.</p>
        )}

        {products && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}

        <div className="flex items-center justify-center gap-6 mt-16 pt-6 border-t border-sand/50 text-xs text-charcoal/30">
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} />Secure Checkout</span>
          <span>Powered by Shopify</span>
        </div>
      </div>
    </main>
  )
}

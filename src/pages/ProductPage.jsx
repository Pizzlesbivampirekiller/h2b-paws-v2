import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ShoppingCart, Heart, Share2, ChevronRight, ArrowLeft, Check } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductViewer3D from '../components/shop/ProductViewer3D'
import ProductCard from '../components/shop/ProductCard'
import Button from '../components/ui/Button'
import ScrollReveal from '../components/ui/ScrollReveal'
import Confetti from '../components/ui/Confetti'

export default function ProductPage() {
  const { id } = useParams()
  const product = getProductBySlug(id)
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard')
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-terracotta underline">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const related = getRelatedProducts(product)

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor)
    setAddedToCart(true)
    setShowConfetti(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <main className="min-h-screen pt-20 lg:pt-28 pb-16 bg-cream">
      <Confetti active={showConfetti} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-charcoal/30 mb-8">
          <Link to="/" className="hover:text-terracotta transition-colors cursor-pointer">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-terracotta transition-colors cursor-pointer">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-charcoal/60">{product.name}</span>
        </nav>

        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-terracotta mb-8 transition-colors cursor-pointer">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        {/* Product detail */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — 3D Viewer */}
          <ScrollReveal>
            <ProductViewer3D productColor={selectedColor} />
            {/* Image thumbnails */}
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <div key={i} className="w-20 h-20 rounded-xl overflow-hidden bg-sand/30 border-2 border-transparent hover:border-terracotta transition-colors cursor-pointer">
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right — Info */}
          <ScrollReveal direction="left">
            <div>
              {product.badge && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-terracotta/10 text-terracotta rounded-full mb-4">
                  {product.badge}
                </span>
              )}
              <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-semibold text-charcoal mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-golden text-golden' : 'text-sand'}
                    />
                  ))}
                </div>
                <span className="text-sm text-charcoal/30">({product.reviews} reviews)</span>
              </div>
              <p className="text-2xl font-serif font-semibold text-charcoal mb-6">${product.price}</p>
              <p className="text-charcoal/50 leading-relaxed mb-8">{product.description}</p>

              {/* Color picker */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <span className="text-sm font-medium text-charcoal mb-3 block">
                    Color: <span className="text-charcoal/40 font-normal">{selectedColor}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                          selectedColor === color ? 'border-terracotta scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColor === color && <Check size={14} className="text-white drop-shadow" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size picker */}
              {product.sizes.length > 0 && (
                <div className="mb-8">
                  <span className="text-sm font-medium text-charcoal mb-3 block">
                    Size: <span className="text-charcoal/40 font-normal">{selectedSize}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-charcoal text-cream border-charcoal'
                            : 'bg-white text-charcoal border-sand hover:border-charcoal'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mb-8">
                <Button
                  variant="terracotta"
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1"
                >
                  <ShoppingCart size={18} />
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </Button>
                <button className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-sand hover:border-red-300 hover:text-red-400 transition-all cursor-pointer">
                  <Heart size={20} />
                </button>
                <button className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-sand hover:border-terracotta hover:text-terracotta transition-all cursor-pointer">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-sand">
                {[
                  { icon: '🌿', label: 'Eco-Friendly' },
                  { icon: '✨', label: 'Handcrafted' },
                  { icon: '🛡️', label: 'Lifetime Warranty' },
                ].map((f) => (
                  <div key={f.label} className="text-center">
                    <span className="text-2xl block mb-1">{f.icon}</span>
                    <span className="text-xs text-charcoal/40">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-24 lg:mt-32">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal mb-8">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

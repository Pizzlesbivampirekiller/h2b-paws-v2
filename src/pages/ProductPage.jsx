import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Share2, ChevronRight, ArrowLeft, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ProductViewer3D from '../components/shop/ProductViewer3D'
import ProductCard from '../components/shop/ProductCard'
import Button from '../components/ui/Button'
import ScrollReveal from '../components/ui/ScrollReveal'
import Confetti from '../components/ui/Confetti'
import { fetchProductByHandle, fetchProducts } from '../lib/shopify'
import { formatPrice } from '../lib/format'

function defaultSelection(product) {
  return Object.fromEntries(product.options.map((o) => [o.name, o.values[0]]))
}

function findVariant(product, selected) {
  return product.variants.find((v) =>
    v.selectedOptions.every((o) => o.name === 'Title' || selected[o.name] === o.value)
  )
}

export default function ProductPage() {
  const { id: handle } = useParams()
  const { addItem } = useCart()

  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')
  const [selected, setSelected] = useState({})
  const [related, setRelated] = useState([])
  const [adding, setAdding] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setStatus('loading')
    setProduct(null)
    fetchProductByHandle(handle)
      .then((p) => {
        if (!active) return
        if (!p) return setStatus('notfound')
        setProduct(p)
        setSelected(defaultSelection(p))
        setStatus('ready')
      })
      .catch((e) => {
        console.error('Shopify product error:', e)
        if (active) setStatus('error')
      })
    fetchProducts()
      .then((list) => {
        if (active) setRelated(list.filter((p) => p.handle !== handle).slice(0, 4))
      })
      .catch(() => {})
    return () => { active = false }
  }, [handle])

  if (status === 'loading') {
    return <div className="min-h-screen pt-28 bg-cream" />
  }

  if (status !== 'ready') {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal mb-4">
            {status === 'error' ? 'Product could not be loaded' : 'Product Not Found'}
          </h1>
          <Link to="/shop" className="text-terracotta underline">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const variant = findVariant(product, selected)
  const canAdd = Boolean(variant?.available) && !adding

  const handleAddToCart = async () => {
    if (!canAdd) return
    setAdding(true)
    setError(null)
    try {
      await addItem(variant.id, 1)
      setAddedToCart(true)
      setShowConfetti(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (e) {
      console.error('Add to cart failed:', e)
      setError(e.message)
    } finally {
      setAdding(false)
    }
  }

  return (
    <main className="min-h-screen pt-20 lg:pt-28 pb-16 bg-cream">
      <Confetti active={showConfetti} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <ScrollReveal>
            <ProductViewer3D />
            {product.images.length > 0 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <div key={img} className="w-20 h-20 rounded-xl overflow-hidden bg-sand/30 border-2 border-transparent hover:border-terracotta transition-colors cursor-pointer">
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div>
              <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-semibold text-charcoal mb-6">
                {product.name}
              </h1>
              <p className="text-2xl font-serif font-semibold text-charcoal mb-6">
                {variant ? formatPrice(variant.price, product.currency) : formatPrice(product.price, product.currency)}
              </p>
              {product.description && (
                <p className="text-charcoal/50 leading-relaxed mb-8 whitespace-pre-line">{product.description}</p>
              )}

              {product.options.map((option) => (
                <div key={option.name} className="mb-8">
                  <span className="text-sm font-medium text-charcoal mb-3 block">
                    {option.name}: <span className="text-charcoal/40 font-normal">{selected[option.name]}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() => setSelected((s) => ({ ...s, [option.name]: value }))}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                          selected[option.name] === value
                            ? 'bg-charcoal text-cream border-charcoal'
                            : 'bg-white text-charcoal border-sand hover:border-charcoal'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {!variant && (
                <p className="text-sm text-charcoal/50 mb-6">This combination is not available.</p>
              )}
              {variant && !variant.available && (
                <p className="text-sm text-charcoal/50 mb-6">This option is sold out.</p>
              )}

              <div className="flex gap-3 mb-4">
                <Button
                  variant="terracotta"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!canAdd}
                  className="flex-1"
                >
                  <ShoppingCart size={18} />
                  {addedToCart ? 'Added!' : adding ? 'Adding...' : 'Add to Cart'}
                </Button>
                <button className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-sand hover:border-red-300 hover:text-red-400 transition-all cursor-pointer">
                  <Heart size={20} />
                </button>
                <button className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-sand hover:border-terracotta hover:text-terracotta transition-all cursor-pointer">
                  <Share2 size={20} />
                </button>
              </div>
              {error && <p className="text-sm text-red-500 mb-6">{error}</p>}

              <div className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t border-sand">
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

import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import OrderSummary from '../components/cart/OrderSummary'
import Button from '../components/ui/Button'

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart()

  return (
    <main className="min-h-screen pt-24 lg:pt-28 pb-16 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Shopping Cart</h1>
            <p className="text-charcoal/40 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-charcoal/30 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag size={64} className="text-sand mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-charcoal mb-2">Your cart is empty</h2>
            <p className="text-charcoal/40 mb-8">Discover our collection and find something special for your companion.</p>
            <Link to="/shop">
              <Button variant="terracotta" size="lg">
                Explore Shop
                <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item, index) => (
                  <CartItem
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                    item={item}
                    index={index}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-terracotta transition-colors mt-6 cursor-pointer"
              >
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <div>
              <OrderSummary subtotal={subtotal} />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

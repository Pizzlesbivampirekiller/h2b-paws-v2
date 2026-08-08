import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartDrawer({ open, onClose }) {
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sand">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-terracotta" />
                <h2 className="font-serif text-xl font-semibold">Cart ({itemCount})</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:text-terracotta transition-colors cursor-pointer" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-sand mb-4" />
                  <p className="text-charcoal/50 text-lg">Your cart is empty</p>
                  <button onClick={onClose} className="mt-4 text-terracotta underline cursor-pointer">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-3 rounded-2xl bg-white"
                    >
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <div className="flex gap-2 mt-1 text-xs text-charcoal/50">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && (
                            <span className="flex items-center gap-1">
                              Color: <span className="w-3 h-3 rounded-full border border-sand" style={{ backgroundColor: item.selectedColor }} />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1 border border-sand rounded-full">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="p-1 hover:text-terracotta transition-colors cursor-pointer"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="p-1 hover:text-terracotta transition-colors cursor-pointer"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">${item.price * item.quantity}</span>
                            <button
                              onClick={() => removeItem(index)}
                              className="p-1 text-charcoal/30 hover:text-red-500 transition-colors cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-sand space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Shipping</span>
                  <span className="text-sage font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-serif font-semibold pt-4 border-t border-sand">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block w-full py-3 text-center text-cream bg-charcoal rounded-full font-medium hover:bg-charcoal/90 transition-colors cursor-pointer"
                >
                  View Cart & Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

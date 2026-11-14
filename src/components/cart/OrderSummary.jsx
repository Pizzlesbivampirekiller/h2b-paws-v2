import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Truck } from 'lucide-react'

export default function OrderSummary({ subtotal }) {
  const shipping = subtotal >= 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="p-6 lg:p-8 rounded-2xl bg-white border border-sand/50 sticky top-24">
      <h2 className="font-serif text-xl font-semibold text-charcoal mb-6">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-charcoal/50">Subtotal</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={subtotal}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-medium text-charcoal"
            >
              ${subtotal.toFixed(2)}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal/50">Shipping</span>
          {shipping === 0 ? (
            <span className="text-sage font-medium">Free</span>
          ) : (
            <span className="text-charcoal">${shipping.toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal/50">Tax</span>
          <span className="text-charcoal">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between mt-5 pt-5 border-t border-sand">
        <span className="font-serif font-semibold text-charcoal">Total</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={total}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="font-serif text-xl font-semibold text-charcoal"
          >
            ${total.toFixed(2)}
          </motion.span>
        </AnimatePresence>
      </div>

      {subtotal < 50 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-terracotta mt-3 flex items-center gap-1"
        >
          <Truck size={12} />
          Add ${(50 - subtotal).toFixed(2)} more for free shipping
        </motion.p>
      )}

      <button className="w-full mt-6 py-3 bg-terracotta text-cream rounded-full font-medium hover:bg-terracotta-dark transition-colors cursor-pointer">
        Proceed to Checkout
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-charcoal/30">
        <ShieldCheck size={14} />
        Secure checkout · SSL encrypted
      </div>
    </div>
  )
}

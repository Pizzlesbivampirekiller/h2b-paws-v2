import { AnimatePresence, motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { formatPrice } from '../../lib/format'

export default function OrderSummary({ subtotal, checkoutUrl }) {
  return (
    <div className="p-6 lg:p-8 rounded-2xl bg-white border border-sand/50 sticky top-24">
      <h2 className="font-serif text-xl font-semibold text-charcoal mb-6">Order Summary</h2>

      <div className="flex justify-between text-sm">
        <span className="text-charcoal/50">Subtotal</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={subtotal}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-medium text-charcoal"
          >
            {formatPrice(subtotal)}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="text-xs text-charcoal/40 mt-3">Shipping and taxes are calculated at checkout.</p>

      <div className="flex justify-between mt-5 pt-5 border-t border-sand">
        <span className="font-serif font-semibold text-charcoal">Total</span>
        <span className="font-serif text-xl font-semibold text-charcoal">{formatPrice(subtotal)}</span>
      </div>

      {checkoutUrl ? (
        <a
          href={checkoutUrl}
          className="block w-full mt-6 py-3 text-center bg-terracotta text-cream rounded-full font-medium hover:bg-terracotta-dark transition-colors cursor-pointer"
        >
          Proceed to Checkout
        </a>
      ) : (
        <button disabled className="w-full mt-6 py-3 bg-terracotta/50 text-cream rounded-full font-medium cursor-not-allowed">
          Proceed to Checkout
        </button>
      )}

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-charcoal/30">
        <ShieldCheck size={14} />
        Secure checkout · Powered by Shopify
      </div>
    </div>
  )
}

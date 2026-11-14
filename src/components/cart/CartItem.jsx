import { motion } from 'framer-motion'
import { Trash2, Minus, Plus } from 'lucide-react'
import { formatPrice } from '../../lib/format'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
      className="flex gap-6 p-4 lg:p-6 rounded-2xl bg-white"
    >
      <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden flex-shrink-0 bg-sand/30">
        {item.image && (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-lg font-semibold text-charcoal">{item.title}</h3>
            {item.variantTitle !== 'Default Title' && (
              <p className="mt-1 text-sm text-charcoal/40">{item.variantTitle}</p>
            )}
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-charcoal/20 hover:text-red-400 transition-colors cursor-pointer"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 lg:mt-6">
          <div className="flex items-center border border-sand rounded-full">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-2 lg:p-2.5 hover:text-terracotta transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 lg:p-2.5 hover:text-terracotta transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="font-serif text-xl font-semibold text-charcoal">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

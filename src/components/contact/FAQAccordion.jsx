import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What is your shipping policy?',
    a: 'We offer free standard shipping on all orders over $50. Express shipping is available for a flat rate of $15. Orders are processed within 1-2 business days and typically arrive within 3-7 business days.',
  },
  {
    q: 'Can I return or exchange an item?',
    a: 'Yes. Contact us before sending anything back and we will walk you through your options. Where returns are accepted, items must be unused, with tags, and in their original packaging. For change-of-mind returns, return shipping is at your expense, and refunds go back to your original payment method. Customers in the EU or UK may have a 14-day right to cancel under local law.',
  },
  {
    q: 'How do I find the right size for my pet?',
    a: 'Each product page includes a detailed size guide with measurements. As a general rule, measure your pet\'s neck circumference for collars, chest girth for harnesses, and length for beds. Still unsure? Contact us for personalized sizing help.',
  },
  {
    q: 'Are your products eco-friendly?',
    a: 'Yes. Sustainability is at our core. We use ethically-sourced leather, organic cotton, recycled packaging, and we\'re certified carbon-neutral. Every purchase supports our reforestation partner projects.',
  },
  {
    q: 'Do you offer a warranty?',
    a: 'All H2B Paws products are covered by a 1-year warranty against manufacturing defects from the date of delivery. If your item arrives damaged or fails because of a defect, contact us with your order number and we will repair or replace it. This warranty does not cover normal wear, chewing, or damage from misuse.',
  },
]

function AccordionItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-sand"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left cursor-pointer group"
      >
        <span className="font-serif text-lg font-medium text-charcoal pr-8 group-hover:text-terracotta transition-colors">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-sand text-charcoal group-hover:border-terracotta group-hover:text-terracotta transition-colors"
        >
          <Plus size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-charcoal/50 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQAccordion() {
  return (
    <div className="divide-y-0">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} faq={faq} index={i} />
      ))}
    </div>
  )
}

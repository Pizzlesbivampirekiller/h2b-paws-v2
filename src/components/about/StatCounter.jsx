import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const numeric = parseInt(value.replace(/[^0-9.]/g, ''))
    const isDecimal = value.includes('.')
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * numeric
      setDisplay(isDecimal ? current : Math.floor(current))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {typeof display === 'number' && value.includes('.')
        ? display.toFixed(1)
        : display.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function StatCounter() {
  const stats = [
    { value: '10000', suffix: '+', label: 'Happy Pets' },
    { value: '40', suffix: '', label: 'Countries' },
    { value: '4.9', suffix: '', label: 'Avg. Rating' },
    { value: '100', suffix: '%', label: 'Carbon Neutral' },
  ]

  return (
    <section className="py-20 bg-charcoal">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="font-serif text-4xl lg:text-5xl font-semibold text-cream mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-cream/40 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

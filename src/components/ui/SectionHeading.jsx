import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export default function SectionHeading({ subtitle, title, description, align = 'center', light = false }) {
  const alignClasses = {
    center: 'text-center items-center',
    left: 'text-left items-start',
  }

  return (
    <ScrollReveal className={`flex flex-col gap-4 mb-16 ${alignClasses[align]}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-sm font-medium tracking-[0.2em] uppercase ${light ? 'text-cream/50' : 'text-terracotta'}`}
        >
          {subtitle}
        </motion.span>
      )}
      <h2
        className={`font-serif text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight ${
          light ? 'text-cream' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-xl text-lg leading-relaxed ${light ? 'text-cream/60' : 'text-charcoal/50'}`}>
          {description}
        </p>
      )}
      <div className={`w-16 h-0.5 rounded-full ${light ? 'bg-terracotta/50' : 'bg-terracotta'}`} />
    </ScrollReveal>
  )
}

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g

function renderText(text) {
  const parts = []
  let last = 0
  for (const match of text.matchAll(LINK_PATTERN)) {
    parts.push(text.slice(last, match.index))
    parts.push(
      <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-terracotta underline">
        {match[1]}
      </a>
    )
    last = match.index + match[0].length
  }
  parts.push(text.slice(last))
  return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)
}

function LegalSection({ title, paragraphs = [], items = [] }) {
  return (
    <div className="space-y-4">
      {title && <h3 className="font-serif text-xl font-semibold text-charcoal">{title}</h3>}
      {paragraphs.map((p, i) => (
        <p key={i} className="text-charcoal/60 leading-relaxed">{renderText(p)}</p>
      ))}
      {items.length > 0 && (
        <ul className="list-disc pl-5 space-y-3 text-charcoal/60 leading-relaxed marker:text-terracotta">
          {items.map((item, i) => (
            <li key={i}>{renderText(item)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function LegalPage({ eyebrow, title, lastUpdated, sections }) {
  return (
    <main className="min-h-screen">
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-[0.2em] uppercase text-terracotta"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl font-semibold text-cream mt-4 mb-6"
          >
            {title}
          </motion.h1>
          <p className="text-cream/30 text-sm mt-6">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-14">
          {sections.map((section, i) => (
            <ScrollReveal key={i}>
              <LegalSection {...section} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { milestones } from '../../data/team'
import ScrollReveal from '../ui/ScrollReveal'

function TimelineItem({ milestone, index, progress }) {
  const isLeft = index % 2 === 0

  return (
    <div className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Content */}
      <div className="flex-1">
        <ScrollReveal direction={isLeft ? 'right' : 'left'} delay={0.1}>
          <div className={`p-6 rounded-2xl bg-white shadow-sm border border-sand/50 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
            <span className="text-3xl font-serif font-bold text-terracotta">{milestone.year}</span>
            <h3 className="font-serif text-xl font-semibold text-charcoal mt-2 mb-2">{milestone.title}</h3>
            <p className="text-sm text-charcoal/50 leading-relaxed">{milestone.description}</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Dot */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-terracotta z-10"
          style={{
            scale: progress > (index + 1) / milestones.length ? 1.2 : 0.8,
          }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </div>
  )
}

export default function Timeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-8" ref={containerRef}>
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-terracotta">Our Journey</span>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-charcoal mt-4">The H2B Story</h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sand -translate-x-1/2" />
          <motion.div
            className="absolute left-1/2 top-0 w-px bg-terracotta -translate-x-1/2"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 relative">
            {milestones.map((milestone, i) => (
              <TimelineItem key={milestone.year} milestone={milestone} index={i} progress={scrollYProgress.get()} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

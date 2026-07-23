import { useRef, useEffect } from 'react'
import { Star } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import SectionHeading from '../ui/SectionHeading'
import { useAdmin } from '../../context/AdminContext'

function MarqueeRow({ items, reverse = false }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId
    let scrollPos = reverse ? -el.scrollWidth / 2 : 0

    const scroll = () => {
      if (reverse) {
        scrollPos += 0.5
        if (scrollPos >= 0) scrollPos = -el.scrollWidth / 2
      } else {
        scrollPos -= 0.5
        if (scrollPos <= -el.scrollWidth / 2) scrollPos = 0
      }
      el.style.transform = `translateX(${scrollPos}px)`
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [reverse])

  const doubled = [...items, ...items, ...items]

  return (
    <div className="overflow-hidden py-3">
      <div ref={scrollRef} className="flex gap-6 whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="inline-flex flex-col gap-3 p-6 rounded-2xl bg-white shadow-sm border border-sand/50 w-80 flex-shrink-0"
          >
            <div className="flex gap-1">
              {Array.from({ length: item.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-golden text-golden" />
              ))}
            </div>
            <p className="text-sm text-charcoal/60 leading-relaxed whitespace-normal line-clamp-4">{item.text}</p>
            <div className="flex items-center gap-3 mt-auto pt-2 border-t border-sand/50">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-semibold text-charcoal">{item.name}</div>
                <div className="text-xs text-charcoal/40">{item.pet}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TestimonialMarquee() {
  const { siteContent } = useAdmin()
  const firstHalf = testimonials.slice(0, 3)
  const secondHalf = testimonials.slice(3)

  return (
    <section className="py-24 lg:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <SectionHeading
          subtitle={siteContent.testimonialsSubtitle}
          title={siteContent.testimonialsTitle}
          description="Hear from our community of discerning pet families."
        />
      </div>
      <MarqueeRow items={firstHalf} />
      <MarqueeRow items={secondHalf} reverse />
    </section>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { useAdmin } from '../../context/AdminContext'

export default function CTASection() {
  const { siteContent } = useAdmin()
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-charcoal" />
      {siteContent.bgCta && (
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${siteContent.bgCta})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      {!siteContent.bgCta && <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1920&h=800&fit=crop)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-semibold text-cream leading-tight mb-6">
              {siteContent.ctaHeadline.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
              <span className="italic text-terracotta">{siteContent.ctaHeadlineItalic}</span>?
            </h2>
            <p className="text-cream/50 text-lg max-w-md mb-8 leading-relaxed">
              {siteContent.ctaSubheading}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://shop.h2bpaws.com" target="_blank" rel="noopener noreferrer">
                <Button variant="terracotta" size="lg">
                  Shop Now
                  <ArrowRight size={18} />
                </Button>
              </a>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cream/30 text-cream hover:bg-cream hover:text-charcoal"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <div className="flex gap-4">
              {[
                { label: 'Free Shipping', value: 'On orders $50+' },
                { label: 'Easy Returns', value: '30-day window' },
                { label: 'Lifetime Warranty', value: 'On all leather' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -5 }}
                  className="flex-1 p-5 rounded-2xl bg-cream/5 backdrop-blur border border-cream/10 text-center"
                >
                  <div className="font-serif text-xl font-semibold text-cream mb-1">{item.label}</div>
                  <div className="text-sm text-cream/40">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

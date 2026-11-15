import { Link } from 'react-router-dom'
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
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button variant="terracotta" size="lg">
                  Shop Now
                  <ArrowRight size={18} />
                </Button>
              </Link>
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
        </div>
      </div>
    </section>
  )
}

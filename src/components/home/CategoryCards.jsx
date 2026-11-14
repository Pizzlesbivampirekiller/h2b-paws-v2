import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'
import { useAdmin } from '../../context/AdminContext'

export default function CategoryCards() {
  const { siteContent } = useAdmin()
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          subtitle={siteContent.categoriesSubtitle}
          title={siteContent.categoriesTitle}
          description={siteContent.categoriesDesc}
        />

        <ScrollReveal className="mt-6">
          <Link to="/shop" className="block group cursor-pointer">
            <div className="relative overflow-hidden rounded-3xl h-48 lg:h-64 bg-gradient-to-r from-terracotta via-terracotta-dark to-charcoal">
              <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                <div>
                  <h3 className="font-serif text-3xl lg:text-4xl text-cream mb-2">Explore All Products</h3>
                  <p className="text-cream/60 flex items-center justify-center gap-2">
                    Discover our complete collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

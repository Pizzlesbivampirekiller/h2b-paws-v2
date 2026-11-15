import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'
import { useAdmin } from '../../context/AdminContext'

const PHOTOS = [
  { src: '/images/dog-fluffy-tree.jpg', alt: 'Fluffy dog resting outdoors' },
  { src: '/images/dog-poodle-boardwalk.jpg', alt: 'Poodle on a boardwalk' },
  { src: '/images/dog-bloodhound-field.jpg', alt: 'Bloodhound in a field' },
]

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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHOTOS.map((photo, i) => (
            <ScrollReveal key={photo.src} delay={i * 0.1}>
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

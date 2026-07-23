import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories } from '../../data/products'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'
import { useAdmin } from '../../context/AdminContext'

const categoryImages = {
  accessories: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=800&fit=crop',
  beds: 'https://images.unsplash.com/photo-1541188495357-ad2e42a0b7ce?w=600&h=800&fit=crop',
  food: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=800&fit=crop',
  clothing: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=800&fit=crop',
  grooming: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=800&fit=crop',
}

const displayCategories = categories.filter((c) => c.id !== 'all')

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.1}>
              <Link to={`/shop?category=${cat.id}`} className="block group cursor-pointer">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-3xl aspect-[4/5]"
                >
                  <img
                    src={categoryImages[cat.id]}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl mb-2 block">{cat.icon}</span>
                        <h3 className="font-serif text-2xl font-semibold text-cream">{cat.name}</h3>
                      </div>
                      <motion.div
                        whileHover={{ x: 3 }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/20 backdrop-blur text-cream"
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Full-width banner */}
        <ScrollReveal className="mt-6">
          <a href="https://shop.h2bpaws.com" target="_blank" rel="noopener noreferrer" className="block group cursor-pointer">
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
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}

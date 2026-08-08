import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import CategoryCards from '../components/home/CategoryCards'
import TestimonialMarquee from '../components/home/TestimonialMarquee'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <CategoryCards />
      <TestimonialMarquee />
      <CTASection />
    </main>
  )
}

import HeroSection from '../components/home/HeroSection'
import CategoryCards from '../components/home/CategoryCards'
import TestimonialMarquee from '../components/home/TestimonialMarquee'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoryCards />
      <TestimonialMarquee />
      <CTASection />
    </main>
  )
}

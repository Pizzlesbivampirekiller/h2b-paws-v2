import ProductGrid from '../components/shop/ProductGrid'
import ShopifyBuyButton from '../components/shop/ShopifyBuyButton'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionHeading from '../components/ui/SectionHeading'

export default function ShopPage() {
  return (
    <main>
      <ProductGrid />

      {/* Shopify Store Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              subtitle="Secure Checkout"
              title="Shop via Shopify"
              description="All orders are processed securely through our Shopify store. Fast shipping, easy returns."
            />
          </ScrollReveal>
          <ScrollReveal>
            <ShopifyBuyButton />
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

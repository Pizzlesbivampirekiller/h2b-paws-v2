import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, ShieldCheck } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import ScrollReveal from '../components/ui/ScrollReveal'

const SHOPIFY_DOMAIN = 'kfdxq3-eb.myshopify.com'
const SHOPIFY_TOKEN = '4bedfaae968e91fc20ebc485891a316e'
const SHOPIFY_PRODUCT_ID = '9280982909080'

export default function ShopPage() {
  const containerRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const { siteContent } = useAdmin()

  useEffect(() => {
    if (window.ShopifyBuy?.UI) { initShopify(); return }
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
    script.onload = initShopify
    document.head.appendChild(script)
  }, [])

  function initShopify() {
    try {
      const client = window.ShopifyBuy.buildClient({ domain: SHOPIFY_DOMAIN, storefrontAccessToken: SHOPIFY_TOKEN })
      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        if (containerRef.current) {
          ui.createComponent('product', {
            id: SHOPIFY_PRODUCT_ID,
            node: containerRef.current,
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
              product: {
                styles: {
                  product: { '@media (min-width: 601px)': { 'max-width': '100%', 'margin-left': '0px', 'margin-bottom': '0px' } },
                  title: { 'font-family': 'Playfair Display, serif', 'font-size': '28px', 'color': '#1A1A1A' },
                  price: { 'font-size': '24px', 'color': '#C47354', 'font-weight': '600' },
                  button: { 'background-color': '#1A1A1A', 'border-radius': '9999px', 'padding': '14px 28px', 'font-family': 'Inter, sans-serif', 'font-weight': '500', 'text-transform': 'none', 'letter-spacing': '0' },
                  options: { 'border-radius': '12px' },
                  quantity: { 'border-radius': '9999px' },
                },
                text: { button: 'Add to Cart' },
                contents: { img: true, imgWithCarousel: false, button: true },
                imgStyle: { 'border-radius': '16px' },
              },
              productSet: { styles: { products: { '@media (min-width: 601px)': { 'margin-left': '-20px' } } } },
              modalProduct: {
                contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
                styles: { product: { '@media (min-width: 601px)': { 'max-width': '100%', 'margin-left': '0px', 'margin-bottom': '0px' } }, button: { 'background-color': '#1A1A1A', 'border-radius': '9999px' } },
                text: { button: 'Add to Cart' },
              },
              cart: { text: { total: 'Subtotal', button: 'Checkout' } },
              toggle: {},
            },
          })
          setLoaded(true)
        }
      })
    } catch (e) { console.error('Shopify init error:', e) }
  }

  return (
    <main className="min-h-screen pt-24 lg:pt-28 pb-16 bg-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-terracotta">{siteContent.shopSubtitle}</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-charcoal mt-4 mb-4">{siteContent.shopTitle}</h1>
          <p className="text-charcoal/40 max-w-lg mx-auto">{siteContent.shopDesc}</p>
        </ScrollReveal>

        {/* Shopify embed container styled to match H2B */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-sand/50"
        >
          {/* Loading state */}
          {!loaded && (
            <div className="flex items-center justify-center py-20">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-2 border-terracotta/30 border-t-terracotta rounded-full" />
            </div>
          )}

          {/* Shopify fills this div */}
          <div ref={containerRef} id="shopify-product-component" className="min-h-[300px]" />

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-sand/50 text-xs text-charcoal/30">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} />Secure Checkout</span>
            <span>Powered by Shopify</span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

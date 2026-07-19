import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

const SHOPIFY_DOMAIN = 'kfdxq3-eb.myshopify.com'
const SHOPIFY_TOKEN = '4bedfaae968e91fc20ebc485891a316e'
const SHOPIFY_PRODUCT_ID = '9280982909080'

export default function ShopifyBuyButton() {
  const containerRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initShopify()
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
    script.onload = initShopify
    script.onerror = () => setError(true)
    document.head.appendChild(script)

    return () => {
      // Cleanup if needed
    }
  }, [])

  function initShopify() {
    try {
      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: SHOPIFY_TOKEN,
      })

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        if (containerRef.current) {
          ui.createComponent('product', {
            id: SHOPIFY_PRODUCT_ID,
            node: containerRef.current,
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
              product: {
                styles: {
                  product: {
                    '@media (min-width: 601px)': {
                      'max-width': '100%',
                      'margin-left': '0px',
                      'margin-bottom': '0px',
                    },
                  },
                },
                text: { button: 'Add to Cart' },
              },
              productSet: {
                styles: {
                  products: {
                    '@media (min-width: 601px)': {
                      'margin-left': '-20px',
                    },
                  },
                },
              },
              modalProduct: {
                contents: {
                  img: false,
                  imgWithCarousel: true,
                  button: false,
                  buttonWithQuantity: true,
                },
                styles: {
                  product: {
                    '@media (min-width: 601px)': {
                      'max-width': '100%',
                      'margin-left': '0px',
                      'margin-bottom': '0px',
                    },
                  },
                },
                text: { button: 'Add to cart' },
              },
              cart: {
                text: { total: 'Subtotal', button: 'Checkout' },
              },
              toggle: {},
            },
          })
          setLoaded(true)
        }
      })
    } catch (e) {
      console.error('Shopify init error:', e)
      setError(true)
    }
  }

  // We need this import
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 border border-sand/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
          <ShoppingCart size={20} className="text-terracotta" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-charcoal">Shop via Shopify</h3>
          <p className="text-xs text-charcoal/40">Secure checkout powered by Shopify</p>
        </div>
      </div>

      {!mounted ? (
        <div className="h-40 skeleton rounded-xl" />
      ) : (
        <div ref={containerRef} id="shopify-product-component" className="min-h-[200px]">
          {!loaded && !error && (
            <div className="flex items-center justify-center h-40 text-charcoal/30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-terracotta/30 border-t-terracotta rounded-full"
              />
            </div>
          )}
          {error && (
            <div className="text-center py-10 text-charcoal/40">
              <p>Shopify store is loading...</p>
              <a
                href={`https://${SHOPIFY_DOMAIN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta underline mt-2 inline-block"
              >
                Visit our Shopify store →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

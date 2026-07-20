import { createContext, useContext, useState, useEffect } from 'react'
import { products as defaultProducts } from '../data/products'

const AdminContext = createContext()

const STORAGE_KEY = 'h2b-admin-products'
const CONTENT_KEY = 'h2b-admin-content'
const AUTH_KEY = 'h2b-admin-auth'

const defaultContent = {
  // Splash
  splashSlogan: 'Every Degree Matters',
  // Hero
  heroBadge: 'Luxury Pet Essentials',
  heroHeadline1: 'Where luxury',
  heroHeadlineItalic: 'loyalty',
  heroSubheading: 'Thoughtfully crafted essentials for the modern pet — where Italian leather meets Japanese minimalism, and every detail honors your companion.',
  heroCta1: 'Explore Collection',
  heroCta2: 'Our Story',
  heroStats: [
    { value: '10K+', label: 'Happy Pets' },
    { value: '40+', label: 'Countries' },
    { value: '4.9', label: 'Avg. Rating' },
  ],
  // Sections
  featuredSubtitle: 'Curated Selection',
  featuredTitle: 'Featured Favorites',
  featuredDesc: 'Our most-loved pieces, handpicked for quality and style.',
  categoriesSubtitle: 'Browse By',
  categoriesTitle: 'Shop by Category',
  categoriesDesc: 'Find exactly what your companion needs.',
  testimonialsSubtitle: 'Testimonials',
  testimonialsTitle: 'Loved by Pets & Parents',
  ctaHeadline: 'Ready to treat\nyour companion to\nthe best?',
  ctaHeadlineItalic: 'the best',
  ctaSubheading: "Join 10,000+ pet parents who've upgraded their companion's lifestyle. Free shipping on your first order.",
  // About page
  aboutTitle: 'Crafting luxury for the modern companion',
  aboutDesc: 'Born from a belief that pets deserve the same quality and beauty we expect for ourselves. Every H2B Paws piece blends Italian craftsmanship with uncompromising standards for comfort and durability.',
  // Contact page
  contactTitle: "We'd love to hear from you",
  contactDesc: "Whether it's a question about sizing, a custom order request, or just saying hello — our team is here.",
  // Footer
  footerTitle: 'Join the H2B Pack',
  footerDesc: 'Subscribe for early access to new collections, exclusive offers, and pet care insights.',
  // Background images (URLs)
  bgCta: '',
  bgAbout: '',
  bgContact: '',
  // Shop page
  shopTitle: 'Shop H2B Paws',
  shopSubtitle: 'Premium Essentials',
  shopDesc: 'Browse our collection of luxury pet essentials. Secure checkout powered by Shopify.',
}

export function AdminProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : defaultProducts
    } catch { return defaultProducts }
  })

  const [siteContent, setSiteContent] = useState(() => {
    try {
      const stored = localStorage.getItem(CONTENT_KEY)
      return stored ? { ...defaultContent, ...JSON.parse(stored) } : defaultContent
    } catch { return defaultContent }
  })

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(siteContent))
  }, [siteContent])

  // Product actions
  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)))
  }

  const updateProductImage = (id, imageIndex, url) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p
      const images = [...p.images]
      images[imageIndex] = url
      return { ...p, images }
    }))
  }

  const addProduct = (product) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1
    setProducts(prev => [...prev, { ...product, id: newId }])
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const resetProducts = () => setProducts(defaultProducts)

  // Content actions
  const updateContent = (key, value) => {
    setSiteContent(prev => ({ ...prev, [key]: value }))
  }

  const updateStat = (index, field, value) => {
    setSiteContent(prev => {
      const stats = [...prev.heroStats]
      stats[index] = { ...stats[index], [field]: value }
      return { ...prev, heroStats: stats }
    })
  }

  const resetContent = () => setSiteContent(defaultContent)

  // Auth
  const login = (password) => {
    if (password === 'h2badmin2026') {
      setIsAuthenticated(true)
      sessionStorage.setItem(AUTH_KEY, 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem(AUTH_KEY)
  }

  return (
    <AdminContext.Provider value={{
      products, siteContent,
      updateProduct, updateProductImage, addProduct, deleteProduct, resetProducts,
      updateContent, updateStat, resetContent,
      isAuthenticated, login, logout,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

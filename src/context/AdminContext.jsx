import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { products as defaultProducts } from '../data/products'

const AdminContext = createContext()

const AUTH_KEY = 'h2b-admin-auth'
// Change this to your Nitro backend URL after deploying
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const defaultContent = {
  splashSlogan: 'Every Degree Matters',
  heroBadge: 'Luxury Pet Essentials',
  heroHeadline1: 'Where luxury',
  heroHeadlineItalic: 'loyalty',
  heroSubheading: 'Thoughtfully crafted essentials for the modern pet.',
  heroCta1: 'Explore Collection',
  heroCta2: 'Our Story',
  heroStats: [
    { value: '10K+', label: 'Happy Pets' },
    { value: '40+', label: 'Countries' },
    { value: '4.9', label: 'Avg. Rating' },
  ],
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
  ctaSubheading: "Join 10,000+ pet parents who've upgraded their companion's lifestyle.",
  aboutTitle: 'Crafting luxury for the modern companion',
  aboutDesc: 'Born from a belief that pets deserve the same quality and beauty we expect for ourselves.',
  contactTitle: "We'd love to hear from you",
  contactDesc: "Whether it's a question about sizing, a custom order request, or just saying hello.",
  footerTitle: 'Join the H2B Pack',
  footerDesc: 'Subscribe for early access to new collections, exclusive offers, and pet care insights.',
  shopTitle: 'Shop H2B Paws',
  shopSubtitle: 'Premium Essentials',
  shopDesc: 'Browse our collection of luxury pet essentials.',
  bgCta: '',
  bgAbout: '',
  bgContact: '',
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Network error' }))
    throw new Error(err.message || `API ${res.status}`)
  }
  return res.json()
}

export function AdminProvider({ children }) {
  const [products, setProducts] = useState(defaultProducts)
  const [siteContent, setSiteContent] = useState(defaultContent)
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true')
  const [apiOnline, setApiOnline] = useState(false)

  // Fetch data from API on mount
  useEffect(() => {
    async function load() {
      try {
        const [contentRes, productsRes] = await Promise.all([
          fetch(`${API_BASE}/api/content`),
          fetch(`${API_BASE}/api/products`),
        ])
        if (contentRes.ok) {
          const data = await contentRes.json()
          setSiteContent(prev => ({ ...prev, ...data }))
        }
        if (productsRes.ok) {
          const data = await productsRes.json()
          if (Array.isArray(data) && data.length > 0) setProducts(data)
        }
        setApiOnline(true)
      } catch {
        // API not available, use defaults
        console.log('Admin API not available, using defaults')
      }
    }
    load()
  }, [])

  // Save content to API
  const updateContent = useCallback(async (key, value) => {
    setSiteContent(prev => {
      const next = { ...prev, [key]: value }
      if (apiOnline) {
        apiFetch('/content', {
          method: 'PUT',
          body: JSON.stringify({ [key]: value, password: 'h2badmin2026' }),
        }).catch(() => {})
      }
      return next
    })
  }, [apiOnline])

  const updateStat = useCallback((index, field, value) => {
    setSiteContent(prev => {
      const stats = [...prev.heroStats]
      stats[index] = { ...stats[index], [field]: value }
      const next = { ...prev, heroStats: stats }
      if (apiOnline) {
        apiFetch('/content', {
          method: 'PUT',
          body: JSON.stringify({ heroStats: stats, password: 'h2badmin2026' }),
        }).catch(() => {})
      }
      return next
    })
  }, [apiOnline])

  const resetContent = useCallback(async () => {
    setSiteContent(defaultContent)
    if (apiOnline) {
      apiFetch('/content', {
        method: 'PUT',
        body: JSON.stringify({ ...defaultContent, password: 'h2badmin2026' }),
      }).catch(() => {})
    }
  }, [apiOnline])

  // Product actions
  const updateProduct = useCallback(async (id, updates) => {
    setProducts(prev => {
      const next = prev.map(p => (p.id === id ? { ...p, ...updates } : p))
      if (apiOnline) {
        apiFetch(`/products/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ ...updates, password: 'h2badmin2026' }),
        }).catch(() => {})
      }
      return next
    })
  }, [apiOnline])

  const updateProductImage = useCallback(async (id, imageIndex, url) => {
    setProducts(prev => {
      const next = prev.map(p => {
        if (p.id !== id) return p
        const images = [...p.images]
        images[imageIndex] = url
        return { ...p, images }
      })
      if (apiOnline) {
        apiFetch(`/products/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ images: next.find(p => p.id === id).images, password: 'h2badmin2026' }),
        }).catch(() => {})
      }
      return next
    })
  }, [apiOnline])

  const addProduct = useCallback(async (product) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1
    const newProduct = { ...product, id: newId }
    setProducts(prev => [...prev, newProduct])
    if (apiOnline) {
      apiFetch('/products', {
        method: 'POST',
        body: JSON.stringify({ ...newProduct, password: 'h2badmin2026' }),
      }).catch(() => {})
    }
  }, [products, apiOnline])

  const deleteProduct = useCallback(async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    if (apiOnline) {
      apiFetch(`/products/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ password: 'h2badmin2026' }),
      }).catch(() => {})
    }
  }, [apiOnline])

  const resetProducts = useCallback(() => {
    setProducts(defaultProducts)
  }, [])

  // Upload image to Nitro backend
  const uploadImage = useCallback(async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('password', 'h2badmin2026')
    const res = await fetch(`${API_BASE}/api/upload`, { method: 'POST', body: formData })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Upload failed' }))
      throw new Error(err.message || 'Upload failed')
    }
    const data = await res.json()
    return `${API_BASE}${data.url}`
  }, [])

  // Auth
  const login = useCallback((password) => {
    if (password === 'h2badmin2026') {
      setIsAuthenticated(true)
      sessionStorage.setItem(AUTH_KEY, 'true')
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    sessionStorage.removeItem(AUTH_KEY)
  }, [])

  return (
    <AdminContext.Provider value={{
      products, siteContent, apiOnline,
      updateProduct, updateProductImage, addProduct, deleteProduct, resetProducts,
      updateContent, updateStat, resetContent,
      uploadImage,
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

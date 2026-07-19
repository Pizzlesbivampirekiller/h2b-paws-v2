import { createContext, useContext, useState, useEffect } from 'react'
import { products as defaultProducts } from '../data/products'

const AdminContext = createContext()

const STORAGE_KEY = 'h2b-admin-products'
const AUTH_KEY = 'h2b-admin-auth'

export function AdminProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : defaultProducts
    } catch {
      return defaultProducts
    }
  })

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const updateProduct = (id, updates) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  const updateProductImage = (id, imageIndex, url) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== id) return p
        const images = [...p.images]
        images[imageIndex] = url
        return { ...p, images }
      })
    )
  }

  const addProduct = (product) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1
    setProducts(prev => [...prev, { ...product, id: newId }])
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const resetProducts = () => {
    setProducts(defaultProducts)
  }

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
      products,
      updateProduct,
      updateProductImage,
      addProduct,
      deleteProduct,
      resetProducts,
      isAuthenticated,
      login,
      logout,
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

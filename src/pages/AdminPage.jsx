import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock, Eye, EyeOff, Save, Trash2, Plus, X, Image, RotateCcw,
  Upload, Check, LogOut, ShoppingBag, Settings
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { categories } from '../data/products'

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = onLogin(password)
    if (!success) {
      setError('Invalid password')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-sm border border-sand/50"
      >
        <div className="w-14 h-14 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-6">
          <Lock size={24} className="text-terracotta" />
        </div>
        <h1 className="font-serif text-2xl text-center text-charcoal mb-6">Admin Panel</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Enter password"
              className="w-full px-4 py-3 pr-10 rounded-xl border border-sand bg-transparent text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta transition-colors"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal cursor-pointer"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs text-center">
              {error}
            </motion.p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-terracotta text-cream rounded-xl font-medium hover:bg-terracotta-dark transition-colors cursor-pointer"
          >
            Enter Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  )
}

function ProductEditor({ product, onUpdate, onUpdateImage, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div layout className="bg-white rounded-xl border border-sand/50 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-sand/10 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-sand/30 flex items-center justify-center">
              <Image size={20} className="text-charcoal/20" />
            </div>
          )}
          <div className="text-left">
            <h3 className="font-medium text-charcoal text-sm">{product.name}</h3>
            <p className="text-xs text-charcoal/30">${product.price} · {product.category}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <Chevron className="text-charcoal/30" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-sand/50 space-y-4">
              {/* Name & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-charcoal/40 mb-1 block">Name</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => onUpdate(product.id, { name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="text-xs text-charcoal/40 mb-1 block">Price ($)</label>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => onUpdate(product.id, { price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-charcoal/40 mb-1 block">Description</label>
                <textarea
                  value={product.description}
                  onChange={(e) => onUpdate(product.id, { description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta resize-none"
                />
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-charcoal/40 mb-1 block">Category</label>
                  <select
                    value={product.category}
                    onChange={(e) => onUpdate(product.id, { category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-sand text-sm bg-transparent focus:outline-none focus:border-terracotta"
                  >
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-charcoal/40 mb-1 block">Badge</label>
                  <input
                    type="text"
                    value={product.badge || ''}
                    onChange={(e) => onUpdate(product.id, { badge: e.target.value || null })}
                    placeholder="e.g. Best Seller"
                    className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="text-xs text-charcoal/40 mb-2 block">Images (paste URLs)</label>
                <div className="space-y-2">
                  {(product.images || []).map((img, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <img src={img} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <input
                        type="text"
                        value={img}
                        onChange={(e) => onUpdateImage(product.id, i, e.target.value)}
                        placeholder={`Image ${i + 1} URL`}
                        className="flex-1 px-3 py-2 rounded-lg border border-sand text-xs focus:outline-none focus:border-terracotta"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="text-xs text-charcoal/40 mb-1 block">Sizes (comma separated)</label>
                <input
                  type="text"
                  value={(product.sizes || []).join(', ')}
                  onChange={(e) => onUpdate(product.id, { sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="XS, S, M, L, XL"
                  className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Colors */}
              <div>
                <label className="text-xs text-charcoal/40 mb-1 block">Colors (hex codes, comma separated)</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(product.colors || []).map((color, i) => (
                    <span key={i} className="w-6 h-6 rounded-full border border-sand" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <input
                  type="text"
                  value={(product.colors || []).join(', ')}
                  onChange={(e) => onUpdate(product.id, { colors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="#C47354, #8FA88F"
                  className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => onDelete(product.id)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm text-red-400 border border-red-200 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Chevron({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M7 8L10 11L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AdminPage() {
  const {
    products, updateProduct, updateProductImage, addProduct,
    deleteProduct, resetProducts, isAuthenticated, login, logout,
  } = useAdmin()

  const [showAdd, setShowAdd] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '', slug: '', category: 'accessories', price: 0, rating: 5,
    reviews: 0, colors: [], sizes: [], images: [], description: '', featured: false, badge: null,
  })

  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />
  }

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.slug) return
    addProduct({
      ...newProduct,
      images: newProduct.images.filter(Boolean),
      colors: newProduct.colors.filter(Boolean),
      sizes: newProduct.sizes.filter(Boolean),
    })
    setNewProduct({
      name: '', slug: '', category: 'accessories', price: 0, rating: 5,
      reviews: 0, colors: [], sizes: [], images: [], description: '', featured: false, badge: null,
    })
    setShowAdd(false)
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-16 bg-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
              <Settings size={20} className="text-terracotta" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-semibold text-charcoal">Product Manager</h1>
              <p className="text-xs text-charcoal/40">{products.length} products</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetProducts}
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-charcoal/40 border border-sand rounded-xl hover:bg-sand/20 transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-charcoal/40 border border-sand rounded-xl hover:bg-sand/20 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              Exit
            </button>
          </div>
        </div>

        {/* Add new product */}
        <div className="mb-6">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 px-5 py-3 bg-charcoal text-cream rounded-xl font-medium text-sm hover:bg-charcoal/90 transition-colors cursor-pointer"
          >
            <Plus size={18} />
            Add Product
          </button>

          <AnimatePresence>
            {showAdd && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-5 bg-white rounded-xl border border-sand/50 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-charcoal/40 mb-1 block">Name *</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta"
                        placeholder="Product name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-charcoal/40 mb-1 block">Slug *</label>
                      <input
                        type="text"
                        value={newProduct.slug}
                        onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta"
                        placeholder="url-friendly-name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-charcoal/40 mb-1 block">Price ($)</label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-charcoal/40 mb-1 block">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-sand text-sm bg-transparent focus:outline-none focus:border-terracotta"
                      >
                        {categories.filter(c => c.id !== 'all').map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-charcoal/40 mb-1 block">Image URLs (one per line)</label>
                      <textarea
                        value={newProduct.images.join('\n')}
                        onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value.split('\n').filter(Boolean) })}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:border-terracotta resize-none"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-5 py-2.5 bg-sage text-white rounded-xl font-medium text-sm hover:bg-sage-dark transition-colors cursor-pointer"
                  >
                    <Save size={16} />
                    Save Product
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product list */}
        <div className="space-y-3">
          {products.map((product) => (
            <ProductEditor
              key={product.id}
              product={product}
              onUpdate={updateProduct}
              onUpdateImage={updateProductImage}
              onDelete={deleteProduct}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 p-4 rounded-xl bg-sage/5 border border-sage/20 text-center">
          <p className="text-xs text-sage-dark">
            Changes are saved to your browser's local storage and will persist until you clear it.
            <br />
            To share changes with visitors, export your data and update the source files.
          </p>
        </div>
      </div>
    </div>
  )
}

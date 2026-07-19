import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock, Eye, EyeOff, Save, Trash2, Plus, X, Image, RotateCcw,
  Check, LogOut, Settings, Type, Layout, ShoppingBag, FileText, Home, Info, Phone
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { categories } from '../data/products'

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!onLogin(password)) { setError('Invalid password'); setPassword('') }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-sm border border-sand/50">
        <div className="w-14 h-14 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-6"><Lock size={24} className="text-terracotta" /></div>
        <h1 className="font-serif text-2xl text-center text-charcoal mb-6">Admin Panel</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input type={show ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setError('') }} placeholder="Enter password" className="w-full px-4 py-3 pr-10 rounded-xl border border-sand bg-transparent text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta transition-colors" autoFocus />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal cursor-pointer">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs text-center">{error}</motion.p>}
          <button type="submit" className="w-full py-3 bg-terracotta text-cream rounded-xl font-medium hover:bg-terracotta-dark transition-colors cursor-pointer">Enter Dashboard</button>
        </form>
      </motion.div>
    </div>
  )
}

const tabs = [
  { id: 'text', label: 'Page Text', icon: Type },
  { id: 'hero', label: 'Hero', icon: Home },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'images', label: 'Backgrounds', icon: Image },
]

export default function AdminPage() {
  const {
    products, siteContent, updateProduct, updateProductImage, addProduct, deleteProduct,
    resetProducts, updateContent, updateStat, resetContent, isAuthenticated, login, logout,
  } = useAdmin()

  const [tab, setTab] = useState('text')
  const [showAdd, setShowAdd] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '', slug: '', category: 'accessories', price: 0, rating: 5,
    reviews: 0, colors: [], sizes: [], images: [], description: '', featured: false, badge: null,
  })

  if (!isAuthenticated) return <LoginScreen onLogin={login} />

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.slug) return
    addProduct({ ...newProduct, images: newProduct.images.filter(Boolean), colors: newProduct.colors.filter(Boolean), sizes: newProduct.sizes.filter(Boolean) })
    setNewProduct({ name: '', slug: '', category: 'accessories', price: 0, rating: 5, reviews: 0, colors: [], sizes: [], images: [], description: '', featured: false, badge: null })
    setShowAdd(false)
  }

  const Field = ({ label, value, onChange, type = 'text', placeholder = '', big = false }) => (
    <div>
      <label className="text-xs text-charcoal/40 mb-1.5 block font-medium">{label}</label>
      {big ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-sand text-sm focus:outline-none focus:border-terracotta resize-none" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-sand text-sm focus:outline-none focus:border-terracotta" />
      )}
    </div>
  )

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-16 bg-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center"><Settings size={20} className="text-terracotta" /></div>
            <div><h1 className="font-serif text-2xl font-semibold text-charcoal">Site Manager</h1></div>
          </div>
          <button onClick={logout} className="flex items-center gap-1.5 px-4 py-2 text-sm text-charcoal/40 border border-sand rounded-xl hover:bg-sand/20 transition-colors cursor-pointer"><LogOut size={14} />Exit</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${tab === t.id ? 'bg-terracotta text-cream' : 'bg-white text-charcoal/50 border border-sand hover:text-charcoal'}`}>
              <t.icon size={16} />{t.label}
            </button>
          ))}
        </div>

        {/* Tab: Page Text */}
        {tab === 'text' && (
          <div className="space-y-8">
            {[
              { title: 'Splash Screen', items: [{ key: 'splashSlogan', label: 'Slogan', val: siteContent.splashSlogan }] },
              { title: 'Footer', items: [{ key: 'footerTitle', label: 'Newsletter Title', val: siteContent.footerTitle }, { key: 'footerDesc', label: 'Newsletter Description', val: siteContent.footerDesc, big: true }] },
              { title: 'Featured Products Section', items: [{ key: 'featuredSubtitle', label: 'Subtitle', val: siteContent.featuredSubtitle }, { key: 'featuredTitle', label: 'Title', val: siteContent.featuredTitle }, { key: 'featuredDesc', label: 'Description', val: siteContent.featuredDesc, big: true }] },
              { title: 'Categories Section', items: [{ key: 'categoriesSubtitle', label: 'Subtitle', val: siteContent.categoriesSubtitle }, { key: 'categoriesTitle', label: 'Title', val: siteContent.categoriesTitle }, { key: 'categoriesDesc', label: 'Description', val: siteContent.categoriesDesc, big: true }] },
              { title: 'Testimonials Section', items: [{ key: 'testimonialsSubtitle', label: 'Subtitle', val: siteContent.testimonialsSubtitle }, { key: 'testimonialsTitle', label: 'Title', val: siteContent.testimonialsTitle }] },
              { title: 'CTA Section', items: [{ key: 'ctaHeadline', label: 'Headline', val: siteContent.ctaHeadline, big: true }, { key: 'ctaHeadlineItalic', label: 'Italic Word', val: siteContent.ctaHeadlineItalic }, { key: 'ctaSubheading', label: 'Subheading', val: siteContent.ctaSubheading, big: true }] },
              { title: 'About Page', items: [{ key: 'aboutTitle', label: 'Title', val: siteContent.aboutTitle, big: true }, { key: 'aboutDesc', label: 'Description', val: siteContent.aboutDesc, big: true }] },
              { title: 'Contact Page', items: [{ key: 'contactTitle', label: 'Title', val: siteContent.contactTitle, big: true }, { key: 'contactDesc', label: 'Description', val: siteContent.contactDesc, big: true }] },
              { title: 'Shop Page', items: [{ key: 'shopTitle', label: 'Title', val: siteContent.shopTitle }, { key: 'shopSubtitle', label: 'Subtitle', val: siteContent.shopSubtitle }, { key: 'shopDesc', label: 'Description', val: siteContent.shopDesc, big: true }] },
            ].map((section) => (
              <div key={section.title} className="bg-white rounded-2xl p-6 border border-sand/50">
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">{section.title}</h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <Field key={item.key} label={item.label} value={item.val} onChange={(v) => updateContent(item.key, v)} big={item.big} />
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center">
              <button onClick={resetContent} className="flex items-center gap-2 mx-auto px-5 py-2.5 text-sm text-charcoal/40 border border-sand rounded-xl hover:bg-sand/20 transition-colors cursor-pointer"><RotateCcw size={14} />Reset All Text to Default</button>
            </div>
          </div>
        )}

        {/* Tab: Hero */}
        {tab === 'hero' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-sand/50">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Hero Content</h3>
              <div className="space-y-4">
                <Field label="Badge Text" value={siteContent.heroBadge} onChange={(v) => updateContent('heroBadge', v)} />
                <Field label="Headline Line 1" value={siteContent.heroHeadline1} onChange={(v) => updateContent('heroHeadline1', v)} />
                <Field label="Italic Word (after headline)" value={siteContent.heroHeadlineItalic} onChange={(v) => updateContent('heroHeadlineItalic', v)} />
                <Field label="Subheading" value={siteContent.heroSubheading} onChange={(v) => updateContent('heroSubheading', v)} big />
                <Field label="CTA Button 1" value={siteContent.heroCta1} onChange={(v) => updateContent('heroCta1', v)} />
                <Field label="CTA Button 2" value={siteContent.heroCta2} onChange={(v) => updateContent('heroCta2', v)} />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-sand/50">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Hero Stats</h3>
              <div className="space-y-4">
                {siteContent.heroStats.map((stat, i) => (
                  <div key={i} className="flex gap-4 items-end">
                    <Field label="Value" value={stat.value} onChange={(v) => updateStat(i, 'value', v)} />
                    <Field label="Label" value={stat.label} onChange={(v) => updateStat(i, 'label', v)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Products */}
        {tab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-charcoal/40">{products.length} products</p>
              <div className="flex gap-2">
                <button onClick={resetProducts} className="flex items-center gap-1.5 px-4 py-2 text-sm text-charcoal/40 border border-sand rounded-xl hover:bg-sand/20 transition-colors cursor-pointer"><RotateCcw size={14} />Reset</button>
                <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2 bg-charcoal text-cream rounded-xl text-sm font-medium hover:bg-charcoal/90 transition-colors cursor-pointer"><Plus size={16} />Add</button>
              </div>
            </div>

            <AnimatePresence>
              {showAdd && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-5 bg-white rounded-xl border border-sand/50 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Name *" value={newProduct.name} onChange={(v) => setNewProduct({ ...newProduct, name: v })} />
                      <Field label="Slug *" value={newProduct.slug} onChange={(v) => setNewProduct({ ...newProduct, slug: v })} />
                      <Field label="Price" value={String(newProduct.price)} onChange={(v) => setNewProduct({ ...newProduct, price: Number(v) || 0 })} type="number" />
                      <div>
                        <label className="text-xs text-charcoal/40 mb-1.5 block font-medium">Category</label>
                        <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-sand text-sm bg-transparent focus:outline-none focus:border-terracotta">
                          {categories.filter(c => c.id !== 'all').map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                        </select>
                      </div>
                    </div>
                    <Field label="Image URLs (one per line)" value={newProduct.images.join('\n')} onChange={(v) => setNewProduct({ ...newProduct, images: v.split('\n').filter(Boolean) })} big />
                    <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-sage text-white rounded-xl text-sm font-medium hover:bg-sage-dark transition-colors cursor-pointer"><Save size={16} />Save</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              {products.map((p) => (
                <motion.div key={p.id} className="bg-white rounded-xl border border-sand/50 p-4">
                  <div className="flex items-center gap-4">
                    {p.images?.[0] ? <img src={p.images[0]} className="w-14 h-14 rounded-lg object-cover" alt="" /> : <div className="w-14 h-14 rounded-lg bg-sand/30" />}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-charcoal text-sm">{p.name}</h4>
                      <p className="text-xs text-charcoal/30">${p.price} · {p.category}</p>
                    </div>
                    <div className="flex gap-2">
                      {/* Quick edit fields */}
                      <input type="text" value={p.images[0] || ''} onChange={(e) => updateProductImage(p.id, 0, e.target.value)} placeholder="Image URL" className="w-40 px-3 py-1.5 rounded-lg border border-sand text-xs focus:outline-none focus:border-terracotta hidden lg:block" />
                      <input type="text" value={p.name} onChange={(e) => updateProduct(p.id, { name: e.target.value })} className="w-32 px-3 py-1.5 rounded-lg border border-sand text-xs focus:outline-none focus:border-terracotta hidden lg:block" />
                      <input type="number" value={p.price} onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) || 0 })} className="w-20 px-3 py-1.5 rounded-lg border border-sand text-xs focus:outline-none focus:border-terracotta hidden lg:block" />
                      <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Background Images */}
        {tab === 'images' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-sand/50">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Background Images</h3>
              <p className="text-xs text-charcoal/40 mb-6">Paste Unsplash or any image URLs. Leave empty to use default gradients.</p>
              <div className="space-y-4">
                {[
                  { key: 'bgCta', label: 'CTA Section Background' },
                  { key: 'bgAbout', label: 'About Page Hero Background' },
                  { key: 'bgContact', label: 'Contact Page Hero Background' },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="text-xs text-charcoal/40 mb-1.5 block font-medium">{item.label}</label>
                    <div className="flex gap-2 items-center">
                      <input type="text" value={siteContent[item.key]} onChange={(e) => updateContent(item.key, e.target.value)} placeholder="https://images.unsplash.com/..." className="flex-1 px-4 py-2.5 rounded-xl border border-sand text-sm focus:outline-none focus:border-terracotta" />
                      {siteContent[item.key] && (
                        <div className="w-12 h-12 rounded-lg bg-cover bg-center border border-sand flex-shrink-0" style={{ backgroundImage: `url(${siteContent[item.key]})` }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-sand/50">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Splash Screen</h3>
              <Field label="Slogan Text" value={siteContent.splashSlogan} onChange={(v) => updateContent('splashSlogan', v)} />
            </div>
            <p className="text-xs text-center text-charcoal/30">Changes saved to browser. Click "Reset All Text" to restore defaults.</p>
          </div>
        )}
      </div>
    </div>
  )
}

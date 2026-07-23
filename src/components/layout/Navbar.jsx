import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import CartDrawer from './CartDrawer'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: 'https://shop.h2bpaws.com', label: 'Shop', external: true },
  { path: '/about', label: 'About' },
  { path: '/blog', label: 'Journal' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-charcoal cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group cursor-pointer">
              <img src="/logo.png" alt="H2B Paws" className="h-7 w-auto transition-transform group-hover:scale-105" />
              <span className="font-serif text-xl font-semibold tracking-tight text-charcoal">
                H2B <span className="text-terracotta">Paws</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-sm font-medium tracking-wide uppercase transition-colors cursor-pointer text-charcoal/70 hover:text-charcoal"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-sm font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                      location.pathname === link.path ? 'text-terracotta' : 'text-charcoal/70 hover:text-charcoal'
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terracotta rounded-full"
                      />
                    )}
                  </Link>
                )
              )}
            </div>

            {/* Cart + CTA */}
            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-cream bg-charcoal rounded-full hover:bg-charcoal/90 transition-colors cursor-pointer"
              >
                Cart
                {itemCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center text-xs bg-terracotta rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-charcoal hover:text-terracotta transition-colors cursor-pointer"
                aria-label="Open cart"
              >
                <ShoppingBag size={22} />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-cream bg-terracotta rounded-full"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-cream p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <Link to="/" className="flex items-center gap-2 cursor-pointer" onClick={() => setMobileOpen(false)}>
                  <img src="/logo.png" alt="H2B Paws" className="h-6 w-auto" />
                  <span className="font-serif text-lg font-semibold">H2B Paws</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 cursor-pointer" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`text-2xl font-serif ${
                        location.pathname === link.path ? 'text-terracotta' : 'text-charcoal'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto">
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-cream bg-charcoal rounded-full cursor-pointer"
                >
                  <ShoppingBag size={18} />
                  View Cart ({itemCount})
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

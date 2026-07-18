import { useEffect, useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage'
import BlogPage from './pages/BlogPage'
import useScrollProgress from './hooks/useScrollProgress'
import useMediaQuery from './hooks/useMediaQuery'

function CustomCursor() {
  const [pos, setPos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 })
  const [hover, setHover] = useState(false)
  const [ready, setReady] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const onMouseMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY })
    if (!ready) setReady(true)
  }, [ready])

  const onMouseOver = useCallback((e) => {
    const target = e.target
    if (
      target.closest('a') ||
      target.closest('button') ||
      target.closest('[data-cursor-hover]') ||
      target.closest('.cursor-pointer')
    ) {
      setHover(true)
    } else {
      setHover(false)
    }
  }, [])

  // Toggle body class to hide native cursor only after custom cursor is ready
  useEffect(() => {
    if (ready && !isMobile) {
      document.body.classList.add('cursor-hidden')
    }
    return () => {
      document.body.classList.remove('cursor-hidden')
    }
  }, [ready, isMobile])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [onMouseMove, onMouseOver])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className={`custom-cursor ${hover ? 'hover' : ''}`}
        animate={{ x: pos.x - 16, y: pos.y - 16 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="custom-cursor-dot"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: 'spring', stiffness: 1000, damping: 30, mass: 0.2 }}
      />
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const progress = useScrollProgress()
  const location = useLocation()

  return (
    <div className="relative">
      <CustomCursor />
      <ScrollToTop />

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-terracotta z-[60]"
        style={{ width: `${progress * 100}%` }}
      />

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
          <Route path="/shop/:id" element={<PageTransition><ProductPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

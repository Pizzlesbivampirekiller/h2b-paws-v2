import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'

export default function SplashScreen() {
  const { siteContent } = useAdmin()
  const [show, setShow] = useState(true)
  const [exit, setExit] = useState(false)

  useEffect(() => {
    // Check if splash has been shown this session
    const seen = sessionStorage.getItem('h2b-splash-seen')
    if (seen) {
      setShow(false)
      return
    }
    sessionStorage.setItem('h2b-splash-seen', '1')

    const timer = setTimeout(() => setExit(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <AnimatePresence onExitComplete={() => setShow(false)}>
      {!exit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => setExit(true)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal cursor-pointer"
        >
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                  ease: 'easeInOut',
                }}
                className="absolute w-2 h-2 rounded-full bg-terracotta/40"
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="mb-8"
            >
              <img src="/logo.png" alt="H2B Paws" className="h-20 w-auto mx-auto brightness-0 invert" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-semibold text-cream mb-6 tracking-tight">
                H2B <span className="text-terracotta">Paws</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-cream/40 text-lg sm:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase"
            >
              {siteContent.splashSlogan}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-cream/20 text-xs mt-12 tracking-widest uppercase"
            >
              Click anywhere to enter
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

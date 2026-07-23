import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import ParallaxLayer from '../ui/ParallaxLayer'
import Button from '../ui/Button'
import { useAdmin } from '../../context/AdminContext'

function Particles({ count = 200 }) {
  const meshRef = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#C47354" sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

export default function HeroSection() {
  const { siteContent } = useAdmin()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.6} />
          <Particles count={300} />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream/50 to-cream" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-24 lg:pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <span className="inline-block text-xs lg:text-sm font-medium tracking-[0.3em] uppercase text-terracotta mb-6 bg-terracotta/10 px-4 py-2 rounded-full">
                {siteContent.heroBadge}
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.05] text-charcoal mb-6">
              {siteContent.heroHeadline1}
              <br />
              meets <span className="italic text-terracotta">{siteContent.heroHeadlineItalic}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-lg lg:text-xl text-charcoal/50 max-w-lg mb-10 leading-relaxed">
              {siteContent.heroSubheading}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="flex flex-wrap gap-4">
              <a href="https://shop.h2bpaws.com" target="_blank" rel="noopener noreferrer"><Button variant="terracotta" size="lg">{siteContent.heroCta1}<ArrowRight size={18} /></Button></a>
              <Link to="/about"><Button variant="outline" size="lg">{siteContent.heroCta2}</Button></Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="flex gap-10 mt-16 pt-10 border-t border-charcoal/10">
              {siteContent.heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal">{stat.value}</div>
                  <div className="text-sm text-charcoal/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <ParallaxLayer speed={0.03} className="hidden lg:flex justify-center">
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative">
              <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-terracotta/20 via-sand/30 to-sage/20 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-tr from-golden/20 to-terracotta/10 blur-2xl" />
            </motion.div>
          </ParallaxLayer>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ delay: 1.5, y: { duration: 2, repeat: Infinity } }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-charcoal/30">Scroll</span>
          <ChevronDown size={20} className="text-charcoal/30" />
        </motion.div>
      </div>
    </section>
  )
}

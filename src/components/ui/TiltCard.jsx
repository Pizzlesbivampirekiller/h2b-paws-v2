import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useMediaQuery from '../../hooks/useMediaQuery'

export default function TiltCard({ children, className = '', intensity = 8 }) {
  const ref = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) return <div className={className}>{children}</div>

  const handleMouseMove = (e) => {
    const card = ref.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity
    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

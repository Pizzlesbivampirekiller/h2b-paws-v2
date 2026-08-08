import { motion } from 'framer-motion'
import Magnetic from './Magnetic'

const variants = {
  primary: 'bg-charcoal text-cream hover:bg-charcoal/90',
  outline: 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream',
  terracotta: 'bg-terracotta text-cream hover:bg-terracotta-dark',
  ghost: 'text-charcoal hover:text-terracotta',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  magnetic = true,
  ...props
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${variants[variant]} ${sizeClasses[size]} ${className}`

  const content = (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  )

  if (magnetic) {
    return <Magnetic>{content}</Magnetic>
  }

  return content
}

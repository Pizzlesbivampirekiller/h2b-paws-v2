import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from '../ui/TiltCard'

export default function TeamCard({ member }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <TiltCard className="cursor-pointer" onClick={() => setFlipped(!flipped)}>
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <AnimatePresence>
          {!flipped ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-charcoal/80 to-transparent"
            >
              <h3 className="font-serif text-xl font-semibold text-cream">{member.name}</h3>
              <p className="text-sm text-cream/60">{member.role}</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/90 backdrop-blur p-6 flex flex-col justify-center"
            >
              <p className="text-cream/80 text-sm leading-relaxed mb-4">{member.bio}</p>
              <p className="text-cream/40 text-sm">{member.pet}</p>
              <span className="text-xs text-cream/30 mt-4">Tap to flip back</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TiltCard>
  )
}

import React from 'react'
import { motion } from 'framer-motion'

/**
 * MoodEmoji — large, accessible emoji with optional aura.
 */
export default function MoodEmoji({ emoji, size = 56, glow = false, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: [-2, 2, 0] }}
      transition={{ duration: 0.4 }}
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size, fontSize: size * 0.6 }}
      aria-label={label}
    >
      {glow && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)' }}
        />
      )}
      <span className="relative">{emoji}</span>
    </motion.div>
  )
}

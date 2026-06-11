import React from 'react'
import { motion } from 'framer-motion'

/**
 * FloatingShapes — animated gradient blobs for hero/empty backgrounds.
 */
export default function FloatingShapes({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden -z-10 ${className}`}>
      <motion.div
        className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl"
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0], scale: [1, 1.05, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-secondary/25 blur-3xl"
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -10, 0], scale: [1, 0.95, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        animate={{ x: [0, 20, -30, 0], y: [0, -10, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

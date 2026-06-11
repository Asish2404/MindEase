import React from 'react'
import { motion } from 'framer-motion'

export default function GlassButton({ children, onClick, type = 'button', disabled, className = '' }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -1 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      className={`rounded-2xl px-4 py-3 font-semibold transition ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </motion.button>
  )
}


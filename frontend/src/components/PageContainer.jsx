import React from 'react'
import { motion } from 'framer-motion'

/**
 * PageContainer — consistent max-width, padding, motion.
 */
export default function PageContainer({ children, className = '' }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 ${className}`}
    >
      {children}
    </motion.main>
  )
}

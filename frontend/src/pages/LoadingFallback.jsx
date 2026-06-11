import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingFallback({ text = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-3xl px-6 py-4">
        <div className="text-white/70">{text}</div>
      </motion.div>
    </div>
  )
}


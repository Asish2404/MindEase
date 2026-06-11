import React from 'react'
import { motion } from 'framer-motion'

export default function EmptyState({ title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <div className="font-semibold">{title ?? 'Nothing here yet'}</div>
      <div className="text-sm text-white/70 mt-2">{desc ?? 'Complete a check-in to see insights.'}</div>
    </motion.div>
  )
}


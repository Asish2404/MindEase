import React from 'react'
import { motion } from 'framer-motion'

export default function StatCard({ title, value, subtitle, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`glass rounded-3xl p-5 border ${accent ? 'border-primary/35' : 'border-white/10'}`}
    >
      <div className="text-sm text-white/60">{title}</div>
      <div className={`text-3xl font-semibold mt-2 ${accent ? 'text-primary' : 'text-text'}`}>{value}</div>
      <div className="text-sm text-white/70 mt-2">{subtitle}</div>
    </motion.div>
  )
}


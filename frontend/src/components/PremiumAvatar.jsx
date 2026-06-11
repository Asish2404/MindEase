import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

function initialsFromName(name) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return 'ME'
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''
  return (first + last).toUpperCase()
}

export default function PremiumAvatar({ name = '', email = '', size = 44 }) {
  const initials = useMemo(() => initialsFromName(name || email), [name, email])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative"
    >
      <div
        aria-hidden
        className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 blur-xl"
      />
      <div
        className="relative rounded-full border border-white/10 bg-white/5 backdrop-blur px-1"
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full flex items-center justify-center rounded-full text-sm font-semibold text-text">
          {initials}
        </div>
      </div>
    </motion.div>
  )
}


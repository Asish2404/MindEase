import React from 'react'
import { motion } from 'framer-motion'
import Skeleton from './Skeleton.jsx'

export default function LoadingFallback({ text = 'Loading…', variant = 'card' }) {
  if (variant === 'skeleton') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl px-6 py-4 flex items-center gap-3"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-70" />
          <span className="relative rounded-full h-2.5 w-2.5 bg-primary" />
        </span>
        <div className="text-white/75 text-sm">{text}</div>
      </motion.div>
    </div>
  )
}

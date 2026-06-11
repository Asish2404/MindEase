import React from 'react'
import { motion } from 'framer-motion'

export default function EmptyState({ title, desc, icon: Icon, action, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={[
        'relative overflow-hidden rounded-3xl p-8 text-center',
        'glass',
        className,
      ].join(' ')}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8"
      />
      <div className="relative">
        {Icon && (
          <div className="mx-auto h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
            <Icon size={20} />
          </div>
        )}
        <div className="mt-4 text-lg font-semibold">{title ?? 'Nothing here yet'}</div>
        {desc && <div className="mt-2 text-sm text-white/60 max-w-md mx-auto">{desc}</div>}
        {action && <div className="mt-5">{action}</div>}
      </div>
    </motion.div>
  )
}

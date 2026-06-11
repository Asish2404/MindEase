import React from 'react'
import { motion } from 'framer-motion'

/**
 * SectionHeader — page-level title + subtitle + optional pill.
 */
export default function SectionHeader({ eyebrow, title, subtitle, pill, right }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary/90">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            {eyebrow}
          </div>
        )}
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-white/65 max-w-2xl text-[15px] leading-relaxed">
            {subtitle}
          </p>
        )}
        {pill && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft text-xs text-white/70">
            {pill}
          </div>
        )}
      </motion.div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  )
}

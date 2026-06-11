import React from 'react'
import { motion } from 'framer-motion'

const tone = {
  primary: { bar: 'from-primary to-secondary', text: 'text-primary' },
  accent: { bar: 'from-accent to-primary', text: 'text-accent' },
  warn: { bar: 'from-amber-400 to-pink-500', text: 'text-amber-300' },
  neutral: { bar: 'from-white/40 to-white/10', text: 'text-text' },
}

export default function StatCard({
  title,
  value,
  subtitle,
  accent = false,
  tone: toneKey = 'neutral',
  icon: Icon,
  trend, // { value: '+12%', direction: 'up' | 'down' }
  index = 0,
}) {
  const t = tone[toneKey] || tone.neutral
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className={[
        'group relative overflow-hidden rounded-3xl p-5 sm:p-6',
        'glass hover-lift',
        accent ? 'shadow-glow-soft' : '',
      ].join(' ')}
    >
      {/* Top sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-30 blur-2xl bg-gradient-to-br from-primary/40 to-secondary/30 group-hover:opacity-60 transition-opacity duration-500"
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium tracking-wider uppercase text-white/50">
            {title}
          </div>
          {Icon && (
            <div className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-primary">
              <Icon size={16} />
            </div>
          )}
        </div>
        {trend && (
          <div
            className={[
              'inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-1',
              trend.direction === 'up'
                ? 'bg-accent/15 text-accent border border-accent/30'
                : 'bg-rose-500/10 text-rose-300 border border-rose-500/30',
            ].join(' ')}
          >
            {trend.direction === 'up' ? '▲' : '▼'} {trend.value}
          </div>
        )}
      </div>

      <div className={`mt-4 text-3xl sm:text-[34px] font-semibold tracking-tight ${t.text}`}>
        {value}
      </div>
      {subtitle && (
        <div className="mt-1.5 text-sm text-white/60 leading-relaxed">{subtitle}</div>
      )}

      <div className="mt-4 h-1 rounded-full overflow-hidden bg-white/5">
        <div className={`h-full w-2/3 bg-gradient-to-r ${t.bar} rounded-full`} />
      </div>
    </motion.div>
  )
}

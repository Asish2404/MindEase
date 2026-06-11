import React from 'react'
import { motion } from 'framer-motion'

/**
 * ProgressRing — SVG circular progress.
 * Used for wellness score, habit completion, mood intensity.
 */
export default function ProgressRing({
  value = 0, // 0..100
  size = 140,
  stroke = 10,
  label,
  sublabel,
  trackColor = 'rgba(255,255,255,0.08)',
  from = '#6366F1',
  to = '#8B5CF6',
  icon,
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, value))
  const dash = (clamped / 100) * circumference
  const id = React.useId()

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#grad-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${dash} ${circumference}` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.4))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {icon ? (
          <div className="text-2xl mb-1">{icon}</div>
        ) : null}
        <div className="text-3xl font-semibold tracking-tight">
          {Math.round(clamped)}
          {label?.includes('%') ? '' : ''}
        </div>
        {sublabel && (
          <div className="text-[11px] uppercase tracking-widest text-white/50 mt-1">
            {sublabel}
          </div>
        )}
        {label && !sublabel && (
          <div className="text-xs text-white/60 mt-1">{label}</div>
        )}
      </div>
    </div>
  )
}

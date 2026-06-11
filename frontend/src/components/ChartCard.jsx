import React from 'react'
import { motion } from 'framer-motion'

/**
 * ChartCard — premium line/area chart with gradient + grid + tooltip-ready points.
 */
export default function ChartCard({ title, points, type = 'mood', subtitle, height = 220 }) {
  const width = 560
  const h = 200
  const pad = 24

  const safePoints = (points ?? []).filter((p) => Number.isFinite(p.y))
  const ys = safePoints.map((p) => p.y)
  const maxY = Math.max(1, ...ys)
  const minY = Math.min(0, ...ys)

  const toX = (i) => {
    if (safePoints.length <= 1) return pad
    return pad + (i * (width - pad * 2)) / (safePoints.length - 1)
  }
  const toY = (y) => {
    const range = maxY - minY || 1
    const t = (y - minY) / range
    return h - pad - t * (h - pad * 2)
  }

  const linePath = safePoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(p.y)}`)
    .join(' ')

  const areaPath = safePoints.length
    ? `${linePath} L ${toX(safePoints.length - 1)} ${h - pad} L ${toX(0)} ${h - pad} Z`
    : ''

  const id = React.useId()
  const grad = `grad-${id}`
  const area = `area-${id}`

  const moodColor = { stroke: '#8B5CF6', area: 'rgba(139,92,246,0.25)' }
  const stressColor = { stroke: '#6366F1', area: 'rgba(99,102,241,0.25)' }
  const palette = type === 'mood' ? moodColor : stressColor

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-3xl p-5 sm:p-6 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-16 h-44 w-44 rounded-full blur-3xl opacity-25"
        style={{ background: palette.stroke }}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium tracking-widest uppercase text-white/50">
            {type === 'mood' ? 'Mood' : 'Stress'}
          </div>
          <div className="mt-1 text-lg font-semibold tracking-tight">{title}</div>
          {subtitle && <div className="text-sm text-white/55 mt-1">{subtitle}</div>}
        </div>
        <div className="inline-flex items-center gap-2 text-[11px] text-white/55">
          <span className="h-2 w-2 rounded-full" style={{ background: palette.stroke }} />
          {type === 'mood' ? 'Score 1–5' : '0–10'}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${h}`} className="w-full" style={{ height }}>
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={palette.stroke} />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
            <linearGradient id={area} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.stroke} stopOpacity="0.35" />
              <stop offset="100%" stopColor={palette.stroke} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[0, 1, 2, 3].map((i) => {
            const y = pad + i * ((h - pad * 2) / 3)
            return <line key={i} x1={pad} x2={width - pad} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
          })}

          {safePoints.length > 0 ? (
            <>
              <path d={areaPath} fill={`url(#${area})`} />
              <motion.path
                d={linePath}
                fill="none"
                stroke={`url(#${grad})`}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              />
              {safePoints.map((p, i) => {
                const x = toX(i)
                const y = toY(p.y)
                return (
                  <g key={`${p.x}-${i}`}> 
                    <circle cx={x} cy={y} r="9" fill={palette.stroke} opacity="0.18" />
                    <circle cx={x} cy={y} r="4" fill="#0F172A" stroke={palette.stroke} strokeWidth="2" />
                  </g>
                )
              })}
              {/* X axis date labels (last few) */}
              {safePoints.map((p, i) => {
                if (safePoints.length > 7 && i % 2 !== 0) return null
                const x = toX(i)
                return (
                  <text
                    key={`l-${p.x}-${i}`}
                    x={x}
                    y={h - 6}
                    textAnchor="middle"
                    fontSize="10"
                    fill="rgba(248,250,252,0.4)"
                  >
                    {(p.x || '').slice(5)}
                  </text>
                )
              })}
            </>
          ) : (
            <text x={width / 2} y={h / 2} textAnchor="middle" fill="rgba(248,250,252,0.5)" fontSize="13">
              No data yet — complete a check-in to see insights
            </text>
          )}
        </svg>
      </div>
    </motion.div>
  )
}

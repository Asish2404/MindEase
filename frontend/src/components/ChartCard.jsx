import React from 'react'
import { motion } from 'framer-motion'

export default function ChartCard({ title, points, type }) {
  const width = 520
  const height = 180
  const pad = 22

  const safePoints = points ?? []
  const maxY = Math.max(1, ...safePoints.map((p) => p.y))
  const minY = Math.min(0, ...safePoints.map((p) => p.y))

  const toX = (i) => {
    if (safePoints.length <= 1) return pad
    return pad + (i * (width - pad * 2)) / (safePoints.length - 1)
  }

  const toY = (y) => {
    const range = maxY - minY || 1
    const t = (y - minY) / range
    return height - pad - t * (height - pad * 2)
  }

  const path = safePoints
    .map((p, i) => {
      const x = toX(i)
      const y = toY(p.y)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="glass rounded-3xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-white/60 mt-1">{type === 'mood' ? 'Higher means better mood' : '0-10 stress score'}</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[190px] bg-black/10">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#6366F1" stopOpacity="0.95" />
              <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => {
            const y = pad + i * ((height - pad * 2) / 3)
            return <line key={i} x1={pad} x2={width - pad} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />
          })}

          {safePoints.length > 0 ? (
            <>
              <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
              {safePoints.map((p, i) => {
                const x = toX(i)
                const y = toY(p.y)
                return (
                  <g key={p.x}>
                    <circle cx={x} cy={y} r="5" fill="#0F172A" stroke="#6366F1" strokeWidth="2" />
                  </g>
                )
              })}
            </>
          ) : (
            <text x={width / 2} y={height / 2} textAnchor="middle" fill="rgba(248,250,252,0.6)" fontSize="14">
              No data yet
            </text>
          )}
        </svg>
      </div>
    </motion.div>
  )
}


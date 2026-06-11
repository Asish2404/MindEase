import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useLocalData } from '../services/useLocalData.js'
import ChartCard from '../components/ChartCard.jsx'
import StatCard from '../components/StatCard.jsx'

export default function Dashboard() {
  const { moodEntries, stressEntries, habitsEntries } = useLocalData()

  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const todaysMood = useMemo(() => {
    const found = moodEntries.find((m) => m.date_iso === todayISO)
    return found?.mood ?? null
  }, [moodEntries, todayISO])

  const latestStress = useMemo(() => {
    const sorted = [...stressEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))
    return sorted[0] ?? null
  }, [stressEntries])

  const totalCheckins = moodEntries.length

  const wellnessScore = useMemo(() => {
    // Simple heuristic: invert stress + habit completion.
    const stressScore = latestStress?.score ?? 0
    const stressFactor = 100 - Math.round((stressScore / 10) * 100) // 0..100

    const completion = (() => {
      if (!habitsEntries.length) return 0
      const latest = [...habitsEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0]
      const water = Math.min(1, latest.water_ml / 2000)
      const sleep = Math.min(1, latest.sleep_hours / 8)
      const ex = Math.min(1, latest.exercise_minutes / 30)
      const med = Math.min(1, latest.meditation_minutes / 10)
      return Math.round(((water + sleep + ex + med) / 4) * 100)
    })()

    return Math.round(0.6 * stressFactor + 0.4 * completion)
  }, [latestStress, habitsEntries])

  const moodTrend = useMemo(() => {
    const sorted = [...moodEntries].sort((a, b) => (a.date_iso > b.date_iso ? 1 : -1)).slice(-7)
    const map = { happy: 5, good: 4, neutral: 3, sad: 2, stressed: 1 }
    return sorted.map((m) => ({ x: m.date_iso, y: map[m.mood] }))
  }, [moodEntries])

  const weeklyStress = useMemo(() => {
    const sorted = [...stressEntries].sort((a, b) => (a.date_iso > b.date_iso ? 1 : -1)).slice(-7)
    return sorted.map((s) => ({ x: s.date_iso, y: s.score }))
  }, [stressEntries])

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <div className="text-white/70 mt-1">Your wellness overview at a glance.</div>
          </div>
          <div className="glass rounded-2xl px-4 py-3 text-sm text-white/70">
            Today: <span className="text-white">{todaysMood ? todaysMood : 'No mood check-in yet'}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <StatCard title="Today's Mood" value={todaysMood ?? '—'} subtitle="Latest check-in" />
          <StatCard title="Wellness Score" value={wellnessScore} subtitle="Computed from stress + habits" accent />
          <StatCard
            title="Stress Level"
            value={latestStress ? latestStress.level.toUpperCase() : '—'}
            subtitle={latestStress ? `Score: ${latestStress.score}/10` : 'Take the stress quiz'}
          />
          <StatCard title="Total Check-ins" value={totalCheckins} subtitle="Mood entries" />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mt-6">
          <ChartCard title="Mood Trend (Last 7)" points={moodTrend} type="mood" />
          <ChartCard title="Weekly Stress Chart" points={weeklyStress} type="stress" />
        </div>
      </motion.div>
    </main>
  )
}


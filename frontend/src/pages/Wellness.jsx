import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useLocalData } from '../services/useLocalData.js'

const RECS = {
  low: [
    { title: 'Maintain your routine', desc: 'Small consistent actions protect your mental state.' },
    { title: 'Stay active', desc: 'Light movement can reduce stress and lift mood.' },
  ],
  moderate: [
    { title: 'Meditation (5–10 min)', desc: 'Practice guided breathing or mindful attention.' },
    { title: 'Exercise + breaks', desc: 'Move your body and schedule short recovery breaks.' },
  ],
  high: [
    { title: 'Counselor support', desc: 'Talking to a professional can accelerate recovery.' },
    { title: 'Stress management plan', desc: 'Use breathing exercises and break tasks into small steps.' },
    { title: 'Breathing exercises', desc: 'Try 4-7-8 breathing or box breathing.' },
  ],
}

export default function Wellness() {
  const { stressEntries, moodEntries, habitsEntries } = useLocalData()

  const latestStress = useMemo(() => {
    return [...stressEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0] ?? null
  }, [stressEntries])

  const level = latestStress?.level ?? 'low'

  const wellnessSummary = useMemo(() => {
    const mood = [...moodEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0]?.mood ?? 'neutral'
    const latestHabits = [...habitsEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0]

    return {
      mood,
      water: latestHabits?.water_ml ?? 0,
      sleep: latestHabits?.sleep_hours ?? 0,
    }
  }, [moodEntries, habitsEntries])

  const cards = RECS[level] || RECS.low

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div>
          <h2 className="text-2xl font-semibold">Wellness Recommendations</h2>
          <div className="text-white/70 mt-1">Based on your latest stress assessment.</div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 mt-6">
          <div className="lg:col-span-4 glass rounded-3xl p-6">
            <div className="font-semibold">Today’s focus</div>
            <div className="mt-4 text-sm text-white/70">Stress level</div>
            <div className="text-3xl font-semibold mt-1 text-primary">{latestStress ? latestStress.level.toUpperCase() : '—'}</div>

            <div className="mt-6 space-y-3 text-sm text-white/70">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <div className="text-white/60">Mood (latest)</div>
                <div className="text-white font-semibold capitalize mt-1">{wellnessSummary.mood}</div>
              </div>
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <div className="text-white/60">Sleep hours (latest)</div>
                <div className="text-white font-semibold mt-1">{wellnessSummary.sleep ? `${wellnessSummary.sleep}h` : '—'}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-4">
              {cards.map((c) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="glass rounded-3xl p-6"
                >
                  <div className="text-primary font-semibold">{c.title}</div>
                  <div className="text-white/70 mt-2 text-sm">{c.desc}</div>
                  <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: level === 'low' ? '65%' : level === 'moderate' ? '78%' : '92%' }} />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 glass rounded-3xl p-6">
              <div className="font-semibold">Quick action</div>
              <div className="text-sm text-white/70 mt-2">
                Take one recommendation and turn it into a 10-minute task. Consistency beats intensity.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocalData } from '../services/useLocalData.js'

const MOODS = [
  { key: 'happy', label: '😀 Happy' },
  { key: 'good', label: '🙂 Good' },
  { key: 'neutral', label: '😐 Neutral' },
  { key: 'sad', label: '😔 Sad' },
  { key: 'stressed', label: '😣 Stressed' },
]

export default function MoodTracker() {
  const { moodEntries, addMood } = useLocalData()
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const [mood, setMood] = useState('happy')

  const todays = moodEntries.find((m) => m.date_iso === todayISO)

  const history = useMemo(() => {
    return [...moodEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1)).slice(0, 10)
  }, [moodEntries])

  const analytics = useMemo(() => {
    const counts = { happy: 0, good: 0, neutral: 0, sad: 0, stressed: 0 }
    for (const m of moodEntries) counts[m.mood] = (counts[m.mood] ?? 0) + 1
    const total = moodEntries.length || 1
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    return { counts, top: top?.[0], topPct: Math.round((top?.[1] / total) * 100) }
  }, [moodEntries])

  const onSave = () => {
    addMood({ date_iso: todayISO, mood })
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Mood Tracker</h2>
            <div className="text-white/70 mt-1">Check in with how you feel today.</div>
          </div>
          <div className="glass rounded-2xl px-4 py-3 text-sm text-white/70">
            {todays ? `Saved: ${todays.mood}` : 'Not saved today yet'}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 mt-6">
          <div className="lg:col-span-7 glass rounded-3xl p-6">
            <div className="font-semibold">Select your mood</div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {MOODS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMood(m.key)}
                  className={`rounded-2xl p-4 text-left border transition ${
                    mood === m.key
                      ? 'bg-primary/20 border-primary/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/8'
                  }`}
                >
                  <div className="text-lg">{m.label}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onSave}
                className="flex-1 rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition"
              >
                Save mood
              </button>
              <div className="flex-1 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70">
                Pro tip: Mood tracking improves emotional awareness over time.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="glass rounded-3xl p-6">
              <div className="font-semibold">Mood Analytics</div>
              <div className="text-sm text-white/70 mt-2">Last entries: {moodEntries.length}</div>
              <div className="mt-4 space-y-2">
                {Object.entries(analytics.counts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([k, v]) => {
                    const pct = Math.round((v / (moodEntries.length || 1)) * 100)
                    return (
                      <div key={k} className="rounded-2xl p-3 bg-white/5 border border-white/10">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">{k}</span>
                          <span className="font-semibold">{pct}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className="mt-4 text-sm text-white/70">
                Most frequent: <span className="text-white">{analytics.top ?? '—'}</span> ({analytics.topPct ?? 0}%)
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="font-semibold">Mood History</div>
              <div className="text-sm text-white/70 mt-2">Recent check-ins</div>
              <div className="mt-4 space-y-2 max-h-72 overflow-auto no-scrollbar pr-1">
                {history.length ? (
                  history.map((m) => (
                    <div key={`${m.date_iso}-${m.mood}`} className="flex items-center justify-between rounded-2xl p-3 bg-white/5 border border-white/10">
                      <div className="text-sm text-white/70">{m.date_iso}</div>
                      <div className="font-semibold capitalize">{m.mood}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-white/60">No mood entries yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smile, Frown, Meh, TrendingUp, Calendar, Sparkles, CheckCircle2 } from 'lucide-react'
import { useLocalData } from '../services/useLocalData.js'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import MoodEmoji from '../components/MoodEmoji.jsx'
import { useToasts } from '../services/toast.js'

const MOODS = [
  { key: 'happy', label: 'Happy', emoji: '😀', desc: 'Bright, energized, optimistic.', color: 'from-amber-400 to-pink-500' },
  { key: 'good', label: 'Good', emoji: '🙂', desc: 'Calm, content, steady.', color: 'from-emerald-400 to-teal-500' },
  { key: 'neutral', label: 'Neutral', emoji: '😐', desc: 'Okay — neither up nor down.', color: 'from-slate-400 to-slate-600' },
  { key: 'sad', label: 'Sad', emoji: '😔', desc: 'Low energy, reflective.', color: 'from-sky-400 to-indigo-500' },
  { key: 'stressed', label: 'Stressed', emoji: '😣', desc: 'Tense, overwhelmed, on edge.', color: 'from-rose-500 to-fuchsia-500' },
]

export default function MoodTracker() {
  const { moodEntries, addMood } = useLocalData()
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const todays = moodEntries.find((m) => m.date_iso === todayISO)
  const [mood, setMood] = useState(todays?.mood ?? 'good')
  const { push } = useToasts()

  const history = useMemo(() => {
    return [...moodEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1)).slice(0, 14)
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
    push({ type: 'success', title: 'Mood saved', message: `Logged "${MOODS.find((m) => m.key === mood).label}" for today.` })
  }

  const selected = MOODS.find((m) => m.key === mood)

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Mood"
        title="Mood Tracker"
        subtitle="Check in with how you feel today. Honest entries build the clearest trend."
        pill={todays ? `Saved: ${MOODS.find((m) => m.key === todays.mood)?.label}` : 'Not saved today yet'}
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        {/* Selection */}
        <GlassCard className="lg:col-span-7">
          <div className="text-xs font-semibold tracking-widest uppercase text-white/55">How do you feel?</div>
          <div className="mt-1 text-lg font-semibold tracking-tight">Select your mood</div>

          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {MOODS.map((m) => {
              const active = mood === m.key
              return (
                <motion.button
                  key={m.key}
                  onClick={() => setMood(m.key)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={[
                    'group relative w-full text-left rounded-2xl p-4 border transition overflow-hidden',
                    active
                      ? 'border-primary/40 bg-primary/10 shadow-glow-soft'
                      : 'border-white/10 bg-white/5 hover:bg-white/8',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-4">
                    <MoodEmoji emoji={m.emoji} size={48} glow={active} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold tracking-tight">{m.label}</div>
                      <div className="text-xs text-white/55 mt-0.5">{m.desc}</div>
                    </div>
                    {active && (
                      <motion.div
                        layoutId="mood-check"
                        className="text-primary"
                      >
                        <CheckCircle2 size={20} />
                      </motion.div>
                    )}
                  </div>
                  {active && (
                    <motion.div
                      layoutId="mood-bar"
                      className={`absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r ${m.color}`}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-5 rounded-2xl p-4 bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-base`}>
                    {selected.emoji}
                  </div>
                  <div>
                    <div className="font-semibold">{selected.label}</div>
                    <div className="text-sm text-white/60 mt-0.5">{selected.desc}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={onSave} className="btn-primary flex-1 py-3">
              Save mood
            </button>
            <div className="flex-1 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/65 leading-relaxed">
              <Sparkles size={14} className="inline -mt-0.5 text-primary mr-1" />
              Pro tip: Mood tracking improves emotional awareness over time.
            </div>
          </div>
        </GlassCard>

        {/* Analytics + History */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Distribution</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">Mood Analytics</div>
                <div className="text-sm text-white/55 mt-0.5">Across {moodEntries.length} check-in{moodEntries.length === 1 ? '' : 's'}</div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <TrendingUp size={16} />
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {Object.entries(analytics.counts)
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => {
                  const m = MOODS.find((x) => x.key === k)
                  const pct = Math.round((v / (moodEntries.length || 1)) * 100)
                  return (
                    <div key={k} className="rounded-2xl p-3 bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{m.emoji}</span>
                          <span className="text-white/75 capitalize">{m.label}</span>
                        </div>
                        <span className="font-semibold">{pct}%</span>
                      </div>
                      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                          className={`h-full bg-gradient-to-r ${m.color} rounded-full`}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
            {analytics.top && (
              <div className="mt-4 text-sm text-white/65">
                Most frequent:{' '}
                <span className="text-text font-semibold capitalize">
                  {MOODS.find((m) => m.key === analytics.top)?.label}
                </span>{' '}
                ({analytics.topPct}%)
              </div>
            )}
          </GlassCard>

          <GlassCard>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Timeline</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">Recent check-ins</div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <Calendar size={16} />
              </div>
            </div>

            {history.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="No check-ins yet"
                  desc="Once you save a mood, it will appear in your timeline."
                />
              </div>
            ) : (
              <div className="mt-5 space-y-2 max-h-96 overflow-auto no-scrollbar pr-1">
                {history.map((m, i) => {
                  const meta = MOODS.find((x) => x.key === m.mood)
                  return (
                    <motion.div
                      key={`${m.date_iso}-${m.mood}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.02 }}
                      className="flex items-center gap-3 rounded-2xl p-3 bg-white/5 border border-white/10 hover-lift"
                    >
                      <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-lg`}>
                        {meta.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold capitalize">{meta.label}</div>
                        <div className="text-xs text-white/50">{m.date_iso}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  )
}

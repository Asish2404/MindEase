import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalData } from '../services/useLocalData.js'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { Droplet, Moon, HeartPulse, Sparkles, ArrowRight, TrendingUp } from 'lucide-react'
import ProgressRing from '../components/ProgressRing.jsx'


const RECS = {
  low: [
    { title: 'Maintain your routine', desc: 'Small consistent actions protect your mental state.', impact: 60 },
    { title: 'Stay active', desc: 'Light movement can reduce stress and lift mood.', impact: 50 },
    { title: 'Gentle breathing', desc: '1 minute of slow breaths to reset attention.', impact: 40 },
  ],
  moderate: [
    { title: 'Meditation (5–10 min)', desc: 'Practice guided breathing or mindful attention.', impact: 78 },
    { title: 'Exercise + breaks', desc: 'Move your body and schedule short recovery breaks.', impact: 72 },
    { title: 'Micro journaling', desc: 'One sentence: “What do I need right now?”', impact: 58 },
  ],
  high: [
    { title: 'Counselor support', desc: 'Talking to a professional can accelerate recovery.', impact: 92 },
    { title: 'Stress management plan', desc: 'Use breathing exercises and break tasks into smaller steps.', impact: 86 },
    { title: 'Breathing exercises', desc: 'Try 4-7-8 breathing or box breathing.', impact: 80 },
  ],
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

export default function Wellness() {
  const { stressEntries, moodEntries, habitsEntries } = useLocalData()

  const latestStress = useMemo(() => {
    return [...stressEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0] ?? null
  }, [stressEntries])

  const level = latestStress?.level ?? 'low'
  const stressScore = latestStress?.score ?? 0

  const wellnessSummary = useMemo(() => {
    const mood = [...moodEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0]?.mood ?? 'neutral'
    const latestHabits = [...habitsEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0]

    return {
      mood,
      water: latestHabits?.water_ml ?? 0,
      sleep: latestHabits?.sleep_hours ?? 0,
      exercise: latestHabits?.exercise_minutes ?? 0,
      meditation: latestHabits?.meditation_minutes ?? 0,
    }
  }, [moodEntries, habitsEntries])

  const cards = RECS[level] || RECS.low

  const [activeIdx, setActiveIdx] = useState(0)
  const active = cards[activeIdx] ?? cards[0]

  const serenity = useMemo(() => {
    // Convert stress score into a “serenity” percentage (higher better)
    const raw = 100 - Math.round((stressScore / 10) * 100)
    return Math.round(clamp01(raw / 100) * 100)
  }, [stressScore])

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Wellness"
        title="Recommendation Center"
        subtitle="Premium guidance based on your latest stress assessment — designed to be actionable in minutes."
        pill={latestStress ? `${latestStress.level.toUpperCase()} · ${latestStress.score}/10` : 'No stress assessment yet'}
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        {/* Left: Serenity + summary */}
        <div className="lg:col-span-4 space-y-4">
          <GlassCard className="p-6 relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Serenity</div>
                  <div className="mt-2 text-lg font-semibold tracking-tight">How calm you are right now</div>
                  <div className="mt-1 text-sm text-white/60">Based on your latest quiz score.</div>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <Sparkles size={18} />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-5">
                <div className="relative">
                  <ProgressRing value={serenity} size={130} stroke={11} sublabel="Serenity" from="#6366F1" to="#22C55E" />
                </div>
                <div className="min-w-0">
                  <div className="text-4xl font-semibold tracking-tight text-text">{serenity}%</div>
                  <div className="mt-1 text-sm text-white/60">Take one rec below to improve today.</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <HeartPulse size={16} className="text-primary" />
                    Mood
                  </div>
                  <div className="mt-2 font-semibold capitalize">{wellnessSummary.mood}</div>
                </div>
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Moon size={16} className="text-secondary" />
                    Sleep
                  </div>
                  <div className="mt-2 font-semibold">{wellnessSummary.sleep ? `${wellnessSummary.sleep}h` : '—'}</div>
                </div>
              </div>

              <div className="mt-3 rounded-2xl p-4 bg-primary/10 border border-primary/30 text-sm text-white/70">
                <div className="font-semibold text-white/85">Next best step</div>
                <div className="mt-1">{active?.title ?? '—'}</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right: rec cards */}
        <div className="lg:col-span-8 space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Recommendations</div>
                <div className="mt-2 text-lg font-semibold tracking-tight">Pick one to do in 10 minutes</div>
                <div className="mt-1 text-sm text-white/60">Tap a card to highlight it.</div>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <TrendingUp size={18} />
              </div>
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-3">
              {cards.map((c, idx) => {
                const isActive = idx === activeIdx
                return (
                  <motion.button
                    key={c.title}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveIdx(idx)}
                    className={
                      'text-left rounded-3xl p-5 border transition overflow-hidden relative ' +
                      (isActive ? 'border-primary/50 bg-primary/10 shadow-glow-soft' : 'border-white/10 bg-white/5 hover:bg-white/8')
                    }
                  >
                    <div aria-hidden className={"pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-primary/20 blur-3xl" + (isActive ? ' opacity-100' : ' opacity-0')}></div>
                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-semibold tracking-tight">{c.title}</div>
                          <div className="mt-2 text-sm text-white/65">{c.desc}</div>
                        </div>
                        <div className="h-9 w-9 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                          {idx === 0 ? '①' : idx === 1 ? '②' : '③'}
                        </div>
                      </div>

                      <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                          initial={false}
                          animate={{ width: `${c.impact}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-white/55">Impact: {c.impact}%</div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </GlassCard>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Daily focus</div>
                      <div className="mt-2 text-lg font-semibold tracking-tight">{active.title}</div>
                      <div className="mt-2 text-sm text-white/65 leading-relaxed">{active.desc}</div>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                      <Droplet size={18} />
                    </div>
                  </div>

                  <div className="mt-5 grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                      <div className="text-xs text-white/55">Start</div>
                      <div className="mt-1 font-semibold">Right now</div>
                      <div className="mt-1 text-xs text-white/60">60 seconds to begin</div>
                    </div>
                    <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                      <div className="text-xs text-white/55">Duration</div>
                      <div className="mt-1 font-semibold">10 minutes</div>
                      <div className="mt-1 text-xs text-white/60">No pressure, just follow</div>
                    </div>
                    <div className="rounded-2xl p-4 bg-primary/10 border border-primary/30">
                      <div className="text-xs text-white/55">Outcome</div>
                      <div className="mt-1 font-semibold">Better reset</div>
                      <div className="mt-1 text-xs text-white/60">Feel it after</div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <motion.button
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold bg-gradient-to-r from-primary to-secondary"
                      onClick={() => {
                        // UI-only (no new functionality)
                      }}
                    >
                      Start this focus <ArrowRight size={16} />
                    </motion.button>
                    <div className="mt-2 text-xs text-white/55">This button is a UI affordance; data logic remains unchanged.</div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageContainer>
  )
}


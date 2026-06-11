import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Droplet, Moon, Dumbbell, Wind, Save, Flame, Trophy, CheckCircle2, TrendingUp } from 'lucide-react'
import { useLocalData } from '../services/useLocalData.js'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import { useToasts } from '../services/toast.js'

function pct(v, target) {
  return Math.round(Math.min(1, target ? v / target : 0) * 100)
}

const HABIT_META = [
  { key: 'water_ml', target: 2000, step: 100, unit: 'ml', label: 'Water', icon: Droplet, color: 'from-sky-400 to-blue-500', ringFrom: '#38BDF8', ringTo: '#6366F1' },
  { key: 'sleep_hours', target: 8, step: 0.5, unit: 'h', label: 'Sleep', icon: Moon, color: 'from-indigo-400 to-purple-500', ringFrom: '#818CF8', ringTo: '#A78BFA' },
  { key: 'exercise_minutes', target: 30, step: 5, unit: 'min', label: 'Exercise', icon: Dumbbell, color: 'from-rose-400 to-pink-500', ringFrom: '#FB7185', ringTo: '#F472B6' },
  { key: 'meditation_minutes', target: 10, step: 1, unit: 'min', label: 'Meditation', icon: Wind, color: 'from-emerald-400 to-teal-500', ringFrom: '#34D399', ringTo: '#22C55E' },
]

function computeStreak(habitsEntries) {
  // Count consecutive days (from today backwards) where completion >= 60.
  if (!habitsEntries.length) return 0
  const sorted = [...habitsEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))
  const map = new Map(sorted.map((h) => [h.date_iso, h]))
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const iso = d.toISOString().slice(0, 10)
    const h = map.get(iso)
    if (!h) {
      if (i === 0) continue
      break
    }
    const dayCompletion =
      (pct(h.water_ml, 2000) + pct(h.sleep_hours, 8) + pct(h.exercise_minutes, 30) + pct(h.meditation_minutes, 10)) / 4
    if (dayCompletion >= 60) streak++
    else if (i > 0) break
  }
  return streak
}

export default function Habits() {
  const { habitsEntries, addHabits } = useLocalData()
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const existing = habitsEntries.find((h) => h.date_iso === todayISO)
  const { push } = useToasts()

  const [values, setValues] = useState({
    water_ml: existing?.water_ml ?? 800,
    sleep_hours: existing?.sleep_hours ?? 7,
    exercise_minutes: existing?.exercise_minutes ?? 10,
    meditation_minutes: existing?.meditation_minutes ?? 5,
  })

  const completion = useMemo(() => {
    return Math.round(
      HABIT_META.reduce(
        (acc, h) => acc + pct(values[h.key], h.target),
        0,
      ) / HABIT_META.length,
    )
  }, [values])

  const streak = useMemo(() => computeStreak(habitsEntries), [habitsEntries])

  const onSave = () => {
    addHabits({
      date_iso: todayISO,
      water_ml: values.water_ml,
      sleep_hours: values.sleep_hours,
      exercise_minutes: values.exercise_minutes,
      meditation_minutes: values.meditation_minutes,
    })
    push({ type: 'success', title: 'Habits saved', message: `Today's completion: ${completion}%` })
  }

  const achievements = [
    { name: 'First check-in', unlocked: habitsEntries.length >= 1, icon: '🌱' },
    { name: '3-day streak', unlocked: streak >= 3, icon: '🔥' },
    { name: '7-day streak', unlocked: streak >= 7, icon: '⚡' },
    { name: 'Hydration pro', unlocked: pct(values.water_ml, 2000) >= 80, icon: '💧' },
  ]

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Daily Habits"
        title="Habits Tracker"
        subtitle="Small, consistent actions protect your mental state. Track water, sleep, exercise, and meditation."
        pill={existing ? 'Saved today' : 'Set your targets'}
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        <GlassCard className="lg:col-span-7">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Today</div>
              <div className="mt-1 text-lg font-semibold tracking-tight">Daily completion</div>
            </div>
            <div className="text-4xl font-semibold text-gradient-brand tracking-tight">
              {completion}%
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
              animate={{ width: `${completion}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {HABIT_META.map((h) => {
              const Icon = h.icon
              const v = values[h.key]
              const p = pct(v, h.target)
              return (
                <motion.div
                  key={h.key}
                  whileHover={{ y: -2 }}
                  className="group relative overflow-hidden rounded-3xl p-4 border border-white/10 bg-white/5"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${h.color} group-hover:opacity-50 transition`}
                  />
                  <div className="relative flex items-start gap-4">
                    <ProgressRing
                      value={p}
                      size={68}
                      stroke={6}
                      from={h.ringFrom}
                      to={h.ringTo}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <Icon size={14} className="text-primary" />
                        </div>
                        <div className="font-semibold tracking-tight">{h.label}</div>
                      </div>
                      <div className="mt-1.5 text-xs text-white/55">
                        Target {h.target}{h.unit} · {p}%
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            setValues((p) => ({
                              ...p,
                              [h.key]: Math.max(0, Number(p[h.key] || 0) - h.step),
                            }))
                          }
                          className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={h.key === 'water_ml' ? 5000 : h.key === 'sleep_hours' ? 24 : 300}
                          step={h.step}
                          value={v}
                          onChange={(e) =>
                            setValues((p) => ({ ...p, [h.key]: Number(e.target.value) }))
                          }
                          className="input-premium !py-1.5 !text-sm w-24 text-center"
                        />
                        <span className="text-xs text-white/55">{h.unit}</span>
                        <button
                          onClick={() =>
                            setValues((p) => ({
                              ...p,
                              [h.key]: Number(p[h.key] || 0) + h.step,
                            }))
                          }
                          className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={onSave} className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-3">
              <Save size={16} /> Save habits
            </button>
            <div className="flex-1 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/65 leading-relaxed">
              Tip: Consistency matters. Start small and repeat.
            </div>
          </div>
        </GlassCard>

        <div className="lg:col-span-5 space-y-4">
          {/* Streak */}
          <GlassCard className="relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-accent/20 blur-3xl"
            />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Streak</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">You're on a roll</div>
                <div className="text-sm text-white/55 mt-0.5">Days ≥ 60% completion</div>
              </div>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-glow-soft">
                <Flame size={26} />
              </div>
            </div>
            <div className="relative mt-5 flex items-end gap-1.5">
              <div className="text-5xl font-semibold tracking-tight">{streak}</div>
              <div className="pb-1.5 text-sm text-white/55">day{streak === 1 ? '' : 's'}</div>
            </div>
            <div className="relative mt-3 grid grid-cols-7 gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={[
                    'h-2.5 rounded-full',
                    i < Math.min(7, streak) ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-white/8',
                  ].join(' ')}
                />
              ))}
            </div>
          </GlassCard>

          {/* Achievements */}
          <GlassCard>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Achievements</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">Small wins</div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                <Trophy size={16} />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={[
                    'rounded-2xl p-3 border flex items-center gap-3',
                    a.unlocked
                      ? 'bg-accent/10 border-accent/30'
                      : 'bg-white/5 border-white/10 opacity-60',
                  ].join(' ')}
                >
                  <div className="text-2xl">{a.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold leading-tight">{a.name}</div>
                    <div className="text-[11px] text-white/55 mt-0.5 flex items-center gap-1">
                      {a.unlocked ? <><CheckCircle2 size={11} className="text-accent" /> Unlocked</> : 'Locked'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* History */}
          <GlassCard>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">History</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">Recent days</div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="mt-4 space-y-2 max-h-72 overflow-auto no-scrollbar pr-1">
              {[...habitsEntries].slice().reverse().slice(0, 8).map((h) => {
                const dayPct = Math.round(
                  (pct(h.water_ml, 2000) + pct(h.sleep_hours, 8) + pct(h.exercise_minutes, 30) + pct(h.meditation_minutes, 10)) / 4,
                )
                return (
                  <div key={h.date_iso} className="rounded-2xl p-3 bg-white/5 border border-white/10 hover-lift">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/65">{h.date_iso}</span>
                      <span className="font-semibold">{dayPct}%</span>
                    </div>
                    <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-primary rounded-full" style={{ width: `${dayPct}%` }} />
                    </div>
                  </div>
                )
              })}
              {habitsEntries.length === 0 && (
                <div className="text-sm text-white/55">No habit entries yet.</div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  )
}

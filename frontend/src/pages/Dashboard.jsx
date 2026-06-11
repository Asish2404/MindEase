import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HeartPulse,
  Brain,
  Activity,
  Sparkles,
  TrendingUp,
  Calendar,
  ArrowRight,
  Smile,
  Sun,
  Moon,
  Coffee,
  Wind,
} from 'lucide-react'
import { useLocalData } from '../services/useLocalData.js'
import { useAuth } from '../services/auth.jsx'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import ChartCard from '../components/ChartCard.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import AnimatedNumber from '../components/AnimatedNumber.jsx'
import FloatingShapes from '../components/FloatingShapes.jsx'

const MOOD_META = {
  happy: { emoji: '😀', label: 'Happy', color: 'from-amber-400 to-pink-500' },
  good: { emoji: '🙂', label: 'Good', color: 'from-emerald-400 to-teal-500' },
  neutral: { emoji: '😐', label: 'Neutral', color: 'from-slate-400 to-slate-600' },
  sad: { emoji: '😔', label: 'Sad', color: 'from-sky-400 to-indigo-500' },
  stressed: { emoji: '😣', label: 'Stressed', color: 'from-rose-500 to-fuchsia-500' },
}

const hour = new Date().getHours()
const greeting =
  hour < 5 ? 'Up late?' : hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

const greetingIcon = hour < 5 ? Moon : hour < 12 ? Sun : hour < 17 ? Coffee : Moon

function pct(v, target) {
  return Math.round(Math.min(1, target ? v / target : 0) * 100)
}

function formatToday() {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export default function Dashboard() {
  const { state } = useAuth()
  const { moodEntries, stressEntries, habitsEntries } = useLocalData()
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const todaysMood = moodEntries.find((m) => m.date_iso === todayISO)?.mood ?? null
  const latestStress = useMemo(
    () => [...stressEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0] ?? null,
    [stressEntries],
  )
  const latestHabits = useMemo(
    () => [...habitsEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0] ?? null,
    [habitsEntries],
  )

  const completion = useMemo(() => {
    if (!latestHabits) return 0
    return Math.round(
      (pct(latestHabits.water_ml, 2000) +
        pct(latestHabits.sleep_hours, 8) +
        pct(latestHabits.exercise_minutes, 30) +
        pct(latestHabits.meditation_minutes, 10)) /
        4,
    )
  }, [latestHabits])

  const wellnessScore = useMemo(() => {
    const stressScore = latestStress?.score ?? 0
    const stressFactor = 100 - Math.round((stressScore / 10) * 100)
    return Math.round(0.6 * stressFactor + 0.4 * completion)
  }, [latestStress, completion])

  const stressLevel = latestStress?.level ?? 'low'
  const stressColor = {
    low: { from: '#22C55E', to: '#10B981' },
    moderate: { from: '#F59E0B', to: '#8B5CF6' },
    high: { from: '#EF4444', to: '#EC4899' },
  }[stressLevel]

  const moodTrend = useMemo(() => {
    const sorted = [...moodEntries].sort((a, b) => (a.date_iso > b.date_iso ? 1 : -1)).slice(-7)
    const map = { happy: 5, good: 4, neutral: 3, sad: 2, stressed: 1 }
    return sorted.map((m) => ({ x: m.date_iso, y: map[m.mood] }))
  }, [moodEntries])

  const weeklyStress = useMemo(() => {
    const sorted = [...stressEntries].sort((a, b) => (a.date_iso > b.date_iso ? 1 : -1)).slice(-7)
    return sorted.map((s) => ({ x: s.date_iso, y: s.score }))
  }, [stressEntries])

  const weeklyHabits = useMemo(() => {
    return [...habitsEntries]
      .sort((a, b) => (a.date_iso > b.date_iso ? 1 : -1))
      .slice(-7)
      .map((h) => ({
        x: h.date_iso,
        y: Math.round(
          (pct(h.water_ml, 2000) + pct(h.sleep_hours, 8) + pct(h.exercise_minutes, 30) + pct(h.meditation_minutes, 10)) / 4,
        ),
      }))
  }, [habitsEntries])

  const totalCheckins = moodEntries.length
  const displayName = state?.user?.full_name || state?.user?.email?.split('@')[0] || 'Student'

  return (
    <PageContainer>
      <FloatingShapes />

      {/* ===================== WELCOME BANNER ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-4xl glass-strong p-6 sm:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary/25 blur-3xl"
        />

        <div className="relative grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Calendar size={14} /> {formatToday()}
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              {greeting}, <span className="text-gradient-brand">{displayName}</span> 👋
            </h1>
            <p className="mt-2 text-white/65 max-w-xl leading-relaxed">
              Here’s a snapshot of your wellbeing. Take a moment to reflect — even
              a single check-in compounds over weeks.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to="/moods"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-sm hover:bg-white/10 transition"
              >
                <Smile size={14} className="text-primary" /> Log mood
              </Link>
              <Link
                to="/habits"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-sm hover:bg-white/10 transition"
              >
                <Activity size={14} className="text-accent" /> Update habits
              </Link>
              <Link
                to="/stress"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-sm hover:bg-white/10 transition"
              >
                <Brain size={14} className="text-secondary" /> Run stress quiz
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 blur-2xl"
              />
              <ProgressRing
                value={wellnessScore}
                size={170}
                stroke={12}
                sublabel="Wellness"
                from="#6366F1"
                to="#22C55E"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===================== STATS ===================== */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          index={0}
          title="Today's Mood"
          value={todaysMood ? (
            <span className="inline-flex items-center gap-2">
              <span className="text-3xl">{MOOD_META[todaysMood].emoji}</span>
              <span className="capitalize">{MOOD_META[todaysMood].label}</span>
            </span>
          ) : '—'}
          subtitle={todaysMood ? 'You logged a check-in' : 'No check-in yet — log one'}
          tone="primary"
        />
        <StatCard
          index={1}
          title="Wellness Score"
          value={<AnimatedNumber value={wellnessScore} />}
          subtitle="From stress + habits"
          accent
          tone="primary"
          icon={Sparkles}
        />
        <StatCard
          index={2}
          title="Stress Level"
          value={latestStress ? latestStress.level.toUpperCase() : '—'}
          subtitle={latestStress ? `Score: ${latestStress.score}/10` : 'Take the stress quiz'}
          tone={stressLevel === 'low' ? 'accent' : stressLevel === 'moderate' ? 'warn' : 'warn'}
        />
        <StatCard
          index={3}
          title="Total Check-ins"
          value={<AnimatedNumber value={totalCheckins} />}
          subtitle="Mood entries"
          tone="primary"
        />
      </div>

      {/* ===================== INSIGHTS ROW ===================== */}
      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        {/* Mood summary */}
        <GlassCard className="lg:col-span-5 overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/55">
                Mood
              </div>
              <div className="mt-1 text-lg font-semibold">Mood Summary</div>
              <div className="text-sm text-white/55 mt-1">Most recent feeling</div>
            </div>
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
              <HeartPulse size={16} />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-5">
            {todaysMood ? (
              <>
                <div className={`h-20 w-20 rounded-3xl bg-gradient-to-br ${MOOD_META[todaysMood].color} flex items-center justify-center text-4xl shadow-glow-soft`}>
                  {MOOD_META[todaysMood].emoji}
                </div>
                <div>
                  <div className="text-2xl font-semibold capitalize">{MOOD_META[todaysMood].label}</div>
                  <div className="text-sm text-white/60 mt-1">Logged for today</div>
                </div>
              </>
            ) : (
              <>
                <div className="h-20 w-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">🌤️</div>
                <div>
                  <div className="text-2xl font-semibold">No check-in yet</div>
                  <Link to="/moods" className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    Log mood <ArrowRight size={14} />
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="mt-5 grid grid-cols-5 gap-2">
            {Object.entries(MOOD_META).map(([k, m]) => (
              <div
                key={k}
                className={[
                  'rounded-xl p-2 text-center border bg-white/5 text-[10px] uppercase tracking-wider',
                  todaysMood === k ? 'border-primary/40 bg-primary/10 text-text' : 'border-white/10 text-white/55',
                ].join(' ')}
              >
                <div className="text-lg">{m.emoji}</div>
                <div className="mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Stress */}
        <GlassCard className="lg:col-span-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/55">
                Stress
              </div>
              <div className="mt-1 text-lg font-semibold">Stress Indicator</div>
              <div className="text-sm text-white/55 mt-1">0–10 scale</div>
            </div>
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
              <Brain size={16} />
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-4xl font-semibold tracking-tight">
                  {latestStress ? <AnimatedNumber value={latestStress.score} /> : '—'}
                  <span className="text-base text-white/50 font-normal">/10</span>
                </div>
                <div className="mt-1 text-sm">
                  <span
                    className={
                      stressLevel === 'low'
                        ? 'text-accent'
                        : stressLevel === 'moderate'
                          ? 'text-amber-300'
                          : 'text-rose-300'
                    }
                  >
                    {latestStress ? stressLevel.toUpperCase() : 'NOT ASSESSED'}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((latestStress?.score ?? 0) / 10) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${stressColor.from}, ${stressColor.to})` }}
              />
            </div>
            <Link
              to="/stress"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Take the quiz <ArrowRight size={14} />
            </Link>
          </div>
        </GlassCard>

        {/* Habit completion ring */}
        <GlassCard className="lg:col-span-3">
          <div className="text-xs font-semibold tracking-widest uppercase text-white/55">
            Habits
          </div>
          <div className="mt-1 text-lg font-semibold">Daily Completion</div>
          <div className="mt-4 flex flex-col items-center text-center">
            <ProgressRing
              value={completion}
              size={140}
              stroke={11}
              sublabel="Today"
              from="#22C55E"
              to="#6366F1"
            />
            <Link
              to="/habits"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              Update habits <ArrowRight size={14} />
            </Link>
          </div>
        </GlassCard>
      </div>

      {/* ===================== TRENDS ===================== */}
      <div className="mt-8 grid lg:grid-cols-2 gap-4">
        <ChartCard
          title="Mood Trend (last 7)"
          points={moodTrend}
          type="mood"
          subtitle="Higher means better mood"
        />
        <ChartCard
          title="Weekly Stress"
          points={weeklyStress}
          type="stress"
          subtitle="Daily stress score (0–10)"
        />
      </div>

      {/* ===================== INSIGHT BANNER ===================== */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <InsightCard
          icon={Wind}
          title="Try a 1-min reset"
          desc="Box breathing calms the nervous system in under 60 seconds."
          to="/wellness"
          gradient="from-primary/15 to-secondary/10"
        />
        <InsightCard
          icon={TrendingUp}
          title="Track your streak"
          desc="Three consecutive check-ins = a real habit forming."
          to="/habits"
          gradient="from-accent/15 to-emerald-500/10"
        />
        <InsightCard
          icon={Sparkles}
          title="Read today’s quote"
          desc="A small phrase, the right moment — that’s all it takes."
          to="/motivation"
          gradient="from-amber-400/15 to-orange-500/10"
        />
      </div>
    </PageContainer>
  )
}

function InsightCard({ icon: Icon, title, desc, to, gradient }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden glass rounded-3xl p-5 hover-lift"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl opacity-50 bg-gradient-to-br ${gradient} group-hover:opacity-80 transition`}
      />
      <div className="relative">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-primary">
          <Icon size={16} />
        </div>
        <div className="mt-3 font-semibold tracking-tight">{title}</div>
        <div className="mt-1 text-sm text-white/60 leading-relaxed">{desc}</div>
        <div className="mt-3 inline-flex items-center gap-1 text-xs text-white/60 group-hover:text-text transition">
          Open <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  )
}

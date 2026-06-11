import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartPulse, Sparkles, Calendar, User } from 'lucide-react'
import { useLocalData } from '../services/useLocalData.js'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import PremiumAvatar from '../components/PremiumAvatar.jsx'

const MOOD_META = {
  happy: { emoji: '😀', label: 'Happy', color: 'from-amber-400 to-pink-500' },
  good: { emoji: '🙂', label: 'Good', color: 'from-emerald-400 to-teal-500' },
  neutral: { emoji: '😐', label: 'Neutral', color: 'from-slate-400 to-slate-600' },
  sad: { emoji: '😔', label: 'Sad', color: 'from-sky-400 to-indigo-500' },
  stressed: { emoji: '😣', label: 'Stressed', color: 'from-rose-500 to-fuchsia-500' },
}

export default function Profile() {
  const { profile, upsertProfile, moodEntries } = useLocalData()

  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [email, setEmail] = useState(profile?.email ?? '')
  const [college, setCollege] = useState(profile?.college ?? '')
  const [programme, setProgramme] = useState(profile?.programme ?? '')
  const [year, setYear] = useState(profile?.year ?? '')

  const stats = useMemo(() => {
    const totalMoods = moodEntries.length
    const last = [...moodEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0]
    return {
      totalMoods,
      lastMood: last?.mood ?? null,
      lastDate: last?.date_iso ?? null,
    }
  }, [moodEntries])

  const lastMeta = stats.lastMood ? MOOD_META[stats.lastMood] : null

  const onSave = () => {
    upsertProfile({
      full_name: fullName.trim() || 'Student',
      email: email.trim() || 'student@example.com',
      college: college.trim() || null,
      programme: programme.trim() || null,
      year: year ? Number(year) : null,
    })
  }

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Profile"
        title="Wellness Passport"
        subtitle="Update your details and review your recent mood check-ins."
        pill={`${stats.totalMoods} check-in${stats.totalMoods === 1 ? '' : 's'}`}
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        {/* Left column */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="p-6 overflow-hidden relative">
            <div aria-hidden className="pointer-events-none absolute -top-20 -right-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative flex items-start gap-4">
              <PremiumAvatar
                name={fullName || profile?.full_name || 'Student'}
                email={email || profile?.email || ''}
                size={56}
              />

              <div className="min-w-0 flex-1">
                <div className="text-sm text-white/60">Signed in as</div>
                <div className="mt-1 text-xl font-semibold tracking-tight truncate">
                  {fullName.trim() || profile?.full_name || 'Student'}
                </div>
                <div className="mt-1 text-sm text-white/55 truncate">
                  {email.trim() || profile?.email || '—'}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="rounded-xl px-3 py-2 bg-white/5 border border-white/10 text-xs text-white/70 inline-flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    {stats.lastDate ? `Last: ${stats.lastDate}` : 'No history yet'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-2xl p-3 bg-white/5 border border-white/10">
                <div className="text-xs text-white/60">Check-ins</div>
                <div className="mt-1 text-lg font-semibold">{stats.totalMoods}</div>
              </div>

              <div className="rounded-2xl p-3 bg-white/5 border border-white/10 col-span-2">
                <div className="text-xs text-white/60">Latest mood</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="text-2xl">{lastMeta ? lastMeta.emoji : '🌤️'}</div>
                  <div className="text-sm font-semibold">{lastMeta ? lastMeta.label : '—'}</div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Wellness snapshot</div>
                <div className="mt-2 text-lg font-semibold tracking-tight">Your last signal</div>
                <div className="mt-1 text-sm text-white/60">Small patterns show up in time.</div>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <HeartPulse size={18} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {lastMeta ? (
                <motion.div
                  key={stats.lastMood}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 rounded-3xl p-4 bg-white/5 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${lastMeta.color} flex items-center justify-center text-2xl shadow-glow-soft`}
                      >
                        {lastMeta.emoji}
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Mood</div>
                        <div className="font-semibold capitalize">{stats.lastMood}</div>
                      </div>
                    </div>
                    <div className="text-xs rounded-xl px-3 py-2 bg-primary/10 border border-primary/30 text-text">
                      <span className="text-primary font-semibold">{stats.lastDate}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 rounded-3xl p-4 bg-white/5 border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <div className="font-semibold">No mood signal yet</div>
                      <div className="mt-1 text-sm text-white/60">Log your first mood check-in to start building trends.</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

        {/* Right column */}
        <div className="lg:col-span-7 space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  <div className="text-lg font-semibold tracking-tight">Edit Profile</div>
                </div>
                <div className="mt-1 text-sm text-white/60">Stored locally in your browser. No backend changes.</div>
              </div>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Full name</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">College</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Programme</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={programme}
                  onChange={(e) => setProgramme(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Year</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  type="number"
                  min={1}
                  max={8}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onSave}
                className="flex-1 rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition"
              >
                Save changes
              </button>
              <div className="flex-1 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70 flex items-center">
                <span>Premium UI only — your data stays local.</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Mood History</div>
                <div className="mt-2 text-lg font-semibold tracking-tight">Latest entries</div>
                <div className="mt-1 text-sm text-white/60">A quick timeline of how you’ve been feeling.</div>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <Calendar size={18} />
              </div>
            </div>

            <div className="mt-4 space-y-2 max-h-96 overflow-auto no-scrollbar pr-1">
              {moodEntries.length === 0 ? (
                <div className="text-sm text-white/60">No mood entries yet.</div>
              ) : (
                [...moodEntries]
                  .slice()
                  .reverse()
                  .slice(0, 12)
                  .map((m) => {
                    const meta = MOOD_META[m.mood]
                    return (
                      <motion.div
                        key={`${m.date_iso}-${m.mood}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center justify-between rounded-2xl p-3 bg-white/5 border border-white/10 hover:bg-white/8 transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`h-9 w-9 rounded-xl bg-gradient-to-br ${meta?.color ?? 'from-white/10 to-white/5'} flex items-center justify-center text-lg`}
                          >
                            {meta?.emoji ?? '🌤️'}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm text-white/60">{m.date_iso}</div>
                            <div className="text-sm font-semibold capitalize truncate">{m.mood}</div>
                          </div>
                        </div>
                        <div className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-accent">
                          View
                        </div>
                      </motion.div>
                    )
                  })
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  )
}


import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocalData } from '../services/useLocalData.js'

export default function Profile() {
  const { profile, upsertProfile, moodEntries } = useLocalData()

  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [email, setEmail] = useState(profile?.email ?? '')
  const [college, setCollege] = useState(profile?.college ?? '')
  const [programme, setProgramme] = useState(profile?.programme ?? '')
  const [year, setYear] = useState(profile?.year ?? '')

  const stats = useMemo(() => {
    const totalMoods = moodEntries.length
    const lastMood = [...moodEntries].sort((a, b) => (a.date_iso < b.date_iso ? 1 : -1))[0]?.mood
    return { totalMoods, lastMood }
  }, [moodEntries])

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
    <main className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Profile</h2>
            <div className="text-white/70 mt-1">Manage your information and view mood history.</div>
          </div>
          <div className="glass rounded-2xl px-4 py-3 text-sm text-white/70">
            Total mood check-ins: <span className="text-white">{stats.totalMoods}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 mt-6">
          <div className="lg:col-span-7 glass rounded-3xl p-6">
            <div className="font-semibold">Edit Profile</div>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Full name</label>
                <input className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
              </div>
              <div>
                <label className="text-sm text-white/70">College</label>
                <input className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary" value={college} onChange={(e) => setCollege(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-white/70">Programme</label>
                <input className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary" value={programme} onChange={(e) => setProgramme(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-white/70">Year</label>
                <input className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary" value={year} onChange={(e) => setYear(e.target.value)} type="number" min={1} max={8} />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button onClick={onSave} className="flex-1 rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition">
                Save
              </button>
              <div className="flex-1 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70">
                You can update this anytime. It’s stored in localStorage.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 glass rounded-3xl p-6">
            <div className="font-semibold">Mood History</div>
            <div className="text-sm text-white/70 mt-2">Latest entries</div>
            <div className="mt-4 space-y-2 max-h-96 overflow-auto no-scrollbar pr-1">
              {[...moodEntries].slice().reverse().slice(0, 12).map((m) => (
                <div key={`${m.date_iso}-${m.mood}`} className="flex items-center justify-between rounded-2xl p-3 bg-white/5 border border-white/10">
                  <div className="text-sm text-white/60">{m.date_iso}</div>
                  <div className="text-sm font-semibold capitalize">{m.mood}</div>
                </div>
              ))}
              {moodEntries.length === 0 && <div className="text-sm text-white/60">No mood entries yet.</div>}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


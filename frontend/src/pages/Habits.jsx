import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocalData } from '../services/useLocalData.js'

function pct(v, target) {
  return Math.round(Math.min(1, target ? v / target : 0) * 100)
}

export default function Habits() {
  const { habitsEntries, addHabits } = useLocalData()
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const existing = habitsEntries.find((h) => h.date_iso === todayISO)

  const [waterMl, setWaterMl] = useState(existing?.water_ml ?? 800)
  const [sleepHours, setSleepHours] = useState(existing?.sleep_hours ?? 7)
  const [exerciseMinutes, setExerciseMinutes] = useState(existing?.exercise_minutes ?? 10)
  const [meditationMinutes, setMeditationMinutes] = useState(existing?.meditation_minutes ?? 5)

  const completion = useMemo(() => {
    const water = pct(waterMl, 2000)
    const sleep = pct(sleepHours, 8)
    const ex = pct(exerciseMinutes, 30)
    const med = pct(meditationMinutes, 10)
    return Math.round((water + sleep + ex + med) / 4)
  }, [waterMl, sleepHours, exerciseMinutes, meditationMinutes])

  const onSave = () => {
    addHabits({
      date_iso: todayISO,
      water_ml: waterMl,
      sleep_hours: sleepHours,
      exercise_minutes: exerciseMinutes,
      meditation_minutes: meditationMinutes,
    })
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Daily Habits Tracker</h2>
            <div className="text-white/70 mt-1">Track water, sleep, exercise, and meditation.</div>
          </div>
          <div className="glass rounded-2xl px-4 py-3 text-sm text-white/70">
            {existing ? 'Saved today' : 'Set your targets and progress'}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 mt-6">
          <div className="lg:col-span-7 glass rounded-3xl p-6">
            <div className="font-semibold">Today’s completion</div>
            <div className="mt-3 text-4xl font-semibold text-primary">{completion}%</div>
            <div className="mt-3 h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${completion}%` }} />
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/70">Water (ml)</div>
                <input className="mt-2 w-full" type="number" value={waterMl} min={0} max={5000} onChange={(e) => setWaterMl(Number(e.target.value))} />
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${pct(waterMl, 2000)}%` }} />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/70">Sleep (hours)</div>
                <input className="mt-2 w-full" type="number" value={sleepHours} min={0} max={24} step={0.5} onChange={(e) => setSleepHours(Number(e.target.value))} />
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${pct(sleepHours, 8)}%` }} />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/70">Exercise (minutes)</div>
                <input className="mt-2 w-full" type="number" value={exerciseMinutes} min={0} max={300} onChange={(e) => setExerciseMinutes(Number(e.target.value))} />
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${pct(exerciseMinutes, 30)}%` }} />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/70">Meditation (minutes)</div>
                <input className="mt-2 w-full" type="number" value={meditationMinutes} min={0} max={180} onChange={(e) => setMeditationMinutes(Number(e.target.value))} />
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${pct(meditationMinutes, 10)}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button onClick={onSave} className="flex-1 rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition">
                Save Habits
              </button>
              <div className="flex-1 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70">
                Tip: Consistency matters. Start small and repeat.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 glass rounded-3xl p-6">
            <div className="font-semibold">Progress Preview</div>
            <div className="mt-3 text-sm text-white/70">Latest entries</div>
            <div className="mt-4 space-y-2 max-h-[420px] overflow-auto no-scrollbar pr-1">
              {[...habitsEntries].slice().reverse().slice(0, 10).map((h) => (
                <div key={h.date_iso} className="rounded-2xl p-3 bg-white/5 border border-white/10">
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{h.date_iso}</span>
                    <span className="text-white font-semibold">{Math.round(((pct(h.water_ml, 2000) + pct(h.sleep_hours, 8) + pct(h.exercise_minutes, 30) + pct(h.meditation_minutes, 10)) / 4))}%</span>
                  </div>
                </div>
              ))}
              {habitsEntries.length === 0 && <div className="text-sm text-white/60">No habit entries yet.</div>}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


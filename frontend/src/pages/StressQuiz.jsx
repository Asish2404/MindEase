import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocalData } from '../services/useLocalData.js'
import { STRESS_QUESTIONS } from '../data/questions.js'

const OPTIONS = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
]

function scoreToLevel(score) {
  if (score <= 3) return 'low'
  if (score <= 7) return 'moderate'
  return 'high'
}

export default function StressQuiz() {
  const { stressEntries, addStress } = useLocalData()
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const existing = stressEntries.find((s) => s.date_iso === todayISO)

  const [answers, setAnswers] = useState(Array(10).fill(0))
  const [score, setScore] = useState(null)
  const [level, setLevel] = useState(null)
  const [submitted, setSubmitted] = useState(!!existing)

  const result = useMemo(() => {
    const sum = answers.reduce((a, b) => a + b, 0)
    return { sum, level: scoreToLevel(sum) }
  }, [answers])

  const compute = () => {
    const sum = answers.reduce((a, b) => a + b, 0)
    const lv = scoreToLevel(sum)
    setScore(sum)
    setLevel(lv)
  }

  const onSubmit = () => {
    const sum = answers.reduce((a, b) => a + b, 0)
    const lv = scoreToLevel(sum)
    setScore(sum)
    setLevel(lv)
    addStress({ date_iso: todayISO, score: sum, level: lv })
    setSubmitted(true)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Stress Assessment Quiz</h2>
            <div className="text-white/70 mt-1">Answer 10 questions. Get your result instantly.</div>
          </div>
          <div className="glass rounded-2xl px-4 py-3 text-sm text-white/70">
            {existing ? `Saved: ${existing.level.toUpperCase()} (Score ${existing.score}/10)` : 'Take the quiz to get your level'}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 mt-6">
          <div className="lg:col-span-7 glass rounded-3xl p-6">
            <div className="font-semibold">Questions</div>
            <div className="text-sm text-white/70 mt-1">Options: Never → Often (0 to 3)</div>

            <div className="mt-4 space-y-5">
              {STRESS_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-white/60">{idx + 1}. {q.category}</div>
                  <div className="font-semibold mt-1">{q.text}</div>
                  <div className="mt-3 grid sm:grid-cols-4 gap-2">
                    {OPTIONS.map((opt) => {
                      const active = answers[idx] === opt.value
                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            const next = [...answers]
                            next[idx] = opt.value
                            setAnswers(next)
                            setSubmitted(false)
                          }}
                          className={`rounded-2xl px-3 py-2 text-sm border transition ${
                            active ? 'bg-primary/20 border-primary/40 text-text' : 'bg-black/10 border-white/10 text-white/70 hover:bg-white/5'
                          }`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  compute()
                }}
                className="flex-1 rounded-2xl py-3 font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Preview Result
              </button>
              <button
                onClick={onSubmit}
                className="flex-1 rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition"
              >
                Save Result
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="glass rounded-3xl p-6">
              <div className="font-semibold">Instant Result</div>
              <div className="text-sm text-white/70 mt-1">Computed from your answers</div>

              <div className="mt-5">
                <div className="text-xs text-white/60">Score</div>
                <div className="text-4xl font-semibold mt-1 text-primary">{score ?? result.sum}/10</div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-white/60">Stress Level</div>
                <div className="text-3xl font-semibold mt-1">
                  <span className={
                    level
                      ? level === 'low'
                        ? 'text-accent'
                        : level === 'moderate'
                          ? 'text-secondary'
                          : 'text-primary'
                      : result.level === 'low'
                        ? 'text-accent'
                        : result.level === 'moderate'
                          ? 'text-secondary'
                          : 'text-primary'
                  }>
                    {(level ?? result.level).toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-sm text-white/70">
                {result.level === 'low' && 'You’re doing well. Maintain routine and stay active.'}
                {result.level === 'moderate' && 'Your stress is manageable. Try meditation, exercise, and breaks.'}
                {result.level === 'high' && 'Your nervous system is under pressure. Consider counselor support and breathing exercises.'}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="font-semibold">Latest Saved Entries</div>
              <div className="mt-3 space-y-2 max-h-72 overflow-auto no-scrollbar pr-1">
                {[...stressEntries].slice().reverse().slice(0, 8).map((s) => (
                  <div key={`${s.date_iso}-${s.score}`} className="flex items-center justify-between rounded-2xl p-3 bg-white/5 border border-white/10">
                    <div className="text-sm text-white/60">{s.date_iso}</div>
                    <div className="text-sm font-semibold capitalize">{s.level}</div>
                  </div>
                ))}
                {stressEntries.length === 0 && <div className="text-sm text-white/60">No stress results yet.</div>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


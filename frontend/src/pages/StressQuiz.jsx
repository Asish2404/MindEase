import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Activity, ShieldCheck } from 'lucide-react'
import { useLocalData } from '../services/useLocalData.js'
import { STRESS_QUESTIONS } from '../data/questions.js'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useToasts } from '../services/toast.js'

const OPTIONS = [
  { label: 'Never', value: 0, desc: '0' },
  { label: 'Rarely', value: 1, desc: '1' },
  { label: 'Sometimes', value: 2, desc: '2' },
  { label: 'Often', value: 3, desc: '3' },
]

function scoreToLevel(score) {
  if (score <= 3) return 'low'
  if (score <= 7) return 'moderate'
  return 'high'
}

const levelMeta = {
  low: {
    color: 'from-accent to-emerald-500',
    text: 'text-accent',
    title: 'You’re doing well',
    body: 'Your stress is low. Maintain your routine, sleep, and movement to keep this baseline.',
    icon: ShieldCheck,
  },
  moderate: {
    color: 'from-amber-400 to-secondary',
    text: 'text-amber-300',
    title: 'Manageable stress',
    body: 'Try 5–10 min meditation, brief movement breaks, and a consistent wind-down routine.',
    icon: Activity,
  },
  high: {
    color: 'from-rose-500 to-pink-500',
    text: 'text-rose-300',
    title: 'Reach out for support',
    body: 'Consider talking to a counselor. Pair with breathing exercises and breaking tasks into small steps.',
    icon: Sparkles,
  },
}

export default function StressQuiz() {
  const { stressEntries, addStress } = useLocalData()
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const existing = stressEntries.find((s) => s.date_iso === todayISO)

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(Array(STRESS_QUESTIONS.length).fill(0))
  const [submitted, setSubmitted] = useState(!!existing)
  const [result, setResult] = useState(
    existing ? { score: existing.score, level: existing.level } : null,
  )
  const { push } = useToasts()

  const total = STRESS_QUESTIONS.length
  const progress = ((step + (submitted ? 1 : 0)) / total) * 100
  const liveSum = answers.reduce((a, b) => a + b, 0)
  const liveLevel = scoreToLevel(liveSum)
  const current = STRESS_QUESTIONS[step]
  const currentAnswered = answers[step] !== undefined

  const handleSelect = (val) => {
    const next = [...answers]
    next[step] = val
    setAnswers(next)
  }

  const handleNext = () => {
    if (step < total - 1) setStep((s) => s + 1)
  }
  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const handleSubmit = () => {
    const sum = answers.reduce((a, b) => a + b, 0)
    const lv = scoreToLevel(sum)
    setResult({ score: sum, level: lv })
    addStress({ date_iso: todayISO, score: sum, level: lv })
    setSubmitted(true)
    push({ type: 'success', title: 'Assessment saved', message: `Today's level: ${lv.toUpperCase()} (${sum}/10).` })
  }

  const meta = levelMeta[result?.level ?? liveLevel]
  const MetaIcon = meta.icon

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Stress Assessment"
        title="Stress Quiz"
        subtitle="Ten gentle questions to understand where you stand today. There are no wrong answers."
        pill={existing ? `Saved: ${existing.level.toUpperCase()} (${existing.score}/10)` : 'Take the quiz to get your level'}
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        {/* Quiz */}
        <GlassCard className="lg:col-span-7">
          {!submitted ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-white/55">
                    Question {step + 1} of {total}
                  </div>
                  <div className="mt-1 text-lg font-semibold tracking-tight capitalize">
                    {current.category}
                  </div>
                </div>
                <div className="text-xs text-white/55">
                  {Math.round(progress)}%
                </div>
              </div>

              <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-7"
                >
                  <div className="text-2xl font-semibold tracking-tight leading-snug">
                    {current.text}
                  </div>
                  <div className="mt-2 text-sm text-white/55">Options: Never → Often (0 to 3)</div>

                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {OPTIONS.map((opt) => {
                      const active = answers[step] === opt.value
                      return (
                        <motion.button
                          key={opt.value}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelect(opt.value)}
                          className={[
                            'rounded-2xl p-4 text-left border transition relative overflow-hidden',
                            active
                              ? 'border-primary/40 bg-primary/10 shadow-glow-soft'
                              : 'border-white/10 bg-white/5 hover:bg-white/8',
                          ].join(' ')}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold">{opt.label}</div>
                              <div className="text-[11px] text-white/45 mt-0.5">Score {opt.desc}</div>
                            </div>
                            {active && <CheckCircle2 size={18} className="text-primary" />}
                          </div>
                          {active && (
                            <motion.div
                              layoutId="opt-bar"
                              className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary to-secondary"
                            />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePrev}
                  disabled={step === 0}
                  className="btn-ghost inline-flex items-center justify-center gap-2 px-4 py-3 disabled:opacity-40"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                {step < total - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!currentAnswered}
                    className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-3"
                  >
                    Next <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!currentAnswered}
                    className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-3"
                  >
                    Save result <CheckCircle2 size={16} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-6"
              >
                <div className={`mx-auto h-16 w-16 rounded-3xl bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-glow-soft`}>
                  <MetaIcon size={26} />
                </div>
                <div className="mt-5 text-xs font-semibold tracking-widest uppercase text-white/55">Your result</div>
                <div className={`mt-1 text-4xl font-semibold ${meta.text}`}>
                  {(result?.level ?? 'low').toUpperCase()}
                </div>
                <div className="mt-2 text-white/55">
                  Score{' '}
                  <span className="text-text font-semibold">
                    {result?.score ?? 0}
                  </span>
                  /10
                </div>
                <div className="mt-6 max-w-md mx-auto text-white/70 leading-relaxed">
                  {meta.body}
                </div>
                <div className="mt-7 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setStep(0)
                      setSubmitted(false)
                      setResult(null)
                    }}
                    className="btn-ghost inline-flex items-center gap-2 px-5 py-3"
                  >
                    Retake quiz
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </GlassCard>

        {/* Live preview + history */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Live result</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">Computed from your answers</div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <Brain size={16} />
              </div>
            </div>
            <div className="mt-5">
              <div className="text-xs text-white/55">Score</div>
              <div className="text-4xl font-semibold mt-1 text-text">
                {result?.score ?? liveSum}
                <span className="text-base text-white/45 font-normal">/10</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-white/55">Stress level</div>
              <div className={`mt-1 text-2xl font-semibold ${meta.text}`}>
                {(result?.level ?? liveLevel).toUpperCase()}
              </div>
            </div>
            <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${meta.color} rounded-full`}
                animate={{ width: `${((result?.score ?? liveSum) / 10) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <div className="mt-4 text-sm text-white/65 leading-relaxed">{meta.body}</div>
          </GlassCard>

          <GlassCard>
            <div className="font-semibold">Latest saved entries</div>
            <div className="mt-3 space-y-2 max-h-72 overflow-auto no-scrollbar pr-1">
              {[...stressEntries].slice().reverse().slice(0, 8).map((s) => (
                <div
                  key={`${s.date_iso}-${s.score}`}
                  className="flex items-center justify-between rounded-2xl p-3 bg-white/5 border border-white/10 hover-lift"
                >
                  <div className="text-sm text-white/65">{s.date_iso}</div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    s.level === 'low'
                      ? 'bg-accent/15 text-accent border border-accent/30'
                      : s.level === 'moderate'
                        ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                  }`}>
                    {s.level.toUpperCase()} · {s.score}/10
                  </div>
                </div>
              ))}
              {stressEntries.length === 0 && (
                <div className="text-sm text-white/55">No stress results yet.</div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  )
}

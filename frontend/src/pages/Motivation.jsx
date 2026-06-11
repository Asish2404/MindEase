import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RefreshCw, Quote, Sun, BookOpen, Heart } from 'lucide-react'
import { apiGetQuotes } from '../services/api.js'
import { LOCAL_QUOTES } from '../data/quotes.js'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'

function pickRandom(arr) {
  if (!arr.length) return null
  return arr[Math.floor(Math.random() * arr.length)]
}

const FALLBACK_TIPS = [
  { icon: Sun, title: 'Morning light', text: 'Step into sunlight for 5 minutes — it sets your circadian rhythm.' },
  { icon: Heart, title: '4-7-8 breathing', text: 'Inhale 4, hold 7, exhale 8. Repeat 4 cycles.' },
  { icon: BookOpen, title: 'One-line journal', text: 'Write a single sentence about your day before bed.' },
  { icon: Sparkles, title: 'Name the feeling', text: 'Naming an emotion reduces its grip. Try “I feel anxious.”' },
  { icon: RefreshCw, title: 'Reset posture', text: 'Roll your shoulders back, lengthen your spine, breathe.' },
  { icon: Quote, title: 'Micro-walk', text: 'A 6-minute walk is enough to lower cortisol and lift mood.' },
]

export default function Motivation() {
  const [quotes, setQuotes] = useState(LOCAL_QUOTES)
  const [selected, setSelected] = useState(() => pickRandom(LOCAL_QUOTES))
  const [loading, setLoading] = useState(true)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const q = await apiGetQuotes()
        if (!mounted) return
        if (Array.isArray(q) && q.length) {
          setQuotes(q)
          setSelected(pickRandom(q))
        }
      } catch {
        /* local fallback */
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const onRandom = () => {
    setDirection(1)
    let next = pickRandom(quotes)
    // Avoid showing the same quote twice in a row
    if (next && selected && next.id === selected.id && quotes.length > 1) {
      const others = quotes.filter((q) => q.id !== selected.id)
      next = pickRandom(others)
    }
    setSelected(next)
  }

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Daily Inspiration"
        title="Motivation Center"
        subtitle="A small phrase at the right moment can change a day. Pull a fresh one whenever you need it."
        pill={today}
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        {/* Daily quote */}
        <GlassCard className="lg:col-span-7 relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary/15 blur-3xl"
          />
          <div className="relative flex items-start justify-between">
            <div className="inline-flex items-center gap-2 text-primary font-semibold">
              <Sparkles size={16} /> Daily Quote
            </div>
            <button
              onClick={onRandom}
              className="btn-ghost inline-flex items-center gap-2 px-3.5 py-2 text-sm"
            >
              <RefreshCw size={14} /> New
            </button>
          </div>

          <div className="relative mt-8 min-h-[180px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={selected?.id ?? 'none'}
                custom={direction}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <Quote className="text-primary/40" size={36} />
                <div className="mt-3 text-2xl sm:text-3xl font-semibold leading-snug tracking-tight">
                  {loading ? 'Loading…' : selected?.text ?? 'No quotes available'}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/55">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[10px] font-semibold">
                    {(selected?.author ?? 'M').charAt(0)}
                  </div>
                  — {selected?.author ?? 'MindEase'}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </GlassCard>

        {/* Side tip */}
        <GlassCard className="lg:col-span-5">
          <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Today’s intention</div>
          <div className="mt-1 text-lg font-semibold tracking-tight">A small ritual</div>
          <div className="mt-5 grid grid-cols-1 gap-3">
            {FALLBACK_TIPS.slice(0, 3).map((tip, i) => {
              const Icon = tip.icon
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl p-4 bg-white/5 border border-white/10 flex items-start gap-3 hover-lift"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{tip.title}</div>
                    <div className="text-xs text-white/55 mt-1 leading-relaxed">{tip.text}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>

        {/* Quote gallery */}
        <div className="lg:col-span-12 mt-2">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Library</div>
              <div className="text-lg font-semibold tracking-tight">Quote collection</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quotes.slice(0, 6).map((q, i) => (
              <motion.button
                key={q.id}
                onClick={() => {
                  setDirection(1)
                  setSelected(q)
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={[
                  'group text-left glass rounded-3xl p-5 hover-lift relative overflow-hidden',
                  selected?.id === q.id ? 'ring-1 ring-primary/50 shadow-glow-soft' : '',
                ].join(' ')}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-primary/15 blur-3xl group-hover:bg-primary/25 transition"
                />
                <Quote size={18} className="text-primary/60" />
                <div className="mt-3 text-[15px] font-semibold leading-snug tracking-tight">
                  “{q.text}”
                </div>
                <div className="mt-3 text-xs text-white/50">— {q.author}</div>
              </motion.button>
            ))}
            {quotes.length === 0 && (
              <div className="col-span-full text-sm text-white/55">No quotes to display.</div>
            )}
          </div>
        </div>

        {/* Tips grid */}
        <div className="lg:col-span-12 mt-2">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Toolkit</div>
              <div className="text-lg font-semibold tracking-tight">Gentle reminders</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FALLBACK_TIPS.map((tip, i) => {
              const Icon = tip.icon
              return (
                <motion.div
                  key={tip.title + i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="glass rounded-2xl p-4 flex items-start gap-3 hover-lift"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{tip.title}</div>
                    <div className="text-xs text-white/55 mt-1 leading-relaxed">{tip.text}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

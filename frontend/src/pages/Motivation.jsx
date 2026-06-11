import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { apiGetQuotes } from '../services/api.js'
import { LOCAL_QUOTES } from '../data/quotes.js'
import { Sparkles, RefreshCw } from 'lucide-react'

function pickRandom(arr) {
  if (!arr.length) return null
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function Motivation() {
  const [quotes, setQuotes] = useState(LOCAL_QUOTES)
  const [selected, setSelected] = useState(() => pickRandom(LOCAL_QUOTES))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const q = await apiGetQuotes()
        if (!mounted) return
        setQuotes(q)
        setSelected(pickRandom(q))
      } catch {
        // local fallback
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const onRandom = () => setSelected(pickRandom(quotes))

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Motivation Center</h2>
            <div className="text-white/70 mt-1">Daily quotes and positive messages.</div>
          </div>
          <button
            onClick={onRandom}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <RefreshCw size={18} />
            New
          </button>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7 glass rounded-3xl p-6">
            <div className="inline-flex items-center gap-2 text-primary font-semibold">
              <Sparkles size={18} />
              Daily Quote
            </div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-5">
              <div className="text-2xl font-semibold leading-snug">{selected?.text ?? (loading ? 'Loading…' : 'No quotes available')}</div>
              <div className="text-sm text-white/60 mt-3">— {selected?.author ?? 'MindEase'}</div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 glass rounded-3xl p-6">
            <div className="font-semibold">Motivational Cards</div>
            <div className="mt-3 space-y-3">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="rounded-2xl p-4 bg-white/5 border border-white/10"
                >
                  <div className="text-sm text-white/60">Message {i + 1}</div>
                  <div className="mt-1 text-sm text-white/80">
                    {i % 3 === 0
                      ? 'Breathe, then choose your next step.'
                      : i % 3 === 1
                        ? 'Rest is part of progress.'
                        : 'You can do hard things—gently.'}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


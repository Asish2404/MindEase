import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, HeartPulse, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
)

export default function Landing() {
  return (
    <main className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/15 via-transparent to-transparent" />
      <section className="mx-auto max-w-7xl px-4 pt-14 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10">
                <Sparkles size={16} />
                SDG 3 aligned • Student-first mental wellness
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight">
                Your Mental Health Matters.
              </h1>
              <p className="mt-4 text-white/70 text-lg">
                Track emotions, assess stress and improve wellbeing.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary font-semibold shadow-glow hover:opacity-95 transition"
                >
                  Get Started <ArrowRight size={18} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-3">
                {[{ k: 'Mood', v: 'Daily check-ins' }, { k: 'Stress', v: 'Quiz assessment' }, { k: 'Habits', v: 'Progress tracking' }].map((x) => (
                  <div key={x.k} className="glass rounded-2xl p-4">
                    <div className="text-sm text-white/60">{x.k}</div>
                    <div className="font-semibold mt-1">{x.v}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-5">
            <FadeUp delay={0.1}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/60 to-secondary/60 flex items-center justify-center">
                    <HeartPulse />
                  </div>
                  <div>
                    <div className="font-semibold">MindEase Dashboard</div>
                    <div className="text-sm text-white/60">A premium SaaS experience</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { icon: Brain, title: 'Mood Trend', desc: 'See how you feel evolve over time' },
                    { icon: ShieldCheck, title: 'Stress Insight', desc: 'Instant low/moderate/high result' },
                    { icon: Sparkles, title: 'Wellness Score', desc: 'Personalized recommendations by need' },
                  ].map((it) => {
                    const Icon = it.icon
                    return (
                      <div key={it.title} className="flex gap-3 items-start rounded-2xl p-4 bg-white/5 border border-white/10">
                        <div className="text-primary">
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="font-semibold">{it.title}</div>
                          <div className="text-sm text-white/70 mt-1">{it.desc}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 text-sm text-white/60">
                  Glass UI • Smooth Framer Motion • Local-first tracking
                </div>
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="grid md:grid-cols-3 gap-4">
          {[{ t: 'Features', d: 'Mood tracking, stress quiz, wellness suggestions, habits, motivation.' }, { t: 'SDG Alignment', d: 'SDG 3: Good Health and Well-being for students.' }, { t: 'Benefits', d: 'Build emotional awareness and healthier routines.' }].map((x) => (
            <FadeUp key={x.t}>
              <div className="glass rounded-3xl p-6 h-full">
                <div className="text-primary font-semibold">{x.t}</div>
                <div className="text-white/80 mt-2">{x.d}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="glass rounded-3xl p-8 md:p-10 bg-gradient-to-br from-primary/15 to-secondary/10 border border-white/10">
          <FadeUp>
            <div className="text-2xl font-semibold">Start building healthier habits today.</div>
            <div className="text-white/70 mt-2">A calmer mind is a skill you can practice.</div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary font-semibold shadow-glow hover:opacity-95 transition"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                I already have an account
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-sm text-white/60">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-white/80 font-semibold">MINDEASE</div>
            <div className="mt-1">SDG 3 • Student Mental Wellness Platform</div>
          </div>
          <div className="flex flex-wrap gap-4">
            {['Privacy', 'Terms', 'Support'].map((x) => (
              <span key={x} className="hover:text-white/80 transition cursor-default">
                {x}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}


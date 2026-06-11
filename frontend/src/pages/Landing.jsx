import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Brain,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Activity,
  Quote,
  Star,
  Compass,
  Target,
  CheckCircle2,
  Apple,
  Github,
  Twitter,
} from 'lucide-react'
import FloatingShapes from '../components/FloatingShapes.jsx'
import AnimatedNumber from '../components/AnimatedNumber.jsx'
import GlassCard from '../components/GlassCard.jsx'

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}

const features = [
  {
    icon: HeartPulse,
    title: 'Mood Tracking',
    desc: 'Daily emotional check-ins with visual timelines and insights.',
    color: 'from-rose-500/20 to-pink-500/20',
  },
  {
    icon: Brain,
    title: 'Stress Assessment',
    desc: 'A quick 10-question quiz that classifies low, moderate, or high stress.',
    color: 'from-primary/20 to-secondary/20',
  },
  {
    icon: Activity,
    title: 'Habits & Wellness',
    desc: 'Track water, sleep, exercise, and meditation with smart targets.',
    color: 'from-accent/20 to-emerald-500/20',
  },
  {
    icon: Sparkles,
    title: 'Motivation',
    desc: 'Curated quotes and gentle reminders that meet you where you are.',
    color: 'from-amber-400/20 to-orange-500/20',
  },
  {
    icon: Compass,
    title: 'Personalized Care',
    desc: 'Recommendations adapt to your stress level and habits.',
    color: 'from-cyan-400/20 to-sky-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Private by Default',
    desc: 'Local-first data — your reflections stay on your device.',
    color: 'from-violet-500/20 to-fuchsia-500/20',
  },
]

const stats = [
  { v: '10K+', l: 'Check-ins tracked' },
  { v: '4.9★', l: 'Student rating' },
  { v: '92%', l: 'Feel more aware' },
  { v: 'SDG 3', l: 'Aligned impact' },
]

const testimonials = [
  {
    name: 'Aarav M.',
    role: 'B.Tech, 2nd Year',
    quote:
      'MindEase turned mental health into something I can actually see. The stress quiz alone helped me reach out sooner.',
  },
  {
    name: 'Priya S.',
    role: 'MBBS, 3rd Year',
    quote:
      'The mood timeline is beautiful. I finally have a way to show my counselor what my weeks actually look like.',
  },
  {
    name: 'Devika R.',
    role: 'BA Psychology',
    quote:
      'It feels like Headspace met Linear. Clean, calm, and somehow it nudges me without nagging.',
  },
]

export default function Landing() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <FloatingShapes />

      {/* ===================== HERO ===================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              SDG 3 aligned · Student-first mental wellness
            </div>

            <h1 className="mt-6 text-[40px] sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              Your mental health,{' '}
              <span className="text-gradient-brand">finally in one calm place.</span>
            </h1>

            <p className="mt-5 text-white/65 text-lg max-w-xl leading-relaxed">
              MindEase is a premium student wellness platform that helps you track
              moods, assess stress, build healthy habits, and get personalized
              guidance — all in a few minutes a day.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/register"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 animate-gradient-x"
                style={{ backgroundSize: '200% 200%' }}
              >
                Get started — it’s free
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3.5"
              >
                Learn more
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  className="glass rounded-2xl p-4 hover-lift"
                >
                  <div className="text-2xl font-semibold tracking-tight">
                    {s.v.startsWith && /^\d/.test(s.v) ? <AnimatedNumber value={parseInt(s.v)} suffix={s.v.replace(/^\d+/, '')} /> : s.v}
                  </div>
                  <div className="text-xs text-white/55 mt-1">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right preview */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Backdrop glow */}
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/15 blur-3xl opacity-70" />

              <GlassCard variant="strong" className="p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                      <HeartPulse size={18} />
                    </div>
                    <div>
                      <div className="font-semibold tracking-tight">Today’s Overview</div>
                      <div className="text-xs text-white/55">Wed · 7-day wellness</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Mood row */}
                <div className="mt-6 grid grid-cols-5 gap-2">
                  {['😀', '🙂', '😐', '😔', '😣'].map((e, i) => (
                    <motion.div
                      key={e}
                      whileHover={{ y: -3 }}
                      className={[
                        'rounded-2xl p-3 text-center border bg-white/5',
                        i === 0
                          ? 'border-primary/40 bg-primary/10 shadow-glow-soft'
                          : 'border-white/10',
                      ].join(' ')}
                    >
                      <div className="text-2xl">{e}</div>
                      <div className="text-[10px] mt-1 text-white/55">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mini chart */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/50">Wellness Score</div>
                      <div className="text-2xl font-semibold mt-0.5">82 <span className="text-sm text-white/50">/ 100</span></div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-accent/15 text-accent border border-accent/30">
                      ▲ 12% this week
                    </div>
                  </div>
                  <svg viewBox="0 0 200 50" className="mt-3 w-full h-12">
                    <defs>
                      <linearGradient id="hp" x1="0" x2="1">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0 35 L25 28 L50 32 L75 18 L100 22 L125 12 L150 16 L175 8 L200 14"
                      fill="none"
                      stroke="url(#hp)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                    />
                  </svg>
                </div>

                {/* Feature pills */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { icon: Brain, label: 'Stress' },
                    { icon: Sparkles, label: 'Wellness' },
                    { icon: Target, label: 'Habits' },
                  ].map(({ icon: I, label }) => (
                    <div key={label} className="rounded-2xl p-3 bg-white/5 border border-white/10 text-center hover-lift">
                      <I size={16} className="mx-auto text-primary" />
                      <div className="text-xs mt-1.5 text-white/70">{label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft text-xs text-white/75">
            <Sparkles size={14} className="text-primary" />
            Everything you need · nothing you don’t
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            A premium toolkit for{' '}
            <span className="text-gradient-brand">student wellbeing.</span>
          </h2>
          <p className="mt-3 text-white/60 text-[15px] leading-relaxed">
            Six thoughtfully crafted surfaces — from mood timelines to stress
            insight — designed to feel calm, fast, and private.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden glass rounded-3xl p-6 hover-lift"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full blur-3xl opacity-50 bg-gradient-to-br ${f.color} group-hover:opacity-80 transition-opacity duration-700`}
                />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <div className="mt-4 text-lg font-semibold tracking-tight">{f.title}</div>
                  <div className="mt-1.5 text-sm text-white/60 leading-relaxed">{f.desc}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ===================== SDG 3 ===================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative overflow-hidden rounded-4xl glass-strong p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl"
          />
          <div className="grid lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold">
                <CheckCircle2 size={14} /> UN SDG 3 — Good Health & Well-being
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                Built for students, aligned with{' '}
                <span className="text-gradient-brand">global wellbeing goals.</span>
              </h2>
              <p className="mt-4 text-white/65 text-[15px] leading-relaxed max-w-2xl">
                MindEase supports SDG 3 by giving students an accessible,
                stigma-free way to build emotional awareness, manage stress, and
                form healthier routines — turning intention into small daily
                actions.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-white/75">
                {[
                  'Daily emotional check-ins',
                  'Instant low/moderate/high stress insight',
                  'Habit tracking with progress & streaks',
                  'Curated motivation & wellness tips',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 text-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-primary/20 blur-2xl rounded-full" />
                <div className="relative glass rounded-3xl p-6">
                  <div className="text-xs font-semibold tracking-widest uppercase text-white/55">SDG 3 Targets</div>
                  <div className="mt-3 space-y-3">
                    {[
                      { l: 'Mental health & well-being', v: 92 },
                      { l: 'Awareness & prevention', v: 87 },
                      { l: 'Accessible self-care', v: 95 },
                    ].map((t) => (
                      <div key={t.l}>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/75">{t.l}</span>
                          <span className="text-accent font-semibold">{t.v}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${t.v}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft text-xs text-white/75">
            <Quote size={14} className="text-primary" /> Loved by students
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            What students are saying
          </h2>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-3xl p-6 hover-lift"
            >
              <div className="flex gap-0.5 text-amber-300">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-white/80 leading-relaxed">“{t.quote}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-semibold">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-white/55">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-4xl p-10 sm:p-14 text-center glass-strong">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[42rem] rounded-full bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/20 blur-3xl"
          />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Start building healthier habits today.
            </h2>
            <p className="mt-3 text-white/65 max-w-xl mx-auto">
              A calmer mind is a skill you can practice. A few minutes a day
              compounds into weeks of clarity.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register"
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5"
                style={{ backgroundSize: '200% 200%' }}
              >
                Get started — it’s free <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-ghost inline-flex items-center justify-center px-7 py-3.5">
                I already have an account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-white/10 py-10 text-sm text-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-white/90 font-semibold tracking-tight">MINDEASE</div>
            <div className="mt-1">SDG 3 · Student Mental Wellness Platform</div>
          </div>
          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: Github, label: 'GitHub' },
              { icon: Apple, label: 'Apple' },
            ].map(({ icon: I, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="h-9 w-9 rounded-xl glass-soft flex items-center justify-center hover:bg-white/8 transition"
              >
                <I size={16} />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            {['Privacy', 'Terms', 'Support', 'SDG 3'].map((x) => (
              <span key={x} className="hover:text-white/85 transition cursor-default">
                {x}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </motion.main>
  )
}

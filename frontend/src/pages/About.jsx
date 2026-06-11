import React from 'react'
import { motion } from 'framer-motion'
import { motion as Motion } from 'framer-motion'
import { Sparkles, Target, Lightbulb, HeartHandshake, Layers, GraduationCap } from 'lucide-react'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'

export default function About() {
  const SECTIONS = [
    {
      icon: Target,
      title: 'Problem',
      desc: 'Students face academic pressure, anxiety, burnout, and emotional uncertainty — often without a simple way to track patterns.'
    },
    {
      icon: Lightbulb,
      title: 'Solution',
      desc: 'MindEase helps you log mood, assess stress instantly, build daily habits, and get recommendations tuned to your signals.'
    },
    {
      icon: Sparkles,
      title: 'Experience',
      desc: 'Designed with a premium linear, Stripe/Notion-inspired visual hierarchy — glassmorphism, smooth motion, and clarity.'
    },
  ]

  const SDG_CARDS = [
    { k: 'SDG 3', title: 'Good Health & Well-being', desc: 'Mental health support through daily check-ins and actionable guidance.' },
    { k: 'SDG 4', title: 'Quality Education', desc: 'Support student wellbeing to protect learning, focus, and resilience.' },
    { k: 'SDG 10', title: 'Reduced Inequalities', desc: 'Accessible digital support for students regardless of background.' },
  ]

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="About"
        title="MindEase"
        subtitle="A premium, student-first mental wellness experience aligned with SDG 3."
        pill="Startup-style build"
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 space-y-4">
          <GlassCard className="p-6 relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Our mission</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">Turn mental health care into a habit.</div>
                <div className="mt-3 text-sm text-white/70 leading-relaxed">
                  MindEase blends daily mood tracking, stress assessment, habit progress, and calm recommendations —
                  wrapped in a premium UI that feels modern, fast, and supportive.
                </div>
              </div>
              <div className="h-12 w-12 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <HeartHandshake size={20} />
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {SECTIONS.map((s) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-3xl p-4 bg-white/5 border border-white/10"
                  >
                    <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                      <Icon size={18} />
                    </div>
                    <div className="mt-3 font-semibold">{s.title}</div>
                    <div className="mt-2 text-sm text-white/65 leading-relaxed">{s.desc}</div>
                  </motion.div>
                )
              })}
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="p-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Vision</div>
            <div className="mt-2 text-lg font-semibold tracking-tight">Wellbeing, made effortless.</div>
            <div className="mt-2 text-sm text-white/70 leading-relaxed">
              We envision a future where students can understand their mental state in seconds — and get
              guidance that motivates action without overwhelm.
            </div>

            <div className="mt-6 rounded-3xl p-5 bg-primary/10 border border-primary/30">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <div className="font-semibold">Built for students</div>
                  <div className="mt-1 text-sm text-white/65">Fast logging, clear analytics, smooth motion, and calm hierarchy.</div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">SDG Highlights</div>
                <div className="mt-2 text-lg font-semibold tracking-tight">Aligned with SDG 3</div>
                <div className="mt-1 text-sm text-white/65">Good Health & Well-being — supported through daily mental wellness signals.</div>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                <Layers size={18} />
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {SDG_CARDS.map((c) => (
                <motion.div
                  key={c.k}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl p-4 bg-white/5 border border-white/10"
                >
                  <div className="text-xs font-semibold text-primary">{c.k}</div>
                  <div className="mt-1 font-semibold">{c.title}</div>
                  <div className="mt-2 text-sm text-white/65 leading-relaxed">{c.desc}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  )
}


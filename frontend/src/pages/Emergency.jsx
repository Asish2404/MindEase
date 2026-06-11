import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ShieldAlert, UserRoundCheck, MessageSquare, MapPin, PhoneCall } from 'lucide-react'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'

const SUPPORT_CARDS = [
  {
    title: 'Mental Health Support',
    desc: 'If you’re feeling overwhelmed, consider reaching out to a trusted professional or campus support.',
    Icon: ShieldAlert,
    tone: 'border-primary/30',
    badge: 'Support',
  },
  {
    title: 'Student Counselor',
    desc: 'If available, contact your campus mental health counselor and ask for an urgent session.',
    Icon: UserRoundCheck,
    tone: 'border-secondary/30',
    badge: 'Campus',
  },
  {
    title: 'Helpline Information',
    desc: 'Replace placeholders with your local helpline details and crisis services.',
    Icon: Phone,
    tone: 'border-white/10',
    badge: 'Crisis',
  },
]


const CONTACTS = [
  { k: 'Helpline', v: '+91-XXXXXXXXXX', icon: PhoneCall },
  { k: 'Crisis Line', v: '112', icon: MessageSquare },
  { k: 'Emergency', v: '108', icon: MapPin },
]

function SupportCard({ title, desc, Icon, tone, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-3xl p-6 glass border ${tone} overflow-hidden relative`}
    >
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-semibold">
              <Icon size={18} />
              {badge}
            </div>
            <div className="mt-3 text-lg font-semibold tracking-tight">{title}</div>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
            <Icon size={18} />
          </div>
        </div>

        <div className="mt-3 text-sm text-white/70 leading-relaxed">{desc}</div>

        <div className="mt-5 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70">
          Tip: Write down symptoms, time started, and what support you need.
        </div>
      </div>
    </motion.div>
  )
}

export default function Emergency() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Emergency"
        title="Professional Support"
        subtitle="If you are in immediate danger, contact local emergency services. This page is here to help you act quickly."
        pill="Crisis & support"
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-12">
          <div className="grid lg:grid-cols-3 gap-4">
            {SUPPORT_CARDS.map((c, i) => (
              <SupportCard key={c.title} {...c} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-12 mt-1">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Emergency contact</div>
                <div className="mt-2 text-lg font-semibold tracking-tight">Keep these numbers close</div>
                <div className="mt-1 text-sm text-white/60">Tap a card to quickly copy the number (UI affordance only).</div>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <Phone size={18} />
              </div>
            </div>

            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {CONTACTS.map((c) => (
                <motion.div
                  key={c.k}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="rounded-3xl p-4 glass border border-white/10 bg-white/5 cursor-pointer"
                  onClick={() => {
                    // UI only: no clipboard logic change required
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                      <c.icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-white/55">{c.k}</div>
                      <div className="mt-1 font-semibold">{c.v}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl p-5 bg-primary/10 border border-primary/30">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <div className="font-semibold">If you’re unsure</div>
                  <div className="mt-1 text-sm text-white/65 leading-relaxed">
                    It’s okay to reach out early. Support can help before symptoms become harder to manage.
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  )
}


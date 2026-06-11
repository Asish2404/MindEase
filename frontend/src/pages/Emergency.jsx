import React from 'react'
import { motion } from 'framer-motion'
import { Phone, ShieldAlert, UserRoundCheck } from 'lucide-react'

export default function Emergency() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-semibold">Emergency Support</h2>
        <div className="text-white/70 mt-1">If you’re in immediate danger, contact local emergency services.</div>

        <div className="grid lg:grid-cols-3 gap-4 mt-6">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-primary" />
              <div className="font-semibold">Mental Health Support</div>
            </div>
            <div className="text-sm text-white/70 mt-3">Consider reaching out to a qualified counselor or trusted professional.</div>
            <div className="mt-4 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70">
              Tip: Write down your symptoms and your questions before contacting support.
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <UserRoundCheck className="text-secondary" />
              <div className="font-semibold">Student Counselor</div>
            </div>
            <div className="text-sm text-white/70 mt-3">If available, contact your campus mental health counselor.</div>
            <div className="mt-4 rounded-2xl p-4 bg-white/5 border border-white/10">
              <div className="text-xs text-white/60">Suggested message</div>
              <div className="text-sm font-semibold mt-1">"I need urgent mental health support. Can I book a session?"</div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border border-primary/30">
            <div className="flex items-center gap-3">
              <Phone className="text-primary" />
              <div className="font-semibold">Helpline Information</div>
            </div>
            <div className="text-sm text-white/70 mt-3">Replace placeholders with your local helpline details.</div>
            <div className="mt-4 space-y-3">
              {[{ k: 'Helpline', v: '+91-XXXXXXXXXX' }, { k: 'Crisis Line', v: '112' }, { k: 'Emergency', v: '108' }].map((x) => (
                <div key={x.k} className="rounded-2xl p-4 bg-white/5 border border-white/10">
                  <div className="text-xs text-white/60">{x.k}</div>
                  <div className="text-sm font-semibold mt-1">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


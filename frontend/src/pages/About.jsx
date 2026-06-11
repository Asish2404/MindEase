import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass rounded-3xl p-8 md:p-10">
        <h2 className="text-2xl font-semibold">About MINDEASE</h2>
        <div className="text-white/70 mt-2">A student-first mental wellness platform aligned with SDG 3.</div>

        <div className="mt-8 space-y-5">
          <section>
            <div className="text-primary font-semibold">Problem</div>
            <p className="text-white/75 mt-2">
              Many students experience academic pressure, anxiety, burnout, and poor emotional awareness.
              There is also a lack of simple mental health tracking tools.
            </p>
          </section>
          <section>
            <div className="text-primary font-semibold">Solution</div>
            <p className="text-white/75 mt-2">
              MindEase enables students to track mood, assess stress instantly, build habits with progress
              bars, and receive tailored wellness recommendations.
            </p>
          </section>
          <section>
            <div className="text-primary font-semibold">SDG 3 Alignment</div>
            <p className="text-white/75 mt-2">
              SDG 3 focuses on ensuring healthy lives and promoting well-being for all. MindEase supports mental health
              with daily check-ins, stress insights, and actionable guidance.
            </p>
          </section>
          <section>
            <div className="text-primary font-semibold">Project Vision</div>
            <p className="text-white/75 mt-2">
              Create a premium, modern experience that students can adopt easily—turning mental health care into
              a habit.
            </p>
          </section>
        </div>
      </motion.div>
    </main>
  )
}


import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

const iconFor = {
  success: <CheckCircle2 size={18} className="text-accent" />,
  info: <Info size={18} className="text-primary" />,
  error: <AlertTriangle size={18} className="text-rose-300" />,
}

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="fixed top-24 right-4 sm:right-6 z-[100] w-[340px] max-w-[calc(100vw-32px)] space-y-3">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-2xl p-4 shadow-glow"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {iconFor[t.type] || iconFor.info}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold tracking-tight">{t.title}</div>
                {t.message && (
                  <div className="text-sm text-white/70 mt-1 leading-relaxed">{t.message}</div>
                )}
              </div>
              <button
                onClick={() => onDismiss(t.id)}
                className="text-white/60 hover:text-text transition rounded-lg p-1 hover:bg-white/5"
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

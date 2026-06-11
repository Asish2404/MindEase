import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="fixed top-20 right-4 z-[100] w-[320px] max-w-[calc(100vw-32px)]">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="glass rounded-2xl p-4 shadow-glow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-white/70 mt-1">{t.message}</div>
              </div>
              <button
                onClick={() => onDismiss(t.id)}
                className="text-white/70 hover:text-text transition"
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


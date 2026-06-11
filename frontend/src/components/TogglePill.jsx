import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TogglePill({ checked, onChange, label, description }) {
  return (
    <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{label}</div>
          {description && <div className="text-sm text-white/70 mt-1">{description}</div>}
        </div>

        <button
          type="button"
          onClick={() => onChange?.(!checked)}
          className="relative h-10 w-16 rounded-full border border-white/10 bg-black/20 overflow-hidden"
          aria-pressed={checked}
          aria-label={label}
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-8 rounded-full"
            animate={{ x: checked ? 24 : 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
          >
            <div className={`h-full w-full rounded-full ${checked ? 'bg-accent/30' : 'bg-white/5'}`} />
          </motion.div>

          <AnimatePresence>
            {checked && (
              <motion.div
                key="on"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-accent"
              >
                On
              </motion.div>
            )}
          </AnimatePresence>
          {!checked && (
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white/55">
              Off
            </div>
          )}
        </button>
      </div>
    </div>
  )
}


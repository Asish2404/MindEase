import React from 'react'
import { motion } from 'framer-motion'

/**
 * AnimatedNumber — counts up to a target value.
 */
export default function AnimatedNumber({ value, duration = 1.2, suffix = '' }) {
  const [display, setDisplay] = React.useState(0)
  const ref = React.useRef(null)

  React.useEffect(() => {
    const start = performance.now()
    const initial = 0
    const target = Number(value) || 0
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(initial + (target - initial) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      {display}
      {suffix}
    </motion.span>
  )
}

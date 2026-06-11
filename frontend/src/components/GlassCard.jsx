import React from 'react'
import { motion } from 'framer-motion'

/**
 * GlassCard — premium glassmorphism surface.
 * Variants: default | strong | soft | bordered
 */
export default function GlassCard({
  as: Tag = 'div',
  variant = 'default',
  hover = false,
  className = '',
  children,
  ...rest
}) {
  const surface =
    variant === 'strong'
      ? 'glass-strong'
      : variant === 'soft'
        ? 'glass-soft'
        : 'glass'

  const Comp = motion[Tag] || motion.div

  return (
    <Comp
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={[
        surface,
        'rounded-3xl',
        hover ? 'hover-lift cursor-default' : '',
        'p-6',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </Comp>
  )
}

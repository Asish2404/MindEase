import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, ShieldCheck, UserPlus } from 'lucide-react'
import { useAuth } from '../services/auth.jsx'
import { useToasts } from '../services/toast.js'
import Toast from '../components/Toast.jsx'
import GlassCard from '../components/GlassCard.jsx'
import PageContainer from '../components/PageContainer.jsx'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Register() {
  const { push, toasts, dismiss } = useToasts()
  const { register } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const disabled = useMemo(() => !fullName || !email || !password, [fullName, email, password])

  const passwordHint = useMemo(() => {
    if (!password) return 'Use 6+ characters.'
    if (password.length < 6) return 'Too short. Add a few more.'
    if (password.length < 10) return 'Good start — consider a number.'
    return 'Strong enough for a demo account.'
  }, [password])

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (fullName.trim().length < 2) throw new Error('Full name is required')
      if (!validateEmail(email)) throw new Error('Please enter a valid email')
      if (password.length < 6) throw new Error('Password must be at least 6 characters')
      await new Promise((r) => setTimeout(r, 450))
      register({ full_name: fullName.trim(), email: email.trim(), password })
      push('Account created', 'Redirecting to your dashboard…')
      navigate('/dashboard')
    } catch (err) {
      push('Registration failed', err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer>
      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

            <div className="flex items-start justify-between gap-4 relative">
              <div>
                <div className="inline-flex items-center gap-2 text-primary font-semibold">
                  <Sparkles size={16} /> Create your account
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight">Join MindEase</h1>
                <p className="mt-2 text-sm text-white/70">Start a calm routine — mood, stress, habits, and guidance.</p>
              </div>

              <div className="hidden sm:flex h-10 w-10 rounded-2xl bg-white/5 border border-white/10 items-center justify-center text-primary">
                <UserPlus size={18} />
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <div>
                <label className="text-sm text-white/70">Full name</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  required
                  minLength={2}
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Email</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Password</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <div className="mt-1 text-xs text-white/55">{passwordHint}</div>
              </div>

              <motion.button
                whileHover={!disabled && !loading ? { y: -1 } : undefined}
                whileTap={!disabled && !loading ? { scale: 0.99 } : undefined}
                disabled={disabled || loading}
                className="w-full rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary disabled:opacity-50 transition"
              >
                {loading ? 'Creating…' : 'Register'}
              </motion.button>

              <div className="text-sm text-white/60 flex justify-between items-center pt-2">
                <span>Already have an account?</span>
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </GlassCard>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <GlassCard className="p-8 relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

            <Toast toasts={toasts} onDismiss={dismiss} />

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-primary font-semibold">Local-first privacy</div>
                <div className="text-sm text-white/70 mt-1">
                  Your mood, stress, and habits are stored in your browser localStorage for this academic demo.
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-white/75">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">• Smooth dashboard UI</div>
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">• Fast local analytics</div>
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">• Premium glassmorphism theme</div>
            </div>

            <div className="mt-6 rounded-2xl p-4 bg-primary/10 border border-primary/30 text-sm text-text">
              <div className="font-semibold">Pro tip</div>
              <div className="text-white/60 mt-1">Log a mood once daily — trends become obvious in weeks.</div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </PageContainer>
  )
}


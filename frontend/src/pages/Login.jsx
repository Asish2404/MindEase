import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react'
import { useAuth } from '../services/auth.jsx'
import { useToasts } from '../services/toast.js'
import Toast from '../components/Toast.jsx'
import GlassCard from '../components/GlassCard.jsx'
import PageContainer from '../components/PageContainer.jsx'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Login() {
  const { push, toasts, dismiss } = useToasts()
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const disabled = useMemo(() => !email || !password, [email, password])

  const passwordHint = useMemo(() => {
    if (!password) return 'Use 6+ characters.'
    const len = password.length
    if (len < 6) return 'Too short. Add a few more characters.'
    if (len < 10) return 'Nice. Consider adding a number.'
    return 'Strong enough for a demo login.'
  }, [password])

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (!validateEmail(email)) throw new Error('Please enter a valid email')
      if (password.length < 6) throw new Error('Password must be at least 6 characters')
      await new Promise((r) => setTimeout(r, 400))
      login({ email, password })
      push('Welcome back', 'Redirecting to your dashboard…')
      navigate('/dashboard')
    } catch (err) {
      push('Login failed', err.message || 'Something went wrong')
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
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-primary font-semibold">
                    <Sparkles size={16} />
                    MindEase
                  </div>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight">Login</h1>
                  <p className="mt-2 text-sm text-white/70">Access your wellness dashboard.</p>
                </div>

                <div className="hidden sm:flex items-center justify-center h-10 w-10 rounded-2xl bg-white/5 border border-white/10 text-primary">
                  <ShieldCheck size={18} />
                </div>
              </div>

              <form onSubmit={onSubmit} className="mt-7 space-y-4 relative">
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
                  <div className="relative mt-2">
                    <input
                      className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 pr-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition flex items-center justify-center"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="mt-1 text-xs text-white/55">{passwordHint}</div>
                </div>

                <motion.button
                  whileHover={!disabled && !loading ? { y: -1 } : undefined}
                  whileTap={!disabled && !loading ? { scale: 0.99 } : undefined}
                  disabled={disabled || loading}
                  className="w-full rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary disabled:opacity-50 transition"
                >
                  {loading ? 'Signing in…' : 'Login'}
                </motion.button>

                <div className="text-sm text-white/60 flex justify-between items-center pt-2">
                  <span>New here?</span>
                  <Link to="/register" className="text-primary hover:underline">
                    Create account
                  </Link>
                </div>
              </form>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <GlassCard className="p-8 relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

            <Toast toasts={toasts} onDismiss={dismiss} />

            <div className="relative">
              <h2 className="text-xl font-semibold tracking-tight">A premium, student-first experience</h2>
              <p className="mt-2 text-sm text-white/70">Designed for calm momentum — not complicated tools.</p>

              <div className="mt-6 space-y-3 text-sm text-white/75">
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">🌈</div>
                  <div>
                    <div className="font-semibold">Mood check-ins</div>
                    <div className="text-xs text-white/60 mt-1">Build awareness with a clean timeline.</div>
                  </div>
                </div>
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">🧠</div>
                  <div>
                    <div className="font-semibold">Stress quiz</div>
                    <div className="text-xs text-white/60 mt-1">10 questions, smooth multi-step flow.</div>
                  </div>
                </div>
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary">✨</div>
                  <div>
                    <div className="font-semibold">Wellness recommendations</div>
                    <div className="text-xs text-white/60 mt-1">Personal guidance based on your inputs.</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl p-4 bg-primary/10 border border-primary/30 text-sm text-text">
                <div className="font-semibold">Demo note</div>
                <div className="mt-1 text-white/60">This app stores wellness data locally in your browser.</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </PageContainer>
  )
}


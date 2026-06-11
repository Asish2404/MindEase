import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../services/auth.jsx'
import { useToasts } from '../services/toast.js'
import Toast from '../components/Toast.jsx'

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
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Toast toasts={toasts} onDismiss={dismiss} />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <div className="glass rounded-3xl p-8">
            <div className="text-2xl font-semibold">Create your account</div>
            <div className="text-white/70 mt-2">Join MindEase and start your wellness routine.</div>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <div>
                <label className="text-sm text-white/70">Full name</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  required
                  minLength={2}
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Password</label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  minLength={6}
                />
              </div>

              <button
                disabled={disabled || loading}
                className="w-full rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary disabled:opacity-50"
              >
                {loading ? 'Creating…' : 'Register'}
              </button>

              <div className="text-sm text-white/60 flex justify-between items-center">
                <span>Already have an account?</span>
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass rounded-3xl p-8">
            <div className="text-primary font-semibold">Local-first privacy</div>
            <div className="text-white/70 mt-2 text-sm">
              Your mood, stress, and habits are stored in your browser localStorage for this academic demo.
            </div>
            <div className="mt-6 text-white/75 space-y-3 text-sm">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">• Smooth dashboard UI</div>
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">• Fast local analytics</div>
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">• Premium glassmorphism theme</div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


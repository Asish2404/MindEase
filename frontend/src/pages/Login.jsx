import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../services/auth.jsx'
import { useToasts } from '../services/toast.js'
import Toast from '../components/Toast.jsx'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Login() {
  const { push, toasts, dismiss } = useToasts()
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const disabled = useMemo(() => !email || !password, [email, password])

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
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Toast toasts={toasts} onDismiss={dismiss} />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <div className="glass rounded-3xl p-8">
            <div className="text-2xl font-semibold">Login</div>
            <div className="text-white/70 mt-2">Access your wellness dashboard.</div>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
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
                {loading ? 'Signing in…' : 'Login'}
              </button>

              <div className="text-sm text-white/60 flex justify-between items-center">
                <span>New here?</span>
                <Link to="/register" className="text-primary hover:underline">
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass rounded-3xl p-8">
            <div className="text-primary font-semibold">Why students use MindEase</div>
            <ul className="mt-4 space-y-3 text-white/75">
              <li>• Track mood daily and build awareness.</li>
              <li>• Get instant stress level with a 10-question quiz.</li>
              <li>• Receive recommendations tailored to your stress.</li>
              <li>• Track daily habits and progress percentage.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, HeartPulse, Brain, Settings, User, LogOut, AlertTriangle, Sparkles, ShieldQuestion, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../services/auth.jsx'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/moods', label: 'Mood', icon: HeartPulse },
  { to: '/stress', label: 'Stress Quiz', icon: Brain },
  { to: '/wellness', label: 'Wellness', icon: Sparkles },
  { to: '/habits', label: 'Habits', icon: ShieldQuestion },
  { to: '/motivation', label: 'Motivation', icon: BookOpen },
  { to: '/emergency', label: 'Emergency', icon: AlertTriangle },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { state, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="glass rounded-2xl px-3 py-2 flex items-center justify-between"
        >
          <Link to={state.user ? '/dashboard' : '/'} className="flex items-center gap-2 font-semibold tracking-tight">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-glow" />
            <div className="leading-tight">
              <div className="text-text">MINDEASE</div>
              <div className="text-xs text-white/60">SDG 3 • Wellness</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {items.slice(0, 7).map((it) => {
              const active = location.pathname === it.to
              const Icon = it.icon
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`px-3 py-2 rounded-xl text-sm transition ${
                    active ? 'bg-white/10 text-text' : 'text-white/70 hover:text-text hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={16} />
                    {it.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            {state.user ? (
              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-text hover:bg-white/5 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-3 py-2 rounded-xl text-sm text-white/70 hover:text-text hover:bg-white/5 transition">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-xl text-sm bg-primary/20 text-text hover:bg-primary/30 transition">
                  Register
                </Link>
              </div>
            )}

            <Link
              to={state.user ? '/profile' : '/login'}
              className="inline-flex sm:hidden items-center justify-center h-10 w-10 rounded-xl text-white/80 hover:text-text hover:bg-white/5 transition"
              aria-label="Profile"
            >
              <User size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </header>
  )
}


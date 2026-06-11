import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  HeartPulse,
  Brain,
  Settings,
  User,
  LogOut,
  AlertTriangle,
  Sparkles,
  ShieldQuestion,
  BookOpen,
  Menu,
  X,
  Activity,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../services/auth.jsx'

import logo from '../images/MindEase_cropped.png'




const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/moods', label: 'Mood', icon: HeartPulse },
  { to: '/stress', label: 'Stress', icon: Brain },
  { to: '/wellness', label: 'Wellness', icon: Sparkles },
  { to: '/habits', label: 'Habits', icon: Activity },
  { to: '/motivation', label: 'Motivation', icon: BookOpen },
  { to: '/emergency', label: 'Emergency', icon: AlertTriangle },
]

const secondaryItems = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/about', label: 'About', icon: ShieldQuestion },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { state, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const all = [...items, ...secondaryItems]

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 pt-3">
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={[
            'glass rounded-2xl px-3 sm:px-4 py-2.5 flex items-center justify-between transition-shadow',
            scrolled ? 'shadow-card' : '',
          ].join(' ')}
        >
          <Link
            to={state.user ? '/dashboard' : '/'}
            className="flex items-center gap-2.5 font-semibold tracking-tight"
          >
            <img
              src={logo}
              alt="MindEase"
              className="h-12 w-auto sm:h-14 transition-transform duration-300 hover:scale-[1.05]"
              loading="eager"
            />

            <div className="leading-tight">
              <div className="text-text text-[15px]">MindEase</div>
              <div className="text-[10px] text-white/55 tracking-wider uppercase">Student Wellness</div>
            </div>
          </Link>


          <nav className="hidden lg:flex items-center gap-1">
            {items.map((it) => {
              const active = location.pathname === it.to
              const Icon = it.icon
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={[
                    'relative px-3 py-2 rounded-xl text-sm transition',
                    active
                      ? 'text-text'
                      : 'text-white/65 hover:text-text hover:bg-white/5',
                  ].join(' ')}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-white/10 border border-white/10"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon size={15} />
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
                <LogOut size={15} />
                Logout
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-xl text-sm text-white/70 hover:text-text hover:bg-white/5 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary px-3.5 py-2 text-sm"
                >
                  Get started
                </Link>
              </div>
            )}

            <Link
              to={state.user ? '/profile' : '/login'}
              className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-text hover:bg-white/10 transition"
              aria-label="Profile"
            >
              <User size={16} />
            </Link>

            <button
              onClick={() => setOpen((p) => !p)}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-text hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden mt-2 glass-strong rounded-2xl p-2"
            >
              <div className="grid grid-cols-2 gap-1.5 p-1">
                {all.map((it) => {
                  const active = location.pathname === it.to
                  const Icon = it.icon
                  return (
                    <Link
                      key={it.to}
                      to={it.to}
                      className={[
                        'flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition',
                        active
                          ? 'bg-white/10 text-text'
                          : 'text-white/70 hover:bg-white/5 hover:text-text',
                      ].join(' ')}
                    >
                      <Icon size={15} />
                      {it.label}
                    </Link>
                  )
                })}
              </div>
              {state.user && (
                <div className="px-1 pt-1.5 pb-1">
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

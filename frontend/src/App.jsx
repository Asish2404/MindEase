import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MoodTracker from './pages/MoodTracker.jsx'
import StressQuiz from './pages/StressQuiz.jsx'
import Wellness from './pages/Wellness.jsx'
import Habits from './pages/Habits.jsx'
import Motivation from './pages/Motivation.jsx'
import Emergency from './pages/Emergency.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import About from './pages/About.jsx'
import { AuthProvider, useAuth } from './services/auth.jsx'

const Protected = ({ children }) => {
  const { state } = useAuth()
  const location = useLocation()
  if (!state.user) return <Navigate to="/login" replace state={{ from: location }} />
  return children
}

class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, message: err?.message || 'Unknown error' }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="glass-strong rounded-3xl p-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Render error</div>
            <div className="mt-3 text-2xl font-semibold">This page crashed.</div>
            <div className="mt-2 text-sm text-white/70">{this.state.message}</div>
            <div className="mt-5 text-sm text-white/60">Navigate to another tab; the route will continue to work after the underlying error is fixed.</div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}



export default function App() {
  const location = useLocation()
  return (
    <AuthProvider>
      <div className="min-h-screen bg-bg">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/moods"
            element={
              <Protected>
                <MoodTracker />
              </Protected>
            }
          />
          <Route
            path="/stress"
            element={
              <Protected>
                <StressQuiz />
              </Protected>
            }
          />
          <Route
            path="/wellness"
            element={
              <Protected>
                <Wellness />
              </Protected>
            }
          />
          <Route
            path="/habits"
            element={
              <Protected>
                <Habits />
              </Protected>
            }
          />
          <Route
            path="/motivation"
            element={
              <Protected>
                <Motivation />
              </Protected>
            }
          />
          <Route
            path="/emergency"
            element={
              <Protected>
                <Emergency />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected>
                <Settings />
              </Protected>
            }
          />
          <Route
            path="/about"
            element={
              <Protected>
                <About />
              </Protected>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </AuthProvider>
  )
}



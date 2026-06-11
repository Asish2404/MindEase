import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/auth.jsx'

export default function ProtectedRoute({ children }) {
  const { state } = useAuth()
  if (!state.user) return <Navigate to="/login" replace />
  return children
}


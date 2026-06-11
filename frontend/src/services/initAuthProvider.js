import React from 'react'
import { AuthProvider } from './auth.js'

export default function initWrap({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}


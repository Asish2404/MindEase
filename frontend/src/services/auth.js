import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { storage } from './storage.js'

const AuthContext = createContext(null)


const initial = {
  user: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'RESTORE':
      return { ...state, user: action.user }
    case 'LOGIN':
      return { ...state, user: action.user }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

function readSession() {
  const session = storage.getJSON(storage.keys.SESSION, null)
  return session?.user ?? null
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)

  React.useEffect(() => {
    dispatch({ type: 'RESTORE', user: readSession() })
  }, [])

  const api = useMemo(
    () => ({
      state,
      register: (payload) => {
        const users = storage.getJSON(storage.keys.USERS, [])
        const exists = users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())
        if (exists) throw new Error('Email already registered')
        const user = { id: crypto.randomUUID(), ...payload }
        users.push(user)
        storage.setJSON(storage.keys.USERS, users)
        storage.setJSON(storage.keys.SESSION, { user })
        dispatch({ type: 'LOGIN', user })
        return user
      },
      login: (payload) => {
        const users = storage.getJSON(storage.keys.USERS, [])
        const user = users.find((u) => u.email.toLowerCase() === payload.email.toLowerCase())
        if (!user) throw new Error('Invalid email or password')
        if (user.password !== payload.password) throw new Error('Invalid email or password')
        storage.setJSON(storage.keys.SESSION, { user })
        dispatch({ type: 'LOGIN', user })
        return user
      },
      logout: () => {
        storage.remove(storage.keys.SESSION)
        dispatch({ type: 'LOGOUT' })
      },
    }),
    [state],
  )

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>
}


export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


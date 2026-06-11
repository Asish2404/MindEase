import { useMemo, useState, useCallback } from 'react'

export function useToasts() {
  const [toasts, setToasts] = useState([])

  const push = useCallback((title, message) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, title, message }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])
}


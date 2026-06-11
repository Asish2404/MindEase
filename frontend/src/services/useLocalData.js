import { useEffect, useMemo, useState } from 'react'
import { storage } from './storage.js'


export function useLocalData() {
  const [moodEntries, setMoodEntries] = useState([])
  const [stressEntries, setStressEntries] = useState([])
  const [habitsEntries, setHabitsEntries] = useState([])
  const [profile, setProfile] = useState(null)
  const [settings, setSettings] = useState(null)

  const load = () => {
    setMoodEntries(storage.getJSON(storage.keys.MOODS, []))
    setStressEntries(storage.getJSON(storage.keys.STRESS, []))
    setHabitsEntries(storage.getJSON(storage.keys.HABITS, []))
    setProfile(storage.getJSON(storage.keys.PROFILE, null))
    setSettings(storage.getJSON(storage.keys.SETTINGS, { theme: 'dark', notifications_enabled: true }))
  }

  useEffect(() => {
    load()
    const onStorage = () => load()
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const actions = useMemo(
    () => ({
      addMood: (entry) => {
        const next = [...storage.getJSON(storage.keys.MOODS, []), entry]
        storage.setJSON(storage.keys.MOODS, next)
        setMoodEntries(next)
      },
      addStress: (entry) => {
        const next = [...storage.getJSON(storage.keys.STRESS, []), entry]
        storage.setJSON(storage.keys.STRESS, next)
        setStressEntries(next)
      },
      addHabits: (entry) => {
        const next = [...storage.getJSON(storage.keys.HABITS, []), entry]
        storage.setJSON(storage.keys.HABITS, next)
        setHabitsEntries(next)
      },
      upsertProfile: (p) => {
        storage.setJSON(storage.keys.PROFILE, p)
        setProfile(p)
      },
      upsertSettings: (s) => {
        storage.setJSON(storage.keys.SETTINGS, s)
        setSettings(s)
      },
    }),
    [],
  )

  return {
    moodEntries,
    stressEntries,
    habitsEntries,
    profile,
    settings,
    ...actions,
  }
}


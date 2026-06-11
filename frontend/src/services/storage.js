const KEYS = {
  USERS: 'mindease_users',
  SESSION: 'mindease_session',
  MOODS: 'mindease_moods',
  STRESS: 'mindease_stress',
  HABITS: 'mindease_habits',
  PROFILE: 'mindease_profile',
  SETTINGS: 'mindease_settings',
}

export const storage = {
  keys: KEYS,

  getJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback
      return JSON.parse(raw)
    } catch {
      return fallback
    }
  },

  setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove(key) {
    localStorage.removeItem(key)
  },
}


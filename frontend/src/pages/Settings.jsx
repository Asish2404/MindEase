import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocalData } from '../services/useLocalData.js'

export default function Settings() {
  const { settings, upsertSettings } = useLocalData()
  const [theme, setTheme] = useState(settings?.theme ?? 'dark')
  const [notificationsEnabled, setNotificationsEnabled] = useState(settings?.notifications_enabled ?? true)

  useEffect(() => {
    // minimal: apply theme to body background if needed
    document.body.classList.toggle('bg-white', theme === 'light')
  }, [theme])

  const onSave = () => {
    upsertSettings({ theme, notifications_enabled: notificationsEnabled })
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-semibold">Settings</h2>
        <div className="text-white/70 mt-1">Customize your experience.</div>

        <div className="grid lg:grid-cols-12 gap-4 mt-6">
          <div className="lg:col-span-7 glass rounded-3xl p-6">
            <div className="font-semibold">Preferences</div>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <div className="font-semibold">Dark Mode / Light Mode</div>
                <div className="text-sm text-white/70 mt-1">Choose your theme.</div>
                <div className="mt-3 flex gap-2">
                  {['dark', 'light'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex-1 rounded-2xl px-4 py-2 border transition ${
                        theme === t ? 'bg-primary/20 border-primary/40 text-text' : 'bg-black/10 border-white/10 text-white/70 hover:bg-white/5'
                      }`}
                    >
                      {t === 'dark' ? 'Dark' : 'Light'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <div className="font-semibold">Notifications</div>
                <div className="text-sm text-white/70 mt-1">Receive gentle reminders for check-ins.</div>
                <div className="mt-3">
                  <button
                    onClick={() => setNotificationsEnabled((p) => !p)}
                    className={`rounded-2xl px-4 py-2 border transition ${
                      notificationsEnabled
                        ? 'bg-accent/20 border-accent/40 text-text'
                        : 'bg-black/10 border-white/10 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    {notificationsEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={onSave} className="w-full rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition">
                Save Preferences
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 glass rounded-3xl p-6">
            <div className="font-semibold">Local Storage</div>
            <div className="text-sm text-white/70 mt-2">
              Your settings are stored locally in this browser.
            </div>
            <div className="mt-5 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70">
              Tip: Refresh the page to confirm settings persist.
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}


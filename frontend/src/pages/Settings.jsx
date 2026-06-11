import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalData } from '../services/useLocalData.js'
import PageContainer from '../components/PageContainer.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import TogglePill from '../components/TogglePill.jsx'
import { Sparkles, Bell, Moon, Sun } from 'lucide-react'

export default function Settings() {
  const { settings, upsertSettings } = useLocalData()
  const [theme, setTheme] = useState(settings?.theme ?? 'dark')
  const [notificationsEnabled, setNotificationsEnabled] = useState(settings?.notifications_enabled ?? true)

  useEffect(() => {
    document.body.classList.toggle('bg-white', theme === 'light')
  }, [theme])

  const themeLabel = theme === 'dark' ? 'Dark mode' : 'Light mode'

  const onSave = () => {
    upsertSettings({ theme, notifications_enabled: notificationsEnabled })
  }

  const changed = useMemo(() => {
    return theme !== (settings?.theme ?? 'dark') || notificationsEnabled !== (settings?.notifications_enabled ?? true)
  }, [theme, notificationsEnabled, settings])

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Settings"
        title="Preferences"
        subtitle="Customize the experience — fast toggles, clean layout, premium hierarchy."
        pill={themeLabel}
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Preferences</div>
                <div className="mt-2 text-lg font-semibold tracking-tight">Visual + reminders</div>
                <div className="mt-1 text-sm text-white/60">Your choices are stored locally.</div>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <Sparkles size={18} />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-3xl p-4 bg-white/5 border border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">Theme</div>
                    <div className="text-sm text-white/65 mt-1">Choose how the app looks.</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={theme === 'dark' ? 'text-primary' : 'text-white/50'}>
                      <Moon size={16} />
                    </div>
                    <button
                      type="button"
                      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                      className="h-10 w-20 rounded-full border border-white/10 bg-black/20 relative overflow-hidden"
                      aria-label="Toggle theme"
                    >
                      <motion.div
                        className="absolute top-1 left-1 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary"
                        animate={{ x: theme === 'dark' ? 0 : 52 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                    <div className={theme === 'light' ? 'text-secondary' : 'text-white/50'}>
                      <Sun size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <TogglePill
                checked={notificationsEnabled}
                onChange={setNotificationsEnabled}
                label="Notifications"
                description="Gentle reminders for your daily check-ins."
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={changed ? { y: -1 } : undefined}
                whileTap={changed ? { scale: 0.99 } : undefined}
                disabled={!changed}
                onClick={onSave}
                className="flex-1 rounded-2xl py-3 font-semibold bg-gradient-to-r from-primary to-secondary disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Save preferences
              </motion.button>
              <div className="flex-1 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70">
                {changed ? 'Changes ready to save.' : 'All set. No pending changes.'}
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Notification preview</div>
                <div className="mt-2 text-lg font-semibold tracking-tight">Gentle by design</div>
                <div className="mt-1 text-sm text-white/60">No spam. Just calm prompts.</div>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                <Bell size={18} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={notificationsEnabled ? 'on' : 'off'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-5 rounded-3xl p-5 bg-primary/10 border border-primary/30"
              >
                <div className="font-semibold">{notificationsEnabled ? 'Enabled' : 'Disabled'}</div>
                <div className="mt-1 text-sm text-white/65">
                  {notificationsEnabled
                    ? 'You’ll get reminders for mood & stress check-ins.'
                    : 'Reminders are turned off. You can re-enable anytime.'}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70 leading-relaxed">
              Tip: If you find reminders distracting, disable notifications and use manual check-ins.
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-white/55">Local Storage</div>
            <div className="mt-2 text-lg font-semibold tracking-tight">Privacy-first</div>
            <div className="mt-1 text-sm text-white/60">Settings are stored locally in this browser.</div>
            <div className="mt-5 rounded-2xl p-4 bg-white/5 border border-white/10 text-sm text-white/70">
              Tip: Refresh to confirm persistence.
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  )
}


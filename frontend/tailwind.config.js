/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0F172A',
        card: '#1E293B',
        text: '#F8FAFC',
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#22C55E',
      },
      boxShadow: {
        glow: '0 0 24px rgba(99,102,241,0.35)',
      },
    },
  },
  plugins: [],
}


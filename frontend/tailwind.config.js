/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0F172A',
        card: '#1E293B',
        text: '#F8FAFC',
        primary: {
          DEFAULT: '#6366F1',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        accent: {
          DEFAULT: '#22C55E',
          400: '#4ADE80',
          500: '#22C55E',
        },
        ink: {
          900: '#0B1120',
          800: '#0F172A',
          700: '#1E293B',
          600: '#334155',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        glow: '0 0 24px rgba(99,102,241,0.35)',
        'glow-lg': '0 0 60px rgba(99,102,241,0.45)',
        'glow-soft': '0 10px 40px -10px rgba(99,102,241,0.45)',
        soft: '0 10px 30px -12px rgba(2, 6, 23, 0.6)',
        card: '0 8px 30px -8px rgba(2, 6, 23, 0.55), 0 0 0 1px rgba(255,255,255,0.04)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #6366F1 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18))',
        'gradient-radial': 'radial-gradient(ellipse at top, rgba(99,102,241,0.18), transparent 60%)',
        'hero-mesh':
          'radial-gradient(at 12% 18%, rgba(99,102,241,0.30) 0px, transparent 50%), radial-gradient(at 88% 10%, rgba(139,92,246,0.30) 0px, transparent 50%), radial-gradient(at 60% 90%, rgba(34,197,94,0.18) 0px, transparent 50%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0.4)' },
          '50%': { boxShadow: '0 0 0 14px rgba(99,102,241,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px,15px) scale(0.97)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
        blob: 'blob 14s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

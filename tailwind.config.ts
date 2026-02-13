import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0b0b0c',
        'dark-secondary': '#121214',
        'surface-elevated': 'rgba(255,255,255,0.04)',
        'text-primary': '#f5f7fa',
        'text-secondary': '#a1a7b3',
        'text-muted': '#7b8190',
        'glass-card': 'rgba(255,255,255,0.035)',
        'glass-border': 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        'xl': '32px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

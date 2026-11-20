// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: '#00FF41',
          dim: 'rgba(0, 255, 65, 0.55)',
          muted: 'rgba(0, 255, 65, 0.35)',
          soft: 'rgba(232, 255, 232, 0.72)',
          border: 'rgba(0, 255, 65, 0.22)',
          'border-strong': 'rgba(0, 255, 65, 0.4)',
        },
        canvas: {
          DEFAULT: '#050505',
          elevated: '#0a0a0a',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 24px rgba(0, 255, 65, 0.15)',
        'neon-sm': '0 0 12px rgba(0, 255, 65, 0.1)',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2.8s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(0, 255, 65, 0)',
            borderColor: 'rgba(0, 255, 65, 0.22)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.12)',
            borderColor: 'rgba(0, 255, 65, 0.4)',
          },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

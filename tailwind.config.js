/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:     '#f0ede8',
        paper:   '#09090b',
        paper2:  '#0f0f14',
        surface: '#18181b',
        accent:  '#f97316',
        accent2: '#ea580c',
        green:   '#4ade80',
        muted:   '#71717a',
      },
      fontFamily: {
        disp: ['"Bebas Neue"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'glow-accent': 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.18) 0%, transparent 70%)',
        'glow-center': 'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)',
      },
      keyframes: {
        pdot: {
          '0%,100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(249,115,22,.55)' },
          '50%':      { opacity: '.7', boxShadow: '0 0 0 5px rgba(249,115,22,0)' },
        },
        glitch1: {
          '0%':   { clipPath: 'inset(40% 0 61% 0)', transform: 'translate(-4px,0)', opacity: '1' },
          '25%':  { clipPath: 'inset(92% 0 1% 0)',  transform: 'translate(4px,0)' },
          '50%':  { clipPath: 'inset(43% 0 1% 0)',  transform: 'translate(0,0)' },
          '75%':  { clipPath: 'inset(25% 0 58% 0)', transform: 'translate(-4px,0)' },
          '90%':  { clipPath: 'inset(58% 0 43% 0)', transform: 'translate(0,0)' },
          '100%': { clipPath: 'inset(0 0 100% 0)',  transform: 'translate(0,0)', opacity: '0' },
        },
        glitch2: {
          '0%':   { clipPath: 'inset(50% 0 30% 0)', transform: 'translate(4px,0)', opacity: '1' },
          '33%':  { clipPath: 'inset(10% 0 85% 0)', transform: 'translate(-4px,0)' },
          '66%':  { clipPath: 'inset(70% 0 5% 0)',  transform: 'translate(4px,0)' },
          '90%':  { clipPath: 'inset(30% 0 60% 0)', transform: 'translate(0,0)' },
          '100%': { clipPath: 'inset(0 0 100% 0)',  transform: 'translate(0,0)', opacity: '0' },
        },
        ticker: {
          '0%':   { transform: 'translateY(0)' },
          '33%':  { transform: 'translateY(-1.4rem)' },
          '66%':  { transform: 'translateY(-2.8rem)' },
          '100%': { transform: 'translateY(-2.8rem)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        pdot:    'pdot 2s infinite',
        glitch1: 'glitch1 .4s linear .25s 1 forwards',
        glitch2: 'glitch2 .4s linear .25s 1 forwards',
        ticker:  'ticker 9s steps(1) infinite',
        marquee: 'marquee 24s linear infinite',
        blink:   'blink .75s step-end infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}

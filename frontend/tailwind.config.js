/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0faf0',
          100: '#d9f2d9',
          200: '#b3e5b3',
          300: '#7dcf7d',
          400: '#4db84d',
          500: '#2e9e2e',
          600: '#1e7d1e',
          700: '#166316',
          800: '#0f4e0f',
          900: '#083a08',
          950: '#041d04',
        },
        earth: {
          50:  '#fdf8f0',
          100: '#faeedd',
          200: '#f4d9b0',
          300: '#ecbf7a',
          400: '#e29f44',
          500: '#d4851f',
          600: '#b86d15',
          700: '#925514',
          800: '#764316',
          900: '#623916',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'leaf-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232e9e2e' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':     'fadeIn 0.5s ease-out',
        'slide-up':    'slideUp 0.4s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
        'pulse-green': 'pulseGreen 2s infinite',
      },
      keyframes: {
        fadeIn:     { from: { opacity: '0' },                         to: { opacity: '1' } },
        slideUp:    { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideRight: { from: { opacity: '0', transform: 'translateX(-20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulseGreen: { '0%,100%': { boxShadow: '0 0 0 0 rgba(46,158,46,0.4)' }, '50%': { boxShadow: '0 0 0 10px rgba(46,158,46,0)' } },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.12)',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.16)',
        'green': '0 4px 24px rgba(46,158,46,0.3)',
      },
    },
  },
  plugins: [],
};

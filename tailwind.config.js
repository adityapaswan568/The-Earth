/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-ocean': '#06182B',
        'abyss': '#030D18',
        'atmosphere': '#5BB0F0',
        'cloud': '#EAF1F6',
        'mist': '#9FB4C6',
        'continent': '#C9A45C',
        'canopy': '#4E9A6B',
        'glass': 'rgba(234, 241, 246, 0.06)',
        'glass-border': 'rgba(234, 241, 246, 0.14)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['"Instrument Sans"', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}


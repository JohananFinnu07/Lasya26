/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#150c0d',
        forest: '#1f1315',
        moss: '#2a1a1c',
        pine: '#301f20',
        teal: '#251719',
        deep: '#2a1a1b',
        gold: '#C9A24D',
        goldsoft: '#E8CB86',
        goldmuted: '#9C7A33',
        cream: '#F3EBDD',
        ivory: '#F8F1E3',
        sage: '#D8B4A0',
        olive: '#8E3B46',
        leaf: '#6B2D2D',
        bud: '#FFF8EA',
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['Allura', 'cursive'],
      },
    },
  },
  plugins: [],
}

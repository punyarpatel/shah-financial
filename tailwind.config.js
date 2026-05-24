/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0d2545',
        gold: '#c9922a',
        goldLight: '#f0c96a',
        cream: '#faf8f4',
        textDark: '#1a1a2e',
        muted: '#5c6478',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-y': {
          from: { transform: 'rotateY(0deg)' },
          to: { transform: 'rotateY(-360deg)' }
        }
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'spin-y': 'spin-y 20s linear infinite'
      }
    },
  },
  plugins: [],
}

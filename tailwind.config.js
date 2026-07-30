/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: 'rgb(var(--color-navy) / <alpha-value>)',
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        goldLight: 'rgb(var(--color-gold-light) / <alpha-value>)',
        cream: 'rgb(var(--color-cream) / <alpha-value>)',
        textDark: 'rgb(var(--color-text-dark) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
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
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'spin-y': 'spin-y 20s linear infinite',
        float: 'float 2.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

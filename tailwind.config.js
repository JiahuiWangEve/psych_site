/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#49703B',
        secondary: '#d6e9dc',
        cream: '#f8f8f4',
        muted: '#e8f0eb',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      backdropBlur: {
        'xl': '20px',
      }
    },
  },
  plugins: [],
}

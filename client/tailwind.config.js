/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617', // Deep Dark
          900: '#0f172a', // Card Dark
        },
        emerald: {
          400: '#34d399', // Neon accents
        }
      },
    },
  },
  plugins: [],
}

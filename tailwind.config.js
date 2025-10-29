/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gofast: {
          blue: '#0ea5e9', // sky-500
          orange: '#ff6600',
          'sky-blue': '#0ea5e9',
        },
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Isso garante que ele olhe dentro de src
  ],
  theme: {
    extend: {
      colors: {
        neonPurple: "#a855f7",
      },
    },
  },
  plugins: [],
}
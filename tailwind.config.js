/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B0F222",
        secondary: "#C3F25E",
        background1: "#f2f1df",
        background2: "#f2f2f2",
        dark: "#0D0D0D",
      },
    },
  },
  plugins: [],
}

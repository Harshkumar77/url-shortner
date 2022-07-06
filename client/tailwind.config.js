const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#E94560",
      secondary: "#0F3460",
      filler: "#1A1A2E",
      ...colors
    },
    extend: {},
  },

  plugins: [],
}

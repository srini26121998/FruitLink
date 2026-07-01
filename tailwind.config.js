/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        primary: "#32C36C",  // FruitLink green
        accent: "#E91E63",   // FruitLink pink
      },
      fontFamily: {
        sans: ['"Lexend Deca"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


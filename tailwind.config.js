/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "ui-sans-serif", "system-ui"],
      serif: ["Bodoni Moda", "ui-serif"],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

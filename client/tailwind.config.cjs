/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        fontFamily: {
            'inter': ['Inter', 'sans-serif'],
        },
        colors: {
            'primary': '#3a3f43',
            'greyed': '#444D5B',
            'btn-primary': '#1E9645',
            'btn-primary-dark': '#1b874a',
            'btn-secondary': '#242E29',
            'btn-secondary-dark': '#171717',
        }
    },
  },
  plugins: [],
});

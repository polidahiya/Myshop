/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or "media"
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust to your project structure
    "./app/**/*.{js,ts,jsx,tsx}", // adjust to your project structure
    "./lib/**/*.{js,ts,jsx,tsx}", // adjust to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper-white': '#FAFAFA',
        'dark-gray': '#1A1A1A',
        'pastel-blue': '#6BA4FF',
        'warm-yellow': '#F4D03F',
        'light-gray': '#EAEAEA',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'], // Updated to use Inter specifically
      },
    },
  },
  plugins: [],
};
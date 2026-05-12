/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: '#7890AA',
          dark: '#5f7a91',
          light: '#93a8be',
        },
        root: '#F7F9FA',
        accent: {
          DEFAULT: '#5B8DEF',
          dark: '#3A6FD8',
          light: '#8BB0F4',
        },
        success: '#34D399',
        warning: '#FBBF24',
        danger: '#F87171',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

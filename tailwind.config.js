/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'soft-blue': '#E6F0FF',
        'soft-green': '#ECFDF5',
        'soft-purple': '#F3E8FF'
      }
    },
  },
  plugins: [],
}

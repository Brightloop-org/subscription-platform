/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        odoo: {
          purple: '#714B67',
          dark: '#017E84',
          accent: '#00A09D',
          light: '#F8F9FA',
          border: '#E2E8F0'
        }
      }
    },
  },
  plugins: [],
}


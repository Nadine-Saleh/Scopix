/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        accent: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        background: '#F8FAFC',
        darkBg: '#0B1120',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}

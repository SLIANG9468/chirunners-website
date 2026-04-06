/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'chi-red': {
          DEFAULT: '#e11d48',
          hover: '#be123c',
          light: '#fff1f2',
          ring: '#fda4af',
        },
      },
      fontFamily: {
        history: [
          'system-ui',
          'Segoe UI',
          'PingFang SC',
          'Microsoft YaHei',
          'Noto Sans SC',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}

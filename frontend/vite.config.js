import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Same-origin /api and /media in dev so slideshows work without CORS issues.
// Backend: from backend/ run `python run.py` (default port 5001).
const devApiTarget = process.env.VITE_DEV_API_PROXY || 'http://127.0.0.1:5001'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: devApiTarget, changeOrigin: true },
      '/media': { target: devApiTarget, changeOrigin: true },
    },
  },
})

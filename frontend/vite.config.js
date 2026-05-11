import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On Render, `npm run build` must see VITE_API_BASE_URL (Blueprint wires it from the API service).
if (process.env.RENDER === 'true' && !(process.env.VITE_API_BASE_URL || '').trim()) {
  throw new Error(
    'Render static build: VITE_API_BASE_URL is missing. Set it to your API public URL (e.g. https://chirunners-api.onrender.com). In a Blueprint, use fromService → chirunners-api → RENDER_EXTERNAL_URL.',
  )
}

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

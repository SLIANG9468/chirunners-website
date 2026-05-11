/** Backend origin for `<img src>` and `fetch`. */
function resolveApiBase() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL
  if (fromEnv != null && String(fromEnv).trim() !== '') {
    return String(fromEnv).replace(/\/$/, '')
  }
  // Local `npm run dev`: use same origin so Vite proxies `/api` and `/media` → Flask.
  if (import.meta.env.DEV) {
    return ''
  }
  return 'http://localhost:5001'
}

const _apiBase = resolveApiBase()
if (import.meta.env.PROD && /localhost|127\.0\.0\.1/.test(_apiBase)) {
  // eslint-disable-next-line no-console -- intentional deploy misconfiguration hint
  console.error(
    '[ChiRunners] API base is localhost in a production bundle. Rebuild the static site with VITE_API_BASE_URL set to your Render API URL (e.g. https://…-api.onrender.com).',
  )
}

export const API_BASE_URL = _apiBase

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${p}`
}

/** Turn a server-relative URL (/api/...) into an absolute URL for <img src>. */
export function absMediaUrl(url) {
  if (url == null || url === '') return url
  if (typeof url === 'string' && url.startsWith('http')) return url
  const path = String(url).startsWith('/') ? String(url) : `/${url}`
  return `${API_BASE_URL}${path}`
}

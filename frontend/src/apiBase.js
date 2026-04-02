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

export const API_BASE_URL = resolveApiBase()

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

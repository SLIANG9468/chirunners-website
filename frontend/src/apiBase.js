/** Backend origin: set VITE_API_BASE_URL in production builds (e.g. Render static site). */
const raw = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

export const API_BASE_URL = raw.replace(/\/$/, '')

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

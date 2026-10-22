import { useEffect } from 'react'
import { Link } from 'react-router-dom'

/** Keeps a page out of search engines while it's mounted. */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
}

/** Amber strip shown on every /backup page so nobody mistakes it for a live page. */
export default function BackupReviewBanner({ showBackLink = true }) {
  useNoIndex()
  return (
    <div className="border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-900 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-100">
      内部存档 · 仅供审阅，不对外公开 — Internal backup, for review only
      {showBackLink ? (
        <>
          {' · '}
          <Link to="/backup" className="underline underline-offset-2">
            返回存档列表 / All backups
          </Link>
        </>
      ) : null}
    </div>
  )
}

import { useEffect } from 'react'

// Zeffy's iframe-specific embed URL (full ticketing URL disables purchases in desktop iframes).
const ZEFFY_SHOP_URL = 'https://www.zeffy.com/en-US/embed/ticketing/chi-running-clubs-shop'

export default function ChiStorePage({ copy }) {
  const store = copy.chiStore

  useEffect(() => {
    const previousTitle = document.title
    document.title = store.docTitle
    return () => {
      document.title = previousTitle
    }
  }, [store.docTitle])

  return (
    <main className="siteMain siteMain--chiStore">
      <iframe
        className="chiStoreFrame"
        src={ZEFFY_SHOP_URL}
        title={store.iframeTitle}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="payment *"
      />
    </main>
  )
}

import { useEffect } from 'react'

const ZEFFY_SHOP_URL = 'https://www.zeffy.com/en-US/ticketing/chi-running-clubs-shop'

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
      <p className="chiStoreSecureNote">{store.securePaymentNote}</p>
      <iframe
        className="chiStoreFrame"
        src={ZEFFY_SHOP_URL}
        title={store.iframeTitle}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </main>
  )
}

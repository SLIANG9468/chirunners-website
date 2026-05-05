import L, { divIcon } from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { absMediaUrl, apiUrl } from '../apiBase'

const redFlagIcon = divIcon({
  className: 'cityFlagIcon',
  html: '<span>🚩</span>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
})

function formatVisitDate(raw, language) {
  if (!raw || typeof raw !== 'string') return ''
  const trimmed = raw.trim()
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed)
  if (!m) return trimmed
  const y = Number(m[1])
  const mo = Number(m[2]) - 1
  const d = Number(m[3])
  const date = new Date(y, mo, d)
  if (Number.isNaN(date.getTime())) return trimmed
  return date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function CityPopup({ location, copy, language }) {
  const [photos, setPhotos] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadPhotos() {
      try {
        const response = await fetch(
          apiUrl(`/api/chi-has-been-here/locations/${location.id}/photos`),
        )
        if (!response.ok) {
          if (isMounted) {
            setError(copy.checkinsPopupNoPhotos)
            setIsLoading(false)
          }
          return
        }

        const data = await response.json()
        const loadedPhotos = (data.photos || []).map((item) => ({
          ...item,
          url: absMediaUrl(item.url),
        }))
        if (isMounted) {
          setPhotos(loadedPhotos)
          setCurrentIdx(0)
          setIsLoading(false)
        }
      } catch {
        if (isMounted) {
          setError(copy.checkinsPopupNoPhotos)
          setIsLoading(false)
        }
      }
    }

    loadPhotos()
    return () => {
      isMounted = false
    }
  }, [copy.checkinsPopupNoPhotos, location.id])

  useEffect(() => {
    if (photos.length <= 1) {
      return undefined
    }
    const timer = window.setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % photos.length)
    }, 3000)
    return () => window.clearInterval(timer)
  }, [photos])

  const currentPhoto = photos[currentIdx]
  const runnerName = currentPhoto ? String(currentPhoto.runnerName || '').trim() : ''
  const visitDate = currentPhoto ? formatVisitDate(currentPhoto.date, language) : ''
  const placeNote = currentPhoto ? String(currentPhoto.placeNote || '').trim() : ''

  const imageAlt = currentPhoto
    ? [location.city, runnerName, visitDate].filter(Boolean).join(' — ')
    : location.city

  return (
    <div className="cityPopup">
      <h3>{`${location.city}, ${location.country}`}</h3>

      {isLoading ? <p>{copy.checkinsPopupLoading}</p> : null}
      {!isLoading && error ? <p>{error}</p> : null}

      {!isLoading && !error && currentPhoto ? (
        <figure className="cityPhotoFigure">
          <div className="cityPhotoFrame">
            <img src={currentPhoto.url} alt={imageAlt} className="cityPopupImage" />
            <div className="cityPhotoOverlay" aria-hidden="true">
              <div className="cityPhotoOverlayName">{runnerName || copy.checkinsPhotoNoRunner}</div>
              {visitDate || placeNote ? (
                <div className="cityPhotoOverlayMeta">
                  {[visitDate, placeNote].filter(Boolean).join(copy.checkinsPhotoMetaSep)}
                </div>
              ) : null}
            </div>
          </div>
        </figure>
      ) : null}

      {!isLoading && !error && currentPhoto ? (
        <div className="popupControls">
          <button
            type="button"
            onClick={() => setCurrentIdx((prev) => (prev - 1 + photos.length) % photos.length)}
          >
            {copy.checkinsPopupPrev}
          </button>
          <span>{copy.checkinsPopupCounter(currentIdx + 1, photos.length)}</span>
          <button type="button" onClick={() => setCurrentIdx((prev) => (prev + 1) % photos.length)}>
            {copy.checkinsPopupNext}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default function ChiHasBeenHerePage({ copy, language }) {
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLocations() {
      try {
        const response = await fetch(apiUrl('/api/chi-has-been-here/locations'))
        if (!response.ok) {
          setError(copy.checkinsMapError)
          setIsLoading(false)
          return
        }
        const data = await response.json()
        setLocations(data.locations || [])
        setIsLoading(false)
      } catch {
        setError(copy.checkinsMapError)
        setIsLoading(false)
      }
    }

    loadLocations()
  }, [copy.checkinsMapError])

  const mapCenter = useMemo(() => [20, 0], [])

  return (
    <main className="siteMain">
      <section className="section">
        <h2>{copy.checkinsTitle}</h2>
        <p className="muted">{copy.checkinsSubtitle}</p>
        {isLoading ? <p>{copy.checkinsLoading}</p> : null}
        {!isLoading && error ? <p className="errorText">{error}</p> : null}
        {!isLoading && !error && locations.length === 0 ? <p>{copy.checkinsNoData}</p> : null}
        {!isLoading && !error && locations.length > 0 ? (
          <div className="mapWrapper">
            <MapContainer center={mapCenter} zoom={2} scrollWheelZoom>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={redFlagIcon}
                >
                  <Popup
                    className="chiVisitPopup"
                    minWidth={300}
                    maxWidth={520}
                    autoPan
                    autoPanPaddingTopLeft={L.point(16, 120)}
                    autoPanPaddingBottomRight={L.point(16, 88)}
                  >
                    <CityPopup location={location} copy={copy} language={language} />
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        ) : null}
        <div className="checkinsIntro" lang={language === 'zh' ? 'zh-CN' : 'en'}>
          {copy.checkinsIntroLines.map((line, idx) => (
            <p
              key={idx}
              className={
                idx === copy.checkinsIntroLines.length - 1 ? 'checkinsIntroTagline' : undefined
              }
            >
              {line}
            </p>
          ))}
        </div>
      </section>
    </main>
  )
}

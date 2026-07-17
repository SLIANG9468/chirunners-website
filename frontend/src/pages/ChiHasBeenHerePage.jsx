import L, { divIcon } from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { absMediaUrl, apiUrl } from '../apiBase'

/** Greater Chicago — club home base (not from check-in API). */
const CLUB_HOME = { lat: 41.8781, lng: -87.6298 }

const redFlagIcon = divIcon({
  className: 'cityFlagIcon',
  html: '<span>🚩</span>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
})

/** Same artwork as site favicon / hero mini flags (backend/photos/favicon.jpg → public). */
const CHI_CLUB_FLAG_SRC = '/favicon.jpg'

const clubBaseIcon = divIcon({
  className: 'clubBaseIcon',
  html:
    '<div class="chiRealFlag" aria-hidden="true">' +
    '<div class="chiRealFlag__pole"></div>' +
    '<div class="chiRealFlag__fabric">' +
    `<img src="${CHI_CLUB_FLAG_SRC}" alt="" width="20" height="20" decoding="async" />` +
    '<span class="chiRealFlag__wave"></span>' +
    '</div>' +
    '</div>',
  iconSize: [26, 30],
  iconAnchor: [7, 30],
})

function pickLocalized(enRaw, zhRaw, language) {
  const en = typeof enRaw === 'string' ? enRaw.trim() : ''
  const zh = typeof zhRaw === 'string' ? zhRaw.trim() : ''
  if (language === 'zh') return zh || en
  return en || zh
}

function locationCityCountry(location, language) {
  const city = pickLocalized(location.city, location.cityZh, language)
  const country = pickLocalized(location.country, location.countryZh, language)
  if (language === 'zh') {
    if (country && city) return `${country}，${city}`
    return country || city
  }
  if (city && country) return `${city}, ${country}`
  return city || country
}

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

function formatVisitYearOnly(raw, language) {
  if (!raw || typeof raw !== 'string') return ''
  const m = /^(\d{4})/.exec(raw.trim())
  if (!m) return ''
  const y = Number(m[1])
  if (language === 'zh') return `${y}年`
  return String(y)
}

function isChicagoHomeCity(location) {
  const city = (location?.city || '').trim().toLowerCase()
  const country = (location?.country || '').trim().toLowerCase()
  return (
    city === 'chicago' &&
    (country === 'united states' || country === 'usa' || country === 'u.s.' || country === 'us')
  )
}

const visitPopupLayout = {
  className: 'chiVisitPopup',
  minWidth: 320,
  maxWidth: 720,
  autoPan: true,
  autoPanPaddingTopLeft: L.point(16, 120),
  autoPanPaddingBottomRight: L.point(16, 88),
}

function CityPopup({ location, copy, language, popupKind = 'checkin' }) {
  const isHome = popupKind === 'home'
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
        const raw = data.photos || []
        const loadedPhotos = raw
          .map((item) => ({
            ...item,
            url: absMediaUrl(item.url),
          }))
          .filter((item) => Boolean(item.url))
        if (isMounted) {
          if (raw.length === 0) {
            setError(copy.checkinsPopupNoPhotos)
          } else if (loadedPhotos.length === 0) {
            const hint = data.imageUrlHint
            if (hint === 'missing_nickname') {
              setError(copy.checkinsPopupNoSmugNickname)
            } else if (hint === 'missing_smugmug_keys') {
              setError(copy.checkinsPopupNoSmugKeys)
            } else {
              setError(copy.checkinsPopupNoImageUrl)
            }
          } else {
            setError('')
          }
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
  }, [
    copy.checkinsPopupNoPhotos,
    copy.checkinsPopupNoImageUrl,
    copy.checkinsPopupNoSmugNickname,
    copy.checkinsPopupNoSmugKeys,
    location.id,
  ])

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
  const runnerName =
    currentPhoto != null
      ? pickLocalized(
          currentPhoto.runnerNameEn ?? currentPhoto.runnerName,
          currentPhoto.runnerNameZh ?? currentPhoto.runnerName,
          language,
        )
      : ''
  const visitDate = currentPhoto
    ? isHome
      ? formatVisitYearOnly(currentPhoto.date, language)
      : formatVisitDate(currentPhoto.date, language)
    : ''
  const placeNote =
    currentPhoto != null
      ? pickLocalized(
          currentPhoto.placeNoteEn ?? currentPhoto.placeNote,
          currentPhoto.placeNoteZh ?? currentPhoto.placeNote,
          language,
        )
      : ''

  const placeLine = locationCityCountry(location, language)
  const imageAlt = currentPhoto
    ? [
        isHome ? copy.checkinsClubBaseTitle : pickLocalized(location.city, location.cityZh, language),
        runnerName,
        visitDate,
      ]
        .filter(Boolean)
        .join(' — ')
    : isHome
      ? copy.checkinsClubBaseTitle
      : pickLocalized(location.city, location.cityZh, language)

  const overlayMetaParts = isHome
    ? [visitDate, placeNote].filter(Boolean)
    : [visitDate, placeNote].filter(Boolean)

  return (
    <div className="cityPopup">
      {isHome ? (
        <>
          <h3>{copy.checkinsClubBaseTitle}</h3>
          <p className="cityPopupHomeLead">{copy.checkinsClubBaseBody}</p>
        </>
      ) : (
        <h3>{placeLine}</h3>
      )}

      {isLoading ? <p>{copy.checkinsPopupLoading}</p> : null}
      {!isLoading && error ? <p>{error}</p> : null}

      {!isLoading && !error && currentPhoto ? (
        <figure className="cityPhotoFigure">
          <div className="cityPhotoFrame">
            <img src={currentPhoto.url} alt={imageAlt} className="cityPopupImage" />
            <div className="cityPhotoOverlay" aria-hidden="true">
              <div className="cityPhotoOverlayName">{runnerName || copy.checkinsPhotoNoRunner}</div>
              {overlayMetaParts.length > 0 ? (
                <div className="cityPhotoOverlayMeta">
                  {overlayMetaParts.join(copy.checkinsPhotoMetaSep)}
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

  const { clubHome, checkinLocations } = useMemo(() => {
    let home = null
    const checkins = []
    for (const loc of locations) {
      if (isChicagoHomeCity(loc)) {
        home = loc
      } else {
        checkins.push(loc)
      }
    }
    return { clubHome: home, checkinLocations: checkins }
  }, [locations])

  const homePosition =
    clubHome?.lat != null && clubHome?.lng != null
      ? [clubHome.lat, clubHome.lng]
      : [CLUB_HOME.lat, CLUB_HOME.lng]

  const showMap =
    !isLoading && !error && (checkinLocations.length > 0 || clubHome != null)

  return (
    <main className="siteMain">
      <section className="section">
        <h2>{copy.checkinsTitle}</h2>
        <p className="muted">{copy.checkinsSubtitle}</p>
        {isLoading ? <p>{copy.checkinsLoading}</p> : null}
        {!isLoading && error ? <p className="errorText">{error}</p> : null}
        {!isLoading && !error && locations.length === 0 ? <p>{copy.checkinsNoData}</p> : null}
        {showMap ? (
          <div className="mapWrapper">
            <MapContainer center={mapCenter} zoom={2} scrollWheelZoom>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={homePosition} icon={clubBaseIcon} zIndexOffset={1000}>
                <Popup {...visitPopupLayout}>
                  {clubHome ? (
                    <CityPopup
                      location={clubHome}
                      copy={copy}
                      language={language}
                      popupKind="home"
                    />
                  ) : (
                    <div className="cityPopup">
                      <h3>{copy.checkinsClubBaseTitle}</h3>
                      <p className="cityPopupHomeLead">{copy.checkinsClubBaseBody}</p>
                    </div>
                  )}
                </Popup>
              </Marker>
              {checkinLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={redFlagIcon}
                >
                  <Popup {...visitPopupLayout}>
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
        <div className="checkinsFaq" lang={language === 'zh' ? 'zh-CN' : 'en'}>
          <h3>{copy.checkinsFaqTitle}</h3>
          {copy.checkinsFaq.map((item) => (
            <details key={item.q} className="faqDetails">
              <summary>{item.q}</summary>
              <p>
                {item.a.split('admin@chirunners.org').map((part, idx, parts) => (
                  <span key={idx}>
                    {part}
                    {idx < parts.length - 1 ? (
                      <a href="mailto:admin@chirunners.org">admin@chirunners.org</a>
                    ) : null}
                  </span>
                ))}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}

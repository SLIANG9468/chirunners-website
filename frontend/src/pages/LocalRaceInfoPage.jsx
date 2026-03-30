import { useEffect, useState } from 'react'
import { absMediaUrl, apiUrl } from '../apiBase'
import { RACE_ROWS } from '../content/siteContent'

export default function LocalRaceInfoPage({ copy }) {
  const [photos, setPhotos] = useState([])
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0)
  const [photoVersion, setPhotoVersion] = useState(0)
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false)
  const [isRefreshingSharedOrder, setIsRefreshingSharedOrder] = useState(false)
  const [slideshowError, setSlideshowError] = useState('')

  useEffect(() => {
    if (!showSlideshow || photos.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % photos.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [showSlideshow, photos])

  useEffect(() => {
    if (!showSlideshow) {
      return undefined
    }

    const syncTimer = window.setInterval(async () => {
      try {
        const response = await fetch(apiUrl('/api/all-community-events/photos'))
        if (!response.ok) {
          return
        }

        const data = await response.json()
        if (!data.version || data.version === photoVersion) {
          return
        }

        const syncedPhotos = (data.photos || []).map((url) => absMediaUrl(url))
        setPhotos(syncedPhotos)
        setCurrentPhotoIdx(0)
        setPhotoVersion(data.version)
      } catch {
        // Ignore transient sync errors and retry on next interval.
      }
    }, 5000)

    return () => window.clearInterval(syncTimer)
  }, [showSlideshow, photoVersion])

  async function openAllCommunityEventsSlideshow() {
    setIsLoadingPhotos(true)
    setSlideshowError('')

    try {
      const response = await fetch(apiUrl('/api/all-community-events/photos'))
      if (!response.ok) {
        setSlideshowError(copy.slideshow.failedLoad(response.status))
        return
      }

      const data = await response.json()
      const loadedPhotos = (data.photos || []).map((url) => absMediaUrl(url))

      if (loadedPhotos.length === 0) {
        setSlideshowError(copy.slideshow.noPhotos)
        setShowSlideshow(false)
        return
      }

      setPhotos(loadedPhotos)
      setCurrentPhotoIdx(0)
      setPhotoVersion(data.version || 0)
      setShowSlideshow(true)
    } catch {
      setSlideshowError(copy.slideshow.loadError)
    } finally {
      setIsLoadingPhotos(false)
    }
  }

  function showPreviousPhoto() {
    setCurrentPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length)
  }

  function showNextPhoto() {
    setCurrentPhotoIdx((prev) => (prev + 1) % photos.length)
  }

  async function refreshSharedSlideshowOrder() {
    setIsRefreshingSharedOrder(true)
    setSlideshowError('')

    try {
      const response = await fetch(apiUrl('/api/all-community-events/refresh'), {
        method: 'POST',
      })
      if (!response.ok) {
        setSlideshowError(copy.slideshow.failedRefresh(response.status))
        return
      }

      const data = await response.json()
      const refreshedPhotos = (data.photos || []).map((url) => absMediaUrl(url))
      setPhotos(refreshedPhotos)
      setCurrentPhotoIdx(0)
      setPhotoVersion(data.version || 0)
      setShowSlideshow(refreshedPhotos.length > 0)
    } catch {
      setSlideshowError(copy.slideshow.loadError)
    } finally {
      setIsRefreshingSharedOrder(false)
    }
  }

  return (
    <main className="siteMain">
      <section id="races" className="section">
        <h2>{copy.racesTitle}</h2>
        <p className="muted">{copy.racesSubtitle}</p>

        <table className="raceTable">
          <thead>
            <tr>
              <th>{copy.table.location}</th>
              <th>{copy.table.race}</th>
              <th>{copy.table.website}</th>
            </tr>
          </thead>
          <tbody>
            <tr key="all-community-events">
              <td>
                <button
                  type="button"
                  className="linkButton"
                  onClick={openAllCommunityEventsSlideshow}
                  disabled={isLoadingPhotos}
                >
                  {isLoadingPhotos
                    ? copy.table.allCommunityEventsLoading
                    : copy.table.allCommunityEventsButton}
                </button>
              </td>
              <td>{RACE_ROWS[0].race}</td>
              <td>
                <a href={RACE_ROWS[0].website} target="_blank" rel="noreferrer">
                  {copy.table.officialSite}
                </a>
              </td>
            </tr>
            {(slideshowError || (showSlideshow && photos.length > 0)) && (
              <tr className="slideshowRow">
                <td colSpan={3}>
                  {slideshowError ? <p className="errorText">{slideshowError}</p> : null}

                  {showSlideshow && photos.length > 0 ? (
                    <div className="slideshowBox">
                      <img
                        src={photos[currentPhotoIdx]}
                        alt={`All Community Events slideshow ${currentPhotoIdx + 1}`}
                        className="slideshowImage"
                      />
                      <div className="slideshowControls">
                        <button type="button" onClick={showPreviousPhoto}>
                          {copy.slideshow.prev}
                        </button>
                        <span>{copy.slideshow.counter(currentPhotoIdx + 1, photos.length)}</span>
                        <button type="button" onClick={showNextPhoto}>
                          {copy.slideshow.next}
                        </button>
                        <button
                          type="button"
                          onClick={refreshSharedSlideshowOrder}
                          disabled={isRefreshingSharedOrder}
                        >
                          {isRefreshingSharedOrder
                            ? copy.slideshow.refreshing
                            : copy.slideshow.refresh}
                        </button>
                        <button type="button" onClick={() => setShowSlideshow(false)}>
                          {copy.slideshow.close}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </td>
              </tr>
            )}
            {RACE_ROWS.slice(1).map((row) => (
              <tr key={`${row.location}-${row.race}`}>
                <td>{row.location}</td>
                <td>{row.race}</td>
                <td>
                  <a href={row.website} target="_blank" rel="noreferrer">
                    {copy.table.officialSite}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}


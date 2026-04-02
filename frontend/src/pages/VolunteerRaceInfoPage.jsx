import { Fragment, useEffect, useState } from 'react'
import { absMediaUrl, apiUrl } from '../apiBase'
import { VOLUNTEER_RACE_ROWS } from '../content/siteContent'

function formatRaceDate(isoDate, locale) {
  try {
    const d = new Date(`${isoDate}T12:00:00`)
    const datePart = d.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    const weekdayPart = d.toLocaleDateString(locale, { weekday: 'short' })
    return `${datePart} ${weekdayPart}`
  } catch {
    return isoDate
  }
}

function volunteerRowKey(row) {
  return `${row.date}-${row.race}`
}

/** Optional `raceZh` on a row overrides `race` when language is Chinese. */
function volunteerRaceDisplayName(row, language) {
  return language === 'zh' && row.raceZh ? row.raceZh : row.race
}

export default function VolunteerRaceInfoPage({ copy, language }) {
  const locale = language === 'zh' ? 'zh-CN' : 'en-US'

  const [active, setActive] = useState(null)
  const [photos, setPhotos] = useState([])
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0)
  const [photoVersion, setPhotoVersion] = useState(0)
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false)
  const [isRefreshingSharedOrder, setIsRefreshingSharedOrder] = useState(false)
  const [slideshowError, setSlideshowError] = useState('')

  const showSlideshowPanel =
    active != null && (isLoadingPhotos || slideshowError !== '' || photos.length > 0)

  useEffect(() => {
    if (!active || !showSlideshowPanel || photos.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % photos.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [active, showSlideshowPanel, photos])

  useEffect(() => {
    if (!active || !showSlideshowPanel || photos.length <= 1) {
      return undefined
    }

    const syncTimer = window.setInterval(async () => {
      try {
        const response = await fetch(
          apiUrl(`/api/volunteer-race-albums/${encodeURIComponent(active.albumId)}/photos`),
        )
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
  }, [active, showSlideshowPanel, photoVersion, photos.length])

  async function openRaceAlbumSlideshow(row) {
    const rowKey = volunteerRowKey(row)
    const albumId = row.photoAlbumId
    if (!albumId) {
      return
    }

    if (active?.rowKey === rowKey && photos.length > 0 && !isLoadingPhotos && !slideshowError) {
      setActive(null)
      setPhotos([])
      setCurrentPhotoIdx(0)
      setPhotoVersion(0)
      setSlideshowError('')
      return
    }

    setIsLoadingPhotos(true)
    setSlideshowError('')
    setActive({ rowKey, albumId, raceLabel: volunteerRaceDisplayName(row, language) })
    setPhotos([])
    setCurrentPhotoIdx(0)
    setPhotoVersion(0)

    try {
      const response = await fetch(
        apiUrl(`/api/volunteer-race-albums/${encodeURIComponent(albumId)}/photos`),
      )
      if (!response.ok) {
        setSlideshowError(copy.slideshow.failedLoad(response.status))
        return
      }

      const data = await response.json()
      const loadedPhotos = (data.photos || []).map((url) => absMediaUrl(url))

      if (loadedPhotos.length === 0) {
        setSlideshowError(copy.slideshow.noPhotos)
        return
      }

      setPhotos(loadedPhotos)
      setPhotoVersion(data.version || 0)
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
    if (!active) {
      return
    }

    setIsRefreshingSharedOrder(true)
    setSlideshowError('')

    try {
      const response = await fetch(
        apiUrl(`/api/volunteer-race-albums/${encodeURIComponent(active.albumId)}/refresh`),
        { method: 'POST' },
      )
      if (!response.ok) {
        setSlideshowError(copy.slideshow.failedRefresh(response.status))
        return
      }

      const data = await response.json()
      const refreshedPhotos = (data.photos || []).map((url) => absMediaUrl(url))
      setPhotos(refreshedPhotos)
      setCurrentPhotoIdx(0)
      setPhotoVersion(data.version || 0)
    } catch {
      setSlideshowError(copy.slideshow.loadError)
    } finally {
      setIsRefreshingSharedOrder(false)
    }
  }

  function closeSlideshow() {
    setActive(null)
    setPhotos([])
    setCurrentPhotoIdx(0)
    setPhotoVersion(0)
    setSlideshowError('')
  }

  return (
    <main className="siteMain">
      <section id="race-volunteer" className="section">
        <h2>{copy.volunteerRacesTitle}</h2>
        <p className="muted">{copy.volunteerRacesSubtitle}</p>

        <table className="raceTable raceTable--volunteer">
          <thead>
            <tr>
              <th>{copy.volunteerTable.date}</th>
              <th>{copy.volunteerTable.location}</th>
              <th>{copy.volunteerTable.race}</th>
              <th>{copy.volunteerTable.website}</th>
              <th>{copy.volunteerTable.volunteerColumn}</th>
            </tr>
          </thead>
          <tbody>
            {VOLUNTEER_RACE_ROWS.map((row) => {
              const rk = volunteerRowKey(row)
              const hasAlbum = Boolean(row.photoAlbumId)
              const panelForRow = active?.rowKey === rk && showSlideshowPanel

              return (
                <Fragment key={rk}>
                  <tr>
                    <td>{formatRaceDate(row.date, locale)}</td>
                    <td>{row.location}</td>
                    <td>
                      {hasAlbum ? (
                        <button
                          type="button"
                          className="linkButton"
                          onClick={() => openRaceAlbumSlideshow(row)}
                          disabled={isLoadingPhotos && active?.rowKey === rk}
                          aria-label={copy.volunteerTable.racePhotoSlideshowAria(
                            volunteerRaceDisplayName(row, language),
                          )}
                        >
                          {isLoadingPhotos && active?.rowKey === rk
                            ? copy.volunteerTable.albumPhotosLoading
                            : volunteerRaceDisplayName(row, language)}
                        </button>
                      ) : (
                        volunteerRaceDisplayName(row, language)
                      )}
                    </td>
                    <td>
                      {row.website ? (
                        <a href={row.website} target="_blank" rel="noreferrer">
                          {copy.volunteerTable.officialSite}
                        </a>
                      ) : null}
                    </td>
                    <td>
                      {row.volunteerCellLabel !== undefined
                        ? row.volunteerCellLabel
                        : copy.volunteerTable.volunteerCellLabel}
                    </td>
                  </tr>
                  {panelForRow ? (
                    <tr className="slideshowRow">
                      <td colSpan={5}>
                        {isLoadingPhotos && !slideshowError && photos.length === 0 ? (
                          <p className="muted">{copy.volunteerTable.albumPhotosLoading}</p>
                        ) : null}
                        {slideshowError ? <p className="errorText">{slideshowError}</p> : null}

                        {!slideshowError && photos.length > 0 ? (
                          <div className="slideshowBox">
                            <img
                              src={photos[currentPhotoIdx]}
                              alt={`${active.raceLabel} — ${copy.slideshow.counter(
                                currentPhotoIdx + 1,
                                photos.length,
                              )}`}
                              className="slideshowImage"
                            />
                            <div className="slideshowControls">
                              <button type="button" onClick={showPreviousPhoto}>
                                {copy.slideshow.prev}
                              </button>
                              <span>
                                {copy.slideshow.counter(currentPhotoIdx + 1, photos.length)}
                              </span>
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
                              <button type="button" onClick={closeSlideshow}>
                                {copy.slideshow.close}
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </section>
    </main>
  )
}

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

/** Shared slideshow body for desktop (table row) and mobile (below card). */
function RaceAlbumSlideshow({
  copy,
  raceLabel,
  isLoadingPhotos,
  slideshowError,
  photos,
  currentPhotoIdx,
  showPreviousPhoto,
  showNextPhoto,
  refreshSharedSlideshowOrder,
  closeSlideshow,
  isRefreshingSharedOrder,
}) {
  return (
    <>
      {isLoadingPhotos && !slideshowError && photos.length === 0 ? (
        <p className="muted">{copy.volunteerTable.albumPhotosLoading}</p>
      ) : null}
      {slideshowError ? <p className="errorText">{slideshowError}</p> : null}

      {!slideshowError && photos.length > 0 ? (
        <div className="slideshowBox">
          <img
            src={photos[currentPhotoIdx]}
            alt={`${raceLabel} — ${copy.slideshow.counter(currentPhotoIdx + 1, photos.length)}`}
            className="slideshowImage"
          />
          <div className="slideshowControls volunteerSlideshowControls">
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
              {isRefreshingSharedOrder ? copy.slideshow.refreshing : copy.slideshow.refresh}
            </button>
            <button type="button" onClick={closeSlideshow}>
              {copy.slideshow.close}
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}

const mobileFieldClass =
  'text-xs font-semibold uppercase tracking-wide text-chi-red dark:text-chi-red-light'
const mobileDdClass = 'mt-1 text-sm leading-relaxed text-neutral-800 dark:text-neutral-200'
const mobileCardClass =
  'rounded-xl border border-neutral-200/80 bg-white/70 p-4 shadow-sm dark:border-neutral-600/60 dark:bg-neutral-900/45 sm:p-5'

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

  const slideshowProps = {
    copy,
    isLoadingPhotos,
    slideshowError,
    photos,
    currentPhotoIdx,
    showPreviousPhoto,
    showNextPhoto,
    refreshSharedSlideshowOrder,
    closeSlideshow,
    isRefreshingSharedOrder,
  }

  function renderRaceNameCell(row, rk, hasAlbum, options) {
    const { mobile } = options
    const displayName = volunteerRaceDisplayName(row, language)
    if (!hasAlbum) {
      return mobile ? (
        <p className="text-base font-semibold leading-snug text-neutral-900 dark:text-neutral-100">
          {displayName}
        </p>
      ) : (
        displayName
      )
    }
    if (mobile) {
      return (
        <button
          type="button"
          className="min-h-[44px] w-full rounded-lg px-1 py-2 text-left text-base font-semibold text-chi-red underline decoration-chi-red/50 underline-offset-4 hover:text-chi-red-hover disabled:opacity-60 dark:text-chi-red-light"
          onClick={() => openRaceAlbumSlideshow(row)}
          disabled={isLoadingPhotos && active?.rowKey === rk}
          aria-label={copy.volunteerTable.racePhotoSlideshowAria(displayName)}
        >
          {isLoadingPhotos && active?.rowKey === rk
            ? copy.volunteerTable.albumPhotosLoading
            : displayName}
        </button>
      )
    }
    return (
      <button
        type="button"
        className="linkButton"
        onClick={() => openRaceAlbumSlideshow(row)}
        disabled={isLoadingPhotos && active?.rowKey === rk}
        aria-label={copy.volunteerTable.racePhotoSlideshowAria(displayName)}
      >
        {isLoadingPhotos && active?.rowKey === rk
          ? copy.volunteerTable.albumPhotosLoading
          : displayName}
      </button>
    )
  }

  return (
    <main className="siteMain">
      <section id="race-volunteer" className="section">
        <div className="mx-auto max-w-3xl text-left lg:max-w-[min(100%,72rem)]">
          <h2>{copy.volunteerRacesTitle}</h2>
          <p className="muted">{copy.volunteerRacesSubtitle}</p>

          {/* Below lg: phones & portrait tablets — stacked cards (transport-style) */}
          <div className="mt-6 flex flex-col gap-4 lg:hidden" aria-label={copy.volunteerRacesTitle}>
            {VOLUNTEER_RACE_ROWS.map((row) => {
              const rk = volunteerRowKey(row)
              const hasAlbum = Boolean(row.photoAlbumId)
              const panelForRow = active?.rowKey === rk && showSlideshowPanel
              const volunteerText =
                row.volunteerCellLabel !== undefined
                  ? row.volunteerCellLabel
                  : copy.volunteerTable.volunteerCellLabel

              return (
                <Fragment key={rk}>
                  <article
                    className={mobileCardClass}
                    aria-label={`${volunteerRaceDisplayName(row, language)}, ${formatRaceDate(row.date, locale)}`}
                  >
                    <div className="space-y-4">
                      <div>
                        <p className={mobileFieldClass}>{copy.volunteerTable.date}</p>
                        <p className={`${mobileDdClass} font-medium`}>
                          {formatRaceDate(row.date, locale)}
                        </p>
                      </div>
                      <div>
                        <p className={mobileFieldClass}>{copy.volunteerTable.location}</p>
                        <p className={mobileDdClass}>{row.location}</p>
                      </div>
                      <div>
                        <p className={mobileFieldClass}>{copy.volunteerTable.race}</p>
                        <div className={mobileDdClass}>{renderRaceNameCell(row, rk, hasAlbum, { mobile: true })}</div>
                      </div>
                      <div>
                        <p className={mobileFieldClass}>{copy.volunteerTable.website}</p>
                        <div className="mt-1">
                          {row.website ? (
                            <a
                              href={row.website}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-chi-red/40 bg-white px-4 py-2.5 text-center text-sm font-semibold text-chi-red shadow-sm transition-colors hover:bg-chi-red/5 dark:border-chi-red/50 dark:bg-neutral-900 dark:hover:bg-chi-red/10"
                            >
                              {copy.volunteerTable.officialSite}
                            </a>
                          ) : (
                            <span className="text-sm text-neutral-500 dark:text-neutral-500">—</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className={mobileFieldClass}>{copy.volunteerTable.volunteerColumn}</p>
                        <div
                          className="mt-1 flex min-h-[44px] items-center rounded-lg bg-chi-red/10 px-3 py-2.5 text-center text-sm font-semibold text-chi-red dark:bg-chi-red/15 dark:text-chi-red-light"
                          role="status"
                        >
                          {volunteerText}
                        </div>
                      </div>
                    </div>
                  </article>

                  {panelForRow ? (
                    <div
                      className="rounded-xl border border-neutral-200/90 bg-neutral-50/90 p-4 dark:border-neutral-600/70 dark:bg-neutral-900/55 sm:p-5"
                      aria-live="polite"
                    >
                      <RaceAlbumSlideshow
                        {...slideshowProps}
                        raceLabel={volunteerRaceDisplayName(row, language)}
                      />
                    </div>
                  ) : null}
                </Fragment>
              )
            })}
          </div>

          {/* lg+: wide screens — table layout */}
          <div className="mt-4 hidden lg:block">
            <div className="w-full overflow-x-auto">
              <table className="raceTable raceTable--volunteer min-w-[640px]">
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
                          <td>{renderRaceNameCell(row, rk, hasAlbum, { mobile: false })}</td>
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
                              <RaceAlbumSlideshow
                                {...slideshowProps}
                                raceLabel={volunteerRaceDisplayName(row, language)}
                              />
                            </td>
                          </tr>
                        ) : null}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

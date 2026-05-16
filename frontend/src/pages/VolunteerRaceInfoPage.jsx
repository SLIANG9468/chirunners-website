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

/** Mobile card: label + value share text-sm; label bold, value regular (same type scale). */
const mobileLabelClass =
  'shrink-0 text-sm font-bold text-neutral-900 dark:text-neutral-100'
const mobileValueClass =
  'min-w-0 flex-1 text-sm font-normal leading-relaxed text-neutral-800 dark:text-neutral-200'
const mobileRowClass = 'flex flex-wrap items-baseline gap-x-2 gap-y-1'
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
        <span className={mobileValueClass}>{displayName}</span>
      ) : (
        displayName
      )
    }
    if (mobile) {
      return (
        <button
          type="button"
          className="max-w-full min-h-[44px] rounded-lg px-1 py-1 text-left text-sm font-bold text-chi-red underline decoration-chi-red/50 underline-offset-2 hover:text-chi-red-hover disabled:opacity-60 dark:text-chi-red-light"
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
                    <div className="space-y-3">
                      <div className={`${mobileRowClass} items-baseline`}>
                        <span className={mobileLabelClass}>{copy.volunteerTable.date}</span>
                        <span className={mobileValueClass}>{formatRaceDate(row.date, locale)}</span>
                      </div>
                      <div className={mobileRowClass}>
                        <span className={mobileLabelClass}>{copy.volunteerTable.location}</span>
                        <span className={mobileValueClass}>{row.location}</span>
                      </div>
                      <div className={`${mobileRowClass} items-center`}>
                        <span className={mobileLabelClass}>{copy.volunteerTable.race}</span>
                        <div className="min-w-0 flex-1">
                          {renderRaceNameCell(row, rk, hasAlbum, { mobile: true })}
                        </div>
                      </div>
                      <div className={`${mobileRowClass} items-center`}>
                        <span className={mobileLabelClass}>{copy.volunteerTable.website}</span>
                        {row.website ? (
                          <a
                            href={row.website}
                            target="_blank"
                            rel="noreferrer"
                            className={`${mobileValueClass} min-h-[44px] shrink-0 text-chi-red underline decoration-chi-red/70 underline-offset-2 hover:text-chi-red-hover dark:text-chi-red-light`}
                          >
                            {language === 'zh'
                              ? copy.volunteerTable.website
                              : copy.volunteerTable.officialSite}
                          </a>
                        ) : (
                          <span className="text-sm text-neutral-500 dark:text-neutral-500">—</span>
                        )}
                      </div>
                      <div className={`${mobileRowClass} items-center`}>
                        <span className={mobileLabelClass}>{copy.volunteerTable.volunteerColumn}</span>
                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-normal text-chi-red dark:text-chi-red-light"
                          title={volunteerText}
                        >
                          <span aria-hidden="true" className="select-none">
                            ✓
                          </span>
                          {language === 'zh' ? <span>义工</span> : <span>{volunteerText}</span>}
                        </span>
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

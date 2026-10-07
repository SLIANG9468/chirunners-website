import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../apiBase'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'

function NumberBadge({ number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-chi-red text-sm font-bold text-white">
      {number}
    </span>
  )
}

function SpotPhoto({ spot }) {
  if (!spot.photoSrc) return null
  return (
    <a href={apiUrl(spot.photoSrc)} target="_blank" rel="noopener noreferrer" className="mt-3 block">
      <img
        src={apiUrl(spot.photoSrc)}
        alt={spot.photoAlt}
        loading="lazy"
        decoding="async"
        className="w-full max-w-sm rounded-lg border border-neutral-200/80 shadow-sm dark:border-neutral-700"
      />
    </a>
  )
}

function MapFigure({ src, alt, caption, className = '' }) {
  return (
    <figure className={className}>
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full rounded-xl border border-neutral-200/80 shadow-sm dark:border-neutral-700"
        />
      </a>
      <figcaption className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">{caption}</figcaption>
    </figure>
  )
}

/** One card per spot: location, then each photographer with their assistant (blank assistant shows as TBD). */
function RosterLayout({ p }) {
  return (
    <>
      <section className="section !pt-0">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
          {p.spotsSectionTitle}
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {p.spots.map((spot) => (
            <li
              key={spot.number}
              className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40"
            >
              <div className="flex items-start gap-3">
                <NumberBadge number={spot.number} />
                <div className="min-w-0 pt-0.5">
                  <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{spot.location}</p>
                  {spot.note ? (
                    <p className="mt-0.5 whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-400">{spot.note}</p>
                  ) : null}
                </div>
              </div>
              {spot.team && spot.team.length > 0 ? (
                <ul className="mt-4 space-y-2 border-t border-neutral-200/70 pt-3 dark:border-neutral-700/60">
                  {spot.team.map((member) => (
                    <li key={member.name} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 sm:text-base">
                        📷 {member.name}
                      </span>
                      {member.assistant !== undefined ? (
                        <span
                          className={`text-xs sm:text-sm ${
                            member.assistant
                              ? 'text-neutral-600 dark:text-neutral-400'
                              : 'italic text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          {p.assistantLabel}
                          {member.assistant || p.assistantTbd}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
              <SpotPhoto spot={spot} />
            </li>
          ))}
        </ol>
      </section>

      <section className="section !pt-0">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
          {p.mapsSectionTitle}
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 sm:items-start">
          <MapFigure src={p.zoomMapSrc} alt={p.zoomMapAlt} caption={p.zoomMapCaption} />
          <MapFigure src={p.mapSrc} alt={p.mapAlt} caption={p.mapCaption} />
        </div>
      </section>
    </>
  )
}

function MapAndListLayout({ p }) {
  return (
    <>
      <section className="section !pt-0">
        <div className="rounded-2xl border border-chi-red/25 bg-gradient-to-br from-chi-red/10 via-transparent to-chi-red/5 p-6 shadow-card dark:border-chi-red/35 dark:from-chi-red/15 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-[minmax(0,300px)_1fr] sm:items-start">
            <MapFigure
              src={p.zoomMapSrc}
              alt={p.zoomMapAlt}
              caption={p.zoomMapCaption}
              className="mx-auto w-full max-w-[320px] sm:mx-0"
            />
            <ol className="space-y-4">
              {p.spots.map((spot) => (
                <li key={spot.number} className="flex gap-3">
                  <NumberBadge number={spot.number} />
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base">
                      {spot.label}
                    </p>
                    <SpotPhoto spot={spot} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <MapFigure src={p.mapSrc} alt={p.mapAlt} caption={p.mapCaption} className="mx-auto w-full max-w-md" />
      </section>
    </>
  )
}

/**
 * `contentKey` lets the unlinked draft page (photoSpotTempPage) reuse this page;
 * `noIndex` keeps that draft out of search engines. Content with `rosterLayout`
 * lists spots (with photographer assignments) before the maps.
 */
export default function ChicagoMarathonPhotoSpotPage({ copy, contentKey = 'photoSpotPage', noIndex = false }) {
  const mw = copy.marathonWelcome
  const p = mw[contentKey]

  useEffect(() => {
    if (!noIndex) return undefined
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [noIndex])

  return (
    <main className="siteMain siteMain--marathonWelcome">
      <div className="mx-auto max-w-4xl px-0 text-left">
        <section className="section">
          <Link
            to={CHICAGO_MARATHON_ROUTES.hub}
            className="inline-flex text-sm font-medium text-chi-red hover:text-chi-red-hover hover:underline"
          >
            {mw.backToHub}
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            {p.pageTitle}
          </h1>
          {p.pageTitleNote ? (
            <p className="mt-2 text-xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-2xl">{p.pageTitleNote}</p>
          ) : null}
          {p.pageIntro ? (
            <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">{p.pageIntro}</p>
          ) : null}
        </section>

        {p.rosterLayout ? <RosterLayout p={p} /> : <MapAndListLayout p={p} />}
      </div>
    </main>
  )
}

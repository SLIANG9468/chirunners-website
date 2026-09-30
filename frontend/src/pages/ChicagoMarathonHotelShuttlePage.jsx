import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import { apiUrl } from '../apiBase'

const iconClass = 'h-5 w-5 shrink-0 text-chi-red'

function IconShuttle() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 6h11a2 2 0 012 2v8h-2M8 18H5a2 2 0 01-2-2V8a2 2 0 012-2h1M8 6v12M18 16v2M6 16v2M8 10h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 015 6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Content uses `**bold**` for emphasis; render those runs as <strong>. */
function withBoldRuns(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
      {items.map((line) => (
        <li key={line}>{withBoldRuns(line)}</li>
      ))}
    </ul>
  )
}

export default function ChicagoMarathonHotelShuttlePage({ copy }) {
  const mw = copy.marathonWelcome
  const s = mw.hotelShuttlePage

  return (
    <main className="siteMain siteMain--marathonWelcome">
      <div className="mx-auto max-w-4xl px-0 text-left">
        <section className="section">
          <Link
            to={CHICAGO_MARATHON_ROUTES.hotel}
            className="inline-flex text-sm font-medium text-chi-red hover:text-chi-red-hover hover:underline"
          >
            {mw.backToHotel}
          </Link>
          <h1 className="mt-6 flex items-center gap-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            <IconShuttle />
            {s.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">{s.pageIntro}</p>
        </section>

        <section className="section !pt-0">
          <div className="rounded-2xl border border-chi-red/25 bg-gradient-to-br from-chi-red/10 via-transparent to-chi-red/5 p-6 shadow-card dark:border-chi-red/35 dark:from-chi-red/15 sm:p-8">
            <figure className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
              <img
                src={apiUrl(s.photoSrc)}
                alt={s.photoAlt}
                loading="lazy"
                decoding="async"
                className="mx-auto block h-auto w-full max-h-[min(60vh,480px)] object-cover"
              />
            </figure>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-chi-red dark:text-chi-red-light">
              {s.quickFactsTitle}
            </h2>
            <BulletList items={s.quickFacts} />

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-chi-red dark:text-chi-red-light">
              {s.pickupSectionTitle}
            </h3>
            <BulletList items={s.pickupBullets} />

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-chi-red dark:text-chi-red-light">
              {s.scheduleSectionTitle}
            </h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{s.scheduleNote}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {s.scheduleTimes.map((time) => (
                <div
                  key={time}
                  className="rounded-lg border border-neutral-200/70 bg-white/60 px-2 py-2 text-center text-sm font-medium text-neutral-800 dark:border-neutral-600/60 dark:bg-neutral-900/40 dark:text-neutral-200"
                >
                  {time}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-amber-300/70 bg-gradient-to-br from-amber-50/95 via-amber-50/40 to-transparent p-5 shadow-sm dark:border-amber-600/40 dark:from-amber-950/35 dark:via-amber-950/20 dark:to-transparent sm:p-6">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">{s.noticeTitle}</p>
              <BulletList items={s.noticeBullets} />
              {s.noticeHighlight ? (
                <p className="mt-4 rounded-lg border-2 border-chi-red bg-chi-red-light px-4 py-3 text-center text-sm font-bold text-chi-red dark:border-chi-red/60 dark:bg-chi-red/15 dark:text-chi-red-light sm:text-base">
                  {s.noticeHighlight}
                </p>
              ) : null}
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-900/40 sm:p-6">
              <h3 className="flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                <IconPhone />
                {s.trackingSectionTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{s.trackingBody}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${s.trackingPhone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center rounded-full border-2 border-chi-red px-4 py-2 text-sm font-semibold text-chi-red shadow-sm transition-colors hover:bg-chi-red-light dark:hover:bg-chi-red/10"
                >
                  {s.trackingPhone}
                </a>
                <a
                  href={s.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-chi-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-chi-red-hover"
                >
                  {s.trackingLinkLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'

const iconClass = 'h-5 w-5 shrink-0 text-chi-red'

function IconBuilding() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 21V8l8-4v17M4 21h16M4 21H2M20 21h2M12 21V12m0 0h4m-4 0H8m8 0v9m0-9h4M8 12H4v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IconBreakfast() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11h16v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8zM4 11V9a4 4 0 014-4h1M8 5h8M9 5V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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

function IconUndo() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7v6h6M21 17a9 9 0 00-15-6.7L3 13M21 17v-6h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconRun() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 22l4-7 3-1M9 15l-2 7M14 8l-2 4h4l3 3M10 12l-4-2 2-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AmenityRow({ icon, text }) {
  return (
    <li className="flex gap-3 text-left text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
      {createElement(icon)}
      <span>{text}</span>
    </li>
  )
}

export default function ChicagoMarathonHotelPage({ copy }) {
  const mw = copy.marathonWelcome
  const h = mw.hotelPage

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
            {h.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">{h.pageIntro}</p>
        </section>

        <section className="section !pt-0">
          <div className="rounded-2xl border border-chi-red/25 bg-gradient-to-br from-chi-red/10 via-transparent to-chi-red/5 p-6 shadow-card dark:border-chi-red/35 dark:from-chi-red/15 sm:p-8">
            {h.hotelSectionTitle ? (
              <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
                <IconBuilding />
                {h.hotelSectionTitle}
              </h2>
            ) : null}
            <p
              className={`text-lg font-medium text-neutral-900 dark:text-neutral-100 ${h.hotelSectionTitle ? 'mt-2' : ''}`}
            >
              {h.hotelName}
            </p>
            {h.hotelNameZh ? (
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{h.hotelNameZh}</p>
            ) : null}
            <div className="mt-4 flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <IconMapPin />
              <div>
                {h.hotelAddressLine1 ? <p>{h.hotelAddressLine1}</p> : null}
                <p className={h.hotelAddressLine1 ? 'mt-0.5 font-mono text-xs sm:text-sm' : 'font-mono text-xs sm:text-sm'}>
                  {h.hotelAddressLine2}
                </p>
              </div>
            </div>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-chi-red dark:text-chi-red-light">
              {h.hotelRatesTitle}
            </h3>
            <ul className="mt-3 space-y-2">
              {h.hotelRates.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200/70 bg-white/60 px-4 py-3 dark:border-neutral-600/60 dark:bg-neutral-900/40"
                >
                  <span className="text-neutral-800 dark:text-neutral-200">{r.label}</span>
                  <span className="font-semibold text-chi-red dark:text-chi-red-light">{r.value}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-8 space-y-3">
              <AmenityRow icon={IconBreakfast} text={h.amenityBreakfast} />
              <AmenityRow icon={IconShuttle} text={h.amenityAirportShuttle} />
              <AmenityRow icon={IconUndo} text={h.amenityCancellation} />
              <AmenityRow icon={IconRun} text={h.amenityRaceShuttle} />
            </ul>

            <div className="mt-10">
              <a
                href={h.hotelBookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-chi-red px-8 py-3 text-center text-base font-semibold text-white shadow-md transition-colors hover:bg-chi-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chi-red-ring sm:w-auto"
              >
                {h.ctaBook}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import MarathonBookingButtons from '../components/chicagoMarathon/MarathonBookingButtons'

const iconClass = 'h-5 w-5 shrink-0 text-chi-red'
const runnerIconClass = 'h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400'

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

function IconBreakfast({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function IconShuttle({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function IconWifi({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.55a11 11 0 0114.08 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconGym({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 4h2v16h-2M7.5 4h2v16h-2M5 9h14M5 15h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPool({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 17c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M10 8V5M14 8V5M10 5h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconLanguage({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconUndo({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function IconRun({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function IconDining({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10h16M8 10v9M16 10v9M4 19h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconSofa({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 13V11a2 2 0 012-2h12a2 2 0 012 2v2M4 13h16v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zM9 19v2M15 19v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconClock({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconEye({ className = iconClass }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function AmenityRow({ icon, text, iconClassName = iconClass }) {
  return (
    <li className="flex gap-3 text-left text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
      {createElement(icon, { className: iconClassName })}
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
              {h.hotelPerksTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{h.hotelPerksIntro}</p>
            <ul className="mt-4 space-y-3">
              <AmenityRow icon={IconBreakfast} text={h.amenityBreakfast} />
              <AmenityRow icon={IconWifi} text={h.amenityWifi} />
              <AmenityRow icon={IconGym} text={h.amenityGym} />
              <AmenityRow icon={IconPool} text={h.amenityPool} />
              <AmenityRow icon={IconLanguage} text={h.amenityMandarin} />
              <AmenityRow icon={IconShuttle} text={h.amenityAirportShuttle} />
              <AmenityRow icon={IconUndo} text={h.amenityCancellation} />
            </ul>

            <div className="mt-8 rounded-2xl border border-amber-300/70 bg-gradient-to-br from-amber-50/95 via-amber-50/40 to-transparent p-5 shadow-sm dark:border-amber-600/40 dark:from-amber-950/35 dark:via-amber-950/20 dark:to-transparent sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">
                {h.runnerPerksTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{h.runnerPerksIntro}</p>
              <ul className="mt-4 space-y-3">
                <AmenityRow icon={IconBreakfast} text={h.runnerPerkBreakfastBoost} iconClassName={runnerIconClass} />
                <AmenityRow icon={IconDining} text={h.runnerPerkDiningArea} iconClassName={runnerIconClass} />
                <AmenityRow icon={IconSofa} text={h.runnerPerkLounge} iconClassName={runnerIconClass} />
                <AmenityRow icon={IconRun} text={h.amenityRaceShuttle} iconClassName={runnerIconClass} />
                <AmenityRow icon={IconClock} text={h.runnerPerkLateCheckout} iconClassName={runnerIconClass} />
              </ul>
              <a
                href={h.flyerPdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-amber-600/50 bg-white/80 px-4 py-2.5 text-sm font-semibold text-amber-900 shadow-sm transition-colors hover:bg-amber-50 dark:border-amber-500/50 dark:bg-neutral-900/60 dark:text-amber-100 dark:hover:bg-amber-950/50 sm:w-auto"
              >
                <IconEye className={runnerIconClass} />
                {h.flyerViewLabel}
              </a>
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

            <div className="mt-10">
              <MarathonBookingButtons ctas={mw.bookingCtas} />
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-900/40 sm:p-6">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{h.wechatGroupTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{h.wechatGroupBody}</p>
              <div className="mt-5 flex justify-center sm:justify-start">
                <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-700 dark:bg-neutral-950">
                  <img
                    src={h.wechatGroupQrSrc}
                    alt={h.wechatGroupQrAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-[220px] max-w-full sm:w-[240px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

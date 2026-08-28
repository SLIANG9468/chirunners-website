import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import { apiUrl } from '../apiBase'

/** Reuse marathon hero asset until a dedicated image is added. */
const HERO_IMAGE_SRC = '/chicago-marathon/hero-1.jpg'

const iconClass = 'h-5 w-5 shrink-0 text-chi-red'

function IconCalendar() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
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
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
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

const INFO_ICONS = {
  calendar: IconCalendar,
  mapPin: IconMapPin,
}

function InfoRow({ icon, label, value }) {
  const I = INFO_ICONS[icon] || IconCalendar
  return (
    <div className="flex gap-4 rounded-xl border border-neutral-200/60 bg-white/50 px-4 py-3 dark:border-neutral-600/60 dark:bg-neutral-900/30">
      <I />
      <div className="min-w-0 flex-1 text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-neutral-900 dark:text-neutral-100 sm:text-base">
          {value}
        </p>
      </div>
    </div>
  )
}

function ShiftCard({ title, rows }) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40 sm:p-6">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
        {title}
      </h3>
      <div className="mt-4 grid gap-3">
        {rows.map((row) => (
          <InfoRow key={row.label} icon={row.icon} label={row.label} value={row.value} />
        ))}
      </div>
    </div>
  )
}

export default function ChicagoMarathonVolunteerPage({ copy }) {
  const mw = copy.marathonWelcome
  const p = mw.volunteerPage

  return (
    <main className="siteMain siteMain--marathonWelcome">
      <div className="mx-auto max-w-4xl px-0 text-left">
        <section className="section !mt-0 pt-0">
          <Link
            to={CHICAGO_MARATHON_ROUTES.hub}
            className="inline-flex text-sm font-medium text-chi-red hover:text-chi-red-hover hover:underline"
          >
            {mw.backToHub}
          </Link>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-neutral-200/80 shadow-card dark:border-neutral-700">
            <div className="relative aspect-[5/2] min-h-[200px] w-full max-h-[min(42vh,420px)]">
              <img
                src={HERO_IMAGE_SRC}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: 'center top' }}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15"
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                <h1 className="max-w-3xl font-semibold text-2xl tracking-tight text-white drop-shadow-sm sm:text-4xl">
                  {p.heroTitleLines.map((line, i) => (
                    <span key={i} className={i === 0 ? 'block' : 'mt-1 block sm:mt-2'}>
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">
                  {p.heroSubtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="rounded-2xl border border-neutral-200/80 bg-gradient-to-b from-neutral-100/95 to-neutral-50/80 px-5 py-8 shadow-card dark:border-neutral-700/80 dark:from-neutral-900/90 dark:to-neutral-950/70 sm:px-8 sm:py-10">
            <h2 className="text-center text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
              {p.introSectionTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-left text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
              {p.introBody}
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            <IconCalendar />
            {p.eventSectionTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {p.shifts.map((shift) => (
              <ShiftCard key={shift.title} title={shift.title} rows={shift.rows} />
            ))}
          </div>
        </section>

        <section className="section pb-2">
          <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-900/40 sm:p-6">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {p.wechatGroupTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {p.wechatGroupBody}
            </p>
            <div className="mt-5 flex justify-center sm:justify-start">
              <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-700 dark:bg-neutral-950">
                <img
                  src={apiUrl(p.wechatGroupQrSrc)}
                  alt={p.wechatGroupQrAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-[220px] max-w-full sm:w-[240px]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

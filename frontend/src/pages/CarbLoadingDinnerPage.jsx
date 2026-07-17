import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import MarathonBookingButtons from '../components/chicagoMarathon/MarathonBookingButtons'

/** Reuse marathon hero asset until a dedicated image is added. */
const HERO_IMAGE_SRC = '/chicago-marathon/hero-1.jpg'
const MENU_IMAGE_SRC = '/photo/new_menu.png'

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

function IconBanknote() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2"
        y="6"
        width="20"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
      <path d="M6 10h.01M6 14h.01M18 10h.01M18 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconTicket() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 9a2 2 0 012-2h14a2 2 0 012 2v1l-2 1v4l2 1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1l2-1v-4L3 10V9z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13 7v10" stroke="currentColor" strokeWidth="2" strokeDasharray="2 3" />
    </svg>
  )
}

function IconUtensils() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 3v9a3 3 0 003 3M6 3h3M6 3H5M9 15v6M15 3v18M15 3h3M15 3h-3M18 3v6a3 3 0 01-3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Four-lobe clover-style mark for benefit cards. */
function IconCloverBenefit() {
  return (
    <svg className="h-8 w-8 shrink-0 text-chi-red" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="6.5" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.8" cy="13.2" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="19.9" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6.2" cy="13.2" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="13.2" r="1.55" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

const INFO_ICONS = {
  calendar: IconCalendar,
  mapPin: IconMapPin,
  banknote: IconBanknote,
  ticket: IconTicket,
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

function BenefitCard({ text }) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-neutral-200/90 bg-white/70 px-5 py-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-chi-red/35 hover:bg-white/90 hover:shadow-lg dark:border-neutral-600/70 dark:bg-neutral-800/60 dark:hover:border-chi-red/40 dark:hover:bg-neutral-800/85">
      <div className="pt-0.5 transition-transform duration-200 group-hover:scale-105">
        <IconCloverBenefit />
      </div>
      <p className="min-w-0 flex-1 text-left text-sm font-medium leading-relaxed text-neutral-800 dark:text-neutral-100 sm:text-base">
        {text}
      </p>
    </div>
  )
}

export default function CarbLoadingDinnerPage({ copy, language }) {
  const mw = copy.marathonWelcome
  const p = mw.carbLoadingPage
  const isZh = language === 'zh'

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
                {isZh ? (
                  <div className="max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                    <h1 className="m-0 max-w-3xl p-0 text-inherit font-semibold leading-tight drop-shadow-sm">
                      {p.heroTitleLines.map((line, i) => (
                        <span key={i} className={i === 0 ? 'block' : 'mt-1 block sm:mt-1.5'}>
                          {line}
                        </span>
                      ))}
                    </h1>
                    <div className="mt-3 max-w-2xl pl-[calc(3em+30px)]">
                      <p className="text-[0.667em] font-semibold leading-relaxed text-white/95 drop-shadow-sm sm:text-[0.5em]">
                        {p.heroSubtitle}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="rounded-2xl border border-neutral-200/80 bg-gradient-to-b from-neutral-100/95 to-neutral-50/80 px-5 py-8 shadow-card dark:border-neutral-700/80 dark:from-neutral-900/90 dark:to-neutral-950/70 sm:px-8 sm:py-10">
            <h2 className="text-center text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
              {p.benefitsSectionTitle}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {p.benefits.map((text, i) => (
                <BenefitCard key={i} text={text} />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            <IconCalendar />
            {p.eventSectionTitle}
          </h2>
          <div className="mt-6 grid gap-3 sm:gap-4">
            {p.eventInfoRows.map((row) => (
              <InfoRow key={row.label} icon={row.icon} label={row.label} value={row.value} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            <IconUtensils />
            {p.menuSectionTitle}
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100/80 shadow-card dark:border-neutral-700 dark:bg-neutral-800/50">
            <div className="aspect-[4/3] w-full max-h-[420px] sm:aspect-[16/10] sm:max-h-[min(50vh,480px)]">
              <img
                src={MENU_IMAGE_SRC}
                alt={p.menuImageAlt}
                className="h-full w-full object-cover"
                style={{ objectPosition: 'center 40%' }}
              />
            </div>
          </div>
        </section>

        <section className="section pb-2">
          <MarathonBookingButtons ctas={copy.marathonWelcome.bookingCtas} />
        </section>
      </div>
    </main>
  )
}

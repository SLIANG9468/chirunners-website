import { useEffect } from 'react'
import {
  FOUNDERS_5K_HERO_DESKTOP,
  FOUNDERS_5K_HERO_MOBILE,
  FOUNDERS_5K_REGISTER_URL,
  FOUNDERS_5K_ROUTE_FOCUS,
  FOUNDERS_5K_ROUTE_MAP,
  getFounders5KContent,
} from '../constants/founders5KContent'

const ctaClassName =
  'inline-flex min-h-[48px] items-center justify-center rounded-xl bg-chi-red px-8 py-3 text-center text-base font-semibold text-white shadow-md transition-colors hover:bg-chi-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chi-red-ring'

const textShadow =
  '[text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_16px_rgba(0,0,0,0.45)]'

function SignUpButton({ label, ariaLabel, className = '' }) {
  return (
    <a
      href={FOUNDERS_5K_REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`${ctaClassName}${className ? ` ${className}` : ''}`}
    >
      {label}
    </a>
  )
}

function HighlightCard({ title, body }) {
  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white/70 px-5 py-5 shadow-card dark:border-neutral-600/70 dark:bg-neutral-800/60">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">{body}</p>
    </div>
  )
}

function PlanBlock({ title, children }) {
  return (
    <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-900/40 sm:p-6">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
        {children}
      </div>
    </div>
  )
}

function Founders5KHero({ content, isZh }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-card dark:border-neutral-700 dark:bg-neutral-800/80">
      <div
        className="relative isolate flex w-full flex-col justify-end overflow-hidden
          min-h-[clamp(18rem,48vh,28rem)] max-h-[min(62vh,32rem)]
          md:min-h-[12.5rem] md:max-h-[min(42vh,26.25rem)] md:aspect-[1024/631]"
      >
        <picture className="pointer-events-none absolute inset-0 block h-full w-full">
          <source media="(min-width: 768px)" srcSet={FOUNDERS_5K_HERO_DESKTOP} />
          <img
            src={FOUNDERS_5K_HERO_MOBILE}
            alt=""
            className="h-full w-full object-cover object-[center_35%] md:object-center"
          />
        </picture>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/85 md:bg-gradient-to-t md:from-black/80 md:via-black/35 md:to-black/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/90 via-black/55 to-transparent md:h-[55%]"
          aria-hidden="true"
        />

        <div className="relative z-10 px-6 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20 md:pb-10 md:pt-24">
          <p
            className={`text-xs font-bold text-white/90 sm:text-sm ${textShadow} ${
              isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'
            }`}
          >
            {content.locationLine} | {content.dateLine}
          </p>
          <h1
            className={`mt-4 max-w-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl ${textShadow} ${
              isZh ? 'text-balance text-[1.35rem] sm:text-3xl' : 'text-2xl'
            }`}
          >
            {content.title}
          </h1>
          <p className={`mt-3 max-w-2xl text-lg font-medium text-white/95 sm:text-xl ${textShadow}`}>
            {content.tagline}
          </p>
          <p className={`mt-2 text-sm text-white/90 sm:text-base ${textShadow}`}>{content.hostLine}</p>
          <div className="mt-8">
            <SignUpButton label={content.ctaSignUp} ariaLabel={content.ctaSignUpAria} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Founders5KPage({ language }) {
  const c = getFounders5KContent(language)
  const isZh = language === 'zh'

  useEffect(() => {
    const previousTitle = document.title
    document.title = c.docTitle
    return () => {
      document.title = previousTitle
    }
  }, [c.docTitle])

  return (
    <main className="siteMain siteMain--marathonWelcome">
      <div className="mx-auto max-w-4xl px-0 text-left">
        <section className="section !mt-0 pt-0">
          <Founders5KHero content={c} isZh={isZh} />
        </section>

        <section className="section">
          <h2 className="text-center text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {c.highlightsTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {c.highlights.map((item) => (
              <HighlightCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </section>

        <section className="section pb-2" aria-labelledby="founders-5k-race-day">
          <h2
            id="founders-5k-race-day"
            className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl"
          >
            {c.raceDayTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
            {c.raceDayIntro}
          </p>

          <div className="mt-6 grid gap-4">
            <PlanBlock title={c.scheduleTitle}>
              <ol className="space-y-2.5">
                {c.schedule.map((row) => (
                  <li key={row.time} className="flex gap-3 sm:gap-4">
                    <span className="w-[5.5rem] shrink-0 font-semibold text-chi-red dark:text-chi-red-light sm:w-24">
                      {row.time}
                    </span>
                    <span>{row.detail}</span>
                  </li>
                ))}
              </ol>
            </PlanBlock>

            <PlanBlock title={c.raceOrderTitle}>
              <p>{c.raceOrderBody}</p>
            </PlanBlock>

            <PlanBlock title={c.bibTimingTitle}>
              <ul className="list-disc space-y-2 pl-5">
                {c.bibTimingItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PlanBlock>

            <PlanBlock title={c.routeTitle}>
              <p>{c.routeIntro}</p>
              <figure className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {c.routeOverviewCaption}
                </p>
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-950">
                  <img
                    src={FOUNDERS_5K_ROUTE_MAP}
                    alt={c.routeOverviewAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full"
                  />
                </div>
              </figure>
              <figure className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {c.routeFocusCaption}
                </p>
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-950">
                  <img
                    src={FOUNDERS_5K_ROUTE_FOCUS}
                    alt={c.routeFocusAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full"
                  />
                </div>
              </figure>
            </PlanBlock>

            <PlanBlock title={c.picnicTitle}>
              <ul className="list-disc space-y-2 pl-5">
                {c.picnicItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PlanBlock>

            <PlanBlock title={c.facilitiesTitle}>
              <p>{c.facilitiesBody}</p>
            </PlanBlock>
          </div>
        </section>
      </div>
    </main>
  )
}

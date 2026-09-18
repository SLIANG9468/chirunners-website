import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import MarathonBookingButtons from '../components/chicagoMarathon/MarathonBookingButtons'
import { apiUrl } from '../apiBase'

const MAP_IMAGE_SRC = '/marathon-transport/race-morning-hyatt-to-start.png'

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

function BulletList({ items }) {
  return (
    <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
      {items.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  )
}

export default function ChicagoMarathonBusPage({ copy }) {
  const mw = copy.marathonWelcome
  const b = mw.busPage

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
          <h1 className="mt-6 flex items-center gap-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            <IconShuttle />
            {b.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">{b.pageIntro}</p>
        </section>

        <section className="section !pt-0">
          <div className="rounded-2xl border border-chi-red/25 bg-gradient-to-br from-chi-red/10 via-transparent to-chi-red/5 p-6 shadow-card dark:border-chi-red/35 dark:from-chi-red/15 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-chi-red dark:text-chi-red-light">
              {b.shuttleBadge}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{b.shuttleTitle}</h2>
            <BulletList items={b.shuttleBullets} />
            {b.shuttleNote ? (
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{b.shuttleNote}</p>
            ) : null}

            {b.timingHighlightTitle ? (
              <div className="mt-6 rounded-xl border border-amber-300/70 bg-gradient-to-br from-amber-50/95 via-amber-50/40 to-transparent p-5 shadow-sm dark:border-amber-600/40 dark:from-amber-950/35 dark:via-amber-950/20 dark:to-transparent sm:p-6">
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                  {b.timingHighlightTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {b.timingHighlightBody}
                </p>
              </div>
            ) : null}

            <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {b.mapSectionTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
              {b.mapSectionBody}
            </p>
            <figure className="my-6 overflow-hidden rounded-2xl border-2 border-chi-red/60 bg-neutral-100 shadow-lg ring-4 ring-chi-red/10 dark:border-chi-red/50 dark:bg-neutral-900 dark:ring-chi-red/20">
              <img
                src={MAP_IMAGE_SRC}
                alt={b.mapImageAlt}
                width={1200}
                height={800}
                loading="eager"
                decoding="async"
                className="mx-auto block h-auto w-full max-h-[min(70vh,560px)] object-contain object-center sm:max-h-[min(75vh,640px)]"
              />
              <figcaption className="border-t border-neutral-200/80 px-3 py-3 text-left text-xs leading-relaxed text-neutral-600 dark:border-neutral-700/80 dark:text-neutral-400 sm:px-4 sm:text-sm">
                {b.mapImageCaption}
              </figcaption>
            </figure>

            <div className="mt-10">
              <MarathonBookingButtons ctas={mw.bookingCtas} />
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-900/40 sm:p-6">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{b.wechatGroupTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{b.wechatGroupBody}</p>
              <div className="mt-5 flex justify-center sm:justify-start">
                <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-700 dark:bg-neutral-950">
                  <img
                    src={apiUrl(b.wechatGroupQrSrc)}
                    alt={b.wechatGroupQrAlt}
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

import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'

export default function ChicagoMarathonPhotoSpotPage({ copy }) {
  const mw = copy.marathonWelcome
  const p = mw.photoSpotPage

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
          {p.pageIntro ? (
            <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">{p.pageIntro}</p>
          ) : null}
        </section>

        <section className="section !pt-0">
          <div className="rounded-2xl border border-chi-red/25 bg-gradient-to-br from-chi-red/10 via-transparent to-chi-red/5 p-6 shadow-card dark:border-chi-red/35 dark:from-chi-red/15 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,260px)_1fr] sm:items-start">
              <img
                src={p.mapSrc}
                alt={p.mapAlt}
                loading="lazy"
                decoding="async"
                className="mx-auto w-full max-w-[280px] rounded-xl border border-neutral-200/80 shadow-sm dark:border-neutral-700 sm:mx-0"
              />
              <ol className="space-y-4">
                {p.spots.map((spot) => (
                  <li key={spot.number} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-chi-red text-sm font-bold text-white">
                      {spot.number}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base">
                        {spot.label}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {spot.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

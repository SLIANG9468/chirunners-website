import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import { apiUrl } from '../apiBase'
import PhotographerGrid from '../components/chicagoMarathon/PhotographerGrid'
import PhotographyHero from '../components/chicagoMarathon/PhotographyHero'
import withBoldRuns from '../components/chicagoMarathon/withBoldRuns'

export default function ChicagoMarathonPhotographyPage({ copy }) {
  const mw = copy.marathonWelcome
  const p = mw.photographyPage

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

          <PhotographyHero titleLines={p.heroTitleLines} subtitle={p.heroSubtitle} />
        </section>

        {p.sections.map((section, i) => (
          <section className="section" key={section.heading || `intro-${i}`}>
            <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40 sm:p-8">
              {section.heading ? (
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
                  {section.heading}
                </h2>
              ) : null}
              <div className={section.heading ? 'mt-4 space-y-4' : 'space-y-4'}>
                {section.paragraphs.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base"
                  >
                    {withBoldRuns(paragraph)}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {p.photographers && p.photographers.length > 0 ? (
          <section className="section">
            <div className="text-center">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
                {p.photographersSectionTitle}
              </h2>
              <div className="mt-1 text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {p.photographersSectionSubtitle}
              </div>
              {p.photoSpotLinkLabel ? (
                <Link
                  to={CHICAGO_MARATHON_ROUTES.photoSpot}
                  className="mt-4 inline-flex text-2xl font-bold text-chi-red hover:text-chi-red-hover hover:underline"
                >
                  {p.photoSpotLinkLabel}
                </Link>
              ) : null}
            </div>
            <PhotographerGrid photographers={p.photographers} websiteLabel={p.photographerWebsiteLabel} />
          </section>
        ) : null}

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

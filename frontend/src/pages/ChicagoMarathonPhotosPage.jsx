import { Link } from 'react-router-dom'
import withBoldRuns from '../components/chicagoMarathon/withBoldRuns'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'

/** Race-photo landing page. Until photos are published it only says they aren't ready and where we'll announce them. */
export default function ChicagoMarathonPhotosPage({ copy }) {
  const mw = copy.marathonWelcome
  const p = mw.photosPage

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
          <div className="mt-6 rounded-2xl border border-chi-red/25 bg-gradient-to-br from-chi-red/10 via-transparent to-chi-red/5 p-6 shadow-card dark:border-chi-red/35 dark:from-chi-red/15 sm:p-8">
            <div className="space-y-3">
              {p.paragraphs.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-neutral-800 dark:text-neutral-200">
                  {withBoldRuns(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

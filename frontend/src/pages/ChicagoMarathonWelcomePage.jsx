import MarathonPreviewCard from '../components/chicagoMarathon/MarathonPreviewCard'
import MarathonWelcomeHero from '../components/chicagoMarathon/MarathonWelcomeHero'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'

export default function ChicagoMarathonWelcomePage({ copy }) {
  const mw = copy.marathonWelcome

  return (
    <main className="siteMain siteMain--marathonWelcome">
      <div className="mx-auto max-w-4xl px-0 text-left">
        <section className="section marathonWelcome-heroSection !mt-0 pt-0">
          <MarathonWelcomeHero copy={mw} />
        </section>

        <section className="section">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {mw.guidesTitle}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <MarathonPreviewCard
              title={mw.cards.carbLoading.title}
              description={mw.cards.carbLoading.description}
              cta={mw.cards.carbLoading.cta}
              to={CHICAGO_MARATHON_ROUTES.carbLoading}
            />
            <MarathonPreviewCard
              title={mw.cards.hotel.title}
              description={mw.cards.hotel.description}
              cta={mw.cards.hotel.cta}
              to={CHICAGO_MARATHON_ROUTES.hotel}
            />
            <MarathonPreviewCard
              title={mw.cards.transportation.title}
              description={mw.cards.transportation.description}
              cta={mw.cards.transportation.cta}
              to={CHICAGO_MARATHON_ROUTES.transportation}
            />
          </div>
        </section>

        <section className="section rounded-2xl border border-chi-red/15 bg-chi-red-light/80 px-6 py-8 dark:border-chi-red/30 dark:bg-chi-red/10 sm:px-8">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {mw.closingTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {mw.closingBody}
          </p>
          <p className="mt-6 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {mw.closingSocialIntro}
          </p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {mw.closingSocialLinks.map((item) => (
              <li key={item.label}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.hint || undefined}
                    className="inline-flex rounded-full border-2 border-chi-red bg-white px-4 py-2 text-sm font-semibold text-chi-red transition-all duration-200 hover:bg-chi-red hover:text-white dark:bg-neutral-900 dark:text-chi-red-light dark:hover:bg-chi-red dark:hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className="inline-flex cursor-default rounded-full border-2 border-chi-red/40 bg-white/80 px-4 py-2 text-sm font-semibold text-chi-red dark:border-chi-red/50 dark:bg-neutral-900/80 dark:text-chi-red-light"
                    title={item.hint}
                    role="note"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {mw.closingSocialFootnote ? (
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">
              {mw.closingSocialFootnote}
            </p>
          ) : null}
        </section>
      </div>
    </main>
  )
}

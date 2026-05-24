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
      </div>
    </main>
  )
}

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
          <div className="rounded-2xl border border-chi-red/25 bg-gradient-to-br from-chi-red/10 via-transparent to-chi-red/5 p-6 shadow-card dark:border-chi-red/35 dark:from-chi-red/15 sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 sm:text-xl">
              {mw.cards.participantGuide.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
              {mw.cards.participantGuide.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={mw.cards.participantGuide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center rounded-full bg-chi-red px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:bg-chi-red-hover hover:shadow-md active:scale-[0.98]"
              >
                {mw.cards.participantGuide.cta}
              </a>
              {mw.cards.participantGuide.secondaryUrl ? (
                <a
                  href={mw.cards.participantGuide.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center rounded-full bg-chi-red px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:bg-chi-red-hover hover:shadow-md active:scale-[0.98]"
                >
                  {mw.cards.participantGuide.secondaryCta}
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {mw.guidesTitle}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <MarathonPreviewCard
              title={mw.cards.photography.title}
              description={mw.cards.photography.description}
              cta={mw.cards.photography.cta}
              to={CHICAGO_MARATHON_ROUTES.photography}
            />
            <MarathonPreviewCard
              title={mw.cards.teams.title}
              description={mw.cards.teams.description}
              cta={mw.cards.teams.cta}
              to={CHICAGO_MARATHON_ROUTES.teams2026}
            />
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
              title={mw.cards.bus.title}
              description={mw.cards.bus.description}
              cta={mw.cards.bus.cta}
              to={CHICAGO_MARATHON_ROUTES.bus}
            />
            <MarathonPreviewCard
              title={mw.cards.transportation.title}
              description={mw.cards.transportation.description}
              cta={mw.cards.transportation.cta}
              to={CHICAGO_MARATHON_ROUTES.transportation}
            />
            <MarathonPreviewCard
              title={mw.cards.volunteer.title}
              description={mw.cards.volunteer.description}
              cta={mw.cards.volunteer.cta}
              to={CHICAGO_MARATHON_ROUTES.volunteer}
            />
            <MarathonPreviewCard
              title={mw.cards.sharingSessions.title}
              description={mw.cards.sharingSessions.description}
              cta={mw.cards.sharingSessions.cta}
              to={CHICAGO_MARATHON_ROUTES.sharingSessions}
            />
          </div>
        </section>
      </div>
    </main>
  )
}

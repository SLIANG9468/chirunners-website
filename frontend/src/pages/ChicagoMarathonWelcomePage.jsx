import MarathonPreviewCard from '../components/chicagoMarathon/MarathonPreviewCard'
import MarathonWelcomeHero from '../components/chicagoMarathon/MarathonWelcomeHero'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import { apiUrl } from '../apiBase'

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
            <MarathonPreviewCard
              title={mw.cards.volunteer.title}
              description={mw.cards.volunteer.description}
              cta={mw.cards.volunteer.cta}
              to={CHICAGO_MARATHON_ROUTES.volunteer}
            />
            <MarathonPreviewCard
              title={mw.cards.photography.title}
              description={mw.cards.photography.description}
              cta={mw.cards.photography.cta}
              to={CHICAGO_MARATHON_ROUTES.photography}
            />
          </div>
        </section>

        <section className="section pb-2">
          <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-900/40 sm:p-6">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {mw.wechatGroupTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {mw.wechatGroupBody}
            </p>
            <div className="mt-5 flex justify-center sm:justify-start">
              <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-700 dark:bg-neutral-950">
                <img
                  src={apiUrl(mw.wechatGroupQrSrc)}
                  alt={mw.wechatGroupQrAlt}
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

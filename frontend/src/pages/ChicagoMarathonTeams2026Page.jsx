import { Link } from 'react-router-dom'
import TeamCard from '../components/chicagoMarathon/TeamCard'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import { CHICAGO_MARATHON_TEAMS_2026 } from '../constants/chicagoMarathonTeams2026'

/** Reuse marathon hero asset until a dedicated image is added. */
const HERO_IMAGE_SRC = '/chicago-marathon/hero-1.jpg'

export default function ChicagoMarathonTeams2026Page({ copy }) {
  const mw = copy.marathonWelcome
  const p = mw.teams2026Page

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
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40 sm:p-8">
            <div className="space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
              {p.introParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-5 rounded-xl border-l-4 border-chi-red bg-chi-red/5 p-4 text-sm leading-relaxed text-neutral-800 dark:bg-chi-red/10 dark:text-neutral-100 sm:text-base">
              <p>{p.updateCallout}</p>
              <p className="mt-3 font-medium">
                {p.updateContactLabel}{' '}
                <a
                  href={`mailto:${p.updateContactEmail}`}
                  className="text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover"
                >
                  {p.updateContactEmail}
                </a>
                {p.updateContactWechatSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="section pb-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {CHICAGO_MARATHON_TEAMS_2026.map((team) => (
              <TeamCard key={team.key} team={team} labels={p.teams[team.key]} copy={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

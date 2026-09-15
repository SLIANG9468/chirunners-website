import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import { apiUrl } from '../apiBase'

/** Reuse marathon hero asset until a dedicated image is added. */
const HERO_IMAGE_SRC = '/chicago-marathon/hero-1.jpg'

function SpeakerCard({ speaker }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {speaker.photoKey ? (
        <img
          src={apiUrl(`/api/marathon-welcome/speaker-photo/${speaker.photoKey}`)}
          alt={speaker.name}
          loading="lazy"
          decoding="async"
          className="h-32 w-32 shrink-0 rounded-xl object-cover object-top sm:h-36 sm:w-36"
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {speaker.name}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {speaker.bio}
        </p>
      </div>
    </div>
  )
}

function SessionSection({ session, p }) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {session.date}
      </p>
      <h3 className="mt-1 text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
        {session.title}
      </h3>

      {session.comingSoon ? (
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          {p.sessionComingSoonLabel}
        </p>
      ) : (
        <>
          {session.speakers && session.speakers.length > 0 ? (
            <div className="mt-5 space-y-5">
              {session.speakers.map((speaker) => (
                <SpeakerCard key={speaker.name} speaker={speaker} />
              ))}
            </div>
          ) : null}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200/60 bg-white/50 px-4 py-3 dark:border-neutral-600/60 dark:bg-neutral-900/30">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {p.youtubeSectionLabel}
              </p>
              {session.youtubeUrl ? (
                <a
                  href={session.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover"
                >
                  {p.youtubeWatchLabel}
                </a>
              ) : (
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {p.youtubeComingSoonLabel}
                </p>
              )}
            </div>
            <div className="rounded-xl border border-neutral-200/60 bg-white/50 px-4 py-3 dark:border-neutral-600/60 dark:bg-neutral-900/30">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                {p.slidesSectionLabel}
              </p>
              {session.slidesUrl ? (
                <a
                  href={session.slidesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-medium text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover"
                >
                  {p.slidesViewLabel}
                </a>
              ) : (
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {p.slidesComingSoonLabel}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function ChicagoMarathonZoomRecordingPage({ copy }) {
  const mw = copy.marathonWelcome
  const p = mw.zoomRecordingPage

  return (
    <main className="siteMain siteMain--marathonWelcome">
      <div className="mx-auto max-w-4xl px-0 text-left">
        <section className="section !mt-0 pt-0">
          <Link
            to={CHICAGO_MARATHON_ROUTES.sharingSessions}
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
          <div className="rounded-2xl border border-neutral-200/80 bg-gradient-to-b from-neutral-100/95 to-neutral-50/80 px-5 py-8 shadow-card dark:border-neutral-700/80 dark:from-neutral-900/90 dark:to-neutral-950/70 sm:px-8 sm:py-10">
            <h2 className="text-center text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
              {p.introSectionTitle}
            </h2>
            <p className="mt-6 whitespace-pre-line text-left text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
              {p.introBody}
            </p>
          </div>
        </section>

        <section className="section pb-2">
          <div className="grid gap-4">
            {p.sessions.map((session) => (
              <SessionSection key={session.date} session={session} p={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

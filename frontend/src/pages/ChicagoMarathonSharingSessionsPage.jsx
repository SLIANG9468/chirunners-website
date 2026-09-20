import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import { apiUrl } from '../apiBase'

/** Reuse marathon hero asset until a dedicated image is added. */
const HERO_IMAGE_SRC = '/chicago-marathon/hero-1.jpg'

const iconClass = 'h-5 w-5 shrink-0 text-chi-red'

function IconCalendar() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconClock() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconVideo() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10.5l5-2.5v8l-5-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconKey() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="15" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M11 12l8-8m0 0h-4m4 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const INFO_ICONS = {
  calendar: IconCalendar,
  clock: IconClock,
  video: IconVideo,
  key: IconKey,
}

function InfoRow({ icon, label, value }) {
  const I = INFO_ICONS[icon] || IconCalendar
  return (
    <div className="flex gap-4 rounded-xl border border-neutral-200/60 bg-white/50 px-4 py-3 dark:border-neutral-600/60 dark:bg-neutral-900/30">
      <I />
      <div className="min-w-0 flex-1 text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-neutral-900 dark:text-neutral-100 sm:text-base">
          {value}
        </p>
      </div>
    </div>
  )
}

function InfoCard({ title, titleUrl, rows, joinLabel }) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40 sm:p-6">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
        {titleUrl ? (
          <a
            href={titleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <div className="mt-4 grid gap-3">
        {rows.map((row) => (
          <InfoRow key={row.label} icon={row.icon} label={row.label} value={row.value} />
        ))}
      </div>
      {titleUrl && joinLabel ? (
        <a
          href={titleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-fit items-center rounded-full bg-chi-red px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:bg-chi-red-hover hover:shadow-md active:scale-[0.98]"
        >
          {joinLabel}
        </a>
      ) : null}
    </div>
  )
}

function SpeakerBlock({ speaker }) {
  return (
    <div className="mt-4 overflow-hidden">
      {speaker.photoKey ? (
        <img
          src={apiUrl(`/api/marathon-welcome/speaker-photo/${speaker.photoKey}`)}
          alt={speaker.name}
          loading="lazy"
          decoding="async"
          className="float-left mr-4 mb-2 aspect-[2/3] w-20 shrink-0 rounded-xl bg-neutral-100 object-contain dark:bg-neutral-800"
        />
      ) : null}
      <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {speaker.name}
      </div>
      <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {speaker.bio}
      </p>
    </div>
  )
}

function SessionCard({ date, title, speakers, youtubeUrl, youtubeLabel, slidesUrl, slidesLabel }) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40 sm:p-6">
      <InfoRow icon="calendar" label="Date & time" value={date} />
      <p className="mt-4 text-sm font-semibold leading-relaxed text-neutral-900 dark:text-neutral-100 sm:text-base">
        {title}
      </p>
      {speakers && speakers.length > 0
        ? speakers.map((speaker) => <SpeakerBlock key={speaker.name} speaker={speaker} />)
        : null}
      {youtubeUrl || slidesUrl ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {youtubeUrl ? (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-chi-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-chi-red-hover"
            >
              ▶ {youtubeLabel}
            </a>
          ) : null}
          {slidesUrl ? (
            <a
              href={slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-chi-red px-4 py-2 text-sm font-semibold text-chi-red shadow-sm transition-colors hover:bg-chi-red-light dark:bg-neutral-900/40 dark:hover:bg-chi-red/10"
            >
              📄 {slidesLabel}
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default function ChicagoMarathonSharingSessionsPage({ copy }) {
  const mw = copy.marathonWelcome
  const p = mw.sharingSessionsPage

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
          <div className="rounded-2xl border border-neutral-200/80 bg-gradient-to-b from-neutral-100/95 to-neutral-50/80 px-5 py-8 shadow-card dark:border-neutral-700/80 dark:from-neutral-900/90 dark:to-neutral-950/70 sm:px-8 sm:py-10">
            <h2 className="text-center text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
              {p.introSectionTitle}
            </h2>
            <p className="mt-6 whitespace-pre-line text-left text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
              {p.introBody}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              title={p.zoomSectionTitle}
              titleUrl={p.zoomJoinUrl}
              joinLabel={p.zoomJoinLabel}
              rows={p.zoomInfoRows}
            />
            <InfoCard title={p.scheduleSectionTitle} rows={p.scheduleRows} />
          </div>
        </section>

        <section className="section">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {p.sessionsSectionTitle}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{p.sessionsNote}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {p.sessions.map((session) => (
              <SessionCard
                key={session.date}
                date={session.date}
                title={session.title}
                speakers={session.speakers}
                youtubeUrl={session.youtubeUrl}
                youtubeLabel={p.youtubeLabel}
                slidesUrl={session.slidesUrl}
                slidesLabel={p.slidesLabel}
              />
            ))}
          </div>
        </section>

        <section className="section pb-2">
          <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-900/40 sm:p-6">
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {p.closingNote}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

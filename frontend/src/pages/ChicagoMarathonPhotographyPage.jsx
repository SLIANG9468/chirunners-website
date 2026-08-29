import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import { apiUrl } from '../apiBase'

/** Reuse marathon hero asset until a dedicated image is added. */
const HERO_IMAGE_SRC = '/chicago-marathon/hero-1.jpg'

/** Content uses `**bold**` for emphasis; render those runs as <strong>. */
function withBoldRuns(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

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
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.photographers.map((photographer) => (
                <div
                  key={photographer.photoKey || photographer.name}
                  className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/70 text-center shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40"
                >
                  {photographer.photoKey ? (
                    <img
                      src={apiUrl(`/api/marathon-welcome/photographer-photo/${photographer.photoKey}`)}
                      alt={photographer.name}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full scale-105 object-cover object-top"
                    />
                  ) : null}
                  <div className="p-5">
                    <div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      {photographer.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

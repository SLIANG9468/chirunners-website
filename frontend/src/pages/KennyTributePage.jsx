/**
 * Standalone tribute page — not linked from the navbar (per request). Lives at
 * /kenny. Content is a skeleton: real photos will be dropped in incrementally,
 * so every image slot below is a placeholder until then.
 */

function IconCamera({ className = 'h-8 w-8' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function PhotoSlot({ className = 'aspect-square' }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-100/70 text-neutral-300 dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-700`}
      aria-hidden
    >
      <IconCamera className="h-6 w-6" />
    </div>
  )
}

function SectionKicker({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-chi-red">{children}</p>
  )
}

function Section({ kicker, title, body, line, className = '' }) {
  return (
    <section className={`mt-14 ${className}`}>
      {kicker ? <SectionKicker>{kicker}</SectionKicker> : null}
      {title ? (
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
          {title}
        </h2>
      ) : null}
      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
        {body}
      </p>
      {line ? (
        <p className="mt-4 text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
          {line}
        </p>
      ) : null}
    </section>
  )
}

export default function KennyTributePage({ copy }) {
  const p = copy.kennyTribute

  return (
    <main className="siteMain">
      <div className="mx-auto max-w-2xl px-4 py-10 text-left sm:px-6 sm:py-14">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-chi-red">
            {p.heroKicker}
          </p>
          <h1 className="mt-3 font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 text-3xl sm:text-4xl">
            {p.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          {p.nameCredit ? (
            <p className="mt-2 text-sm font-medium italic text-neutral-500 dark:text-neutral-400">
              {p.nameCredit}
            </p>
          ) : null}
          <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {p.leadBody}
          </p>
        </div>

        {/* Hero image — placeholder until a photo is added */}
        <div className="mt-10 overflow-hidden rounded-2xl">
          <div className="flex aspect-[5/2] min-h-[220px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 bg-neutral-100/70 text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-600">
            <IconCamera className="h-10 w-10" />
            <span className="text-xs font-medium uppercase tracking-wide">{p.heroPhotoLabel}</span>
          </div>
        </div>

        <Section
          kicker={p.roleKicker}
          body={p.roleBody}
          line={p.roleLine}
          className="mt-12"
        />

        <Section kicker={p.section1Kicker} body={p.section1Body} line={p.section1Line} />

        <Section title={p.section2Title} body={p.section2Body} />

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {p.section3Title}
          </h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
            {p.section3Body}
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-600">
            {p.section3GalleryLabel}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PhotoSlot key={i} />
            ))}
          </div>
        </section>

        <Section title={p.section4Title} body={p.section4Body} />

        <section className="mt-14">
          <SectionKicker>{p.section5Kicker}</SectionKicker>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {p.section5Title}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {p.categories.map((category) => (
              <div
                key={category}
                className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40"
              >
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {category}
                </h3>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <PhotoSlot />
                  <PhotoSlot />
                  <PhotoSlot />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {p.years.map((year) => (
              <span
                key={year}
                className="rounded-full border border-neutral-200/80 px-3 py-1 text-xs font-medium text-neutral-500 dark:border-neutral-700/80 dark:text-neutral-400"
              >
                {year}
              </span>
            ))}
          </div>
        </section>

        <Section kicker={p.section6Kicker} body={p.section6Body} />

        <section className="mt-14 rounded-2xl border border-neutral-200/80 bg-gradient-to-b from-neutral-100/95 to-neutral-50/80 px-5 py-8 text-center shadow-card dark:border-neutral-700/80 dark:from-neutral-900/90 dark:to-neutral-950/70 sm:px-8 sm:py-10">
          <SectionKicker>{p.closingKicker}</SectionKicker>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
            {p.closingBody}
          </p>
          <p className="mt-6 text-lg font-semibold italic text-neutral-900 dark:text-neutral-100">
            {p.closingTagline}
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-dashed border-neutral-300 p-6 text-center dark:border-neutral-700">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {p.futureTitle}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {p.futureBody}
          </p>
        </section>
      </div>
    </main>
  )
}

export default function HistoryPage({ copy }) {
  return (
    <main className="siteMain">
      <div
        className={[
          'font-history mx-auto w-full max-w-[min(100%,40rem)]',
          'px-4 py-8 sm:px-5',
          'md:max-w-[44rem] md:px-8 md:py-12',
          'lg:max-w-[48rem] lg:py-14',
        ].join(' ')}
      >
        <h1
          className={[
            'text-center text-[clamp(1.35rem,1rem+1.5vw,1.875rem)]',
            'font-semibold tracking-tight text-zinc-900',
            'dark:text-zinc-50',
            'mb-8 md:mb-10 lg:mb-12',
          ].join(' ')}
        >
          {copy.historyTitle}
        </h1>

        <ul className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          {copy.historyMilestones.map((item) => (
            <li key={item.heading}>
              <article
                className={[
                  'rounded-[1.25rem] bg-white text-left shadow-card',
                  'ring-1 ring-zinc-900/5 dark:bg-black dark:ring-white/10',
                  'px-5 py-6 sm:px-6 sm:py-7',
                  'md:rounded-3xl md:px-8 md:py-9',
                  'lg:px-10 lg:py-10',
                ].join(' ')}
              >
                <h2
                  className={[
                    'mb-3 text-lg font-semibold leading-snug',
                    'text-zinc-900 dark:text-zinc-50',
                    'md:text-xl md:mb-4',
                  ].join(' ')}
                >
                  {item.heading}
                </h2>
                <p
                  className={[
                    'm-0 text-[0.9375rem] leading-[1.75] text-zinc-700',
                    'md:text-base md:leading-[1.8]',
                    'dark:text-zinc-300',
                  ].join(' ')}
                >
                  {item.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

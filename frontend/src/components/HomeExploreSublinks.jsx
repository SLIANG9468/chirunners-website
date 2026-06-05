import { Link } from 'react-router-dom'

export default function HomeExploreSublinks({
  id,
  title,
  description,
  sublinks,
  viewAllLabel,
  viewAllTo,
}) {
  return (
    <article
      id={id}
      className="homeExploreAnchor homeExploreSublinks group flex h-full flex-col rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-chi-red/25 hover:shadow-card dark:border-neutral-700 dark:bg-neutral-900/60 dark:hover:border-chi-red/40"
    >
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        <span className="relative">
          {title}
          <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-chi-red transition-all duration-300 group-hover:w-full" />
        </span>
      </h3>
      <p className="mt-3 text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
      <ul className="homeExploreSublinksList mt-5 flex-1 space-y-2">
        {sublinks.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="homeExploreSublink flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-neutral-200/80 bg-neutral-50/80 px-4 py-3 text-left text-sm font-medium text-neutral-800 transition-colors hover:border-chi-red/30 hover:bg-chi-red/5 hover:text-chi-red dark:border-neutral-600/70 dark:bg-neutral-950/40 dark:text-neutral-200 dark:hover:border-chi-red/40 dark:hover:bg-chi-red/10 dark:hover:text-chi-red-light"
            >
              <span>{item.label}</span>
              <span className="shrink-0 text-chi-red dark:text-chi-red-light" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {viewAllLabel && viewAllTo ? (
        <Link
          to={viewAllTo}
          className="mt-5 inline-flex min-h-[44px] w-fit items-center text-sm font-semibold text-chi-red transition-colors hover:text-chi-red-hover hover:underline dark:text-chi-red-light"
        >
          {viewAllLabel}
        </Link>
      ) : null}
    </article>
  )
}

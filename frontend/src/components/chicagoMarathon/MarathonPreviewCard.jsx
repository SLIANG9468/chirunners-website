import { Link } from 'react-router-dom'

export default function MarathonPreviewCard({ title, description, cta, to }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-chi-red/25 hover:shadow-card dark:border-neutral-700 dark:bg-neutral-900/60 dark:hover:border-chi-red/40">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        <span className="relative">
          {title}
          <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-chi-red transition-all duration-300 group-hover:w-full" />
        </span>
      </h3>
      <p className="mt-3 flex-1 whitespace-pre-line text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
      <Link
        to={to}
        className="mt-5 inline-flex w-fit items-center rounded-full bg-chi-red px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:bg-chi-red-hover hover:shadow-md active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chi-red"
      >
        {cta}
      </Link>
    </article>
  )
}

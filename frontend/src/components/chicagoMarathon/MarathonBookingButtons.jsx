import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../../constants/chicagoMarathonRoutes'

const primaryClassName =
  'inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-chi-red px-8 py-3 text-center text-base font-semibold text-white shadow-md transition-colors hover:bg-chi-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chi-red-ring sm:w-auto'

const secondaryClassName =
  'inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border-2 border-chi-red bg-white px-8 py-3 text-center text-base font-semibold text-chi-red shadow-sm transition-colors hover:bg-chi-red-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chi-red-ring dark:border-chi-red dark:bg-neutral-900/40 dark:text-chi-red-light dark:hover:bg-chi-red/10 sm:w-auto'

export default function MarathonBookingButtons({ ctas }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <Link
        to={`${CHICAGO_MARATHON_ROUTES.tickets}#carb-loading`}
        className={secondaryClassName}
      >
        {ctas.carbLoading}
      </Link>
      <a
        href={ctas.hotelBookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={primaryClassName}
      >
        {ctas.hotel}
      </a>
      <Link
        to={`${CHICAGO_MARATHON_ROUTES.tickets}#bus-shuttle`}
        className={secondaryClassName}
      >
        {ctas.busShuttle}
      </Link>
    </div>
  )
}

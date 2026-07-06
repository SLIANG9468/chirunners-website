import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ZEFFY_BUS_SHUTTLE_EMBED_URL,
  ZEFFY_CARB_LOADING_EMBED_URL,
} from '../constants/chicagoMarathonTickets'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'

export default function ChicagoMarathonTicketsPage({ copy }) {
  const location = useLocation()
  const mw = copy.marathonWelcome
  const t = mw.ticketsPage

  useEffect(() => {
    const previousTitle = document.title
    document.title = t.docTitle
    return () => {
      document.title = previousTitle
    }
  }, [t.docTitle])

  useEffect(() => {
    if (!location.hash) return undefined
    const id = location.hash.replace(/^#/, '')
    if (!id) return undefined
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => window.clearTimeout(timer)
  }, [location.hash])

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
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            {t.pageTitle}
          </h1>
          {t.pageIntro ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
              {t.pageIntro}
            </p>
          ) : null}
        </section>

        <section id="carb-loading" className="section marathonTickets-anchor">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {t.carbLoadingTitle}
          </h2>
          <iframe
            className="marathonTicketFrame"
            src={ZEFFY_CARB_LOADING_EMBED_URL}
            title={t.carbLoadingIframeTitle}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="payment *"
          />
        </section>

        <section id="bus-shuttle" className="section pb-2 marathonTickets-anchor">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {t.busShuttleTitle}
          </h2>
          <iframe
            className="marathonTicketFrame marathonTicketFrame--busShuttle"
            src={ZEFFY_BUS_SHUTTLE_EMBED_URL}
            title={t.busShuttleIframeTitle}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="payment *"
          />
        </section>
      </div>
    </main>
  )
}

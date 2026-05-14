import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'

const TRANSPORT_IMAGES = {
  airportTransit: '/marathon-transport/ord-airport-transit-sign.png',
  walkRentalToHyatt: '/marathon-transport/walk-rental-center-to-hyatt.png',
  raceMorning: '/marathon-transport/race-morning-hyatt-to-start.png',
  ctaSign: '/marathon-transport/ord-cta-trains-sign.png',
}

function TipBox({ title, children, variant = 'sky' }) {
  const styles =
    variant === 'amber'
      ? 'border-amber-300/80 bg-gradient-to-br from-amber-50/95 to-amber-50/30 dark:border-amber-600/40 dark:from-amber-950/40 dark:to-amber-950/10'
      : 'border-sky-200/80 bg-gradient-to-br from-sky-50/95 to-sky-50/30 dark:border-sky-700/50 dark:from-sky-950/35 dark:to-sky-950/10'
  const titleStyles =
    variant === 'amber' ? 'text-amber-900 dark:text-amber-200' : 'text-sky-900 dark:text-sky-200'

  return (
    <div className={`mt-4 rounded-xl border p-4 shadow-sm sm:p-5 ${styles}`}>
      {title ? <p className={`text-sm font-semibold ${titleStyles}`}>{title}</p> : null}
      <div className={`space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 ${title ? 'mt-2' : ''}`}>
        {children}
      </div>
    </div>
  )
}

function FigureImg({ src, alt, caption, priority = false, featured = false }) {
  return (
    <figure
      className={
        featured
          ? 'my-8 overflow-hidden rounded-2xl border-2 border-chi-red/60 bg-neutral-100 shadow-lg ring-4 ring-chi-red/10 dark:border-chi-red/50 dark:bg-neutral-900 dark:ring-chi-red/20'
          : 'my-6 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-card dark:border-neutral-600/60 dark:bg-neutral-900'
      }
    >
      <img
        src={src}
        alt={alt}
        width={1200}
        height={800}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="mx-auto block h-auto w-full max-h-[min(70vh,560px)] object-contain object-center sm:max-h-[min(75vh,640px)]"
      />
      {caption ? (
        <figcaption className="border-t border-neutral-200/80 px-3 py-3 text-left text-xs leading-relaxed text-neutral-600 dark:border-neutral-700/80 dark:text-neutral-400 sm:px-4 sm:text-sm">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
      {items.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  )
}

function AddressBlock({ label, lines }) {
  return (
    <div className="rounded-xl border border-neutral-200/70 bg-white/60 px-4 py-3 dark:border-neutral-600/60 dark:bg-neutral-900/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-chi-red dark:text-chi-red-light">{label}</p>
      {lines.map((line) => (
        <p key={line} className="mt-1 font-mono text-xs text-neutral-800 dark:text-neutral-200 sm:text-sm">
          {line}
        </p>
      ))}
    </div>
  )
}

export default function ChicagoMarathonTransportationPage({ copy }) {
  const mw = copy.marathonWelcome
  const t = mw.transportationPage
  const hotel = mw.hotelPage

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

  return (
    <main className="siteMain siteMain--marathonWelcome">
      <div className="mx-auto max-w-3xl px-0 text-left">
        <section className="section">
          <Link
            to={CHICAGO_MARATHON_ROUTES.hub}
            className="inline-flex text-sm font-medium text-chi-red hover:text-chi-red-hover hover:underline"
          >
            {mw.backToHub}
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">{t.pageTitle}</h1>
          <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">{t.pageIntro}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to={CHICAGO_MARATHON_ROUTES.hotel}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-chi-red/40 bg-white px-4 py-2 text-sm font-semibold text-chi-red shadow-sm transition-colors hover:bg-chi-red/5 dark:border-chi-red/50 dark:bg-neutral-900 dark:hover:bg-chi-red/10"
            >
              {t.ctaHotel}
            </Link>
            <a
              href={hotel.hotelBookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-chi-red px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-chi-red-hover"
            >
              {hotel.ctaBook}
            </a>
          </div>
        </section>

        <section className="section !pt-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            {t.jumpNavLabel}
          </p>
          <nav
            aria-label={t.jumpNavLabel}
            className="mt-2 flex flex-wrap gap-2 border-b border-neutral-200/80 pb-4 dark:border-neutral-700/80"
          >
            {t.jumpNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-[40px] items-center rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 shadow-sm transition-colors hover:border-chi-red/50 hover:text-chi-red dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-chi-red/50 dark:hover:text-chi-red-light sm:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </section>

        <section className="section !pt-0">
          <div className="grid gap-3 sm:grid-cols-2">
            <AddressBlock label={t.addresses.startFinish.label} lines={t.addresses.startFinish.lines} />
            <AddressBlock label={t.addresses.expo.label} lines={t.addresses.expo.lines} />
            <AddressBlock label={t.addresses.hotel.label} lines={t.addresses.hotel.lines} />
            <AddressBlock label={t.addresses.ctaBlue.label} lines={t.addresses.ctaBlue.lines} />
          </div>
        </section>

        <section id="airport-hotel" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.airportHotel.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t.sections.airportHotel.lead}
          </p>

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.airportHotel.signAirportTransitTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t.sections.airportHotel.signAirportTransitBody}
          </p>
          <FigureImg
            src={TRANSPORT_IMAGES.airportTransit}
            alt={t.images.airportTransit.alt}
            caption={t.images.airportTransit.caption}
          />

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.airportHotel.signCtaTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t.sections.airportHotel.signCtaBody}
          </p>
          <FigureImg src={TRANSPORT_IMAGES.ctaSign} alt={t.images.ctaSign.alt} caption={t.images.ctaSign.caption} />

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.airportHotel.shuttleTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t.sections.airportHotel.shuttleBody}
          </p>
          <TipBox title={t.sections.airportHotel.shuttleTipTitle}>
            <p>{t.sections.airportHotel.shuttleTipBody}</p>
          </TipBox>

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.airportHotel.walkTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t.sections.airportHotel.walkIntro}
          </p>
          <TipBox title={t.sections.airportHotel.walkHighlightTitle} variant="amber">
            <p className="font-medium">{t.sections.airportHotel.walkHighlight}</p>
            <p>{t.sections.airportHotel.walkStats}</p>
          </TipBox>
          <FigureImg
            src={TRANSPORT_IMAGES.walkRentalToHyatt}
            alt={t.images.walkRental.alt}
            caption={t.images.walkRental.caption}
          />
          <BulletList items={t.sections.airportHotel.walkBullets} />
        </section>

        <section id="hotel-start" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.hotelStart.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t.sections.hotelStart.lead}
          </p>

          <div className="mt-6 rounded-2xl border border-chi-red/25 bg-gradient-to-br from-chi-red/10 via-transparent to-chi-red/5 p-5 dark:border-chi-red/35 dark:from-chi-red/15 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-chi-red dark:text-chi-red-light">
              {t.sections.hotelStart.shuttleBadge}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.hotelStart.shuttleTitle}</h3>
            <BulletList items={t.sections.hotelStart.shuttleBullets} />
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{t.sections.hotelStart.shuttleNote}</p>
          </div>

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.hotelStart.mapSectionTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t.sections.hotelStart.mapSectionBody}
          </p>
          <FigureImg
            src={TRANSPORT_IMAGES.raceMorning}
            alt={t.images.raceMorning.alt}
            caption={t.images.raceMorning.caption}
            priority
            featured
          />

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.hotelStart.otherModesTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t.sections.hotelStart.otherModesBody}
          </p>
        </section>

        <section id="hotel-expo" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.hotelExpo.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {t.sections.hotelExpo.lead}
          </p>
          <TipBox title={t.sections.hotelExpo.tipTitle}>
            <p>{t.sections.hotelExpo.tipBody}</p>
          </TipBox>
          <h3 className="mt-6 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.hotelExpo.ctaRouteTitle}</h3>
          <BulletList items={t.sections.hotelExpo.ctaRouteSteps} />
          <p className="mt-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">{t.sections.hotelExpo.ctaRouteTime}</p>
        </section>

        <section id="cta-guide" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.cta.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">{t.sections.cta.lead}</p>

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.cta.faresTitle}</h3>
          <BulletList items={t.sections.cta.fares} />

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.cta.buyTitle}</h3>
          <BulletList items={t.sections.cta.buySteps} />

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.cta.toStartTitle}</h3>
          <BulletList items={t.sections.cta.toStartSteps} />
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{t.sections.cta.toStartNote}</p>

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.cta.otherLinesTitle}</h3>
          <BulletList items={t.sections.cta.otherLines} />

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.cta.toExpoTitle}</h3>
          <BulletList items={t.sections.cta.toExpoSteps} />
          <p className="mt-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">{t.sections.cta.toExpoTime}</p>

          <TipBox title={t.sections.cta.beginnerTitle}>
            <p>{t.sections.cta.beginnerBody}</p>
          </TipBox>
        </section>

        <section id="race-day" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.raceDay.title}</h2>
          <BulletList items={t.sections.raceDay.tips} />
        </section>

        <section id="faq" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.faqTitle}</h2>
          <div className="mt-4 space-y-3">
            {t.faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-neutral-200/80 bg-white/70 px-4 py-3 dark:border-neutral-600/60 dark:bg-neutral-900/50"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-900 marker:content-none dark:text-neutral-100 sm:text-base [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex w-full items-center justify-between gap-2">
                    <span>{item.q}</span>
                    <span className="text-neutral-400 transition-transform group-open:rotate-180">▾</span>
                  </span>
                </summary>
                <p className="mt-3 border-t border-neutral-200/80 pt-3 text-sm leading-relaxed text-neutral-600 dark:border-neutral-700/80 dark:text-neutral-400">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section id="further-reading" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.furtherReadingTitle}</h2>
          <div className="mt-4 space-y-4">
            {t.furtherReading.map((block) => (
              <div
                key={block.title}
                className="rounded-xl border border-neutral-200/70 bg-neutral-50/80 p-4 dark:border-neutral-600/50 dark:bg-neutral-900/40 sm:p-5"
              >
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{block.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section !pt-0">
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50/50 p-4 text-xs leading-relaxed text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900/30 dark:text-neutral-500 sm:text-sm">
            {t.disclaimer}
          </div>
        </section>
      </div>
    </main>
  )
}

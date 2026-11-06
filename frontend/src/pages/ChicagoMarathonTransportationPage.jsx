import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'
import withBoldRuns from '../components/chicagoMarathon/withBoldRuns'

/** Phrases in body text that link automatically: `to` is an in-site route, `href` opens in a new tab. */
const AUTO_LINKS = [
  {
    href: 'https://www.transitchicago.com/assets/1/6/rail-tt_blue.pdf',
    phrases: ['CTA 蓝线（Blue Line）', 'CTA 蓝线', '蓝线（Blue Line）', '蓝线', 'CTA Blue Line', 'Blue Line'],
  },
  {
    href: 'https://www.ventrachicago.com/',
    phrases: ['Ventra App', 'Ventra app'],
  },
  {
    href: 'https://www.transitchicago.com/',
    phrases: ['CTA 官网', 'CTA website'],
  },
  {
    href: 'https://www.uber.com/us/en/rider-home/',
    phrases: ['Uber 车费估算网站', 'Uber fare estimate site'],
  },
  {
    to: CHICAGO_MARATHON_ROUTES.hotelShuttle,
    phrases: [
      '免费机场Shuttle',
      'free airport shuttle',
      '酒店免费班车（Shuttle）',
      '免费机场班车（Shuttle）',
      '免费班车（Shuttle）',
      '酒店免费班车',
      '免费酒店班车',
      '免费机场班车',
      '免费班车',
      'Shuttle',
      'shuttle',
    ],
  },
  {
    to: CHICAGO_MARATHON_ROUTES.hotel,
    phrases: [
      'Hyatt Place Chicago O’Hare Airport（凯悦嘉轩奥黑尔）',
      'Hyatt Place Chicago O’Hare Airport',
      'Hyatt Place O’Hare',
    ],
  },
]
const AUTO_LINK_BY_PHRASE = new Map(AUTO_LINKS.flatMap((link) => link.phrases.map((phrase) => [phrase, link])))
// Longest phrases first so e.g. "CTA 蓝线（Blue Line）" becomes one link, not two.
const AUTO_LINK_PATTERN = new RegExp(
  `(${[...AUTO_LINK_BY_PHRASE.keys()]
    .sort((a, b) => b.length - a.length)
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})`,
)
const AUTO_LINK_CLASS =
  'font-medium text-sky-700 underline underline-offset-2 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200'

/**
 * Body text: `**bold**` runs plus the AUTO_LINKS phrases turned into links.
 * Each link target is linked only at its first mention, so a paragraph doesn't repeat a link;
 * pass a shared `linked` set to extend that across several paragraphs.
 */
function richText(text, linked = new Set()) {
  return withBoldRuns(text).map((run) => {
    // Leave bold runs alone so an emphasized note keeps its own styling.
    if (run.type === 'strong') return run
    const parts = run.props.children.split(AUTO_LINK_PATTERN)
    if (parts.length === 1) return run
    const Tag = run.type
    return (
      <Tag key={run.key}>
        {parts.map((part, i) => {
          const link = i % 2 === 1 && AUTO_LINK_BY_PHRASE.get(part)
          if (!link || linked.has(link)) return part
          linked.add(link)
          return link.to ? (
            <Link key={i} to={link.to} className={AUTO_LINK_CLASS}>
              {part}
            </Link>
          ) : (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className={AUTO_LINK_CLASS}>
              {part}
            </a>
          )
        })}
      </Tag>
    )
  })
}

const TRANSPORT_IMAGES = {
  airportTransit: '/marathon-transport/ord-airport-transit-sign.png',
  walkRentalToHyatt: '/marathon-transport/walk-rental-center-to-hyatt.png',
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
          {richText(caption)}
        </figcaption>
      ) : null}
    </figure>
  )
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base [&_strong]:font-bold [&_strong]:text-chi-red dark:[&_strong]:text-chi-red-light">
      {items.map((line) => (
        <li key={line}>{richText(line)}</li>
      ))}
    </ul>
  )
}

function AddressBlock({ label, lines }) {
  return (
    <div className="rounded-xl border border-neutral-200/70 bg-white/60 px-4 py-3 dark:border-neutral-600/60 dark:bg-neutral-900/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-chi-red dark:text-chi-red-light">{richText(label)}</p>
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
  // Shared across the intro paragraphs so e.g. the Blue Line is linked once, in the first.
  const introLinked = new Set()
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
          {[].concat(t.pageIntro).map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {richText(paragraph, introLinked)}
            </p>
          ))}
          <div className="mt-4 flex flex-wrap gap-3">
            {mw.bookingCtas.hotelClosed ? (
              <span
                aria-disabled="true"
                className="inline-flex min-h-[44px] cursor-not-allowed items-center justify-center rounded-xl bg-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500"
              >
                {hotel.ctaBook}
              </span>
            ) : (
              <a
                href={hotel.hotelBookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-chi-red px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-chi-red-hover"
              >
                {hotel.ctaBook}
              </a>
            )}
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
            <AddressBlock label={t.addresses.hotel.label} lines={t.addresses.hotel.lines} />
            <AddressBlock label={t.addresses.ctaBlue.label} lines={t.addresses.ctaBlue.lines} />
            <AddressBlock label={t.addresses.ctaJackson.label} lines={t.addresses.ctaJackson.lines} />
            <AddressBlock label={t.addresses.expo.label} lines={t.addresses.expo.lines} />
            <AddressBlock label={t.addresses.startFinish.label} lines={t.addresses.startFinish.lines} />
          </div>
        </section>

        <section id="hotel-downtown" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.hotelDowntown.title}</h2>
          <BulletList items={t.sections.hotelDowntown.steps.slice(0, 1)} />
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {richText(t.sections.airportHotel.signCtaBody)}
          </p>
          <FigureImg src={TRANSPORT_IMAGES.ctaSign} alt={t.images.ctaSign.alt} caption={t.images.ctaSign.caption} />
          <BulletList items={t.sections.hotelDowntown.steps.slice(1)} />
        </section>

        <section id="airport-hotel" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.airportHotel.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {richText(t.sections.airportHotel.lead)}
          </p>

          {/* Same card style as the collapsible below, but always shown — the shuttle is the main option. */}
          <div className="mt-6 rounded-xl border border-neutral-200/80 bg-white/70 px-4 py-3 text-base font-semibold text-neutral-900 dark:border-neutral-600/60 dark:bg-neutral-900/50 dark:text-neutral-100">
            {richText(t.sections.airportHotel.shuttleOptionTitle)}
          </div>

          {/* Few people walk back to the hotel, so the Airport Transit + walking guide stays collapsed by default. */}
          <details className="group mt-3 rounded-xl border border-neutral-200/80 bg-white/70 px-4 py-3 dark:border-neutral-600/60 dark:bg-neutral-900/50">
            <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 marker:content-none dark:text-neutral-100 [&::-webkit-details-marker]:hidden">
              <span className="inline-flex w-full items-center justify-between gap-2">
                <span>{t.sections.airportHotel.walkTitle}</span>
                <span className="text-neutral-400 transition-transform group-open:rotate-180">▾</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
              {richText(t.sections.airportHotel.walkIntro)}
            </p>
            <h3 className="mt-6 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.airportHotel.signAirportTransitTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
              {richText(t.sections.airportHotel.signAirportTransitBody)}
            </p>
            <FigureImg
              src={TRANSPORT_IMAGES.airportTransit}
              alt={t.images.airportTransit.alt}
              caption={t.images.airportTransit.caption}
            />
            <TipBox title={t.sections.airportHotel.walkHighlightTitle} variant="amber">
              <p className="font-medium">{richText(t.sections.airportHotel.walkHighlight)}</p>
              <p>{richText(t.sections.airportHotel.walkStats)}</p>
            </TipBox>
            <FigureImg
              src={TRANSPORT_IMAGES.walkRentalToHyatt}
              alt={t.images.walkRental.alt}
              caption={t.images.walkRental.caption}
            />
            <BulletList items={t.sections.airportHotel.walkBullets} />
          </details>
        </section>

        <section id="hotel-expo" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.hotelExpo.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {richText(t.sections.hotelExpo.lead)}
          </p>
          <TipBox title={t.sections.hotelExpo.tipTitle}>
            <p>{richText(t.sections.hotelExpo.tipBody)}</p>
          </TipBox>
          <h3 className="mt-6 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.hotelExpo.ctaRouteTitle}</h3>
          <BulletList items={t.sections.hotelExpo.ctaRouteSteps} />
          <p className="mt-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">{richText(t.sections.hotelExpo.ctaRouteTime)}</p>
        </section>

        <section id="cta-guide" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.cta.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">{richText(t.sections.cta.lead)}</p>

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.cta.faresTitle}</h3>
          <BulletList items={t.sections.cta.fares} />

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.cta.buyTitle}</h3>
          <BulletList items={t.sections.cta.buySteps} />

          <TipBox title={t.sections.cta.googleMapsTitle}>
            <p>{richText(t.sections.cta.googleMapsBody)}</p>
          </TipBox>

          <h3 className="mt-8 text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.sections.cta.toExpoTitle}</h3>
          <BulletList items={t.sections.cta.toExpoSteps} />
          <p className="mt-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">{richText(t.sections.cta.toExpoTime)}</p>

          <TipBox title={t.sections.cta.beginnerTitle}>
            <p>{richText(t.sections.cta.beginnerBody)}</p>
          </TipBox>
        </section>

        <section id="race-day" className="section scroll-mt-28">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">{t.sections.raceDay.title}</h2>
          <TipBox title={t.sections.raceDay.busTitle} variant="amber">
            <p className="font-medium">{richText(t.sections.raceDay.busBody)}</p>
            <p>
              <Link
                to={CHICAGO_MARATHON_ROUTES.bus}
                className="font-semibold text-chi-red hover:text-chi-red-hover hover:underline"
              >
                {t.sections.raceDay.busLinkLabel}
              </Link>
            </p>
          </TipBox>
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
                  {richText(item.a)}
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
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{richText(block.body)}</p>
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

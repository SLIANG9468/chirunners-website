import { apiUrl } from '../../apiBase'

/** Reuse marathon hero asset until a dedicated image is added. */
const HERO_IMAGE_SRC = apiUrl('/api/marathon-welcome/hero-photo/hero-1')

/** Photography team hero banner: photo with title lines and subtitle overlaid. */
export default function PhotographyHero({ titleLines, subtitle }) {
  return (
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
            {titleLines.map((line, i) => (
              <span key={i} className={i === 0 ? 'block' : 'mt-1 block sm:mt-2'}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

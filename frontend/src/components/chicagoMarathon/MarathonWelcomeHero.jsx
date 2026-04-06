/** Static hero banner (`public/chicago-marathon/hero-1.jpg`). */
const HERO_IMAGE_SRC = '/chicago-marathon/hero-1.jpg'

/**
 * Manual hero alignment (tweak here, save, refresh):
 *
 * `object-position` — where `object-fit: cover` anchors the image.
 *   Examples: 'center top', 'center 18%', 'center 40%'.
 *   Lower vertical % (or `top`) = keep skyline / spire in frame.
 *   Higher % = show more of the lower part of the photo.
 *
 * `translateY` — extra nudge after positioning. Pixel string, e.g. '-6px', '0px', '10px'.
 *   Negative = move the photo up inside the crop. Positive = move down.
 */
const HERO_OBJECT_POSITION = 'center top'
const HERO_TRANSLATE_Y = '-50px'

/** Move the title + body text block down (+) or up (−). Edit here as needed. */
const HERO_TEXT_TRANSLATE_Y = '20px'

export default function MarathonWelcomeHero({ copy }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-card dark:border-neutral-700 dark:bg-neutral-800/80">
      <div className="relative aspect-[5/2] min-h-[200px] w-full max-h-[min(42vh,420px)]">
        <img
          src={HERO_IMAGE_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: HERO_OBJECT_POSITION,
            transform: `translateY(${HERO_TRANSLATE_Y})`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 text-left sm:p-10"
          style={{ transform: `translateY(${HERO_TEXT_TRANSLATE_Y})` }}
        >
          <h1 className="max-w-3xl font-semibold text-3xl tracking-tight text-white drop-shadow-sm sm:text-4xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">
            {copy.heroCourse}
          </p>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-chi-red-light sm:text-base">
            {copy.heroClub}
          </p>
        </div>
      </div>
    </div>
  )
}

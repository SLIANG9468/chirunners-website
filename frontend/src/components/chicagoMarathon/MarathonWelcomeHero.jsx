/** Static hero (`public/chicago-marathon/hero-1.jpg`). Skyline / spire must stay in frame on small screens. */
const HERO_IMAGE_SRC = '/chicago-marathon/hero-1.jpg'

/** Anchor crop to top center — keeps the Sears (Willis) Tower antenna in view with `object-fit: cover`. */
const HERO_OBJECT_POSITION = 'center top'

const textShadow =
  '[text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_16px_rgba(0,0,0,0.45)]'

export default function MarathonWelcomeHero({ copy }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-card dark:border-neutral-700 dark:bg-neutral-800/80">
      {/*
        Mobile-first stage: height tracks the viewport (not a 5:2 strip).
        iPhone 8 (~667px H): 52vh ≈ 346px, clamp floor 328px — stable room for headline + two lines.
        Pro Max (~932px H): 52vh ≈ 484px, cap 36rem — impactful without excessive scroll.
        md+: cinematic 5/2 band + existing vertical nudge on the photo.
      */}
      <div
        className="relative isolate flex w-full flex-col justify-end overflow-hidden
          min-h-[clamp(20.5rem,52vh,34rem)] max-h-[min(68vh,36rem)]
          md:min-h-[12.5rem] md:max-h-[min(42vh,26.25rem)] md:aspect-[5/2]"
      >
        <img
          src={HERO_IMAGE_SRC}
          alt=""
          className="pointer-events-none absolute inset-x-0 top-0 w-full object-cover
            max-md:h-[104%] max-md:origin-top max-md:-translate-y-[10px]
            md:inset-0 md:h-full md:translate-y-[-3.125rem]"
          style={{ objectPosition: HERO_OBJECT_POSITION }}
        />

        {/* Full-frame scrim: light at top (skyline), heavy toward bottom */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/90 md:bg-gradient-to-t md:from-black/78 md:via-black/38 md:to-black/12"
          aria-hidden="true"
        />
        {/* Mobile-only: extra legibility band where type sits */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/90 via-black/60 to-transparent md:hidden"
          aria-hidden="true"
        />

        <div
          className="relative z-10 flex w-full max-w-full flex-col gap-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom,0px))] pt-14 text-left
            sm:gap-3 sm:px-6 sm:pb-8 sm:pt-20
            md:gap-0 md:px-10 md:pb-10 md:pt-24 md:translate-y-[1.25rem]"
        >
          {/* Mobile: title + club on the image/gradient. Desktop: same stack + heroCourse. */}
          <h1
            className={`max-w-[20.5rem] text-balance break-words font-semibold tracking-tight text-white ${textShadow}
              text-2xl leading-[1.22] sm:max-w-3xl sm:text-3xl sm:leading-snug md:text-4xl md:leading-tight`}
          >
            {copy.heroTitle}
          </h1>

          <p
            className={`hidden max-w-2xl break-words text-base leading-relaxed text-white/95 md:mt-3 md:block md:text-lg ${textShadow}`}
          >
            {copy.heroCourse}
          </p>

          <p
            className={`max-w-2xl break-words text-sm font-medium leading-relaxed text-chi-red-light sm:text-base md:mt-3 ${textShadow}`}
          >
            {copy.heroClub}
          </p>
        </div>
      </div>
    </div>
  )
}

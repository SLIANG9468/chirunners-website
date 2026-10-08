import { apiUrl } from '../../apiBase'

/** Photographer cards (photo, name, optional website / Instagram links). */
export default function PhotographerGrid({ photographers, websiteLabel }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photographers.map((photographer) => (
        <div
          key={photographer.photoKey || photographer.name}
          className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/70 text-center shadow-card dark:border-neutral-700/80 dark:bg-neutral-900/40"
        >
          {photographer.photoKey ? (
            <img
              src={apiUrl(`/api/marathon-welcome/photographer-photo/${photographer.photoKey}`)}
              alt={photographer.name}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full scale-105 object-cover object-top"
            />
          ) : null}
          <div className="p-5">
            <div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{photographer.name}</div>
            {photographer.websiteUrl ? (
              <a
                href={photographer.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-medium text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover"
              >
                {websiteLabel}
              </a>
            ) : null}
            {photographer.instagramUrl ? (
              <a
                href={photographer.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-medium text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover"
              >
                Instagram
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

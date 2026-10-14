import TeamVideoPlayer from './TeamVideoPlayer'

/** Pulls a 4-digit year out of a SmugMug asset path, e.g. `.../Teams/2025/...` → "2025". */
function assetYearFromUrl(url) {
  const m = typeof url === 'string' ? url.match(/\/(20\d{2})(?:-Video)?\//) : null
  return m ? m[1] : null
}

export default function TeamCard({ team, labels, copy, currentYear }) {
  const hasContactRow = Boolean(
    labels.contactName ||
      team.emails?.length ||
      team.wechat ||
      labels.locationLines?.length ||
      team.linkUrl ||
      team.links?.length ||
      labels.contactLines?.length,
  )

  const photoYear = assetYearFromUrl(team.photoUrl)
  // `video.year` overrides URL detection — needed for YouTube, whose id carries no year.
  const videoYear = team.video?.year || assetYearFromUrl(team.video?.src)
  const isPhotoLegacy = Boolean(currentYear && photoYear && photoYear !== currentYear)
  // Without a year, assume a YouTube video hasn't been refreshed for `currentYear` yet.
  const isVideoLegacy = Boolean(
    currentYear && team.video && (videoYear ? videoYear !== currentYear : team.video.type === 'youtube'),
  )
  const isBothLegacy = isPhotoLegacy && isVideoLegacy
  const isBothCurrent = Boolean(currentYear && photoYear === currentYear && videoYear === currentYear)

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900/60">
      <div className="bg-chi-red px-5 py-3 text-base font-semibold text-white">
        {team.flag} {labels.name}
      </div>

      <img src={team.photoUrl} alt={labels.name} loading="lazy" decoding="async" className="w-full" />

      {isBothLegacy && copy.legacyBothNote ? (
        <p className="bg-neutral-50 px-4 py-1.5 text-xs leading-relaxed text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
          {copy.legacyBothNote}
        </p>
      ) : isPhotoLegacy && copy.legacyPhotoNote ? (
        <p className="bg-neutral-50 px-4 py-1.5 text-xs leading-relaxed text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
          {copy.legacyPhotoNote}
        </p>
      ) : isBothCurrent && copy.currentBothNote ? (
        <p className="bg-neutral-50 px-4 py-1.5 text-xs leading-relaxed text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
          {copy.currentBothNote}
        </p>
      ) : null}

      {team.video ? (
        <div className="p-4">
          {!isBothLegacy && isVideoLegacy && copy.legacyVideoNote ? (
            <p className="mb-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              {copy.legacyVideoNote}
            </p>
          ) : null}
          <TeamVideoPlayer video={team.video} title={labels.name} />
        </div>
      ) : null}

      {hasContactRow ? (
        <div className="border-t border-neutral-200 p-5 text-sm leading-relaxed text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">
            🏃‍♀️🏃‍♂️ {copy.groupRunWelcome}
            {labels.contactName ? ` — ${copy.contactLabel}: ${labels.contactName}` : ''}
          </p>
          <ul className="mt-2 list-none space-y-1 p-0">
            {(team.emails || []).map((email) => (
              <li key={email}>
                {copy.emailLabel}:{' '}
                <a href={`mailto:${email}`} className="text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover">
                  {email}
                </a>
              </li>
            ))}
            {team.wechat ? (
              <li>
                {copy.wechatLabel}: 🟢💬 {team.wechat}
              </li>
            ) : null}
            {(labels.locationLines || []).map((line) =>
              typeof line === 'string' ? (
                <li key={line}>📍 {line}</li>
              ) : (
                <li key={line.text}>
                  📍 {line.text}{' '}
                  <a
                    href={line.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover"
                  >
                    {copy.mapLinkLabel || 'Map'}
                  </a>
                </li>
              ),
            )}
            {(labels.contactLines || []).map((line) => (
              <li key={line}>📱 {line}</li>
            ))}
            {team.linkUrl ? (
              <li>
                👉 {copy.contactViaLabel}{' '}
                <a
                  href={team.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover"
                >
                  {labels.linkText}
                </a>
              </li>
            ) : null}
            {(team.links || []).map((url, i) => (
              <li key={url}>
                👉 {copy.contactViaLabel}{' '}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chi-red underline decoration-1 underline-offset-2 hover:text-chi-red-hover"
                >
                  {labels.linkTexts?.[i] || url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  )
}

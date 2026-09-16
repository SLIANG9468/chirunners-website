import TeamVideoPlayer from './TeamVideoPlayer'

export default function TeamCard({ team, labels, copy }) {
  const hasContactRow = Boolean(
    labels.contactName || team.emails?.length || team.wechat || labels.locationLines?.length || team.linkUrl,
  )

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900/60">
      <div className="bg-chi-red px-5 py-3 text-base font-semibold text-white">
        {team.flag} {labels.name}
      </div>

      <img src={team.photoUrl} alt={labels.name} loading="lazy" decoding="async" className="w-full" />

      <div className="p-4">
        <TeamVideoPlayer video={team.video} poster={team.photoUrl} title={labels.name} />
      </div>

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
            {(labels.locationLines || []).map((line) => (
              <li key={line}>📍 {line}</li>
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
          </ul>
        </div>
      ) : null}
    </article>
  )
}

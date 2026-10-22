import BackupReviewBanner from '../components/BackupReviewBanner'
import MarathonPreviewCard from '../components/chicagoMarathon/MarathonPreviewCard'
import { BACKUP_PAGES } from '../constants/backupPages'

/** Unlisted index of saved / draft pages (chirunners.org/backup). Not linked from the site; noindex. */
export default function BackupPage() {
  return (
    <>
      <BackupReviewBanner showBackLink={false} />
      <main className="siteMain siteMain--marathonWelcome">
        <div className="mx-auto max-w-4xl px-0 text-left">
          <section className="section">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
              存档与审阅页面 · Backups &amp; review pages
            </h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">
              这些页面不对外公开，只用于内部审阅或保存旧版本。This page and everything linked below are unlisted and
              hidden from search engines.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BACKUP_PAGES.map((page) => (
                <MarathonPreviewCard
                  key={page.to}
                  title={page.title}
                  description={page.description}
                  cta={page.cta}
                  to={page.to}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

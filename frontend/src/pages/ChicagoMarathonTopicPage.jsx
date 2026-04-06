import { Link } from 'react-router-dom'
import { CHICAGO_MARATHON_ROUTES } from '../constants/chicagoMarathonRoutes'

const VALID_TOPICS = new Set(['carbLoading', 'hotel', 'transportation'])

export default function ChicagoMarathonTopicPage({ copy, topicId }) {
  const mw = copy.marathonWelcome
  const safeId = VALID_TOPICS.has(topicId) ? topicId : null
  const topic = safeId ? mw.topics[safeId] : null

  if (!topic) {
    return (
      <main className="siteMain">
        <section className="section text-left">
          <p className="text-neutral-600 dark:text-neutral-400">Topic not found.</p>
          <Link
            to={CHICAGO_MARATHON_ROUTES.hub}
            className="mt-4 inline-block font-medium text-chi-red hover:underline"
          >
            {mw.backToHub}
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="siteMain">
      <div className="mx-auto max-w-3xl text-left">
        <section className="section">
          <Link
            to={CHICAGO_MARATHON_ROUTES.hub}
            className="inline-flex text-sm font-medium text-chi-red hover:text-chi-red-hover hover:underline"
          >
            {mw.backToHub}
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            {topic.title}
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
            {topic.body}
          </p>
        </section>
      </div>
    </main>
  )
}

import { Link, useParams } from 'react-router-dom'
import StateMessage from './StateMessage.jsx'
import { useContent } from '../hooks/useContent.js'
import { useLanguage } from '../context/useLanguage.js'
import { getLocalizedText } from '../utils/contentText.js'

function BeliefDetailPage() {
  const { id } = useParams()
  const { language, messages } = useLanguage()
  const { status, data: beliefs, retry } = useContent('beliefs')

  if (status === 'loading') {
    return <main id="main-content" tabIndex="-1"><StateMessage kind="loading" /></main>
  }

  if (status === 'error') {
    return <main id="main-content" tabIndex="-1"><StateMessage kind="error" onRetry={retry} /></main>
  }

  if (status === 'empty') {
    return <main id="main-content" tabIndex="-1"><StateMessage kind="empty" /></main>
  }

  const belief = beliefs.find((item) => item.id === id)

  if (!belief) {
    return (
      <main id="main-content" tabIndex="-1">
        <StateMessage
          kind="notFound"
          homeLink={(
            <Link className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#103d55]" to="/">
              {messages.returnHome}
            </Link>
          )}
        />
      </main>
    )
  }

  const topic = getLocalizedText(belief.topic, language)
  const title = getLocalizedText(belief.title, language)
  const summary = getLocalizedText(belief.summary, language)
  const detail = getLocalizedText(belief.detail, language)
  const references = belief.references?.[language] ?? belief.references?.en ?? []

  return (
    <main id="main-content" tabIndex="-1" className="mx-auto min-h-[60vh] max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <Link
        className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-700 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
        to="/"
      >
        <span aria-hidden="true" className="mr-2">←</span>{messages.backToBeliefs}
      </Link>

      <article className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-800">{topic.text}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#172b3a] sm:text-4xl">{title.text}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{summary.text}</p>

        {language === 'th' && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
            {messages.thaiTextPending}
          </p>
        )}

        <section aria-labelledby="belief-overview-heading" className="mt-8 border-t border-slate-200 pt-6">
          <h2 id="belief-overview-heading" className="text-xl font-semibold text-[#172b3a]">{messages.readOverview}</h2>
          <p className="mt-3 leading-7 text-slate-700">{detail.text}</p>
        </section>

        <section aria-labelledby="study-references-heading" className="mt-8 border-t border-slate-200 pt-6">
          <h2 id="study-references-heading" className="text-lg font-semibold text-[#172b3a]">{messages.studyReferences}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {references.map((reference) => (
              <li key={reference} className="rounded-full bg-sky-50 px-3 py-1.5 text-sm text-sky-950">{reference}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="source-materials-heading" className="mt-8 border-t border-slate-200 pt-6">
          <h2 id="source-materials-heading" className="text-lg font-semibold text-[#172b3a]">Source materials</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm leading-6 text-slate-600">
            {belief.sources.map((source) => <li key={source}>{source}</li>)}
          </ul>
        </section>

        <p className="mt-8 rounded-xl border border-sky-200 bg-[#e9f5fa] px-4 py-3 text-sm leading-6 text-sky-950">
          <span className="font-semibold">{messages.contentNoteLabel}</span> {messages.contentNote}
        </p>
      </article>
    </main>
  )
}

export default BeliefDetailPage

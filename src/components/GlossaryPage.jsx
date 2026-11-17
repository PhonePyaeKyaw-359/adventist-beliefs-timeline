import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import StateMessage from './StateMessage.jsx'
import { useContent } from '../hooks/useContent.js'
import { useLanguage } from '../context/useLanguage.js'
import { getLocalizedText, normalizeSearchText } from '../utils/contentText.js'

function GlossaryPage() {
  const { language, messages } = useLanguage()
  const { status, data: terms, retry } = useContent('glossary')
  const { data: beliefs } = useContent('beliefs')
  const [search, setSearch] = useState('')

  const visibleTerms = useMemo(() => {
    if (!terms) return []
    const query = normalizeSearchText(search, language)
    return terms.filter((entry) => {
      const term = getLocalizedText(entry.term, language).text
      const definition = getLocalizedText(entry.definition, language).text
      const searchable = normalizeSearchText(`${term} ${definition}`, language)
      return searchable.includes(query)
    }).sort((first, second) => first.term.en.localeCompare(second.term.en))
  }, [language, search, terms])

  return (
    <main id="main-content" tabIndex="-1" className="mx-auto min-h-[60vh] max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">Bible Heritage</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#172b3a] sm:text-4xl">{messages.glossary}</h1>
        <p className="mt-4 leading-7 text-slate-600">Search short explanations for terms used in the five belief topics.</p>
      </header>

      {language === 'th' && (
        <p lang="en" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          Thai glossary text has not been added or reviewed yet. The entries below are shown in English.
        </p>
      )}

      {status === 'loading' && <StateMessage kind="loading" headingLevel={2} />}
      {status === 'error' && <StateMessage kind="error" headingLevel={2} onRetry={retry} />}
      {status === 'empty' && <StateMessage kind="empty" headingLevel={2} />}

      {status === 'success' && (
        <>
          <label className="mt-8 block">
            <span lang="en" className="mb-2 block text-sm font-semibold text-slate-800">Search glossary terms</span>
            <input
              className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition placeholder:text-slate-500 focus:border-sky-700 focus:ring-4 focus:ring-sky-900/10"
              type="search"
              lang={language}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try Bible, Sabbath, or resurrection"
            />
          </label>

          {visibleTerms.length > 0 ? (
            <ol className="mt-4 space-y-4">
              {visibleTerms.map((entry) => {
                const term = getLocalizedText(entry.term, language)
                const definition = getLocalizedText(entry.definition, language)
                const relatedBelief = beliefs?.find((belief) => belief.id === entry.relatedBeliefId)

                return (
                  <li key={entry.id}>
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                      <h2 className="text-xl font-semibold text-[#172b3a]" lang={term.isFallback ? 'en' : language}>{term.text}</h2>
                      <p className="mt-3 leading-7 text-slate-700" lang={definition.isFallback ? 'en' : language}>{definition.text}</p>

                      {relatedBelief && (
                        <p className="mt-4 text-sm">
                          <Link className="min-h-10 rounded text-sky-900 underline decoration-sky-300 underline-offset-4 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700" to={`/belief/${relatedBelief.id}`}>
                            {getLocalizedText(relatedBelief.topic, language).text} <span aria-hidden="true">→</span>
                          </Link>
                        </p>
                      )}

                      <details className="mt-4 border-t border-slate-200 pt-3">
                        <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg text-sm font-semibold text-sky-800 outline-none hover:text-sky-950 focus-visible:ring-2 focus-visible:ring-sky-700 focus-visible:ring-offset-2">
                          <span>{messages.readOverview}</span>
                          <span aria-hidden="true" className="text-lg">+</span>
                        </summary>
                        <div className="mt-3 space-y-4 text-sm leading-6 text-slate-600">
                          <div>
                            <h3 className="font-semibold text-slate-800">{messages.studyReferences}</h3>
                            <ul className="mt-1 flex flex-wrap gap-2">
                              {entry.references.map((reference) => <li key={reference} className="rounded-full bg-sky-50 px-3 py-1 text-sky-950">{reference}</li>)}
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">Source materials</h3>
                            <ul className="mt-1 list-inside list-disc">
                              {entry.sources.map((source) => <li key={source}>{source}</li>)}
                            </ul>
                          </div>
                        </div>
                      </details>
                    </article>
                  </li>
                )
              })}
            </ol>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
              <h2 lang="en" className="text-lg font-semibold text-[#172b3a]">No glossary entries match your search</h2>
              <p lang="en" className="mt-2 text-slate-600">Try another term or clear your search.</p>
              <button
                className="mt-4 min-h-11 rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                type="button"
                onClick={() => setSearch('')}
              >
                <span lang="en">Clear search</span>
              </button>
            </div>
          )}

          <p className="mt-6 rounded-xl border border-sky-200 bg-[#e9f5fa] px-4 py-3 text-sm leading-6 text-sky-950" lang="en">
            Glossary entries are drafts based on the supplied lesson materials and are awaiting review by the knowledge-holder.
          </p>
        </>
      )}
    </main>
  )
}

export default GlossaryPage

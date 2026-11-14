import { useMemo, useState } from 'react'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import StateMessage from './components/StateMessage.jsx'
import { useContent } from './hooks/useContent.js'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { useLanguage } from './context/useLanguage.js'
import { beliefMatchesSearch, getLocalizedText } from './utils/contentText.js'

function HomePage() {
  const { language, messages } = useLanguage()
  const { status, data: beliefs, retry } = useContent('beliefs')
  const [search, setSearch] = useState('')
  const [activeTopic, setActiveTopic] = useState('all')
  const [savedIds, setSavedIds] = useState([])
  const [showSavedOnly, setShowSavedOnly] = useState(false)

  const topics = useMemo(
    () => [{ id: 'all', label: messages.allFive }, ...(beliefs ?? []).map((belief) => ({ id: belief.id, label: getLocalizedText(belief.topic, language).text }))],
    [beliefs, language, messages.allFive],
  )
  const visibleBeliefs = useMemo(() => {
    if (!beliefs) return []
    return beliefs.filter((belief) => {
      const matchesSearch = beliefMatchesSearch(belief, search, language)
      const matchesTopic = activeTopic === 'all' || belief.id === activeTopic
      const matchesSaved = !showSavedOnly || savedIds.includes(belief.id)
      return matchesSearch && matchesTopic && matchesSaved
    })
  }, [activeTopic, beliefs, language, savedIds, search, showSavedOnly])

  function resetFilters() {
    setSearch('')
    setActiveTopic('all')
    setShowSavedOnly(false)
  }

  function toggleSaved(id) {
    setSavedIds((current) => current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id])
  }

  return (
    <>
      <main id="main-content" tabIndex="-1">
        <section aria-labelledby="intro-heading" className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-900/15 bg-white/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-sky-900">{messages.friendlyGuide}</p>
            <h1 id="intro-heading" className="max-w-3xl text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[#172b3a] sm:text-5xl lg:text-6xl">
              {messages.heroTitleStart} <span className="font-serif italic font-normal text-sky-800">{messages.heroTitleEnd}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">{messages.heroDescription}</p>
            <a className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#174e6b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-800" href="#beliefs">{messages.exploreFive} <span aria-hidden="true">↓</span></a>
            <p className="mt-5 text-xs font-medium tracking-wide text-slate-500">{messages.studentProject}</p>
          </div>
          <aside className="rounded-[1.75rem] bg-gradient-to-br from-[#153e56] to-[#286b88] p-6 text-white shadow-xl sm:p-8 lg:p-9" aria-label={messages.fiveTopicsLabel}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#bfe8f5]">{messages.fiveSteps}</p>
            <p className="mt-2 text-sm text-white/75">{messages.fiveStepsHint}</p>
            {status === 'success' && (
              <ol className="mt-5 space-y-1">
                {beliefs.map((belief) => <li key={belief.id} className="flex items-center gap-3 rounded-xl px-2 py-2"><span className="grid size-7 place-items-center rounded-full border border-white/30 font-mono text-xs">{belief.number}</span><a className="text-white/90 underline-offset-4 hover:underline" href={`#${belief.id}`}>{getLocalizedText(belief.topic, language).text}</a></li>)}
              </ol>
            )}
          </aside>
        </section>

        <section id="beliefs" aria-labelledby="beliefs-heading" className="scroll-mt-20 border-y border-slate-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">{messages.exploreTimeline}</p>
              <h2 id="beliefs-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{messages.beginHeading}</h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">{messages.timelineIntro}</p>
            </div>

            {status === 'loading' && <StateMessage kind="loading" />}
            {status === 'error' && <StateMessage kind="error" onRetry={retry} />}
            {status === 'empty' && <StateMessage kind="empty" />}

            {status === 'success' && <>
              <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-4">
                <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">{messages.searchLabel}</span><input lang={language} className="min-h-12 w-full rounded-xl border border-slate-300 bg-[#f7fbfd] px-4 py-3 text-base outline-none transition placeholder:text-slate-500 focus:border-sky-700 focus:ring-4 focus:ring-sky-900/10" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={messages.searchPlaceholder} /></label>
                <button className={`min-h-12 rounded-xl border px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${showSavedOnly ? 'border-[#174e6b] bg-[#174e6b] text-white' : 'border-slate-300 bg-white hover:border-sky-700'}`} type="button" aria-pressed={showSavedOnly} onClick={() => setShowSavedOnly((showing) => !showing)}>{showSavedOnly ? messages.viewingSaved : messages.savedTopics.replace('{count}', String(savedIds.length))}</button>
              </div>
              <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label={messages.filterLabel}>
                {topics.map((topic) => <button key={topic.id} className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${activeTopic === topic.id ? 'border-[#174e6b] bg-[#174e6b] text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-sky-700'}`} type="button" aria-pressed={activeTopic === topic.id} onClick={() => setActiveTopic(topic.id)}>{topic.label}</button>)}
              </div>
              <p className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-500" aria-live="polite">{messages.showingCount.replace('{visible}', String(visibleBeliefs.length)).replace('{total}', String(beliefs.length))}</p>
              {visibleBeliefs.length > 0 ? <ol className="mt-4 space-y-3">
                {visibleBeliefs.map((belief) => {
                  const isSaved = savedIds.includes(belief.id)
                  const topicText = getLocalizedText(belief.topic, language)
                  const titleText = getLocalizedText(belief.title, language)
                  const summaryText = getLocalizedText(belief.summary, language)
                  const detailText = getLocalizedText(belief.detail, language)
                  const topicForLabel = topicText.text
                  return <li key={belief.id} id={belief.id} className="scroll-mt-24"><article className="grid gap-4 rounded-2xl border border-slate-200 bg-[#fbfdfe] p-4 shadow-sm transition hover:border-sky-700/35 sm:grid-cols-[40px_minmax(0,1fr)_auto] sm:items-start sm:gap-5 sm:p-6 lg:p-7">
                    <span className="grid size-10 place-items-center rounded-full border border-sky-200 bg-[#eaf6fb] font-mono text-xs font-semibold text-sky-950">{belief.number}</span>
                    <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-800">{topicText.text}</p><h3 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">{titleText.text}</h3><p className="mt-3 max-w-3xl leading-7 text-slate-600">{summaryText.text}</p>{language === 'th' && <p className="mt-2 text-xs font-medium text-slate-500">{messages.thaiTextPending}</p>}
                      <details className="group mt-4 border-t border-slate-200 pt-3"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-sm font-semibold text-sky-800 outline-none hover:text-sky-950 focus-visible:ring-2 focus-visible:ring-sky-700 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"><span>{messages.readOverview}</span><span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-sky-50 text-lg transition group-open:rotate-45">+</span></summary><div className="max-w-3xl pb-2 pt-2 text-sm leading-7 text-slate-600"><p>{detailText.text}</p><p className="mt-3 text-xs font-medium leading-5 text-slate-500"><span className="font-semibold text-slate-700">{messages.studyReferences}</span> {belief.references[language].join(' · ')}</p></div></details>
                    </div><button className="min-h-11 w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-sky-700 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:mt-1" type="button" aria-pressed={isSaved} aria-label={(isSaved ? messages.removeSaved : messages.addSaved).replace('{topic}', topicForLabel)} onClick={() => toggleSaved(belief.id)}>{isSaved ? messages.saved : messages.saveTopic}</button>
                  </article></li>
                })}
              </ol> : <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-[#f7fbfd] p-6 sm:p-8"><h3 className="text-lg font-semibold">{showSavedOnly && savedIds.length === 0 ? messages.noSaved : messages.noMatches}</h3><p className="mt-2 text-slate-600">{showSavedOnly && savedIds.length === 0 ? messages.noSavedHint : messages.noMatchesHint}</p><button className="mt-5 min-h-11 rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700" type="button" onClick={resetFilters}>{messages.showAll}</button></div>}
            </>}
            <p className="mt-6 max-w-3xl rounded-xl border border-sky-200 bg-[#e9f5fa] px-4 py-3 text-sm leading-6 text-sky-950"><span className="font-semibold">{messages.contentNoteLabel}</span> {messages.contentNote}</p>
          </div>
        </section>
      </main>
    </>
  )
}

function AboutPage() {
  const { messages } = useLanguage()
  return <main id="main-content" tabIndex="-1" className="mx-auto min-h-[60vh] max-w-4xl px-4 py-12 sm:px-6 sm:py-16"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">{messages.projectGuide}</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{messages.aboutTitle}</h1><p className="mt-5 max-w-3xl leading-7 text-slate-600">{messages.aboutDescription}</p><Link className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700" to="/">{messages.backToBeliefs}</Link></main>
}

function GlossaryPage() {
  return <main id="main-content" tabIndex="-1"><StateMessage kind="info" /></main>
}

function NotFoundPage() {
  const { messages } = useLanguage()
  return <main id="main-content" tabIndex="-1"><StateMessage kind="notFound" homeLink={<Link className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#103d55]" to="/">{messages.returnHome}</Link>} /></main>
}

function App() {
  return <LanguageProvider><HashRouter><div id="top" className="min-h-screen overflow-x-hidden bg-[#f2f7fa] text-[#172b3a] antialiased"><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/belief/:id" element={<GlossaryPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/glossary" element={<GlossaryPage />} /><Route path="*" element={<NotFoundPage />} /></Routes><Footer /></div></HashRouter></LanguageProvider>
}

export default App

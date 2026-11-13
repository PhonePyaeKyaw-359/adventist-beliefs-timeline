import { useMemo, useState } from 'react'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import StateMessage from './components/StateMessage.jsx'
import { useContent } from './hooks/useContent.js'

function HomePage() {
  const { status, data: beliefs, retry } = useContent('beliefs')
  const [search, setSearch] = useState('')
  const [activeTopic, setActiveTopic] = useState('All five')
  const [savedIds, setSavedIds] = useState([])
  const [showSavedOnly, setShowSavedOnly] = useState(false)

  const topics = useMemo(
    () => ['All five', ...(beliefs ?? []).map((belief) => belief.topic)],
    [beliefs],
  )
  const visibleBeliefs = useMemo(() => {
    if (!beliefs) return []
    const term = search.trim().toLowerCase()
    return beliefs.filter((belief) => {
      const matchesSearch = `${belief.title} ${belief.summary}`.toLowerCase().includes(term)
      const matchesTopic = activeTopic === 'All five' || belief.topic === activeTopic
      const matchesSaved = !showSavedOnly || savedIds.includes(belief.id)
      return matchesSearch && matchesTopic && matchesSaved
    })
  }, [activeTopic, beliefs, savedIds, search, showSavedOnly])

  function resetFilters() {
    setSearch('')
    setActiveTopic('All five')
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
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-900/15 bg-white/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-sky-900">A friendly guide to Adventist beliefs</p>
            <h1 id="intro-heading" className="max-w-3xl text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[#172b3a] sm:text-5xl lg:text-6xl">
              A story of faith, <span className="font-serif italic font-normal text-sky-800">from beginning to hope.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">Explore five connected topics, from Scripture and Creation to Christ and the hope of resurrection.</p>
            <a className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#174e6b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-800" href="#beliefs">Explore the five topics <span aria-hidden="true">↓</span></a>
            <p className="mt-5 text-xs font-medium tracking-wide text-slate-500">A student project · Asia-Pacific International University</p>
          </div>
          <aside className="rounded-[1.75rem] bg-gradient-to-br from-[#153e56] to-[#286b88] p-6 text-white shadow-xl sm:p-8 lg:p-9" aria-label="The five topics">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#bfe8f5]">The story in five steps</p>
            <p className="mt-2 text-sm text-white/75">Follow the big questions behind the beliefs.</p>
            {status === 'success' && (
              <ol className="mt-5 space-y-1">
                {beliefs.map((belief) => <li key={belief.id} className="flex items-center gap-3 rounded-xl px-2 py-2"><span className="grid size-7 place-items-center rounded-full border border-white/30 font-mono text-xs">{belief.number}</span><a className="text-white/90 underline-offset-4 hover:underline" href={`#${belief.id}`}>{belief.topic}</a></li>)}
              </ol>
            )}
          </aside>
        </section>

        <section id="beliefs" aria-labelledby="beliefs-heading" className="scroll-mt-20 border-y border-slate-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">Explore the timeline</p>
              <h2 id="beliefs-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Where would you like to begin?</h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">Search, focus on one belief, or save topics to revisit during this visit.</p>
            </div>

            {status === 'loading' && <StateMessage kind="loading" />}
            {status === 'error' && <StateMessage kind="error" onRetry={retry} />}
            {status === 'empty' && <StateMessage kind="empty" />}

            {status === 'success' && <>
              <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-4">
                <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">Search the five topics</span><input className="min-h-12 w-full rounded-xl border border-slate-300 bg-[#f7fbfd] px-4 py-3 text-base outline-none transition placeholder:text-slate-500 focus:border-sky-700 focus:ring-4 focus:ring-sky-900/10" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try Scripture, Christ, or resurrection" /></label>
                <button className={`min-h-12 rounded-xl border px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${showSavedOnly ? 'border-[#174e6b] bg-[#174e6b] text-white' : 'border-slate-300 bg-white hover:border-sky-700'}`} type="button" aria-pressed={showSavedOnly} onClick={() => setShowSavedOnly((showing) => !showing)}>{showSavedOnly ? 'Viewing saved topics' : `Show saved (${savedIds.length})`}</button>
              </div>
              <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter topics">
                {topics.map((topic) => <button key={topic} className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${activeTopic === topic ? 'border-[#174e6b] bg-[#174e6b] text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-sky-700'}`} type="button" aria-pressed={activeTopic === topic} onClick={() => setActiveTopic(topic)}>{topic}</button>)}
              </div>
              <p className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-500" aria-live="polite">Showing {visibleBeliefs.length} of {beliefs.length} topics</p>
              {visibleBeliefs.length > 0 ? <ol className="mt-4 space-y-3">
                {visibleBeliefs.map((belief) => {
                  const isSaved = savedIds.includes(belief.id)
                  return <li key={belief.id} id={belief.id} className="scroll-mt-24"><article className="grid gap-4 rounded-2xl border border-slate-200 bg-[#fbfdfe] p-4 shadow-sm transition hover:border-sky-700/35 sm:grid-cols-[40px_minmax(0,1fr)_auto] sm:items-start sm:gap-5 sm:p-6 lg:p-7">
                    <span className="grid size-10 place-items-center rounded-full border border-sky-200 bg-[#eaf6fb] font-mono text-xs font-semibold text-sky-950">{belief.number}</span>
                    <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-800">{belief.topic}</p><h3 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">{belief.title}</h3><p className="mt-3 max-w-3xl leading-7 text-slate-600">{belief.summary}</p>
                      <details className="group mt-4 border-t border-slate-200 pt-3"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-sm font-semibold text-sky-800 outline-none hover:text-sky-950 focus-visible:ring-2 focus-visible:ring-sky-700 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"><span>Read the overview and references</span><span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-sky-50 text-lg transition group-open:rotate-45">+</span></summary><div className="max-w-3xl pb-2 pt-2 text-sm leading-7 text-slate-600"><p>{belief.detail}</p><p className="mt-3 text-xs font-medium leading-5 text-slate-500"><span className="font-semibold text-slate-700">Study references:</span> {belief.references.join(' · ')}</p></div></details>
                    </div><button className="min-h-10 w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-sky-700 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:mt-1" type="button" aria-pressed={isSaved} aria-label={`${isSaved ? 'Remove' : 'Save'} ${belief.topic} ${isSaved ? 'from' : 'to'} saved topics`} onClick={() => toggleSaved(belief.id)}>{isSaved ? 'Saved ✓' : 'Save topic'}</button>
                  </article></li>
                })}
              </ol> : <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-[#f7fbfd] p-6 sm:p-8"><h3 className="text-lg font-semibold">{showSavedOnly && savedIds.length === 0 ? 'No saved topics yet' : 'No topics match these filters'}</h3><p className="mt-2 text-slate-600">{showSavedOnly && savedIds.length === 0 ? 'Choose “Save topic” on a belief to add it to your saved list for this visit.' : 'Try a different search or clear the filters to see all five topics.'}</p><button className="mt-5 min-h-11 rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700" type="button" onClick={resetFilters}>Show all five topics</button></div>}
            </>}
            <p className="mt-6 max-w-3xl rounded-xl border border-sky-200 bg-[#e9f5fa] px-4 py-3 text-sm leading-6 text-sky-950"><span className="font-semibold">Content note:</span> Summaries are based on supplied class materials and are awaiting review by the knowledge-holder.</p>
          </div>
        </section>
      </main>
    </>
  )
}

function AboutPage() {
  return <main id="main-content" tabIndex="-1" className="mx-auto min-h-[60vh] max-w-4xl px-4 py-12 sm:px-6 sm:py-16"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">Project guide</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">About Bible Heritage</h1><p className="mt-5 max-w-3xl leading-7 text-slate-600">Bible Heritage is a student project introducing five connected Seventh-day Adventist belief topics. The project content is drawn from supplied class materials and will be checked by the named knowledge-holder before publication.</p><Link className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700" to="/">Explore the beliefs</Link></main>
}

function GlossaryPage() {
  return <main id="main-content" tabIndex="-1"><StateMessage kind="info" title="Glossary coming later" message="This view is part of the planned project structure. Its terms will be added after they are checked against the supplied course materials." /></main>
}

function NotFoundPage() {
  return <main id="main-content" tabIndex="-1"><StateMessage kind="notFound" homeLink={<Link className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#103d55]" to="/">Return home</Link>} /></main>
}

function App() {
  return <HashRouter><div id="top" className="min-h-screen overflow-x-hidden bg-[#f2f7fa] text-[#172b3a] antialiased"><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/belief/:id" element={<GlossaryPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/glossary" element={<GlossaryPage />} /><Route path="*" element={<NotFoundPage />} /></Routes><Footer /></div></HashRouter>
}

export default App

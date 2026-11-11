import { useMemo, useState } from 'react'

const beliefs = [
  {
    id: 'scripture',
    number: '01',
    topic: 'Scripture',
    title: 'The foundation - Scripture',
    summary:
      'Explore the source of Adventist beliefs and how Adventists understand divine revelation.',
    detail:
      'The project materials introduce the Bible as the foundation Adventists use to understand their beliefs. They invite readers to consider how Scripture was written and studied, and how it points to Jesus.',
    references: 'John 17:17 · Luke 24:27 · 2 Timothy 3:16',
  },
  {
    id: 'creation',
    number: '02',
    topic: 'Creation',
    title: 'The beginning - Creation',
    summary:
      "Explore creation, human dignity and purpose, care for creation, and the Sabbath as God's gift.",
    detail:
      'The supplied lessons follow the Genesis creation account, including the creation of humanity and the seventh-day Sabbath. The project mission connects this belief with human dignity, purpose, and care for creation.',
    references: 'Genesis 1–2 · Psalm 33:6, 9',
  },
  {
    id: 'great-controversy',
    number: '03',
    topic: 'Great Controversy',
    title: 'The problem - The Great Controversy',
    summary:
      'Explore the Adventist explanation of suffering, evil, and the conflict between good and evil.',
    detail:
      'This belief uses a biblical story of conflict between good and evil to explain why suffering exists. The supplied lesson follows the story from the choices in Eden to the promise of a coming deliverer.',
    references: 'Genesis 3 · Revelation 12:12, 17',
  },
  {
    id: 'christ',
    number: '04',
    topic: 'Christ',
    title: 'The solution - Christ',
    summary:
      "Explore Jesus Christ's ministry, death, resurrection, ascension, and Second Coming.",
    detail:
      'The project materials present Jesus as God becoming human and describe his life, ministry, death, resurrection, ascension, and promised return. This topic introduces the role of Jesus in the Adventist understanding of salvation and hope.',
    references: 'Hebrews 4:15 · John 14:6',
  },
  {
    id: 'resurrection',
    number: '05',
    topic: 'Death and Resurrection',
    title: 'The future - Death and Resurrection',
    summary:
      'Explore the state of the dead, the resurrection, and the Christian hope of eternal life.',
    detail:
      'The supplied Fundamental Belief 26 lesson presents death as a sleep and points to the resurrection at Jesus’ return as the Christian hope. This summary describes the Adventist teaching in the course material; it is not a comparison with other faiths.',
    references: 'John 11:11–14 · 1 Thessalonians 4:16 · 1 Corinthians 15:51–53',
  },
]

const topics = ['All five', ...beliefs.map((belief) => belief.topic)]

function App() {
  const [search, setSearch] = useState('')
  const [activeTopic, setActiveTopic] = useState('All five')
  const [savedIds, setSavedIds] = useState([])
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const visibleBeliefs = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return beliefs.filter((belief) => {
      const matchesTopic =
        activeTopic === 'All five' || belief.topic === activeTopic
      const matchesSearch = `${belief.title} ${belief.summary}`
        .toLowerCase()
        .includes(searchTerm)
      const matchesSaved = !showSavedOnly || savedIds.includes(belief.id)

      return matchesTopic && matchesSearch && matchesSaved
    })
  }, [activeTopic, savedIds, search, showSavedOnly])

  function toggleSaved(id) {
    setSavedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((savedId) => savedId !== id)
        : [...currentIds, id],
    )
  }

  function resetFilters() {
    setSearch('')
    setActiveTopic('All five')
    setShowSavedOnly(false)
  }

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#f2f7fa] text-[#172b3a] antialiased">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-30 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:shadow-lg"
          href="#main-content"
        >
          Skip to content
        </a>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-800">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-2xl bg-[#174e6b] text-sm font-bold text-[#d9f2fb]">B</span>
            <span className="leading-tight"><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Bible heritage</span><span className="text-sm sm:text-base">Beliefs, explained</span></span>
          </a>
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:hidden"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="text-base">{menuOpen ? '×' : '☰'}</span>
            {menuOpen ? 'Close' : 'Menu'}
          </button>
          <nav id="primary-navigation" aria-label="Main navigation" className={`${menuOpen ? 'flex' : 'hidden'} order-3 w-full flex-col gap-1 border-t border-slate-100 pt-2 text-sm font-medium sm:order-none sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-1 sm:border-0 sm:pt-0`}>
            <a onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:px-4" href="#about">About</a>
            <a onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:px-4" href="#beliefs">Five beliefs</a>
            <a onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:px-4" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section aria-labelledby="intro-heading" className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-900/15 bg-white/80 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sky-900 sm:text-xs">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-sky-500" /> A friendly guide to Adventist beliefs
            </p>
            <h1 id="intro-heading" className="max-w-3xl text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[#172b3a] sm:text-5xl lg:text-6xl">
              A story of faith, <span className="font-serif italic font-normal text-sky-800">from beginning to hope.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              Curious about what Adventists believe? Explore five connected topics, from Scripture and Creation to Christ and the hope of resurrection. A thoughtful introduction for readers discovering these beliefs.
            </p>
            <a
              className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#174e6b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-800 sm:mt-8"
              href="#beliefs"
            >
              Explore the five topics <span aria-hidden="true" className="text-lg">↓</span>
            </a>
            <p className="mt-5 text-xs font-medium tracking-wide text-slate-500">A student project · Asia-Pacific International University</p>
          </div>

          <aside className="relative isolate overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#153e56] to-[#286b88] p-6 text-white shadow-[0_24px_70px_-40px_rgba(23,77,103,0.65)] sm:p-8 lg:p-9">
            <div aria-hidden="true" className="absolute -right-12 -top-16 -z-10 size-64 rounded-full border border-white/10" />
            <div aria-hidden="true" className="absolute -right-2 -top-6 -z-10 size-44 rounded-full border border-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#bfe8f5]">
              The story in five steps
            </p>
            <p className="mt-2 text-sm text-white/75">Follow the big questions behind the beliefs.</p>
            <ol className="relative mt-7 space-y-1 before:absolute before:bottom-7 before:left-[15px] before:top-7 before:w-px before:bg-white/20">
              {beliefs.map((belief) => (
                <li key={belief.id} className="relative flex items-center gap-4 rounded-xl px-2 py-3 text-sm transition hover:bg-white/5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-white/30 bg-[#1c526d] font-mono text-[10px] text-[#d9f2fb]">{belief.number}</span>
                  <a
                    className="flex min-h-7 flex-1 items-center justify-between gap-2 text-white/90 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8edf8]"
                    href={`#${belief.id}`}
                    onClick={resetFilters}
                  >
                    <span>{belief.topic}</span><span aria-hidden="true" className="text-white/40">↗</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 border-y border-sky-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">Project guide</p>
              <h2 id="about-heading" className="mt-2 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">About Bible Heritage</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Bible Heritage is a student project for Buddhist-background readers who want a clear introduction to five Seventh-day Adventist beliefs. The timeline brings the topics together in one place, with short explanations and Bible references for further study.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-[#f7fbfd] p-5 shadow-sm sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">01 · Goal</p>
                <h3 className="mt-3 text-lg font-semibold">Make the beliefs easier to explore</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Introduce Scripture, Creation, the Great Controversy, Christ, and Death and Resurrection in simple language for readers who may be new to Adventist teaching.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[#f7fbfd] p-5 shadow-sm sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">02 · Vision</p>
                <h3 className="mt-3 text-lg font-semibold">A welcoming place to learn</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Offer a respectful starting point where curious readers can follow the topics at their own pace and continue their learning through the Bible and conversation.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[#f7fbfd] p-5 shadow-sm sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">03 · Mission</p>
                <h3 className="mt-3 text-lg font-semibold">Share the five beliefs in two languages</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Build a bilingual Thai-English interactive educational website for our knowledge-holder and Buddhist audiences, so readers can explore five fundamental Adventist beliefs through a simple timeline while preserving and sharing the church’s biblical teachings.
                </p>
              </article>
            </div>

            <p className="mt-6 max-w-3xl rounded-xl border border-sky-200 bg-[#e9f5fa] px-4 py-3 text-sm leading-6 text-sky-950">
              <span className="font-semibold">Content note:</span> These summaries are based on the project’s supplied class materials and include references for further study. The knowledge-holder will review the content before publication.
            </p>
          </div>
        </section>

        <section id="beliefs" aria-labelledby="beliefs-heading" className="scroll-mt-20 border-y border-slate-200/80 bg-[#f2f7fa]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">
                Explore the timeline
              </p>
              <h2 id="beliefs-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Where would you like to begin?
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                Explore the topics at your own pace. Search, focus on one belief, or save a few to revisit during this visit.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Search the five topics</span>
                <input
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-[#f7fbfd] px-4 py-3 text-base outline-none transition placeholder:text-slate-500 focus:border-sky-700 focus:ring-4 focus:ring-sky-900/10"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Try Scripture, Christ, or resurrection"
                />
              </label>
              <button
                className={`min-h-12 rounded-xl border px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${showSavedOnly ? 'border-[#174e6b] bg-[#174e6b] text-white' : 'border-slate-300 bg-white hover:border-sky-700'}`}
                type="button"
                aria-pressed={showSavedOnly}
                onClick={() => setShowSavedOnly((showing) => !showing)}
              >
                {showSavedOnly ? 'Viewing saved topics' : `Show saved (${savedIds.length})`}
              </button>
            </div>

            <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" role="group" aria-label="Filter topics">
              {topics.map((topic) => (
                <button
                  key={topic}
                  className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${activeTopic === topic ? 'border-[#174e6b] bg-[#174e6b] text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-sky-700'}`}
                  type="button"
                  aria-pressed={activeTopic === topic}
                  onClick={() => setActiveTopic(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-500" aria-live="polite">
              Showing {visibleBeliefs.length} of {beliefs.length} topics
            </p>

            {visibleBeliefs.length > 0 ? (
              <ol className="relative mt-4 space-y-3 before:absolute before:bottom-8 before:left-[19px] before:top-8 before:w-px before:bg-sky-100 sm:space-y-4">
                {visibleBeliefs.map((belief) => {
                  const isSaved = savedIds.includes(belief.id)

                  return (
                    <li key={belief.id} id={belief.id} className="scroll-mt-24">
                      <article className="relative grid gap-4 rounded-2xl border border-slate-200 bg-[#fbfdfe] p-4 shadow-[0_4px_20px_-18px_rgba(23,60,82,0.28)] transition hover:border-sky-700/35 hover:shadow-[0_16px_35px_-28px_rgba(23,77,103,0.35)] sm:grid-cols-[40px_minmax(0,1fr)_auto] sm:items-start sm:gap-5 sm:p-6 lg:p-7">
                        <span className="relative z-[1] grid size-10 place-items-center rounded-full border border-sky-200 bg-[#eaf6fb] font-mono text-xs font-semibold text-sky-950">{belief.number}</span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-800">{belief.topic}</p>
                          <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
                            {belief.title}
                          </h3>
                          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                            {belief.summary}
                          </p>
                          <details className="group mt-4 border-t border-slate-200 pt-3">
                            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-sm font-semibold text-sky-800 outline-none transition hover:text-sky-950 focus-visible:ring-2 focus-visible:ring-sky-700 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                              <span>Read the overview and references</span>
                              <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-sky-50 text-lg transition group-open:rotate-45">+</span>
                            </summary>
                            <div className="max-w-3xl pb-2 pt-2 text-sm leading-7 text-slate-600">
                              <p>{belief.detail}</p>
                              <p className="mt-3 text-xs font-medium leading-5 text-slate-500">
                                <span className="font-semibold text-slate-700">Study references:</span> {belief.references}
                              </p>
                            </div>
                          </details>
                        </div>
                        <button
                          className="min-h-10 w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-sky-700 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:mt-1"
                          type="button"
                          aria-pressed={isSaved}
                          aria-label={`${isSaved ? 'Remove' : 'Save'} ${belief.topic} ${isSaved ? 'from' : 'to'} saved topics`}
                          onClick={() => toggleSaved(belief.id)}
                        >
                          {isSaved ? 'Saved ✓' : 'Save topic'}
                        </button>
                      </article>
                    </li>
                  )
                })}
              </ol>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-[#f7fbfd] p-6 sm:p-8">
                <h3 className="text-lg font-semibold">
                  {showSavedOnly && savedIds.length === 0
                    ? 'No saved topics yet'
                    : 'No topics match these filters'}
                </h3>
                <p className="mt-2 text-slate-600">
                  {showSavedOnly && savedIds.length === 0
                    ? 'Choose “Save topic” on a belief to add it to your saved list for this visit.'
                    : 'Try a different search or clear the filters to see all five topics.'}
                </p>
                <button
                  className="mt-5 min-h-11 rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                  type="button"
                  onClick={resetFilters}
                >
                  Show all five topics
                </button>
              </div>
            )}
          </div>
        </section>


      </main>

      <footer id="contact" className="scroll-mt-20 border-t border-white/10 bg-[#153e56] text-white">
        <div className="mx-auto grid max-w-7xl gap-9 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:gap-12 lg:px-8">
          <div>
            <p className="font-semibold">Bible Heritage <span className="font-normal text-sky-100/75">· Adventist Beliefs Timeline</span></p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-sky-100/75">A student project introducing five Seventh-day Adventist beliefs to Buddhist-background readers.</p>
            <a className="mt-4 inline-flex min-h-10 items-center rounded-lg border border-white/25 px-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200" href="https://github.com/PhonePyaeKyaw-359/adventist-beliefs-timeline" target="_blank" rel="noreferrer">
              View the project repository <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>

          <address className="not-italic">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Project contact</h2>
            <p className="mt-3 text-sm font-semibold">Knowledge-holder</p>
            <p className="mt-1 text-sm text-sky-100/80">Pastor Adolpho Alex Bittencourt</p>
            <p className="text-sm text-sky-100/70">Pastor and teacher · Asia-Pacific International University</p>
            <p className="mt-3 text-xs leading-5 text-sky-100/65">Contact through the university or Microsoft Teams by arrangement.</p>
          </address>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Muak Lek campus church</h2>
            <p className="mt-3 text-sm leading-6 text-sky-100/80">Asia-Pacific International University<br />195 Moo 3, Muak Lek, Saraburi 18180, Thailand</p>
            <a className="mt-2 inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-white underline decoration-sky-300 underline-offset-4 hover:text-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200" href="tel:+6636720777">
              +66 36 720 777
            </a>
            <a className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ccebf6] px-4 py-2.5 text-center text-sm font-bold text-[#12394d] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200" href="https://www.google.com/maps/search/?api=1&query=Asia-Pacific%20International%20University%20Church%2C%20Muak%20Lek%2C%20Saraburi" target="_blank" rel="noreferrer">
              <span aria-hidden="true">⌖</span> Open church location in Maps <span aria-hidden="true">↗</span>
            </a>
            <a className="mt-2 inline-flex min-h-10 items-center text-xs text-sky-100/70 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200" href="https://www.apiu.edu/aiu-church/" target="_blank" rel="noreferrer">
              Official AIU Church information ↗
            </a>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-5 text-sm text-sky-50 lg:col-span-3">
            <a className="rounded py-1 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200" href="#beliefs">Explore beliefs</a>
            <a className="rounded py-1 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200" href="#about">About the project</a>
            <a className="rounded py-1 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200" href="#top">Back to top ↑</a>
            <span className="w-full text-xs text-sky-100/55 sm:ml-auto sm:w-auto">Asia-Pacific International University · IT363</span>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App

import { useMemo, useState } from 'react'

const beliefs = [
  {
    id: 'scripture',
    number: '01',
    topic: 'Scripture',
    title: 'The foundation - Scripture',
    summary:
      'Explore the source of Adventist beliefs and how Adventists understand divine revelation.',
  },
  {
    id: 'creation',
    number: '02',
    topic: 'Creation',
    title: 'The beginning - Creation',
    summary:
      "Explore creation, human dignity and purpose, care for creation, and the Sabbath as God's gift.",
  },
  {
    id: 'great-controversy',
    number: '03',
    topic: 'Great Controversy',
    title: 'The problem - The Great Controversy',
    summary:
      'Explore the Adventist explanation of suffering, evil, and the conflict between good and evil.',
  },
  {
    id: 'christ',
    number: '04',
    topic: 'Christ',
    title: 'The solution - Christ',
    summary:
      "Explore Jesus Christ's ministry, death, resurrection, ascension, and Second Coming.",
  },
  {
    id: 'resurrection',
    number: '05',
    topic: 'Death and Resurrection',
    title: 'The future - Death and Resurrection',
    summary:
      'Explore the state of the dead, the resurrection, and the Christian hope of eternal life.',
  },
]

const topics = ['All five', ...beliefs.map((belief) => belief.topic)]

function App() {
  const [search, setSearch] = useState('')
  const [activeTopic, setActiveTopic] = useState('All five')
  const [savedIds, setSavedIds] = useState([])
  const [showSavedOnly, setShowSavedOnly] = useState(false)

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
    <div className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <header className="border-b border-stone-200 bg-[#f8f6f1]">
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-10 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-stone-900"
          href="#main-content"
        >
          Skip to content
        </a>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
          <a href="#main-content" className="font-semibold tracking-tight">
            <span className="text-amber-800">Our beliefs,</span> explained
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm">
            <a className="hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4" href="#beliefs">
              Explore
            </a>
            <a className="hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4" href="#about">
              About this project
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">
              A friendly guide to Adventist beliefs
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight">
              Curious about what Adventists believe?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
              Start with five connected topics, from Scripture and Creation to
              Christ and the hope of resurrection. Read at your own pace and
              follow the questions that matter to you.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-800 px-6 py-3 font-medium text-white hover:bg-amber-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-900"
              href="#beliefs"
            >
              Explore the five topics <span aria-hidden="true">↓</span>
            </a>
          </div>

          <aside className="rounded-3xl border border-amber-200 bg-[#efe8da] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-900">
              The story in five steps
            </p>
            <ol className="mt-5 space-y-3">
              {beliefs.map((belief) => (
                <li key={belief.id} className="flex items-start gap-3 text-stone-800">
                  <span className="font-mono text-sm text-amber-800">{belief.number}</span>
                  <a
                    className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                    href={`#${belief.id}`}
                    onClick={resetFilters}
                  >
                    {belief.topic}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section id="beliefs" aria-labelledby="beliefs-heading" className="border-y border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">
                Explore
              </p>
              <h2 id="beliefs-heading" className="mt-3 text-3xl font-semibold tracking-tight">
                Where would you like to begin?
              </h2>
              <p className="mt-4 leading-7 text-stone-600">
                Search the topics or choose one to focus the timeline. You can
                also save topics for this visit.
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Search the five topics</span>
                <input
                  className="w-full rounded-xl border border-stone-300 bg-[#f8f6f1] px-4 py-3 outline-none placeholder:text-stone-500 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Try Scripture, Christ, or resurrection"
                />
              </label>
              <button
                className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 ${showSavedOnly ? 'border-amber-900 bg-amber-900 text-white' : 'border-stone-300 bg-white hover:border-amber-800'}`}
                type="button"
                aria-pressed={showSavedOnly}
                onClick={() => setShowSavedOnly((showing) => !showing)}
              >
                {showSavedOnly ? 'Showing saved topics' : `Saved topics (${savedIds.length})`}
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter topics">
              {topics.map((topic) => (
                <button
                  key={topic}
                  className={`rounded-full border px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 ${activeTopic === topic ? 'border-amber-900 bg-amber-900 text-white' : 'border-stone-300 bg-white text-stone-700 hover:border-amber-800'}`}
                  type="button"
                  aria-pressed={activeTopic === topic}
                  onClick={() => setActiveTopic(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm text-stone-600" aria-live="polite">
              Showing {visibleBeliefs.length} of {beliefs.length} topics
            </p>

            {visibleBeliefs.length > 0 ? (
              <ol className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
                {visibleBeliefs.map((belief) => {
                  const isSaved = savedIds.includes(belief.id)

                  return (
                    <li key={belief.id} id={belief.id}>
                      <article className="grid gap-4 py-7">
                        <span className="font-mono text-sm text-amber-800">{belief.number}</span>
                        <div>
                          <p className="text-sm font-medium text-amber-800">{belief.topic}</p>
                          <h3 className="mt-1 text-xl font-semibold tracking-tight">
                            {belief.title}
                          </h3>
                          <p className="mt-3 max-w-3xl leading-7 text-stone-700">
                            {belief.summary}
                          </p>
                        </div>
                        <button
                          className="w-fit rounded-full border border-stone-300 px-4 py-2 text-sm font-medium hover:border-amber-800 hover:text-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
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
              <div className="mt-4 rounded-2xl border border-dashed border-stone-300 bg-[#f8f6f1] p-7">
                <h3 className="text-lg font-semibold">No topics match that search</h3>
                <p className="mt-2 text-stone-600">
                  Try another word or clear the filters to see all five topics.
                </p>
                <button
                  className="mt-5 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
                  type="button"
                  onClick={resetFilters}
                >
                  Clear search and filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-7xl px-5 py-12">
          <h2 id="about-heading" className="text-2xl font-semibold tracking-tight">About this project</h2>
          <p className="mt-3 max-w-3xl leading-7 text-stone-700">
            This student project is designed as a respectful introduction for
            Buddhist readers who want to learn about Seventh-day Adventist
            beliefs. The summaries are a starting point and will be reviewed
            with our knowledge-holder before publication.
          </p>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-stone-900 text-stone-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-7 text-sm">
          <p className="font-medium">Adventist Beliefs Timeline</p>
          <p className="text-stone-300">A student project; content is being reviewed with our knowledge-holder.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

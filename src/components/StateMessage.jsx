const messages = {
  loading: {
    role: 'status',
    title: 'Loading content',
    message: 'Please wait while the project content loads.',
  },
  empty: {
    role: 'status',
    title: 'No content yet',
    message: 'There is no content to show here yet.',
  },
  error: {
    role: 'alert',
    title: 'Content could not be loaded',
    message: 'Please try again. If the problem continues, return to the home page.',
  },
  info: {
    role: 'status',
    title: 'This section is being prepared',
    message: 'This view will be added in a later project step.',
  },
  notFound: {
    role: 'status',
    title: 'Page not found',
    message: 'This page does not exist. Return to the home page to continue.',
  },
}

function StateMessage({ kind = 'empty', title, message, onRetry, homeLink }) {
  const defaults = messages[kind] ?? messages.empty

  return (
    <section
      className="mx-auto my-12 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      role={defaults.role}
      aria-live={defaults.role === 'status' ? 'polite' : undefined}
    >
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        {title ?? defaults.title}
      </h1>
      <p className="mt-3 leading-7 text-slate-600">{message ?? defaults.message}</p>
      {onRetry && (
        <button
          className="mt-5 min-h-11 rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          type="button"
          onClick={onRetry}
        >
          Try again
        </button>
      )}
      {homeLink}
    </section>
  )
}

export default StateMessage

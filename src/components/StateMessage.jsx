import { useLanguage } from '../context/useLanguage.js'

const messages = {
  loading: { role: 'status', title: 'loading', message: 'loadingMessage' },
  empty: { role: 'status', title: 'empty', message: 'emptyMessage' },
  error: { role: 'alert', title: 'loadError', message: 'loadErrorMessage' },
  info: { role: 'status', title: 'glossaryComing', message: 'glossaryMessage' },
  notFound: { role: 'status', title: 'notFound', message: 'notFoundMessage' },
}

function StateMessage({ kind = 'empty', title, message, onRetry, homeLink }) {
  const { messages: locale } = useLanguage()
  const defaults = messages[kind] ?? messages.empty

  return (
    <section
      className="mx-auto my-12 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      role={defaults.role}
      aria-live={defaults.role === 'status' ? 'polite' : undefined}
    >
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        {title ?? locale[defaults.title]}
      </h1>
      <p className="mt-3 leading-7 text-slate-600">{message ?? locale[defaults.message]}</p>
      {onRetry && (
        <button
          className="mt-5 min-h-11 rounded-full bg-[#174e6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#103d55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          type="button"
          onClick={onRetry}
        >
          {locale.tryAgain}
        </button>
      )}
      {homeLink}
    </section>
  )
}

export default StateMessage

import { useLanguage } from '../context/useLanguage.js'

function LanguageSwitch() {
  const { language, setLanguage, messages } = useLanguage()
  const nextLanguage = language === 'en' ? 'th' : 'en'

  return (
    <button
      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
      type="button"
      lang={nextLanguage}
      aria-label={messages.switchLanguage}
      onClick={() => setLanguage(nextLanguage)}
    >
      {language === 'en' ? 'ไทย' : 'EN'}
    </button>
  )
}

export default LanguageSwitch

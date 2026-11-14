import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './language.js'
import en from '../locales/en.json'
import th from '../locales/th.json'

const dictionaries = { en, th }
const LANGUAGE_STORAGE_KEY = 'bible-heritage-language'

function getInitialLanguage() {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return storedLanguage === 'en' || storedLanguage === 'th' ? storedLanguage : 'th'
  } catch {
    return 'th'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    document.title = dictionaries[language].pageTitle

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // The language switch still works for this visit if storage is unavailable.
    }
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    messages: dictionaries[language],
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}


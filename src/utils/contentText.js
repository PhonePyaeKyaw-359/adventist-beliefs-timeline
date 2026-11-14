export function getLocalizedText(value, language) {
  if (typeof value === 'string') return { text: value, isFallback: false }

  const selectedText = value?.[language]
  if (typeof selectedText === 'string' && selectedText.trim()) {
    return { text: selectedText, isFallback: false }
  }

  const englishText = value?.en
  return {
    text: typeof englishText === 'string' ? englishText : '',
    isFallback: language !== 'en' && Boolean(englishText),
  }
}

export function normalizeSearchText(value, language) {
  const normalized = value
    .normalize('NFKC')
    .toLocaleLowerCase(language === 'th' ? 'th-TH' : 'en')
    .trim()

  // Thai queries are commonly typed without spaces between words.
  return language === 'th' ? normalized.replace(/\s+/gu, '') : normalized
}

export function beliefMatchesSearch(belief, query, language) {
  const normalizedQuery = normalizeSearchText(query, language)
  if (!normalizedQuery) return true

  const searchableText = [belief.topic, belief.title, belief.summary, belief.detail]
    .map((field) => getLocalizedText(field, language).text)
    .join(' ')

  return normalizeSearchText(searchableText, language).includes(normalizedQuery)
}

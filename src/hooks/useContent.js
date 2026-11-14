import { useEffect, useState } from 'react'

const contentLoaders = {
  beliefs: () => import('../data/beliefs.json').then((module) => module.default),
}

function getInitialState() {
  return { status: 'loading', data: null, error: null }
}

export function useContent(contentKey) {
  const [state, setState] = useState(getInitialState)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let isCurrent = true
    const loadContent = contentLoaders[contentKey]

    if (!loadContent) {
      Promise.resolve().then(() => {
        if (isCurrent) {
          setState({ status: 'error', data: null, error: new Error('Unknown content key') })
        }
      })
      return () => {
        isCurrent = false
      }
    }

    loadContent()
      .then((data) => {
        if (!isCurrent) return

        if (!Array.isArray(data) || data.length === 0) {
          setState({ status: 'empty', data: [], error: null })
          return
        }

        setState({ status: 'success', data, error: null })
      })
      .catch((error) => {
        if (isCurrent) setState({ status: 'error', data: null, error })
      })

    return () => {
      isCurrent = false
    }
  }, [attempt, contentKey])

  return {
    ...state,
    retry: () => setAttempt((currentAttempt) => currentAttempt + 1),
  }
}

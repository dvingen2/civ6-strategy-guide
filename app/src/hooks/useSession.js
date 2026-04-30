import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'civ6_session'

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSession(session) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // storage full or unavailable
  }
}

export function useSession() {
  const [session, setSession] = useState(() => loadSession())

  useEffect(() => {
    if (session) saveSession(session)
  }, [session])

  const startSession = useCallback((setup) => {
    setSession({
      setup,
      currentPhaseIndex: 0,
      phases: {},
      flags: {},
      startedAt: Date.now(),
    })
  }, [])

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }, [])

  const setItemStatus = useCallback((phaseId, itemId, status) => {
    setSession(prev => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phaseId]: {
          ...prev.phases[phaseId],
          items: {
            ...(prev.phases[phaseId]?.items || {}),
            [itemId]: status,
          },
        },
      },
    }))
  }, [])

  const setPhaseNote = useCallback((phaseId, note) => {
    setSession(prev => ({
      ...prev,
      phases: {
        ...prev.phases,
        [phaseId]: {
          ...prev.phases[phaseId],
          note,
        },
      },
    }))
  }, [])

  const completePhase = useCallback((phaseId, checkpointAnswers) => {
    setSession(prev => {
      const newFlags = { ...prev.flags }
      Object.entries(checkpointAnswers).forEach(([k, v]) => {
        newFlags[k] = v
      })
      return {
        ...prev,
        currentPhaseIndex: prev.currentPhaseIndex + 1,
        phases: {
          ...prev.phases,
          [phaseId]: {
            ...prev.phases[phaseId],
            completedAt: Date.now(),
            checkpoints: checkpointAnswers,
          },
        },
        flags: newFlags,
      }
    })
  }, [])

  const goToPhase = useCallback((index) => {
    setSession(prev => ({ ...prev, currentPhaseIndex: index }))
  }, [])

  return {
    session,
    startSession,
    resetSession,
    setItemStatus,
    setPhaseNote,
    completePhase,
    goToPhase,
  }
}

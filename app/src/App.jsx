import { useState } from 'react'
import { useSession } from './hooks/useSession'
import { VIZIER_PHASES, SULTAN_PHASES } from './data/phases'
import SetupScreen from './components/SetupScreen'
import PhaseView from './components/PhaseView'

function Toast({ message }) {
  return <div className="toast">{message}</div>
}

export default function App() {
  const { session, startSession, resetSession, setItemStatus, setPhaseNote, completePhase, goToPhase } = useSession()
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2600)
  }

  const phases = session
    ? session.setup.leader === 'vizier' ? VIZIER_PHASES : SULTAN_PHASES
    : []

  const currentPhase = session ? phases[session.currentPhaseIndex] : null
  const isDone = session && session.currentPhaseIndex >= phases.length

  const handleComplete = (phaseId, answers) => {
    completePhase(phaseId, answers)
    showToast('Phase complete — advancing')
  }

  const handleReset = () => {
    if (confirm('Start a new game? Current session will be lost.')) {
      resetSession()
    }
  }

  return (
    <div className="app">
      {session && (
        <div className="header">
          <div className="header-top">
            <div>
              <div className="header-title">
                Arabia · {session.setup.leader === 'vizier' ? 'Vizier' : 'Sultan'}
              </div>
              <div className="header-sub">
                {session.setup.mapType} · {session.setup.mapSize} · {session.setup.difficulty}
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={handleReset}>New game</button>
          </div>
          <div className="progress-strip">
            {phases.map((p, i) => {
              const done = !!session.phases[p.id]?.completedAt
              const current = i === session.currentPhaseIndex
              return (
                <div
                  key={p.id}
                  className={`progress-pip ${done ? 'done' : current ? 'current' : ''}`}
                  title={`${p.title} (${p.turnRange})`}
                  onClick={done ? () => goToPhase(i) : undefined}
                  style={done ? { cursor: 'pointer' } : undefined}
                />
              )
            })}
          </div>
        </div>
      )}

      <div className="main-content">
        {!session && (
          <SetupScreen onStart={config => startSession(config)} />
        )}

        {session && isDone && (
          <div className="done-screen">
            <div className="done-icon">⚔</div>
            <h2>All phases complete</h2>
            <p>Your full game log is ready to export — paste it to Claude or ChatGPT for a post-game analysis.</p>
            <button className="btn btn-primary" style={{ marginTop: 8, height: 48, fontSize: '1rem' }} onClick={handleReset}>
              Start new game →
            </button>
          </div>
        )}

        {session && !isDone && currentPhase && (
          <PhaseView
            phase={currentPhase}
            phaseIndex={session.currentPhaseIndex}
            totalPhases={phases.length}
            session={session}
            phases={phases}
            onItemStatus={(phaseId, itemId, status) => setItemStatus(phaseId, itemId, status)}
            onNote={(phaseId, note) => setPhaseNote(phaseId, note)}
            onComplete={handleComplete}
          />
        )}
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}

import { useState } from 'react'

export default function CheckpointModal({ phase, onConfirm, onCancel, isLastPhase }) {
  const [answers, setAnswers] = useState({})

  const checkpoints = phase.checkpoints || []
  const allAnswered = checkpoints.every(cp => answers[cp.id] !== undefined)

  const setAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-title">{isLastPhase ? 'Game Complete' : 'Phase Check-in'}</div>
        <div className="modal-sub">{isLastPhase ? 'Record final state for your game log.' : 'Answer to tailor guidance for the next phase.'}</div>

        {checkpoints.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontFamily: 'sans-serif', fontSize: '0.85rem', marginBottom: 20 }}>
            No check-in questions for this phase.
          </p>
        ) : (
          checkpoints.map(cp => (
            <div key={cp.id} className="checkpoint-item">
              <div className="checkpoint-q">{cp.question}</div>
              {cp.hint && <div className="checkpoint-hint">{cp.hint}</div>}

              {cp.type === 'boolean' && (
                <div className="bool-row">
                  <button
                    className={`bool-btn ${answers[cp.id] === true ? 'selected-yes' : ''}`}
                    onClick={() => setAnswer(cp.id, true)}
                  >Yes</button>
                  <button
                    className={`bool-btn ${answers[cp.id] === false ? 'selected-no' : ''}`}
                    onClick={() => setAnswer(cp.id, false)}
                  >No</button>
                </div>
              )}

              {cp.type === 'choice' && (
                <div className="choice-grid">
                  {cp.options.map((opt, i) => (
                    <button
                      key={opt}
                      className={`choice-btn ${answers[cp.id] === opt ? 'selected' : ''}`}
                      onClick={() => setAnswer(cp.id, opt)}
                    >
                      {cp.labels?.[i] || opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
          <button
            className="btn btn-primary"
            style={{ flex: 1, opacity: (allAnswered || checkpoints.length === 0) ? 1 : 0.5 }}
            disabled={!allAnswered && checkpoints.length > 0}
            onClick={() => onConfirm(answers)}
          >
            {isLastPhase ? 'Complete game →' : 'Advance to next phase →'}
          </button>
        </div>
      </div>
    </div>
  )
}

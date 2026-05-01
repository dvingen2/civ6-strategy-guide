import { useState } from 'react'
import CheckItem from './CheckItem'
import CheckpointModal from './CheckpointModal'
import SituationsPanel from './SituationsPanel'
import ExportPanel from './ExportPanel'
import { resolvePhaseItems } from '../utils/phases'
import { guidesForPhase } from '../utils/guides'

export default function PhaseView({ phase, phaseIndex, totalPhases, session, phases, onItemStatus, onNote, onComplete }) {
  const [showCheckpoint, setShowCheckpoint] = useState(false)
  const [showSituations, setShowSituations] = useState(false)
  const [showExport, setShowExport] = useState(false)

  const phaseState = session.phases[phase.id] || {}
  const flags = session.flags || {}
  const note = phaseState.note || ''

  // Build prior phase data for carry-forward injection
  const priorPhaseData = phases.slice(0, phaseIndex).map(p => ({
    phase: p,
    state: session.phases[p.id],
  }))

  const items = resolvePhaseItems(phase, flags, null, priorPhaseData)

  const essentialItems = items.filter(i => i.priority === 'E' || i.priority === 'H')
  const doneCount = essentialItems.filter(i => phaseState.items?.[i.id] === 'done').length
  const pct = essentialItems.length ? Math.round((doneCount / essentialItems.length) * 100) : 100
  const phaseGuides = guidesForPhase(phase.id)

  const isLastPhase = phaseIndex === totalPhases - 1

  return (
    <div>
      {/* Phase header */}
      <div className="phase-meta">
        <span className="phase-turn-range">{phase.turnRange}</span>
        <span className="phase-number">Phase {phaseIndex + 1} of {totalPhases}</span>
      </div>
      <h2>{phase.title}</h2>
      <p className="phase-summary">{phase.summary}</p>
      <div className="phase-guide-strip" aria-label="Relevant guide references">
        {phaseGuides.map(guide => (
          <a className="guide-chip" key={guide.path} href={guide.url} title={guide.path} target="_blank" rel="noreferrer">
            {guide.label}
          </a>
        ))}
      </div>

      {/* Progress indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? 'var(--green)' : 'var(--gold)', transition: 'width 0.3s', borderRadius: 2 }} />
        </div>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'sans-serif', minWidth: 32 }}>
          {pct}%
        </span>
      </div>

      {/* Check items */}
      <div className="items-list">
        {items.map(item => (
          <CheckItem
            key={item.id}
            item={item}
            status={phaseState.items?.[item.id] || null}
            onStatusChange={s => onItemStatus(phase.id, item.id, s)}
          />
        ))}
      </div>

      {/* Notes */}
      <div className="divider" />
      <div className="section-label">Notes</div>
      <textarea
        className="notes-area"
        placeholder="Add any notes about this phase (optional)..."
        value={note}
        onChange={e => onNote(phase.id, e.target.value)}
      />

      {/* Actions */}
      <div className="phase-actions">
        <button className="btn btn-primary w-full" onClick={() => setShowCheckpoint(true)}>
          {isLastPhase ? 'Finish game →' : 'Complete phase & check in →'}
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-sm"
            style={{ flex: 1 }}
            onClick={() => { setShowSituations(!showSituations); setShowExport(false) }}
          >
            {showSituations ? 'Hide' : 'Situations'}
          </button>
          <button
            className="btn btn-sm"
            style={{ flex: 1 }}
            onClick={() => { setShowExport(!showExport); setShowSituations(false) }}
          >
            {showExport ? 'Hide' : 'Export log'}
          </button>
        </div>
      </div>

      {/* Expandable panels */}
      {showSituations && (
        <div style={{ marginTop: 16 }}>
          <div className="divider" />
          <SituationsPanel phaseId={phase.id} />
        </div>
      )}

      {showExport && (
        <div style={{ marginTop: 16 }}>
          <div className="divider" />
          <ExportPanel session={session} phases={phases} />
        </div>
      )}

      {/* Checkpoint modal */}
      {showCheckpoint && (
        <CheckpointModal
          phase={phase}
          isLastPhase={isLastPhase}
          onConfirm={answers => {
            setShowCheckpoint(false)
            onComplete(phase.id, answers)
          }}
          onCancel={() => setShowCheckpoint(false)}
        />
      )}
    </div>
  )
}

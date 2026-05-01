import { useState } from 'react'
import { SITUATIONS } from '../data/phases'
import { GUIDE_REFS } from '../utils/guides'

function sortForPhase(situations, phaseId) {
  return [...situations].sort((a, b) => {
    const aScore = a.phase === phaseId ? 0 : a.phase === 'any' ? 1 : 2
    const bScore = b.phase === phaseId ? 0 : b.phase === 'any' ? 1 : 2
    return aScore - bScore
  })
}

export default function SituationsPanel({ phaseId }) {
  const orderedSituations = sortForPhase(SITUATIONS, phaseId)
  const [open, setOpen] = useState(orderedSituations[0]?.id || null)

  return (
    <div>
      <div className="section-label">Trouble triage</div>
      <p className="situations-intro">
        Pick the thing currently going wrong. Phase-relevant problems are shown first.
      </p>
      {orderedSituations.map(s => (
        <div key={s.id} className="situation-card">
          <div
            className="situation-header"
            onClick={() => setOpen(open === s.id ? null : s.id)}
          >
            <span>
              <span className={`severity-pill severity-${s.severity || 'medium'}`}>
                {s.severity || 'medium'}
              </span>
              {s.title}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {open === s.id ? '▲' : '▼'}
            </span>
          </div>
          {open === s.id && (
            <div className="situation-body">
              <div className="situation-summary">{s.summary || s.response}</div>
              {s.actions?.length > 0 && (
                <ol className="situation-actions">
                  {s.actions.map(action => <li key={action}>{action}</li>)}
                </ol>
              )}
              {s.avoid && (
                <div className="situation-avoid">
                  <strong>Avoid:</strong> {s.avoid}
                </div>
              )}
              {s.guideRefs?.length > 0 && (
                <div className="guide-chip-row" aria-label="Related guide references">
                  {s.guideRefs.map(id => GUIDE_REFS[id]).filter(Boolean).map(guide => (
                    <a className="guide-chip" key={guide.path} href={guide.url} title={guide.path} target="_blank" rel="noreferrer">
                      {guide.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

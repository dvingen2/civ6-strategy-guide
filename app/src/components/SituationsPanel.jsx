import { useState } from 'react'
import { SITUATIONS } from '../data/phases'

export default function SituationsPanel() {
  const [open, setOpen] = useState(null)

  return (
    <div>
      <div className="section-label">Help — Common Situations</div>
      {SITUATIONS.map(s => (
        <div key={s.id} className="situation-card">
          <div
            className="situation-header"
            onClick={() => setOpen(open === s.id ? null : s.id)}
          >
            <span>{s.title}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {open === s.id ? '▲' : '▼'}
            </span>
          </div>
          {open === s.id && (
            <div className="situation-body">{s.response}</div>
          )}
        </div>
      ))}
    </div>
  )
}

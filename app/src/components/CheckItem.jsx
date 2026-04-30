import { useState } from 'react'

const STATUS_ICONS = { done: '✓', skipped: '–', missed: '✗' }

export default function CheckItem({ item, status, onStatusChange }) {
  const [expanded, setExpanded] = useState(false)

  const cycleStatus = () => {
    if (!status || status === 'missed') onStatusChange('done')
    else if (status === 'done') onStatusChange('skipped')
    else if (status === 'skipped') onStatusChange('missed')
  }

  const setStatus = (s) => {
    onStatusChange(status === s ? null : s)
  }

  return (
    <div
      className={`check-item${item.isCarryForward ? ' is-carry-forward' : ''}`}
      data-status={status || 'none'}
    >
      <div className="check-item-main" onClick={cycleStatus}>
        <div className="check-box">
          {status ? STATUS_ICONS[status] : ''}
        </div>
        <div className="check-item-text-wrap">
          <div className="check-item-text">
            <span className={`priority-badge priority-${item.priority}`}>{item.priority}</span>
            {item.text}
          </div>
          {item.detail && !expanded && (
            <div className="expand-hint" onClick={e => { e.stopPropagation(); setExpanded(true) }}>
              tap for detail ›
            </div>
          )}
        </div>
      </div>

      {item.detail && expanded && (
        <div className="check-item-detail" onClick={() => setExpanded(false)}>
          {item.detail}
          <div className="expand-hint" style={{ marginTop: 4 }}>tap to collapse ‹</div>
        </div>
      )}

      {(status === 'skipped' || status === 'missed') && (
        <div className="status-row">
          <button
            className={`status-btn${status === 'done' ? ' active-done' : ''}`}
            onClick={() => setStatus('done')}
          >✓ Done</button>
          <button
            className={`status-btn${status === 'skipped' ? ' active-skipped' : ''}`}
            onClick={() => setStatus('skipped')}
          >– Skip</button>
          <button
            className={`status-btn${status === 'missed' ? ' active-missed' : ''}`}
            onClick={() => setStatus('missed')}
          >✗ Missed</button>
        </div>
      )}
    </div>
  )
}

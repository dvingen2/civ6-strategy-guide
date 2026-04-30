import { useState } from 'react'
import { buildExportText, copyToClipboard } from '../utils/export'

export default function ExportPanel({ session, phases }) {
  const [copied, setCopied] = useState(false)
  const text = buildExportText(session, phases)

  const handleCopy = async () => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div>
      <div className="section-label">Export game log</div>
      <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.5 }}>
        Copy this log and paste to Claude or ChatGPT for situational analysis.
      </p>
      <div className="export-preview">{text}</div>
      <button className="btn btn-primary w-full" onClick={handleCopy}>
        {copied ? '✓ Copied to clipboard' : 'Copy to clipboard'}
      </button>
    </div>
  )
}

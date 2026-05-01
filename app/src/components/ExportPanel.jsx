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
      <div className="export-hint">
        <strong>Mid-game health check:</strong> paste this log to Claude or ChatGPT and ask
        "I'm playing Civ 6 as Arabia — what should I prioritise next and why?" The log
        includes your phase progress, checkpoint answers, and session flags so the LLM has
        full context.
      </div>
      <div className="export-preview">{text}</div>
      <button className="btn btn-primary w-full" onClick={handleCopy}>
        {copied ? '✓ Copied to clipboard' : 'Copy to clipboard'}
      </button>
    </div>
  )
}

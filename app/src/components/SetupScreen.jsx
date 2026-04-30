import { useState } from 'react'

const MAP_TYPES = ['Continents', 'Pangaea', 'Highland', 'Desert', 'Archipelago', 'Fractal', 'Other']
const MAP_SIZES = ['Duel', 'Tiny', 'Small', 'Standard', 'Large', 'Huge']
const DIFFICULTIES = ['Settler', 'Chieftain', 'Warlord', 'Prince', 'King', 'Emperor', 'Immortal', 'Deity']

export default function SetupScreen({ onStart }) {
  const [leader, setLeader] = useState('')
  const [mapType, setMapType] = useState('Continents')
  const [mapSize, setMapSize] = useState('Standard')
  const [difficulty, setDifficulty] = useState('Prince')

  const canStart = !!leader

  return (
    <div className="setup-screen">
      <div className="setup-hero">
        <h1>Arabia Strategy Guide</h1>
        <p>Phase-by-phase counselor for Saladin in Civilization VI</p>
      </div>

      <div>
        <div className="setup-section-label">Choose your leader</div>
        <div className="leader-grid">
          <div
            className={`leader-card ${leader === 'vizier' ? 'selected' : ''}`}
            onClick={() => setLeader('vizier')}
          >
            <div className="leader-card-name">Saladin</div>
            <div className="leader-card-title">Vizier · Righteousness of the Faith</div>
            <div className="leader-card-desc">
              Worship Buildings 90% cheaper. Best for Science or Religious victory. Beginner-friendly.
            </div>
          </div>
          <div
            className={`leader-card ${leader === 'sultan' ? 'selected' : ''}`}
            onClick={() => setLeader('sultan')}
          >
            <div className="leader-card-name">Saladin</div>
            <div className="leader-card-title">Sultan · The Victorious</div>
            <div className="leader-card-desc">
              Doubled Flanking &amp; Support bonuses. Best for Domination. Requires DLC: Leader Pass.
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="setup-section-label">Game settings</div>
        <div className="form-row" style={{ marginBottom: 12 }}>
          <div className="form-group">
            <label className="form-label">Map type</label>
            <select
              className="form-select"
              value={mapType}
              onChange={e => setMapType(e.target.value)}
            >
              {MAP_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Map size</label>
            <select
              className="form-select"
              value={mapSize}
              onChange={e => setMapSize(e.target.value)}
            >
              {MAP_SIZES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Difficulty</label>
          <select
            className="form-select"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
          >
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {difficulty === 'Immortal' || difficulty === 'Deity' ? (
        <div style={{ background: 'rgba(200,168,75,0.08)', border: '1px solid var(--border-bright)', borderRadius: 'var(--radius)', padding: '12px 14px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--gold-dim)', fontFamily: 'sans-serif', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--gold)' }}>{difficulty} note:</strong> AI has large yield bonuses and settles very fast. The infrastructure-first approach still applies — but settle City 2 by T15 and build 2 Warriors for defense early.
          </div>
        </div>
      ) : null}

      {mapType === 'Archipelago' ? (
        <div style={{ background: 'rgba(106,176,186,0.08)', border: '1px solid #3a5060', borderRadius: 'var(--radius)', padding: '12px 14px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--priority-S)', fontFamily: 'sans-serif', lineHeight: 1.5 }}>
            <strong>Archipelago note:</strong> Desert Folklore may not apply. Harbor before Commercial Hub. Religious Victory is harder — consider Science as primary path.
          </div>
        </div>
      ) : null}

      <button
        className="btn btn-primary w-full"
        disabled={!canStart}
        onClick={() => onStart({ leader, mapType, mapSize, difficulty })}
        style={{ opacity: canStart ? 1 : 0.4, cursor: canStart ? 'pointer' : 'not-allowed' }}
      >
        Begin Game
      </button>
    </div>
  )
}

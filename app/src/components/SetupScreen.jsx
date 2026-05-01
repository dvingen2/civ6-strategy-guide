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
              Worship Buildings cost 90% less and grant +10% Science, Faith &amp; Culture
              city-wide. Infrastructure-first; religion arrives automatically.
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              <span className="leader-card-tag leader-card-tag-primary">Science</span>
              <span className="leader-card-tag leader-card-tag-primary">Religious</span>
              <span className="leader-card-tag leader-card-tag-primary">Beginner-friendly</span>
            </div>
          </div>
          <div
            className={`leader-card ${leader === 'sultan' ? 'selected' : ''}`}
            onClick={() => setLeader('sultan')}
          >
            <div className="leader-card-name">Saladin</div>
            <div className="leader-card-title">Sultan · The Victorious</div>
            <div className="leader-card-desc">
              Doubles Flanking &amp; Support combat bonuses. Built for early conquest
              with Mamluks as primary win condition.
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              <span className="leader-card-tag leader-card-tag-tonal">Domination</span>
              <span className="leader-card-tag leader-card-tag-tonal">Requires DLC</span>
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

      {(difficulty === 'Immortal' || difficulty === 'Deity') && (
        <div className="setup-callout setup-callout-gold">
          <strong>{difficulty}:</strong> AI has large yield bonuses and settles fast.
          Infrastructure-first still applies — but target City 2 by T15 and keep 2
          Warriors for early defense.
        </div>
      )}

      {mapType === 'Archipelago' && (
        <div className="setup-callout setup-callout-teal">
          <strong>Archipelago:</strong> Desert Folklore may not apply. Prioritise Harbor
          before Commercial Hub. Religious Victory is harder on island maps — lean toward
          Science as primary path.
        </div>
      )}

      {mapType === 'Desert' && (
        <div className="setup-callout setup-callout-gold">
          <strong>Desert map:</strong> Arabia's start bias is amplified — Desert Folklore
          is almost always the correct Pantheon. Watch for oasis clusters near your capital.
        </div>
      )}

      <button
        className="btn btn-primary w-full"
        disabled={!canStart}
        onClick={() => onStart({ leader, mapType, mapSize, difficulty })}
        style={{ opacity: canStart ? 1 : 0.4, cursor: canStart ? 'pointer' : 'not-allowed', height: 48, fontSize: '1rem' }}
      >
        Begin Game →
      </button>
    </div>
  )
}

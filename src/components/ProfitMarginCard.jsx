import React, { useState } from 'react';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

const QUICK_MULTIPLIERS = [2, 2.5, 3, 3.5, 4, 5];

const REFERENCES = [
  { mult: 'x2.0', desc: 'Alto volumen / descuento' },
  { mult: 'x2.5', desc: 'Volumen medio' },
  { mult: 'x3.0', desc: 'Mayorista' },
  { mult: 'x3.5', desc: 'Intermedio' },
  { mult: 'x4.0', desc: 'Minorista' },
  { mult: 'x5.0', desc: 'Llaveros / piezas chicas' },
];

export function ProfitMarginCard({ multiplier, onChange }) {
  const [showReferences, setShowReferences] = useState(true);

  const handleQuickSelect = (value) => {
    onChange(value);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    onChange(val);
  };

  const numMultiplier = Number(multiplier);

  return (
    <div className="calc-card">
      <div className="card-header">
        <h2 className="card-title">
          <TrendingUp size={18} />
          Margen de ganancia
        </h2>
      </div>

      <div className="input-group">
        <span className="input-label">Multiplicador</span>
        <div className="multiplier-grid">
          {QUICK_MULTIPLIERS.map((val) => {
            const isActive = numMultiplier === val;
            return (
              <button
                key={val}
                type="button"
                className={`multiplier-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleQuickSelect(val)}
                id={`btn-multiplier-${val}`}
              >
                ×{val}
              </button>
            );
          })}
        </div>
      </div>

      <div className="input-group" style={{ marginTop: '12px' }}>
        <label className="input-label" htmlFor="input-custom-multiplier">
          Personalizado
        </label>
        <div className="input-wrapper">
          <input
            id="input-custom-multiplier"
            type="number"
            className="input-field"
            value={multiplier ?? ''}
            onChange={handleCustomChange}
            placeholder="ej: 2.8"
            min="1"
            step="0.1"
          />
        </div>
        <span className="input-helper">
          Si necesitás otro valor, ingresalo acá (ej: 2.8).
        </span>
      </div>

      <button
        type="button"
        className="margin-guide-toggle"
        onClick={() => setShowReferences(!showReferences)}
        id="btn-toggle-references"
      >
        <span>Referencias de margen</span>
        {showReferences ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {showReferences && (
        <ul className="margin-guide-list">
          {REFERENCES.map((ref) => (
            <li key={ref.mult} className="margin-guide-item">
              <span className="margin-guide-tag">• {ref.mult}</span>
              <span>→ {ref.desc}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

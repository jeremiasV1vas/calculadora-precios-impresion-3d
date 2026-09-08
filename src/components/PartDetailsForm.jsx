import React from 'react';
import { Layers } from 'lucide-react';
import { CURRENCIES } from '../constants/currencies';

export function PartDetailsForm({ values, onChange, currencyCode }) {
  const currentCurrency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  const symbol = currentCurrency.symbol;

  return (
    <div className="calc-card">
      <div className="card-header">
        <h2 className="card-title">
          <Layers size={18} />
          Pieza
        </h2>
      </div>

      <div className="form-grid-2">
        {/* Horas de impresión */}
        <div className="input-group">
          <label className="input-label" htmlFor="input-hours">
            Horas de impresión
          </label>
          <div className="input-wrapper">
            <input
              id="input-hours"
              type="number"
              className="input-field"
              value={values.hours ?? ''}
              onChange={(e) => onChange({ hours: e.target.value })}
              placeholder="ej: 3"
              min="0"
              step="1"
            />
          </div>
        </div>

        {/* Minutos adicionales */}
        <div className="input-group">
          <label className="input-label" htmlFor="input-minutes">
            Minutos adicionales
          </label>
          <div className="input-wrapper">
            <input
              id="input-minutes"
              type="number"
              className="input-field"
              value={values.minutes ?? ''}
              onChange={(e) => onChange({ minutes: e.target.value })}
              placeholder="ej: 45"
              min="0"
              max="59"
              step="1"
            />
          </div>
        </div>

        {/* Gramos de filamento */}
        <div className="input-group">
          <label className="input-label" htmlFor="input-grams">
            Gramos de filamento
          </label>
          <div className="input-wrapper">
            <input
              id="input-grams"
              type="number"
              className="input-field"
              value={values.grams ?? ''}
              onChange={(e) => onChange({ grams: e.target.value })}
              placeholder="ej: 75"
              min="0"
              step="any"
            />
          </div>
        </div>

        {/* Insumos extra */}
        <div className="input-group">
          <label className="input-label" htmlFor="input-extra-supplies">
            Insumos extra ({symbol})
          </label>
          <div className="input-wrapper">
            <input
              id="input-extra-supplies"
              type="number"
              className="input-field"
              value={values.extraSupplies ?? ''}
              onChange={(e) => onChange({ extraSupplies: e.target.value })}
              placeholder="ej: 1200 (tornillos, cajas)"
              min="0"
              step="any"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

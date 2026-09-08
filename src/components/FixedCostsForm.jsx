import React from 'react';
import { Settings } from 'lucide-react';
import { PRINTER_PRESETS } from '../constants/printerPresets';
import { CURRENCIES } from '../constants/currencies';

export function FixedCostsForm({ values, onChange, currencyCode }) {
  const currentCurrency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  const symbol = currentCurrency.symbol;

  const handlePrinterModelChange = (modelId) => {
    const preset = PRINTER_PRESETS.find((p) => p.id === modelId);
    if (preset && preset.id !== 'custom') {
      onChange({
        printerModel: modelId,
        printerWatts: preset.defaultWatts
      });
    } else {
      onChange({ printerModel: modelId });
    }
  };

  return (
    <div className="calc-card">
      <div className="card-header">
        <h2 className="card-title">
          <Settings size={18} />
          Gastos fijos
        </h2>
      </div>

      <div className="form-grid-2">
        {/* Precio del filamento */}
        <div className="input-group">
          <label className="input-label" htmlFor="input-filament-price">
            Precio del filamento ({symbol}/kg)
          </label>
          <div className="input-wrapper">
            <input
              id="input-filament-price"
              type="number"
              className="input-field"
              value={values.filamentPrice ?? ''}
              onChange={(e) => onChange({ filamentPrice: e.target.value })}
              placeholder="ej: 20000"
              min="0"
              step="any"
            />
          </div>
        </div>

        {/* Precio del kWh */}
        <div className="input-group">
          <label className="input-label" htmlFor="input-kwh-price">
            Precio del kWh ({symbol})
          </label>
          <div className="input-wrapper">
            <input
              id="input-kwh-price"
              type="number"
              className="input-field"
              value={values.kwhPrice ?? ''}
              onChange={(e) => onChange({ kwhPrice: e.target.value })}
              placeholder="ej: 140"
              min="0"
              step="any"
            />
          </div>
        </div>

        {/* Modelo de impresora */}
        <div className="input-group">
          <label className="input-label" htmlFor="select-printer-model">
            Modelo de impresora
          </label>
          <select
            id="select-printer-model"
            className="select-field"
            value={values.printerModel || 'custom'}
            onChange={(e) => handlePrinterModelChange(e.target.value)}
          >
            {PRINTER_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
          <span className="input-helper">
            Elegí tu modelo y autocompletamos el consumo (W). Si no está en la lista, dejá "Otro / Personalizado".
          </span>
        </div>

        {/* Consumo de la impresora */}
        <div className="input-group">
          <label className="input-label" htmlFor="input-printer-watts">
            Consumo de la impresora (W)
          </label>
          <div className="input-wrapper">
            <input
              id="input-printer-watts"
              type="number"
              className="input-field"
              value={values.printerWatts ?? ''}
              onChange={(e) => onChange({ printerWatts: e.target.value })}
              placeholder="ej: 120"
              min="0"
              step="any"
            />
          </div>
          <span className="input-helper">
            Consumo promedio durante un print (no peak). Si no lo sabés, ~100W es un buen valor default.
          </span>
        </div>

        {/* Vida útil de la máquina */}
        <div className="input-group">
          <label className="input-label" htmlFor="input-lifespan-hours">
            Vida útil de la máquina (horas)
          </label>
          <div className="input-wrapper">
            <input
              id="input-lifespan-hours"
              type="number"
              className="input-field"
              value={values.lifespanHours ?? ''}
              onChange={(e) => onChange({ lifespanHours: e.target.value })}
              placeholder="ej: 4320"
              min="0"
              step="any"
            />
          </div>
        </div>

        {/* Costo de repuestos */}
        <div className="input-group">
          <label className="input-label" htmlFor="input-replacement-cost">
            Costo de repuestos ({symbol})
          </label>
          <div className="input-wrapper">
            <input
              id="input-replacement-cost"
              type="number"
              className="input-field"
              value={values.replacementCost ?? ''}
              onChange={(e) => onChange({ replacementCost: e.target.value })}
              placeholder="ej: 150000"
              min="0"
              step="any"
            />
          </div>
        </div>

        {/* Margen de error */}
        <div className="input-group full-width">
          <label className="input-label" htmlFor="input-error-margin">
            Margen de error (%)
          </label>
          <div className="input-wrapper">
            <input
              id="input-error-margin"
              type="number"
              className="input-field"
              value={values.errorMargin ?? ''}
              onChange={(e) => onChange({ errorMargin: e.target.value })}
              placeholder="ej: 5"
              min="0"
              max="100"
              step="any"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

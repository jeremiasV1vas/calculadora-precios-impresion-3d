import React, { useState } from 'react';
import { Calculator, PackagePlus, Copy, Check } from 'lucide-react';
import { formatCurrency } from '../constants/currencies';

export function ResultsPanel({ results, currencyCode, onSaveProductClick }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `Cotización de Impresión 3D:
• Material: ${formatCurrency(results.materialCost, currencyCode)}
• Electricidad: ${formatCurrency(results.energyCost, currencyCode)}
• Desgaste de máquina: ${formatCurrency(results.machineWear, currencyCode)}
• Margen de error: ${formatCurrency(results.errorMarginCost, currencyCode)}
• Costo base (sin insumos): ${formatCurrency(results.totalCostWithoutSupplies, currencyCode)}
• Insumos extra: ${formatCurrency(results.extraSupplies, currencyCode)}
--------------------------------
TOTAL A COBRAR: ${formatCurrency(results.totalToCharge, currencyCode)} (Margen ×${results.multiplier})`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-card results-card">
      <div className="card-header">
        <h2 className="card-title">
          <Calculator size={20} />
          Resultados
        </h2>
        <button
          type="button"
          className="profile-action-btn"
          onClick={handleCopy}
          title="Copiar desglose al portapapeles"
          id="btn-copy-quote"
        >
          {copied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      <div className="breakdown-list">
        <div className="breakdown-item">
          <span className="breakdown-label">Precio material</span>
          <span className="breakdown-value">
            {formatCurrency(results.materialCost, currencyCode)}
          </span>
        </div>

        <div className="breakdown-item">
          <span className="breakdown-label">Precio luz</span>
          <span className="breakdown-value">
            {formatCurrency(results.energyCost, currencyCode)}
          </span>
        </div>

        <div className="breakdown-item">
          <span className="breakdown-label">Desgaste máquina</span>
          <span className="breakdown-value">
            {formatCurrency(results.machineWear, currencyCode)}
          </span>
        </div>

        <div className="breakdown-item">
          <span className="breakdown-label">Margen de error</span>
          <span className="breakdown-value">
            {formatCurrency(results.errorMarginCost, currencyCode)}
          </span>
        </div>

        <div className="breakdown-divider" />

        <div className="breakdown-item subtotal">
          <span className="breakdown-label">Costo total (sin insumos)</span>
          <span className="breakdown-value">
            {formatCurrency(results.totalCostWithoutSupplies, currencyCode)}
          </span>
        </div>

        <div className="breakdown-item">
          <span className="breakdown-label">Insumos extra</span>
          <span className="breakdown-value">
            {formatCurrency(results.extraSupplies, currencyCode)}
          </span>
        </div>
      </div>

      {/* TOTAL A COBRAR Box */}
      <div className="total-highlight-box">
        <div className="total-label">Total a cobrar</div>
        <div className="total-amount" id="display-total-amount">
          {formatCurrency(results.totalToCharge, currencyCode)}
        </div>
        <div className="total-meta">
          <span>Ganancia estimada:</span>
          <span className="net-profit-badge">
            +{formatCurrency(results.netProfit, currencyCode)}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="btn-save-product"
        onClick={onSaveProductClick}
        id="btn-save-product-action"
      >
        <PackagePlus size={18} />
        Guardar como producto
      </button>
    </div>
  );
}
